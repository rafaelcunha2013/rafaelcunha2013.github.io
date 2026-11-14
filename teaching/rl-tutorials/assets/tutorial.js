/* Copyright (c) 2025-2026 Rafael Fernandes Cunha. SPDX-License-Identifier: MIT */
/* Tutorial page: renders the notebook JSON and drives the Python worker. */
(function () {
  "use strict";
  const DATA = JSON.parse(document.getElementById("nb-data").textContent);
  const KEY = "rl-tut:" + DATA.id + ":";
  const store = {
    get(k) { try { return localStorage.getItem(KEY + k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(KEY + k, v); } catch (e) {} },
    del(k) { try { localStorage.removeItem(KEY + k); } catch (e) {} },
  };
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const esc = (s) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  // Pages whose code needs PyTorch show it read-only; readers run it in Google Colab.
  const RUNNABLE = DATA.runnable !== false;

  // ---------- Markdown + math ----------
  function renderMarkdown(src) {
    const math = [];
    const keep = (t, display) => { math.push([t, display]); return "" + (math.length - 1) + ""; };
    src = src
      .replace(/\$\$([\s\S]+?)\$\$/g, (m, t) => keep(t, true))
      .replace(/(^|[^\\$])\$([^$\n]+?)\$/g, (m, pre, t) => pre + keep(t, false));
    let out = marked.parse(src, { gfm: true });
    return out.replace(/(\d+)/g, (m, i) => {
      const [t, d] = math[+i];
      try { return katex.renderToString(t, { displayMode: d, throwOnError: false }); }
      catch (e) { return esc(t); }
    });
  }

  // ---------- Build the page ----------
  const root = document.getElementById("notebook");
  const codeCells = [];
  const ICON_RUN = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5v11l9-5.5z" fill="currentColor"/></svg>';

  DATA.cells.forEach((c, i) => {
    if (c.t === "hero") {
      root.appendChild(el("section", "hero", renderMarkdown(c.md)));
      const note = DATA.solutions
        ? el("p", "hero-note is-solutions", RUNNABLE
          ? "<b>Solutions version.</b> Every cell runs automatically once Python is ready."
          : "<b>Solutions version.</b> This tutorial needs PyTorch, so its code does not run in the browser.")
        : RUNNABLE
          ? el("p", "hero-note",
            "The code cells on this page run Python in your browser. Run them in order; edits are kept in this browser. <b>Download .ipynb</b> saves your work as a notebook, and <b>Open in Colab</b> runs the tutorial in Google Colab.")
          : el("p", "hero-note",
            "This tutorial uses PyTorch, which does not run in the browser. Read the code here, and run it with <b>Open in Colab</b> (Google Colab, free with a Google account) or download it with <b>Download .ipynb</b> to run it in Jupyter.");
      root.lastChild.appendChild(note);
    } else if (c.t === "md") {
      const cell = el("div", "md-cell", renderMarkdown(c.md));
      if (c.intro) {
        // Intro headings become subtitles: same look as a section title, not in the contents.
        cell.querySelectorAll("h1").forEach((h) => {
          const sub = el("h2", "intro-title", h.innerHTML);
          h.replaceWith(sub);
        });
      }
      root.appendChild(cell);
    } else if (c.t === "callout") {
      const box = el("aside", "callout k-" + c.kind);
      // labels may contain inline code, e.g. "Task: Investigate the `MountainCarContinuous-v0` Environment"
      box.appendChild(el("div", "callout-label", esc(c.label).replace(/`([^`]+)`/g, "<code>$1</code>")));
      box.appendChild(el("div", "callout-body", renderMarkdown(c.md)));
      root.appendChild(box);
    } else if (c.t === "code") {
      root.appendChild(buildCodeCell(c, i));
    }
  });

  // Helper cell: a reference list (signature + one-line description, source on click)
  // instead of a long editor. The code itself still runs as one cell.
  function buildHelperBlock(c) {
    const idx = codeCells.length;
    const det = el("details", "code-fold helper-ref");
    det.id = "cell-" + (idx + 1);
    const nPublic = c.ref.filter((e) => !e.private && e.name !== "settings").length;
    const summary = el("summary", "",
      "<span>" + esc(c.title) + "</span><span class=\"fold-meta\">" + nPublic + " functions and classes</span>");
    const prompt = el("span", "helper-state", "not loaded");
    if (RUNNABLE) summary.appendChild(prompt);
    det.appendChild(summary);
    const list = el("div", "ref-list");
    const ordered = [...c.ref.filter((e) => !e.private), ...c.ref.filter((e) => e.private)];
    ordered.forEach((e) => {
      const item = el("details", "ref-item" + (e.private ? " is-private" : ""));
      const head = el("summary", "");
      head.appendChild(el("code", "ref-sig", esc(e.sig)));
      if (e.private) head.appendChild(el("span", "ref-tag", "internal"));
      head.appendChild(el("span", "ref-doc", e.doc ? esc(e.doc) : ""));
      const pre = el("pre", "ref-src cm-s-default");
      item.append(head, pre);
      item.addEventListener("toggle", () => {
        if (item.open && !pre.childNodes.length) CodeMirror.runMode(e.src, "python", pre);
      }, { once: false });
      list.appendChild(item);
    });
    det.appendChild(list);
    det.appendChild(el("p", "ref-note", RUNNABLE
      ? "Runs automatically when Python starts. <b>Download .ipynb</b> includes this code as a normal cell."
      : "<b>Open in Colab</b> and <b>Download .ipynb</b> include this code as a normal cell."));
    const output = el("div", "output");
    det.appendChild(output);
    const cm = { getValue: () => c.src, refresh() {}, focus() {} };
    codeCells.push({ idx, c, wrap: det, prompt, output, cm, autorun: true, isHelper: true });
    return det;
  }

  // ---------- Run times ----------
  function fmtDuration(seconds) {
    if (seconds < 55) return Math.max(5, Math.round(seconds / 5) * 5) + " s";
    return Math.max(1, Math.round(seconds / 60)) + " min";
  }
  // Measured times for slow cells (from runtimes.json at build time).
  function runtimeNote(rt) {
    let text = "Runs for about " + fmtDuration(rt.browser) + " in the browser";
    if (rt.laptop) text += " (about " + fmtDuration(rt.laptop) + " on a laptop)";
    text += ".";
    return el("div", "runtime-note",
      '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 4.6V8l2.4 1.6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>' + esc(text));
  }
  function fmtElapsed(ms) {
    const s = ms / 1000;
    if (s < 60) return s.toFixed(s < 10 ? 1 : 0) + " s";
    return Math.floor(s / 60) + " min " + Math.round(s % 60) + " s";
  }
  // For measuring: seconds per code cell of the last run, in page order.
  window.__cellTimes = () => codeCells.map((c) => (c.lastMs != null ? Math.round(c.lastMs / 100) / 10 : null));

  // Review builds: once the queue is empty, copy the command that records these times.
  const btnTimes = document.getElementById("btn-copy-times");
  function updateTimingButton() {
    if (!btnTimes) return;
    const timed = codeCells.filter((c) => c.lastMs != null).length;
    btnTimes.disabled = !(ready && !busy && !queue.length && timed);
    btnTimes.textContent = "Copy timing command" + (timed && timed < codeCells.length ? " (" + timed + "/" + codeCells.length + " cells)" : "");
  }
  if (btnTimes) btnTimes.onclick = async () => {
    const t = DATA.timing;
    const cmd = 'cd "' + t.dir + '" && python3 record_runtimes.py ' + t.id + " '" + JSON.stringify(window.__cellTimes()) + "'";
    try { await navigator.clipboard.writeText(cmd); }
    catch (e) {
      const ta = el("textarea"); ta.value = cmd; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); ta.remove();
    }
    const label = btnTimes.textContent;
    btnTimes.textContent = "Copied: paste it in a terminal";
    setTimeout(() => (btnTimes.textContent = label), 2500);
  };

  function setPrompt(cell, text) {
    if (!cell.isHelper) { cell.prompt.textContent = text; return; }
    cell.prompt.textContent = { "[ ]": "not loaded", "[*]": "loading…" }[text] || text;
    cell.prompt.dataset.state = text;
  }

  function buildCodeCell(c, i) {
    if (c.fold && c.ref) return buildHelperBlock(c);
    const idx = codeCells.length;
    const wrap = el("div", "code-cell");
    wrap.id = "cell-" + (idx + 1);
    const bar = el("div", "cell-bar");
    const prompt = el("span", "prompt", "[ ]");
    const runBtn = el("button", "cell-run", ICON_RUN + "<span>Run</span>");
    runBtn.title = "Run cell (Shift+Enter)";
    const aboveBtn = el("button", "cell-btn", "Run cells above");
    const resetBtn = el("button", "cell-btn", "Reset");
    resetBtn.title = "Restore the original code of this cell";
    const label = el("span", "cell-title", c.title ? esc(c.title) : "");
    const edited = el("span", "edited", "edited");
    const elapsed = el("span", "elapsed");
    if (RUNNABLE) bar.append(runBtn, prompt, label, edited, elapsed, el("span", "spacer"), aboveBtn, resetBtn);
    else bar.append(label, el("span", "spacer"), el("span", "cell-lang", "Python"));
    const editorHost = el("div", "editor");
    const output = el("div", "output");
    wrap.append(bar);
    if (c.runtime) wrap.append(runtimeNote(c.runtime));
    wrap.append(editorHost, output);

    const saved = RUNNABLE ? store.get("cell:" + idx) : null;
    const cm = CodeMirror(editorHost, {
      value: saved != null ? saved : c.src.replace(/\n$/, ""),
      readOnly: !RUNNABLE,
      mode: "python",
      lineNumbers: true,
      indentUnit: 4,
      matchBrackets: true,
      viewportMargin: Infinity,
      lineWrapping: true,
      extraKeys: {
        "Shift-Enter": () => { runCell(idx); focusNext(idx); },
        "Ctrl-Enter": () => runCell(idx),
        "Cmd-Enter": () => runCell(idx),
        Tab: (ed) => ed.somethingSelected() ? ed.indentSelection("add") : ed.replaceSelection("    ", "end"),
      },
    });
    const cell = { idx, c, wrap, prompt, output, cm, edited, elapsed, autorun: !!c.autorun, state: "idle" };
    const markEdited = () => wrap.classList.toggle("is-edited", cm.getValue() !== c.src.replace(/\n$/, ""));
    cm.on("change", () => { store.set("cell:" + idx, cm.getValue()); markEdited(); });
    markEdited();
    runBtn.onclick = () => runCell(idx);
    aboveBtn.onclick = () => { for (let j = 0; j < idx; j++) enqueue(codeCells[j]); };
    resetBtn.onclick = () => { cm.setValue(c.src.replace(/\n$/, "")); store.del("cell:" + idx); };
    codeCells.push(cell);

    if (c.fold) {
      const det = el("details", "code-fold");
      const n = (c.src.match(/^def |^class /gm) || []).length;
      det.appendChild(el("summary", "", "<span>" + esc(c.title || "Code") + "</span><span class=\"fold-meta\">" + n + " definitions · runs automatically</span>"));
      det.appendChild(wrap);
      det.addEventListener("toggle", () => cm.refresh());
      return det;
    }
    return wrap;
  }

  function focusNext(idx) {
    const next = codeCells[idx + 1];
    if (next) {
      const fold = next.wrap.closest("details");
      if (!fold || fold.open) { next.cm.focus(); next.wrap.scrollIntoView({ block: "nearest", behavior: "smooth" }); }
    }
  }

  // ---------- Table of contents ----------
  // Top level: Section/Case/Part headings. Sub-entries: boxes titled "Section 1.2: ...".
  const toc = document.getElementById("toc");
  const introHead = root.querySelector(".intro-title");
  if (introHead) introHead.id = "introduction";
  const SUB = /^(Section|Part)\s+\d+\.\d+/;
  const heads = [...root.querySelectorAll(".intro-title, .md-cell h1, .callout-label")].filter((h) =>
    h.classList.contains("callout-label") ? SUB.test(h.textContent) : (!h.classList.contains("intro-title") || h === introHead));
  if (heads.length) {
    toc.appendChild(el("div", "toc-title", "Contents"));
    const list = el("ol");
    heads.forEach((h, k) => {
      const sub = h.classList.contains("callout-label");
      const target = sub ? h.closest(".callout") : h;
      target.id = target.id || "s-" + k;
      h.dataset.tocTarget = target.id;
      const a = el("a", sub ? "sub" : "", h === introHead ? "Introduction" : esc(h.textContent));
      a.href = "#" + target.id;
      const li = el("li");
      li.appendChild(a);
      list.appendChild(li);
    });
    toc.appendChild(list);
    const links = [...toc.querySelectorAll("a")];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id));
      });
    }, { rootMargin: "0px 0px -70% 0px" });
    heads.forEach((h) => obs.observe(document.getElementById(h.dataset.tocTarget)));
  }

  // The page is built by script, so jump to a #target ourselves once it exists.
  if (location.hash) {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
  }

  // ---------- Python kernel ----------
  const statusEl = document.getElementById("py-status");
  const statusText = statusEl.querySelector(".status-text");
  const btnRunAll = document.getElementById("btn-run-all");
  const btnRestart = document.getElementById("btn-restart");
  let worker = null, ready = false, busy = null, queue = [], counter = 0, msgId = 0;
  const pending = new Map();

  function setStatus(state, text) { statusEl.dataset.state = state; statusText.textContent = text; }

  function startKernel() {
    ready = false; busy = null; queue = []; counter = 0; pending.clear();
    codeCells.forEach((c) => { setPrompt(c, "[ ]"); c.wrap.classList.remove("is-running", "is-queued"); });
    setStatus("loading", "Starting Python…");
    btnRunAll.disabled = true; btnRestart.disabled = true;
    const t0 = performance.now();
    worker = new Worker("assets/py_worker.js");
    worker.onmessage = (e) => onMessage(e.data, t0);
    worker.onerror = (e) => setStatus("error", "Python failed to start: " + e.message);
    worker.postMessage({ type: "init", packages: DATA.packages });
  }

  function onMessage(m, t0) {
    if (m.type === "status") return setStatus("loading", m.text);
    if (m.type === "fatal") return setStatus("error", "Python failed to start: " + m.text);
    if (m.type === "ready") {
      ready = true;
      btnRunAll.disabled = false; btnRestart.disabled = false;
      setStatus("ready", "Python ready (" + ((performance.now() - t0) / 1000).toFixed(0) + " s)");
      codeCells.filter((c) => DATA.solutions || c.autorun).forEach(enqueue);
      return pump();
    }
    const cell = pending.get(m.id);
    if (!cell) return;
    if (m.type === "clear") {
      // clear_output(wait=True) clears when the next output arrives (no flicker)
      if (m.wait) cell.clearPending = true; else cell.output.innerHTML = "";
      return;
    }
    if (cell.clearPending && m.type !== "done") { cell.output.innerHTML = ""; cell.clearPending = false; }
    if (m.type === "stdout" || m.type === "stderr") appendText(cell, m.text, m.type);
    else if (m.type === "text") appendText(cell, m.text + "\n", "result");
    else if (m.type === "error") appendText(cell, m.text, "error");
    else if (m.type === "image") {
      const img = el("img", "out-img");
      img.src = "data:image/png;base64," + m.png;
      img.alt = "Figure output";
      cell.output.appendChild(img);
    } else if (m.type === "html") cell.output.appendChild(el("div", "out-html", m.html));
    else if (m.type === "done") {
      cell.clearPending = false;
      cell.lastMs = performance.now() - cell.t0;
      if (cell.elapsed) cell.elapsed.textContent = cell.lastMs > 2000 ? fmtElapsed(cell.lastMs) : "";
      pending.delete(m.id);
      cell.wrap.classList.remove("is-running");
      cell.wrap.classList.toggle("has-error", !m.ok);
      if (cell.isHelper) setPrompt(cell, m.ok ? "loaded" : "failed");
      else setPrompt(cell, "[" + ++counter + "]");
      busy = null;
      if (!m.ok) {
        queue.forEach((q) => { q.wrap.classList.remove("is-queued"); setPrompt(q, "[ ]"); });
        queue = [];
      }
      setStatus("ready", "Python ready");
      pump();
      updateTimingButton();
    }
  }

  function appendText(cell, text, kind) {
    let last = cell.output.lastElementChild;
    if (!last || !last.classList.contains("out-" + kind)) {
      last = el("pre", "out-text out-" + kind);
      cell.output.appendChild(last);
    }
    // A carriage return redraws its line (progress bars): keep only what follows the last \r.
    last._raw = ((last._raw || "") + text)
      .split("\n").map((line) => line.slice(line.lastIndexOf("\r") + 1)).join("\n");
    last.innerHTML = ansiToHtml(last._raw);
  }

  // Terminal colour codes (e.g. gymnasium's text rendering marks the agent's cell red).
  function ansiToHtml(s) {
    let fg = null, bg = null, bold = false, open = false, out = "";
    const parts = s.split(/\x1b\[([\d;]*)m/);
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) { out += esc(parts[i]); continue; }
      for (const code of (parts[i] || "0").split(";").map(Number)) {
        if (code === 0) { fg = bg = null; bold = false; }
        else if (code === 1) bold = true;
        else if (code === 22) bold = false;
        else if ((code >= 30 && code <= 37) || (code >= 90 && code <= 97)) fg = code % 10;
        else if (code === 39) fg = null;
        else if ((code >= 40 && code <= 47) || (code >= 100 && code <= 107)) bg = code % 10;
        else if (code === 49) bg = null;
      }
      if (open) { out += "</span>"; open = false; }
      const cls = [fg != null ? "ansi-fg" + fg : "", bg != null ? "ansi-bg" + bg : "", bold ? "ansi-b" : ""].filter(Boolean);
      if (cls.length) { out += '<span class="' + cls.join(" ") + '">'; open = true; }
    }
    return out + (open ? "</span>" : "");
  }

  function enqueue(cell) {
    if (queue.includes(cell) || busy === cell) return;
    queue.push(cell);
    cell.wrap.classList.add("is-queued");
    setPrompt(cell, "[*]");
    pump();
  }

  function pump() {
    if (!ready || busy || !queue.length) return;
    const cell = queue.shift();
    busy = cell;
    cell.wrap.classList.remove("is-queued", "has-error");
    cell.wrap.classList.add("is-running");
    cell.output.innerHTML = "";
    cell.t0 = performance.now();
    if (cell.elapsed) cell.elapsed.textContent = "";
    const id = ++msgId;
    pending.set(id, cell);
    setStatus("busy", "Running cell " + (cell.idx + 1) + "…");
    updateTimingButton();
    worker.postMessage({ type: "run", id, code: cell.cm.getValue(), name: "<cell " + (cell.idx + 1) + ">" });
  }

  function runCell(idx) { enqueue(codeCells[idx]); }

  if (btnRunAll) btnRunAll.onclick = () => codeCells.forEach(enqueue);
  if (btnRestart) btnRestart.onclick = () => {
    if (worker) worker.terminate();
    codeCells.forEach((c) => (c.output.innerHTML = ""));
    startKernel();
  };

  // ---------- Download as notebook ----------
  document.getElementById("btn-download").onclick = () => {
    let k = 0;
    const cells = DATA.raw.map((r) => {
      if (r.cell_type === "markdown") return { cell_type: "markdown", metadata: {}, source: r.source };
      const code = codeCells[k++].cm.getValue();
      return { cell_type: "code", metadata: {}, execution_count: null, outputs: [], source: code };
    });
    cells.push({ cell_type: "markdown", metadata: {}, source: "---\n\n" + DATA.credit_md });
    const nb = {
      nbformat: 4, nbformat_minor: 4, cells, // 4.4: no cell ids required
      metadata: {
        kernelspec: { name: "python3", display_name: "Python 3", language: "python" },
        license: "Text: CC-BY-4.0; code: MIT",
      },
    };
    const blob = new Blob([JSON.stringify(nb, null, 1)], { type: "application/x-ipynb+json" });
    const a = el("a");
    a.href = URL.createObjectURL(blob);
    a.download = DATA.id + ".ipynb";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };

  // ---------- Review builds: Student | Solutions keeps your place ----------
  const twin = document.querySelector(".review-switch .twin");
  if (twin) {
    const base = twin.getAttribute("href");
    twin.addEventListener("click", (e) => {
      // the last code cell or heading whose top is above the middle of the screen
      const marks = [...root.querySelectorAll(".code-cell[id], .helper-ref[id], .md-cell h1[id], .intro-title[id]")];
      let mark = null;
      for (const m of marks) { if (m.getBoundingClientRect().top < innerHeight / 2) mark = m; else break; }
      e.preventDefault();
      location.href = base + (mark ? "#" + mark.id : "");
    });
  }

  // ---------- Light / dark switch ----------
  const isDark = () => {
    const t = document.documentElement.dataset.theme;
    return t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  };
  document.getElementById("btn-theme").onclick = () => {
    const next = isDark() ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {} // same key as the main site
  };

  // Editors measure glyphs at creation; re-measure once the web fonts arrive.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => codeCells.forEach((c) => c.cm.refresh()));

  if (RUNNABLE) startKernel();
  else setStatus("static", "Runs in Google Colab");
})();
