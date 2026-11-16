/* deck.js: plays slides produced by pptx2html.py.
 * Each <section class="slide"> carries data-steps (number of clicks) and
 * data-anim: {elementId: [[step, visible, fx, durMs, delayMs, dir], ...]}.
 * Hash: #<slide> or #<slide>.<step>, both 1-based slide, 0-based step.
 * Optional review slides (<script id="reviews">, from pptx2html): the lecture
 * flow skips them; a question shape opens them and "Back to the lecture"
 * (or stepping past either end) returns to the question at the same click. */
(function () {
  "use strict";
  const stage = document.getElementById("stage");
  const wrap = document.getElementById("wrap");
  const deck = document.querySelector(".deck");
  const slides = Array.from(document.querySelectorAll(".slide"));
  const W = stage.offsetWidth, H = stage.offsetHeight;
  const count = document.getElementById("count");
  let cur = 0, step = 0, showAll = false;

  const data = slides.map(s => ({
    steps: +s.dataset.steps || 0,
    anim: JSON.parse(s.dataset.anim || "{}"),
  }));

  /* ---- review detours ---- */
  const rvEl = document.getElementById("reviews");
  const reviews = rvEl ? JSON.parse(rvEl.textContent) : [];
  const groupOf = {};                       // page index -> detour of a review slide
  reviews.forEach((g, gi) => g.slides.forEach(n => { groupOf[n - 1] = gi; }));
  const main = slides.map((_, i) => i).filter(i => groupOf[i] === undefined);
  let ret = null;                           // where "Back to the lecture" goes: {i, k}
  const inReview = i => groupOf[i] !== undefined;

  /* ---- maths ---- */
  if (window.katex) {
    document.querySelectorAll(".m[data-tex]").forEach(el => {
      const tex = el.dataset.tex;
      if (!tex) { el.textContent = "?"; return; }
      // class "i": maths beside text, set inline as PowerPoint does
      const style = el.classList.contains("i") ? "\\textstyle " : "\\displaystyle ";
      try {
        // data-tex keeps PowerPoint's per-symbol colours; data-tex0 is the
        // same equation without them, used if the coloured one does not parse
        katex.render(style + tex, el, { throwOnError: !!el.dataset.tex0, displayMode: false });
      } catch (e) {
        try { katex.render(style + el.dataset.tex0, el, { throwOnError: false, displayMode: false }); }
        catch (e2) { el.textContent = tex; }
      }
    });
  }

  /* ---- IguanaTex equations: KaTeX, scaled into the original picture's box ---- */
  document.querySelectorAll(".itex[data-tex]").forEach(el => {
    try {
      if (!window.katex) throw new Error("no KaTeX");
      katex.render(el.dataset.tex, el, { displayMode: true, throwOnError: true, strict: false });
    } catch (e) {               // keep the original picture instead
      el.closest(".sh").classList.remove("has-itex");
      el.remove();
    }
  });
  // The ink box of the rendered equation (glyphs, fraction bars, radicals),
  // in client px. KaTeX's own box is padded (struts, align*) and glyph
  // advances are not ink (a calligraphic A overhangs its advance), while the
  // IguanaTex picture is cropped tight to the ink: so fit ink to picture.
  const meter = document.createElement("canvas").getContext("2d");
  function glyphRect(el, k) {
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    const add = r => {
      if (!r.width && !r.height) return;
      x0 = Math.min(x0, r.left); y0 = Math.min(y0, r.top);
      x1 = Math.max(x1, r.right); y1 = Math.max(y1, r.bottom);
    };
    const root = el.querySelector(".katex-html") || el;
    const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const range = document.createRange();
    for (let n = walk.nextNode(); n; n = walk.nextNode()) {
      if (!n.textContent.trim()) continue;
      range.selectNodeContents(n);
      const r = range.getBoundingClientRect();
      const cs = getComputedStyle(n.parentElement);
      meter.font = cs.fontStyle + " " + cs.fontWeight + " " + cs.fontSize + " " + cs.fontFamily;
      const m = meter.measureText(n.textContent);
      if (m.actualBoundingBoxRight === undefined) { add(r); continue; }
      // the range box spans the font's ascent + descent, baseline at ascent
      const base = r.top + m.fontBoundingBoxAscent * k;
      add({ left: r.left - m.actualBoundingBoxLeft * k, right: r.left + m.actualBoundingBoxRight * k,
            top: base - m.actualBoundingBoxAscent * k, bottom: base + m.actualBoundingBoxDescent * k,
            width: 1, height: 1 });
    }
    root.querySelectorAll(".frac-line, svg, .rule, .overline-line, .underline-line").forEach(e => add(e.getBoundingClientRect()));
    return x1 > x0 ? { left: x0, top: y0, width: x1 - x0, height: y1 - y0 } : null;
  }
  function fitItex(slide) {
    // sizes can only be measured on the visible slide, after the maths fonts load
    const ready = document.fonts.status === "loaded";
    slide.querySelectorAll(".itex:not([data-fit])").forEach(el => {
      const box = el.closest(".sh");
      el.style.transform = "none";
      // the target is the picture's full image box (data-w/h, positioned by
      // left/top when the picture is cropped), else the shape's box
      const bw = +el.dataset.w || box.offsetWidth, bh = +el.dataset.h || box.offsetHeight;
      // the ink is fitted edge to edge, so a clip at the box would cut glyph
      // overhangs a browser measures a little differently (Lecture 2 slide 4's
      // calligraphic A); only a picture PowerPoint itself crops keeps its clip
      if (Math.abs(bw - box.offsetWidth) < 0.5 && Math.abs(bh - box.offsetHeight) < 0.5 &&
          !parseFloat(el.style.left) && !parseFloat(el.style.top)) el.parentElement.style.overflow = "visible";
      const br = box.getBoundingClientRect();
      if (!bw || !br.width) return;
      const k = br.width / box.offsetWidth;          // client px per slide px (stage zoom)
      const g = glyphRect(el, k);
      if (!g) return;
      const er = el.getBoundingClientRect();         // the equation's own origin
      const gw = g.width / k, gh = g.height / k;     // ink in slide px
      const gx = (g.left - er.left) / k, gy = (g.top - er.top) / k;
      // data-ink "l t r b": the picture is not cropped to its ink (equations
      // transcribed from older images), so fit to the ink region, anchored
      // left so stacked derivation lines keep their "=" aligned
      const ink = (el.dataset.ink || "").split(" ").map(Number);
      const [ox, oy, tw, th] = ink.length === 4 ?
        [bw * ink[0], bh * ink[1], bw * (1 - ink[0] - ink[2]), bh * (1 - ink[1] - ink[3])] : [0, 0, bw, bh];
      const s = Math.min(tw / gw, th / gh);
      const tx = ox + (ink.length === 4 ? 0 : (tw - gw * s) / 2) - gx * s, ty = oy + (th - gh * s) / 2 - gy * s;
      el.style.transform = "translate(" + tx + "px," + ty + "px) scale(" + s + ")";
      if (ready) el.dataset.fit = "1";
    });
  }
  /* ---- table rows: PowerPoint's rule ----
   * A row is its stored height, or taller when a cell's text needs more:
   * margins + lines x line height (+ paragraph spacing). Counting lines
   * rather than taking the browser's box height keeps inline maths from
   * inflating rows that PowerPoint leaves alone. */
  function fitTables(slide) {
    slide.querySelectorAll(".tbl tr").forEach(tr => {
      if (!tr.dataset.h) tr.dataset.h = parseFloat(tr.style.height);
      let need = +tr.dataset.h;
      tr.querySelectorAll(":scope > td:not([rowspan])").forEach(td => {
        const tx = td.querySelector(".tx");
        if (!tx) return;
        const cs = getComputedStyle(tx);
        let h = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
        tx.querySelectorAll(":scope > p").forEach(p => {
          const ps = getComputedStyle(p);
          const lh = parseFloat(ps.lineHeight) || 1.2 * parseFloat(ps.fontSize);
          h += Math.max(1, Math.round(p.offsetHeight / lh)) * lh +
               parseFloat(ps.marginTop) + parseFloat(ps.marginBottom);
        });
        need = Math.max(need, h);
      });
      tr.style.height = need + "px";
    });
  }

  /* ---- tabs: PowerPoint's stops ----
   * A tab runs to the paragraph's next custom stop (data-tabs), else to the
   * next multiple of the default size (data-tab), measured from the text
   * box's inner left edge. */
  function fitTabs(slide) {
    slide.querySelectorAll("p[data-tab]").forEach(p => {
      const tabs = p.querySelectorAll(".tab");
      const tx = p.closest(".tx"), sh = p.closest(".sh");
      if (!tabs.length || !tx || !sh.offsetWidth) return;
      const k = sh.getBoundingClientRect().width / sh.offsetWidth;
      const origin = tx.getBoundingClientRect().left + parseFloat(getComputedStyle(tx).paddingLeft) * k;
      const def = +p.dataset.tab || 96;
      const stops = (p.dataset.tabs || "").split(",").filter(Boolean).map(Number);
      tabs.forEach(t => { t.style.width = "0px"; });
      tabs.forEach(t => {
        // sub-pixel noise at a line start must not count as "already past 0"
        const x = Math.max(0, (t.getBoundingClientRect().left - origin) / k);
        let stop = stops.find(s => s > x + 0.5);
        if (stop === undefined) stop = (Math.floor((x + 0.5) / def) + 1) * def;
        t.style.width = (stop - x) + "px";
      });
    });
  }

  const refit = () => {
    document.querySelectorAll(".itex[data-fit]").forEach(el => delete el.dataset.fit);
    if (slides[cur]) { fitTables(slides[cur]); fitTabs(slides[cur]); fitItex(slides[cur]); }
  };
  document.fonts.ready.then(refit);
  // a maths font is only fetched once an equation using it is visible, so an
  // equation that a click reveals was fitted with a fallback font while
  // fonts.status still said "loaded" (Lecture 1, R_t ~ R_1 shifting between
  // two copies of a slide): fit again whenever another font arrives
  document.fonts.addEventListener("loadingdone", refit);
  // lay out one slide as show() does (used by textfit.py to measure words)
  window.deckFit = s => { fitTables(s); fitTabs(s); fitItex(s); };
  window.deckGlyphRect = glyphRect;   // for QA scripts: an equation's ink, as fitItex measures it

  /* ---- bullet widths (hanging indent) ---- */
  document.querySelectorAll(".bu[data-w]").forEach(b => {
    const w = +b.dataset.w;
    if (w > 0) b.style.width = w + "px";
    else b.style.marginRight = "0.4em";
  });

  /* ---- scale the 1280x720 stage into the window ---- */
  function fit() {
    const full = document.fullscreenElement === deck;
    const availW = full ? window.innerWidth : Math.min(window.innerWidth, deck.clientWidth || window.innerWidth);
    const availH = full ? window.innerHeight : window.innerHeight - 60;
    const s = Math.min(availW / W, availH / H);
    stage.style.transform = "scale(" + s + ")";
    wrap.style.height = H * s + "px";
    wrap.style.width = W * s + "px";
  }
  window.addEventListener("resize", fit);
  document.addEventListener("fullscreenchange", fit);

  /* ---- visibility at a given step ---- */
  function visibleAt(events, k) {
    let vis = events.length ? 1 - events[0][1] : 1;   // state before the first event
    for (const e of events) if (e[0] <= k) vis = e[1];
    return vis;
  }

  const FX = {
    fade: () => [{ opacity: 0 }, { opacity: 1 }],
    wipe: dir => {
      const from = { left: "inset(0 100% 0 0)", right: "inset(0 0 0 100%)", top: "inset(0 0 100% 0)", bottom: "inset(100% 0 0 0)" }[dir];
      return [{ clipPath: from }, { clipPath: "inset(0 0 0 0)" }];
    },
    fly: dir => {
      const t = { left: "translateX(-60%)", right: "translateX(60%)", top: "translateY(-60%)", bottom: "translateY(60%)" }[dir];
      return [{ transform: t, opacity: 0 }, { transform: "none", opacity: 1 }];
    },
    zoom: () => [{ transform: "scale(.3)", opacity: 0 }, { transform: "none", opacity: 1 }],
    rise: () => [{ transform: "translateY(30px)", opacity: 0 }, { transform: "none", opacity: 1 }],
    wheel: () => [{ opacity: 0 }, { opacity: 1 }],
    split: () => [{ clipPath: "inset(0 50% 0 50%)" }, { clipPath: "inset(0 0 0 0)" }],
  };

  function apply(i, k, animate) {
    const { anim } = data[i];
    for (const id in anim) {
      const el = document.getElementById(id);
      if (!el) continue;
      const evs = anim[id];
      const vis = showAll ? 1 : visibleAt(evs, k);
      el.getAnimations().forEach(a => a.cancel());
      if (animate && !showAll) {
        const here = evs.filter(e => e[0] === k);
        const last = here[here.length - 1];
        if (last && last[2] !== "appear" && FX[last[2]]) {
          const frames = FX[last[2]](last[5]);
          if (!last[1]) frames.reverse();
          el.classList.remove("hid");
          const a = el.animate(frames, { duration: last[3] || 500, delay: last[4] || 0, easing: "ease-out", fill: "backwards" });
          if (!last[1]) a.onfinish = () => el.classList.add("hid");
          continue;
        }
        if (last && last[4]) {   // delayed "appear"
          el.classList.toggle("hid", !!last[1]);
          setTimeout(() => el.classList.toggle("hid", !vis), last[4]);
          continue;
        }
      }
      el.classList.toggle("hid", !vis);
    }
  }

  function pauseMedia(i) {
    slides[i].querySelectorAll("video, audio").forEach(v => v.pause());
  }

  function show(i, k, animate) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    k = Math.max(0, Math.min(data[i].steps, k));
    if (i !== cur) { pauseMedia(cur); slides[cur].classList.remove("on"); }
    slides[i].classList.add("on");
    cur = i; step = k;
    fitTables(slides[i]);
    fitTabs(slides[i]);
    fitItex(slides[i]);
    apply(i, k, animate);
    const st = data[i].steps;
    const builds = st && !showAll ? "  ·  " + k + "/" + st : "";
    if (inReview(i)) {
      const g = reviews[groupOf[i]];
      count.textContent = "Review  ·  " + (g.slides.indexOf(i + 1) + 1) + " / " + g.slides.length + builds;
      count.title = "Review: " + g.label;
    } else {
      count.textContent = (main.indexOf(i) + 1) + " / " + main.length + builds;
      count.title = "";
    }
    deck.classList.toggle("in-review", inReview(i));
    const h = "#" + (i + 1) + (k ? "." + k : "");
    if (location.hash !== h) history.replaceState(null, "", h);
  }

  function next() {
    if (!showAll && step < data[cur].steps) return show(cur, step + 1, true);
    if (inReview(cur)) {
      const g = reviews[groupOf[cur]], j = g.slides.indexOf(cur + 1);
      return j < g.slides.length - 1 ? show(g.slides[j + 1] - 1, 0, true) : back();
    }
    const n = main.find(i => i > cur);
    if (n !== undefined) show(n, 0, true);
  }
  function prev() {
    if (!showAll && step > 0) return show(cur, step - 1, false);
    if (inReview(cur)) {
      const g = reviews[groupOf[cur]], j = g.slides.indexOf(cur + 1);
      return j > 0 ? show(g.slides[j - 1] - 1, data[g.slides[j - 1] - 1].steps, false) : back();
    }
    const p = main.filter(i => i < cur).pop();
    if (p !== undefined) show(p, data[p].steps, false);
  }
  function enter(gi) {
    ret = { i: cur, k: step };
    show(reviews[gi].slides[0] - 1, 0, true);
  }
  function back() {
    if (!inReview(cur)) return;
    const q = reviews[groupOf[cur]].question - 1;
    const r = ret && ret.i === q ? ret : { i: q, k: data[q].steps };
    ret = null;
    show(r.i, r.k, false);
  }

  function fromHash() {
    const m = location.hash.match(/^#(\d+)(?:\.(\d+))?$/);
    if (m) show(+m[1] - 1, +(m[2] || 0), false); else show(main[0] || 0, 0, false);
  }

  // question shapes become buttons; the bar gets "Back to the lecture"
  reviews.forEach((g, gi) => {
    const b = document.getElementById(g.button);
    if (!b) return;
    b.classList.add("rv-btn");
    b.setAttribute("role", "button");
    b.tabIndex = 0;
    b.title = "Open the review: " + g.label;
    b.addEventListener("click", e => { e.stopPropagation(); enter(gi); });
    b.addEventListener("keydown", e => { if (e.key === "Enter") { e.stopPropagation(); e.preventDefault(); enter(gi); } });
  });
  if (reviews.length) {
    const rb = document.createElement("button");
    rb.id = "rvback"; rb.className = "rvback"; rb.textContent = "\u21A9 Back to the lecture";
    rb.title = "Back to the lecture (Esc)";
    rb.onclick = back;
    count.parentNode.insertBefore(rb, count);
  }

  document.addEventListener("keydown", e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key;
    if (["ArrowRight", "ArrowDown", "PageDown", " ", "Enter", "n"].includes(k)) { next(); e.preventDefault(); }
    else if (["ArrowLeft", "ArrowUp", "PageUp", "Backspace", "p"].includes(k)) { prev(); e.preventDefault(); }
    else if (k === "Home") show(main[0], 0, false);
    else if (k === "End") show(main[main.length - 1], data[main[main.length - 1]].steps, false);
    else if (k === "Escape" && inReview(cur)) back();
    else if (k === "f" || k === "F") toggleFull();
    else if (k === "b" || k === "B") toggleAll();
  });
  stage.addEventListener("click", e => {
    if (e.target.closest("a, video, button, .rv-btn")) return;
    next();
  });
  document.getElementById("next").onclick = next;
  document.getElementById("prev").onclick = prev;

  function toggleFull() {
    if (document.fullscreenElement) document.exitFullscreen();
    else deck.requestFullscreen && deck.requestFullscreen();
  }
  function toggleAll() {
    showAll = !showAll;
    document.getElementById("all").classList.toggle("on", showAll);
    show(cur, showAll ? data[cur].steps : step, false);
  }
  document.getElementById("full").onclick = toggleFull;
  document.getElementById("all").onclick = toggleAll;
  window.addEventListener("hashchange", fromHash);

  fit();
  fromHash();
})();
