---
layout: page
permalink: /teaching/rl-course-map/
title: Reinforcement Learning Course Map
description: Every concept of the eight lectures, with a link to its slides and to the tutorial tasks that practise it.
nav: false
---

<style>
  .rlm { --rlm-accent: var(--global-theme-color); }
  .rlm .lec { border-bottom: 1px solid var(--global-divider-color); }
  .rlm .lec summary {
    display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.3rem 0.7rem; padding: 0.9rem 0.2rem;
    cursor: pointer; list-style: none;
  }
  .rlm .lec summary::-webkit-details-marker { display: none; }
  .rlm .lec summary::before { content: "▸"; display: inline-block; color: var(--global-text-color-light); width: 0.8rem; transition: transform 0.15s; }
  .rlm .lec[open] summary::before { transform: rotate(90deg); }
  .rlm .lec summary:focus-visible { outline: 2px solid var(--rlm-accent); outline-offset: 2px; }
  .rlm .lec .num { font-size: 1.15rem; font-weight: 700; color: var(--rlm-accent); }
  .rlm .lec .ttl { font-size: 1.15rem; font-weight: 700; color: var(--global-text-color); margin-right: auto; }
  .rlm .lec .links { display: flex; flex-wrap: wrap; gap: 0.3rem 0.9rem; font-size: 0.88rem; font-weight: 600; align-items: baseline; }
  .rlm .lec .links .n { font-weight: 400; color: var(--global-text-color-light); }
  .rlm .lec .rows { margin-bottom: 1rem; }
  .rlm .find button {
    font: inherit; font-size: 0.88rem; border: 1px solid var(--global-divider-color); border-radius: 8px;
    padding: 0.35rem 0.8rem; background: var(--global-bg-color); color: var(--global-text-color); cursor: pointer;
  }
  .rlm .find button:hover { border-color: var(--rlm-accent); }
  .rlm p, .rlm li { color: var(--global-text-color); }
  .rlm .lead { font-size: 1.05rem; }
  .rlm .find { display: flex; flex-wrap: wrap; gap: 0.6rem 1rem; align-items: center; margin: 1.2rem 0 0.4rem; }
  .rlm .find input {
    font: inherit; flex: 1 1 16rem; max-width: 26rem; padding: 0.45rem 0.7rem; border-radius: 8px;
    border: 1px solid var(--global-divider-color); background: var(--global-bg-color); color: var(--global-text-color);
  }
  .rlm .find input:focus { outline: 2px solid var(--rlm-accent); outline-offset: 1px; }
  .rlm .find .count { font-size: 0.88rem; color: var(--global-text-color-light); }
  .rlm .rows { list-style: none; padding: 0; margin: 0; border-top: 1px solid var(--global-divider-color); }
  .rlm .crow {
    display: grid; grid-template-columns: minmax(0, 1fr) 6.5rem minmax(0, 1.3fr); gap: 0.3rem 1rem;
    padding: 0.55rem 0.2rem; border-bottom: 1px solid var(--global-divider-color); align-items: baseline;
  }
  .rlm .concept { font-weight: 600; }
  .rlm .slides { font-size: 0.9rem; font-variant-numeric: tabular-nums; white-space: nowrap; }
  .rlm .tasks { display: flex; flex-wrap: wrap; gap: 0.35rem 0.5rem; font-size: 0.88rem; }
  .rlm .tasks a {
    border: 1px solid var(--global-divider-color); border-radius: 999px; padding: 0.05rem 0.6rem;
    color: var(--global-text-color); text-decoration: none; white-space: nowrap;
  }
  .rlm .tasks a b { color: var(--rlm-accent); font-weight: 600; }
  .rlm .tasks a:hover { border-color: var(--rlm-accent); }
  .rlm .head { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--global-text-color-light); }
  .rlm .credit { font-size: 0.9rem; color: var(--global-text-color-light); border-top: 1px solid var(--global-divider-color); padding-top: 1rem; margin-top: 2.5rem; }
  .rlm [hidden] { display: none !important; }
  @media (max-width: 640px) {
    .rlm .crow { grid-template-columns: minmax(0, 1fr) auto; }
    .rlm .tasks { grid-column: 1 / -1; }
    .rlm .crow.head-row { display: none; }
  }
</style>

<div class="rlm">

<p class="lead">
Each concept of the <a href="/teaching/rl-lectures/">lectures</a>, in the order the slides teach it. The slide link opens the deck at the first slide on the concept; the task links open the <a href="/teaching/rl-tutorials/">tutorial</a> at the exercise that practises it.
</p>

<div class="find">
  <input type="search" id="rlm-filter" placeholder="Find a concept, e.g. TD, Bellman, REINFORCE" aria-label="Find a concept">
  <button type="button" id="rlm-toggle">Expand all</button>
  <span class="count" id="rlm-count" aria-live="polite"></span>
</div>

{% for lec in site.data.rl_course_map.lectures %}
<details class="lec" id="lec-{{ lec.n }}">
  <summary>
    <span class="num">{{ lec.n }}</span>
    <span class="ttl">{{ lec.title }}</span>
    <span class="links">
      <a href="{{ lec.href }}">Slides ({{ lec.slides }})</a>
      <a href="{{ lec.video }}" target="_blank" rel="noopener">Video</a>
      {% if lec.tutorial_href %}<a href="{{ lec.tutorial_href }}">{{ lec.tutorial }}</a>{% endif %}
      <span class="n">{{ lec.concepts | size }} concepts</span>
    </span>
  </summary>
  <ul class="rows">
    <li class="crow head-row"><span class="head">Concept</span><span class="head">Slides</span><span class="head">Tutorial tasks</span></li>
    {% for c in lec.concepts %}
    <li class="crow" data-text="{{ c.concept | downcase }}">
      <span class="concept">{{ c.concept }}</span>
      <a class="slides" href="{{ c.href }}">Slides {{ c.slides }}</a>
      <span class="tasks">{% for t in c.tasks %}<a href="{{ t.href }}"><b>T{{ t.tutorial }}</b> {{ t.label }}</a>{% endfor %}</span>
    </li>
    {% endfor %}
  </ul>
</details>
{% endfor %}

<p class="credit">
© 2025–2026 Rafael Fernandes Cunha · Originally developed for Reinforcement Learning (WBAI061-05), University of Groningen.
</p>

</div>

<script>
(function () {
  const input = document.getElementById("rlm-filter");
  const count = document.getElementById("rlm-count");
  const toggle = document.getElementById("rlm-toggle");
  const rows = [...document.querySelectorAll(".rlm .crow[data-text]")];
  const lecs = [...document.querySelectorAll(".rlm .lec")];
  // Lectures start folded; a search opens the lectures with matches, clearing it folds them again.
  function apply() {
    const q = input.value.trim().toLowerCase();
    let n = 0;
    rows.forEach((r) => { const hit = !q || r.dataset.text.includes(q); r.hidden = !hit; if (hit) n++; });
    lecs.forEach((s) => {
      const any = !!s.querySelector(".crow[data-text]:not([hidden])");
      s.hidden = !any;
      if (q) s.open = any;
    });
    if (!q) lecs.forEach((s) => { s.open = false; });
    count.textContent = q ? n + " of " + rows.length + " concepts" : rows.length + " concepts";
    sync();
  }
  function sync() { toggle.textContent = lecs.every((s) => s.hidden || s.open) ? "Collapse all" : "Expand all"; }
  toggle.addEventListener("click", () => {
    const open = toggle.textContent === "Expand all";
    lecs.forEach((s) => { if (!s.hidden) s.open = open; });
    sync();
  });
  lecs.forEach((s) => s.addEventListener("toggle", sync));
  // A link such as /teaching/rl-course-map/#lec-3 opens that lecture.
  function openFromHash() {
    const target = location.hash && document.getElementById(location.hash.slice(1));
    if (target && target.classList.contains("lec")) { target.open = true; target.scrollIntoView(); sync(); }
  }
  input.addEventListener("input", apply);
  window.addEventListener("hashchange", openFromHash);
  apply();
  openFromHash();
})();
</script>
