/* Copyright (c) 2025-2026 Rafael Fernandes Cunha. SPDX-License-Identifier: MIT */
/* Python runtime for the tutorial pages: Pyodide in a Web Worker.
   Protocol (main -> worker): {type:'init', packages:[...]} | {type:'run', id, code, name}
   Protocol (worker -> main): status | ready | fatal | stdout | stderr | image | html | text | error | done */
const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.27.2/full/";
importScripts(PYODIDE_URL + "pyodide.js");

// Packages shipped with Pyodide; anything else is installed from PyPI by micropip.
const BUILTIN = new Set(["numpy", "pandas", "matplotlib", "scipy"]);
// PyPI packages pinned to the versions the course used (as in pyproject.toml, 2025-26).
const PINS = { gymnasium: "gymnasium==1.2.1", seaborn: "seaborn==0.13.2", tqdm: "tqdm==4.67.1" };

let py = null;
let current = null;
const post = (type, data = {}) => self.postMessage({ type, id: current, ...data });

const RUNNER = `
import sys, ast, io, base64, linecache, traceback, os, types

# The browser has no processes. gymnasium imports multiprocessing (for its vector
# environments) at import time; this stand-in satisfies the import, and creating a
# process lock raises a clear error instead.
if "_multiprocessing" not in sys.modules:
    _mp = types.ModuleType("_multiprocessing")
    class _NoSemLock:
        SEM_VALUE_MAX = 2147483647
        def __init__(self, *args, **kwargs):
            raise OSError("multiprocessing is not available in the browser")
    _mp.SemLock = _NoSemLock
    _mp.sem_unlink = lambda name: None
    _mp.flags = {}
    sys.modules["_multiprocessing"] = _mp

os.environ["MPLBACKEND"] = "AGG"
import matplotlib
matplotlib.use("AGG")
import matplotlib.pyplot as _plt
import _bridge

def _flush_figures():
    for num in _plt.get_fignums():
        fig = _plt.figure(num)
        buf = io.BytesIO()
        fig.savefig(buf, format="png", dpi=110, bbox_inches="tight")
        _bridge.image(base64.b64encode(buf.getvalue()).decode("ascii"))
    _plt.close("all")

_plt.show = lambda *a, **k: _flush_figures()

_NS = {"__name__": "__main__"}

# --- IPython.display stand-in: display(), clear_output(), HTML -----------------
import types as _types, time as _time
from matplotlib.figure import Figure as _Figure

def _show_figure(fig):
    buf = io.BytesIO()
    fig.savefig(buf, format="png", dpi=110, bbox_inches="tight")
    _bridge.image(base64.b64encode(buf.getvalue()).decode("ascii"))

def display(*objs, **kwargs):
    sys.stdout.flush()
    for obj in objs:
        if isinstance(obj, _Figure):
            _show_figure(obj)
        else:
            _display(obj)

def clear_output(wait=False):
    sys.stdout.flush()
    _bridge.clear(bool(wait))

class HTML:
    def __init__(self, data=""):
        self.data = data
    def _repr_html_(self):
        return self.data

_ipython = _types.ModuleType("IPython")
_ipython_display = _types.ModuleType("IPython.display")
_ipython_display.display = display
_ipython_display.clear_output = clear_output
_ipython_display.HTML = HTML
_ipython.display = _ipython_display
_ipython.get_ipython = lambda: None  # matplotlib asks; None = no interactive shell
sys.modules.setdefault("IPython", _ipython)
sys.modules.setdefault("IPython.display", _ipython_display)

# time.sleep: this worker has no blocking sleep, so wait on the clock. Output sent
# before the sleep is already on its way to the page, so animations play.
def _sleep(seconds):
    sys.stdout.flush()
    end = _time.perf_counter() + max(0.0, float(seconds))
    while _time.perf_counter() < end:
        pass
_time.sleep = _sleep

# Singular matrices: desktop NumPy (OpenBLAS/Accelerate LAPACK) raises LinAlgError when
# it meets an exact zero pivot; the WebAssembly build returns NaNs instead. Raise the
# same error here, so exercises that rely on it behave as on a laptop.
import functools as _functools
import numpy as _np

def _raise_if_singular(fn):
    @_functools.wraps(fn)
    def wrapper(*args, **kwargs):
        out = fn(*args, **kwargs)
        try:
            inputs_finite = all(_np.all(_np.isfinite(_np.asarray(a))) for a in args[:2])
            if inputs_finite and not _np.all(_np.isfinite(out)):
                raise _np.linalg.LinAlgError("Singular matrix")
        except TypeError:  # non-numeric input: leave NumPy's own result
            pass
        return out
    return wrapper

_np.linalg.inv = _raise_if_singular(_np.linalg.inv)
_np.linalg.solve = _raise_if_singular(_np.linalg.solve)

# tqdm starts a monitor thread; the browser has no threads, so switch it off quietly.
try:
    import tqdm as _tqdm
    _tqdm.tqdm.monitor_interval = 0
except ImportError:
    pass

def _display(val):
    rh = getattr(val, "_repr_html_", None)
    if callable(rh):
        try:
            h = rh()
            if h:
                _bridge.html(h)
                return
        except Exception:
            pass
    _bridge.text(repr(val))

def _run_cell(code, name):
    linecache.cache[name] = (len(code), None, code.splitlines(True), name)
    try:
        tree = ast.parse(code, filename=name)
        last = None
        if tree.body and isinstance(tree.body[-1], ast.Expr):
            last = ast.Expression(tree.body.pop().value)
        exec(compile(tree, name, "exec"), _NS)
        if last is not None:
            val = eval(compile(last, name, "eval"), _NS)
            if val is not None:
                _display(val)
        return True
    except SyntaxError as e:
        _bridge.error("".join(traceback.format_exception_only(type(e), e)))
        return False
    except BaseException as e:
        _bridge.error("".join(traceback.format_exception(type(e), e, e.__traceback__.tb_next)))
        return False
    finally:
        sys.stdout.flush()
        sys.stderr.flush()
        _flush_figures()
`;

async function init(packages) {
  post("status", { text: "Loading Python…" });
  py = await loadPyodide({ indexURL: PYODIDE_URL });
  // Stream output as written (not per line), so progress bars that redraw with \r
  // update live while a long cell runs.
  const streamTo = (kind) => {
    const decoder = new TextDecoder();
    return { write: (buf) => { post(kind, { text: decoder.decode(buf, { stream: true }) }); return buf.length; } };
  };
  py.setStdout(streamTo("stdout"));
  py.setStderr(streamTo("stderr"));
  const builtin = packages.filter((p) => BUILTIN.has(p));
  const extra = packages.filter((p) => !BUILTIN.has(p));
  if (!builtin.includes("matplotlib")) builtin.push("matplotlib");
  post("status", { text: "Loading " + builtin.join(", ") + "…" });
  await py.loadPackage([...builtin, "micropip"]);
  if (extra.length) {
    post("status", { text: "Installing " + extra.join(", ") + "…" });
    const micropip = py.pyimport("micropip");
    await micropip.install(extra.map((p) => PINS[p] || p));
  }
  py.registerJsModule("_bridge", {
    image: (b64) => post("image", { png: b64 }),
    html: (h) => post("html", { html: h }),
    text: (t) => post("text", { text: t }),
    error: (t) => post("error", { text: t }),
    clear: (wait) => post("clear", { wait }),
  });
  post("status", { text: "Preparing plots…" });
  py.runPython(RUNNER);
  post("ready");
}

self.onmessage = async (e) => {
  const m = e.data;
  if (m.type === "init") {
    try {
      await init(m.packages || []);
    } catch (err) {
      post("fatal", { text: String(err) });
    }
  } else if (m.type === "run") {
    current = m.id;
    let ok = false;
    try {
      ok = py.globals.get("_run_cell")(m.code, m.name);
    } catch (err) {
      post("error", { text: String(err) });
    }
    post("done", { ok });
    current = null;
  }
};
