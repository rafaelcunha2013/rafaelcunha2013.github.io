/* Copyright (c) 2025-2026 Rafael Fernandes Cunha. SPDX-License-Identifier: MIT */
/* Remote Python for tutorials whose code needs PyTorch: a Jupyter kernel on mybinder.org
   (or, for local testing, on a Jupyter server on this computer).

   RemoteKernel has the same interface as the Pyodide Web Worker in py_worker.js:
     kernel.postMessage({type:'init'}) / ({type:'run', id, code, name})
     kernel.onmessage = (e) => ...   receives {type: status|ready|fatal|stdout|stderr|image|html|text|error|clear|done, id, ...}
     kernel.terminate()
   so the page drives either one the same way.

   Jupyter messaging protocol: https://jupyter-client.readthedocs.io/en/stable/messaging.html
   Binder build API:           https://mybinder.readthedocs.io/en/latest/howto/user_interface.html */
(function () {
  "use strict";

  // A started server is reused by "Restart Python" (new kernel, same server).
  let serverPromise = null;

  function uuid() {
    return (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random()).replace(/-/g, "");
  }

  // Local testing: ?jupyter=http://127.0.0.1:8899&token=... (only loopback addresses).
  function localServer() {
    const q = new URLSearchParams(location.search);
    const url = q.get("jupyter");
    if (!url || !/^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?\/?$/.test(url)) return null;
    return { url: url.replace(/\/?$/, "/"), token: q.get("token") || "" };
  }

  // Ask mybinder.org to build (or reuse) the image and start a server.
  function binderServer(binder, status) {
    return new Promise((resolve, reject) => {
      const src = new EventSource("https://mybinder.org/build/gh/" + binder.repo + "/" + encodeURIComponent(binder.ref));
      const t0 = performance.now();
      const label = {
        waiting: "Waiting for a Binder server…",
        fetching: "Fetching the environment…",
        building: "Building the Python environment (first start after an update: several minutes)…",
        built: "Environment ready, starting the server…",
        launching: "Starting the Python server…",
      };
      // The clock ticks every second; Binder only sends an event when its phase changes.
      let current = label.waiting;
      const tick = () => status(current + " " + Math.round((performance.now() - t0) / 1000) + " s");
      const timer = setInterval(tick, 1000);
      const finish = (fn, value) => { clearInterval(timer); src.close(); fn(value); };
      src.onmessage = (ev) => {
        let msg;
        try { msg = JSON.parse(ev.data); } catch (e) { return; }
        if (msg.phase === "ready") {
          finish(resolve, { url: msg.url.replace(/\/?$/, "/"), token: msg.token || "" });
        } else if (msg.phase === "failed") {
          finish(reject, new Error("Binder could not start a server (" + (msg.message || "build failed").trim().slice(0, 120) + ")"));
        } else if (label[msg.phase]) {
          current = label[msg.phase];
          tick();
        }
      };
      src.onerror = () => finish(reject, new Error("could not reach mybinder.org"));
    });
  }

  class RemoteKernel {
    constructor(config) {
      this.config = config || {};
      this.onmessage = null;
      this.ws = null;
      this.kernelId = null;
      this.server = null;
      this.session = uuid();
      this.runs = new Map(); // jupyter msg_id -> {id, ok}
    }

    emit(type, data) {
      if (this.onmessage) this.onmessage({ data: Object.assign({ type }, data || {}) });
    }

    postMessage(m) {
      if (m.type === "init") this.init().catch((err) => this.emit("fatal", { text: err.message || String(err) }));
      else if (m.type === "run") this.run(m);
    }

    async init() {
      const status = (text) => this.emit("status", { text });
      const local = localServer();
      if (local) {
        status("Connecting to the local Jupyter server…");
        this.server = local;
      } else {
        status("Asking mybinder.org for a Python server…");
        if (!serverPromise) serverPromise = binderServer(this.config.binder, status).catch((e) => { serverPromise = null; throw e; });
        this.server = await serverPromise;
      }
      status("Starting the Python kernel…");
      const r = await fetch(this.server.url + "api/kernels", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "token " + this.server.token },
        body: JSON.stringify({ name: "python3" }),
      });
      if (!r.ok) throw new Error("the server refused to start a kernel (HTTP " + r.status + ")");
      this.kernelId = (await r.json()).id;
      await this.connect();
      // Binder containers get about one CPU, but PyTorch/OpenMP see every core of the host
      // and start that many threads, which then fight over the one CPU (training ran ~40x
      // slower). One thread each, set before numpy or torch load.
      // Then match the in-browser pages: inline plots, no tqdm monitor thread.
      await this.silent([
        "import os",
        "for _v in ('OMP_NUM_THREADS', 'MKL_NUM_THREADS', 'OPENBLAS_NUM_THREADS'):",
        "    os.environ.setdefault(_v, '1')",
        "%matplotlib inline",
        "import tqdm as _t",
        "_t.tqdm.monitor_interval = 0",
      ].join("\n"));
      this.emit("ready");
    }

    connect() {
      return new Promise((resolve, reject) => {
        const wsUrl = this.server.url.replace(/^http/, "ws") + "api/kernels/" + this.kernelId +
          "/channels?session_id=" + this.session + "&token=" + encodeURIComponent(this.server.token);
        const ws = new WebSocket(wsUrl);
        this.ws = ws;
        ws.onopen = () => resolve();
        ws.onerror = () => reject(new Error("lost the connection to the Python kernel"));
        ws.onclose = () => {
          if (this.ws === ws && !this.closing) this.emit("fatal", { text: "the Python server stopped (idle for too long?). Use Restart Python." });
        };
        ws.onmessage = (ev) => this.receive(ev.data);
      });
    }

    message(code, silent) {
      const msgId = uuid();
      return {
        msgId,
        frame: JSON.stringify({
          header: { msg_id: msgId, username: "", session: this.session, msg_type: "execute_request", version: "5.3", date: new Date().toISOString() },
          parent_header: {}, metadata: {}, channel: "shell", buffers: [],
          content: { code, silent: !!silent, store_history: !silent, user_expressions: {}, allow_stdin: false, stop_on_error: true },
        }),
      };
    }

    silent(code) {
      return new Promise((resolve) => {
        const { msgId, frame } = this.message(code, true);
        this.runs.set(msgId, { id: null, ok: true, resolve });
        this.ws.send(frame);
      });
    }

    run(m) {
      const { msgId, frame } = this.message(m.code, false);
      this.runs.set(msgId, { id: m.id, ok: true });
      this.ws.send(frame);
    }

    receive(raw) {
      if (typeof raw !== "string") return; // binary frames are not used by these messages
      let msg;
      try { msg = JSON.parse(raw); } catch (e) { return; }
      const run = this.runs.get(msg.parent_header && msg.parent_header.msg_id);
      if (!run) return;
      const out = (type, data) => { if (run.id != null) this.emit(type, Object.assign({ id: run.id }, data)); };
      const c = msg.content || {};
      switch (msg.header.msg_type) {
        case "stream":
          out(c.name === "stderr" ? "stderr" : "stdout", { text: c.text });
          break;
        case "display_data":
        case "execute_result":
        case "update_display_data": {
          const d = c.data || {};
          if (d["image/png"]) out("image", { png: d["image/png"].replace(/\s/g, "") });
          else if (d["text/html"]) out("html", { html: [].concat(d["text/html"]).join("") });
          else if (d["text/plain"]) out("text", { text: [].concat(d["text/plain"]).join("") });
          break;
        }
        case "error":
          run.ok = false;
          out("error", { text: (c.traceback || [c.ename + ": " + c.evalue]).join("\n") + "\n" });
          break;
        case "clear_output":
          out("clear", { wait: !!c.wait });
          break;
        case "execute_reply":
          if (c.status !== "ok") run.ok = false;
          break;
        case "status":
          if (c.execution_state === "idle") {
            this.runs.delete(msg.parent_header.msg_id);
            if (run.resolve) run.resolve(run.ok);
            out("done", { ok: run.ok });
          }
          break;
      }
    }

    terminate() {
      this.closing = true;
      if (this.ws) this.ws.close();
      if (this.server && this.kernelId) {
        fetch(this.server.url + "api/kernels/" + this.kernelId, {
          method: "DELETE", headers: { Authorization: "token " + this.server.token }, keepalive: true,
        }).catch(() => {});
      }
    }
  }

  window.RemoteKernel = RemoteKernel;
})();
