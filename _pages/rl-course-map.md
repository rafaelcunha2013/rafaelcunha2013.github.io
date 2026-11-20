---
layout: page
permalink: /teaching/rl-course-map/
title: Reinforcement Learning
description: An introductory course in eight lectures, with video recordings, tutorials and exercises, following Sutton and Barto's textbook.
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
  .rlm .lec .ttl { font-size: 1.15rem; font-weight: 700; color: var(--global-text-color); margin-right: auto; flex: 1 1 10rem; min-width: 0; }
  .rlm .lec .links { display: flex; flex-wrap: wrap; gap: 0.3rem 0.9rem; font-size: 0.88rem; font-weight: 600; align-items: baseline; }
  .rlm .lec .links.cols { display: grid; grid-template-columns: 6.9rem 3.3rem 5.8rem 6.2rem; gap: 0.3rem 0.6rem; }
  .rlm .lec .links .n { font-weight: 400; color: var(--global-text-color-light); }
  .rlm .lec .rows { margin-bottom: 1rem; }
  .rlm .covers { font-size: 0.9rem; color: var(--global-text-color-light); }
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
    display: grid; grid-template-columns: minmax(0, 1fr) 6.5rem minmax(0, 1.1fr) minmax(0, 1fr); gap: 0.3rem 1rem;
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
  .rlm .cnum { color: var(--rlm-accent); font-variant-numeric: tabular-nums; margin-right: 0.4rem; }
  .rlm .exs { display: flex; flex-wrap: wrap; gap: 0.3rem 0.4rem; font-size: 0.82rem; }
  .rlm .exs a { border: 1px solid var(--global-divider-color); border-radius: 999px; padding: 0 0.5rem;
    color: var(--global-text-color); text-decoration: none; white-space: nowrap; font-variant-numeric: tabular-nums; }
  .rlm .exs a:hover { background: var(--global-divider-color); }
  .rlm .exs .d-Easy { border-color: #2e8b57; } .rlm .exs .d-Medium { border-color: #c8902a; } .rlm .exs .d-Hard { border-color: #c4474d; }
  .rlm .exs a.also { border-style: dashed; border-color: var(--global-text-color-light); color: var(--global-text-color-light); }
  /* a coding part: dark fill, as the Coding tag on the exercises page; the border keeps the difficulty colour */
  .rlm .exs a.code { background: var(--global-text-color); color: var(--global-bg-color); border-width: 2px; padding: 0 0.45rem; }
  .rlm .exs a.code:hover { background: var(--global-text-color); opacity: 0.85; }
  /* filed elsewhere AND coding: the dashes go just outside the fill, on the page background, so they
     show in both themes (inside, they had the fill's colour in dark mode) */
  .rlm .exs a.code.also { opacity: 0.75; border-color: transparent; outline: 1.5px dashed var(--global-text-color); outline-offset: 2px; }
  .rlm .key { display: flex; flex-wrap: wrap; gap: 0.3rem 0.8rem; font-size: 0.85rem; color: var(--global-text-color-light); margin: 0.4rem 0 0; }
  .rlm .key { gap: 0.4rem 1.2rem; align-items: baseline; }
  .rlm .key .kitem { display: inline-flex; align-items: baseline; gap: 0.4rem; min-width: 0; }   /* a sample chip stays with its text */
  .rlm .key .exs { display: inline-flex; flex: none; }
  .rlm .head { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--global-text-color-light); }
  .rlm .credit { font-size: 0.9rem; color: var(--global-text-color-light); border-top: 1px solid var(--global-divider-color); padding-top: 1rem; margin-top: 2.5rem; }
  .rlm h2 { font-size: 1.35rem; font-weight: 700; margin: 2.4rem 0 0.6rem; }
  .rlm .tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(10.5rem, 1fr)); gap: 0.8rem; margin: 1.4rem 0 0.4rem; }
  .rlm .tile { display: flex; flex-direction: column; gap: 0.25rem; padding: 0.9rem 1rem; border: 1px solid var(--global-divider-color);
    border-top: 3px solid var(--rlm-accent); border-radius: 8px; text-decoration: none !important; color: var(--global-text-color); }
  .rlm .tile:hover, .rlm .tile:focus-visible { border-color: var(--rlm-accent); }
  .rlm .tile b { font-size: 1.05rem; color: var(--global-text-color); }
  .rlm .tile span { font-size: 0.88rem; color: var(--global-text-color-light); }
  .rlm .tile .go { margin-top: auto; padding-top: 0.3rem; color: var(--rlm-accent); font-weight: 600; font-size: 0.88rem; }
  .rlm [hidden] { display: none !important; }
  @media (max-width: 640px) {
    .rlm .crow { grid-template-columns: minmax(0, 1fr) auto; }
    .rlm .tasks, .rlm .covers, .rlm .exs { grid-column: 1 / -1; }
    .rlm .crow.head-row { display: none; }
    .rlm .lec .links.cols { grid-template-columns: 5.9rem 2.8rem 4.9rem auto; gap: 0.3rem 0.5rem; font-size: 0.8rem; }
  }
</style>

<div class="rlm">

<p class="lead">
The course goes from the exploration–exploitation dilemma in multi-armed bandits, through finite Markov decision processes, dynamic programming, and Monte Carlo and temporal-difference learning, to function approximation, policy gradients and model-based methods. It follows R. S. Sutton and A. G. Barto, <a href="http://incompleteideas.net/book/the-book-2nd.html"><i>Reinforcement Learning: An Introduction</i></a>, 2nd ed., 2018, free online from the authors.
</p>

{% assign n_ex = 0 %}{% for l in site.data.rl_exercises.lectures %}{% assign n_ex = n_ex | plus: l.count %}{% endfor %}
<div class="tiles">
  <a class="tile" href="/teaching/rl-lectures/"><b>Lectures</b><span>{{ site.data.rl_course_map.lectures | size }} lectures as interactive slides, each with its video recording.</span><span class="go">Open the lectures →</span></a>
  <a class="tile" href="/teaching/rl-tutorials/"><b>Tutorials</b><span>7 tutorials in Python. The code runs in your browser.</span><span class="go">Open the tutorials →</span></a>
  <a class="tile" href="/teaching/rl-exercises/"><b>Exercises</b><span>{{ n_ex }} exercises, from easy to hard within each concept.</span><span class="go">Open the exercises →</span></a>
  <a class="tile" href="#review"><b>Background review</b><span>The probability and functional analysis the lectures use.</span><span class="go">Open the review ↓</span></a>
</div>

<h2 id="map">Course map</h2>
<p class="lead">
Each concept of the <a href="/teaching/rl-lectures/">lectures</a>, in the order the slides teach it. The slide link opens the deck at the first slide on the concept; the task links open the <a href="/teaching/rl-tutorials/">tutorial</a> at the task that practises it, and the exercise links open the <a href="/teaching/rl-exercises/">exercises</a> on the concept, numbered lecture.concept.n.
</p>
<p class="key"><span class="kitem exs"><a class="d-Easy" tabindex="-1">Easy</a><a class="d-Medium" tabindex="-1">Medium</a><a class="d-Hard" tabindex="-1">Hard</a></span><span class="kitem"><span class="exs"><a class="code" tabindex="-1">Code</a></span><span>has a coding part</span></span><span class="kitem"><span class="exs"><a class="also" tabindex="-1">Ex 1.9.3</a></span><span>dashed: filed under another concept, also practises this one</span></span></p>

<div class="find">
  <input type="search" id="rlm-filter" placeholder="Find a concept, e.g. TD, Bellman, REINFORCE" aria-label="Find a concept">
  <button type="button" id="rlm-toggle">Expand all</button>
  <span class="count" id="rlm-count" aria-live="polite"></span>
</div>

<details class="lec" id="review">
  <summary>
    <span class="num">R</span>
    <span class="ttl">Background review</span>
    <span class="links"><span class="n">{{ site.data.rl_course_map.review | size }} topics · probability and functional analysis</span></span>
  </summary>
  <ul class="rows">
    <li class="crow head-row"><span class="head">Topic</span><span class="head">Slides</span><span class="head">What it covers</span><span class="head">Exercises</span></li>
    {% for r in site.data.rl_course_map.review %}
    <li class="crow" data-text="{{ r.num | downcase }} {{ r.label | downcase }} {{ r.topics | downcase }}">
      <span class="concept"><span class="cnum">{{ r.num }}</span>{{ r.label }}</span>
      <a class="slides" href="{{ r.href }}">L{{ r.lecture }} · {{ r.slides }}</a>
      <span class="covers">{{ r.topics }}</span>
      <span class="exs">{% for e in r.exercises %}{% include rl-ex-chip.liquid e=e %}{% endfor %}{% for e in r.also %}{% include rl-ex-chip.liquid e=e also=true %}{% endfor %}</span>
    </li>
    {% endfor %}
  </ul>
</details>

{% for lec in site.data.rl_course_map.lectures %}
<details class="lec" id="lec-{{ lec.n }}">
  <summary>
    <span class="num">{{ lec.n }}</span>
    <span class="ttl">{{ lec.title }}</span>
    <span class="links cols">
      <a href="{{ lec.href }}">Slides ({{ lec.slides }})</a>
      <a href="{{ lec.video }}" target="_blank" rel="noopener">Video</a>
      {% if lec.tutorial_href %}<a href="{{ lec.tutorial_href }}">{{ lec.tutorial }}</a>{% else %}<span></span>{% endif %}
      <span class="n">{{ lec.concepts | size }} concepts</span>
    </span>
  </summary>
  <ul class="rows">
    <li class="crow head-row"><span class="head">Concept</span><span class="head">Slides</span><span class="head">Tutorial tasks</span><span class="head">Exercises</span></li>
    {% for c in lec.concepts %}
    <li class="crow" data-text="{{ c.num }} {{ c.concept | downcase }}">
      <span class="concept"><span class="cnum">{{ c.num }}</span>{{ c.concept }}</span>
      <a class="slides" href="{{ c.href }}">Slides {{ c.slides }}</a>
      <span class="tasks">{% for t in c.tasks %}<a href="{{ t.href }}"><b>T{{ t.tutorial }}</b> {{ t.label }}</a>{% endfor %}</span>
      <span class="exs">{% for e in c.exercises %}{% include rl-ex-chip.liquid e=e %}{% endfor %}{% for e in c.also %}{% include rl-ex-chip.liquid e=e also=true %}{% endfor %}</span>
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
