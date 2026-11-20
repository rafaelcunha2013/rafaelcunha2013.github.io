---
layout: page
permalink: /teaching/rl-exercises/
title: Reinforcement Learning Exercises
description: Exercises for every lecture, in teaching order, from easy to hard within each concept.
nav: false
parent:
  title: Reinforcement Learning
  url: /teaching/rl-course-map/
---

<style>
  .rle { --rle-accent: var(--global-theme-color); }
  .rle p { color: var(--global-text-color); }
  .rle .lead { font-size: 1.05rem; }
  .rle .ctl { display: flex; flex-wrap: wrap; gap: 0.5rem 1rem; align-items: center; margin: 1rem 0 0.6rem; font-size: 0.9rem; }
  .rle .ctl button { font: inherit; border: 1px solid var(--global-divider-color); border-radius: 8px; padding: 0.25rem 0.8rem;
    background: var(--global-bg-color); color: var(--global-text-color); cursor: pointer; }
  .rle .ctl button[aria-pressed="true"] { border-color: var(--rle-accent); color: var(--rle-accent); }
  .rle .key { display: flex; flex-wrap: wrap; gap: 0.3rem 1rem; font-size: 0.85rem; color: var(--global-text-color-light); }
  .rle details.lec { border-bottom: 1px solid var(--global-divider-color); }
  .rle details.lec > summary { cursor: pointer; padding: 0.8rem 0.2rem; font-size: 1.1rem; font-weight: 700; list-style: none; display: flex; gap: 0.6rem; align-items: baseline; }
  .rle details.lec > summary::-webkit-details-marker, .rle details.con > summary::-webkit-details-marker { display: none; }
  .rle details > summary::before { content: "▸"; display: inline-block; color: var(--global-text-color-light); width: 0.8rem; transition: transform 0.15s; }
  .rle details[open] > summary::before { transform: rotate(90deg); }
  .rle .lec .num { color: var(--rle-accent); }
  .rle .lec .n { margin-left: auto; font-size: 0.85rem; font-weight: 400; color: var(--global-text-color-light); }
  .rle details.con { margin: 0 0 0.4rem 1.2rem; }
  .rle details.con > summary { cursor: pointer; list-style: none; padding: 0.3rem 0; font-weight: 600; display: flex; flex-wrap: wrap; gap: 0.2rem 0.6rem; align-items: baseline; }
  .rle .con .slides { font-size: 0.85rem; font-weight: 400; }
  .rle ul.ex { list-style: none; margin: 0 0 0.6rem 1.4rem; padding: 0; }
  .rle ul.ex li { display: flex; flex-wrap: wrap; gap: 0.2rem 0.6rem; align-items: baseline; padding: 0.25rem 0; border-bottom: 1px dashed var(--global-divider-color); }
  .rle .exnum { font-weight: 600; white-space: nowrap; }
  .rle .tag { font-size: 0.75rem; border: 1px solid var(--global-divider-color); border-radius: 999px; padding: 0 0.55rem; }
  .rle .d-Easy { border-color: #2e8b57; color: #2e8b57; }
  .rle .d-Medium { border-color: #c8902a; color: #c8902a; }
  .rle .d-Hard { border-color: #c4474d; color: #c4474d; }
  .rle .c-coding { background: var(--global-text-color); color: var(--global-bg-color); border-color: var(--global-text-color); }
  .rle .also { margin: 0 0 0.7rem 1.4rem; font-size: 0.88rem; color: var(--global-text-color-light); }
  .rle .also a { white-space: nowrap; }
  .rle [hidden] { display: none !important; }
</style>

<div class="rle">

<p class="lead">
Exercises for the <a href="/teaching/rl-lectures/">lectures</a>, grouped by the concept they practise and in the order the slides teach them. Within a concept they go from easy to hard. An exercise that practises several concepts is filed under the last of them (review exercises stay in the review), and the other concepts list it under "Also practised in". Each exercise has its own page; the <a href="/teaching/rl-course-map/">course map</a> links to them next to the slides and tutorial tasks.
</p>

<div class="key"><span><span class="tag d-Easy">Easy</span> <span class="tag d-Medium">Medium</span> <span class="tag d-Hard">Hard</span></span><span><span class="tag">Multiple choice</span> <span class="tag">Written</span> <span class="tag c-coding">Coding</span></span></div>

<div class="ctl" role="group" aria-label="Show">
  <button type="button" data-f="all" aria-pressed="true">All</button>
  <button type="button" data-f="MCQ" aria-pressed="false">Multiple choice</button>
  <button type="button" data-f="written" aria-pressed="false">Written</button>
  <button type="button" data-f="coding" aria-pressed="false">Coding</button>
  <button type="button" id="rle-toggle">Expand all</button>
</div>

{% for lec in site.data.rl_exercises.lectures %}{% if lec.count > 0 %}
<details class="lec" id="lec-{{ lec.n }}">
  <summary>{% if lec.n > 0 %}<span class="num">{{ lec.n }}</span>{% else %}<span class="num">R</span>{% endif %}<span>{{ lec.title }}</span><span class="n">{{ lec.count }} exercises</span></summary>
  {% for c in lec.concepts %}
  <details class="con" id="c-{{ c.num }}">
    <summary><span>{{ c.num }} {{ c.concept }}</span><a class="slides" href="{{ c.slides_href }}">Slides {{ c.slides }}</a></summary>
    <ul class="ex">
      {% for e in c.exercises %}
      <li data-c="{{ e.components | join: ' ' }}">
        <a class="exnum" href="/teaching/rl-exercises/{{ e.slug }}/">Ex {{ e.num }}</a>
        <span>{{ e.name }}</span>
        {% if e.difficulty %}<span class="tag d-{{ e.difficulty }}">{{ e.difficulty }}</span>{% endif %}
        {% for k in e.components %}<span class="tag{% if k == 'coding' %} c-coding{% endif %}">{% if k == 'MCQ' %}Multiple choice{% elsif k == 'coding' %}Coding{% else %}Written{% endif %}</span>{% endfor %}
      </li>
      {% endfor %}
    </ul>
    {% if c.also.size > 0 %}<p class="also">Also practised in {% for e in c.also %}<a href="/teaching/rl-exercises/{{ e.slug }}/" title="{{ e.name | escape }}">Ex {{ e.num }}</a>{% unless forloop.last %}, {% endunless %}{% endfor %}</p>{% endif %}
  </details>
  {% endfor %}
</details>
{% endif %}{% endfor %}

</div>

<script>
(function () {
  const lecs = [...document.querySelectorAll(".rle details")];
  const toggle = document.getElementById("rle-toggle");
  toggle.addEventListener("click", () => {
    const open = toggle.textContent === "Expand all";
    lecs.forEach((d) => { d.open = open; });
    toggle.textContent = open ? "Collapse all" : "Expand all";
  });
  document.querySelectorAll(".rle [data-f]").forEach((b) => b.addEventListener("click", () => {
    const f = b.dataset.f;
    document.querySelectorAll(".rle [data-f]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    document.querySelectorAll(".rle ul.ex li").forEach((li) => { li.hidden = f !== "all" && !li.dataset.c.split(" ").includes(f); });
    document.querySelectorAll(".rle details.con").forEach((d) => {
      const any = !!d.querySelector("li:not([hidden])"); d.hidden = !any; if (f !== "all") d.open = any;
    });
    document.querySelectorAll(".rle details.lec").forEach((d) => {
      const any = !!d.querySelector("details.con:not([hidden])"); d.hidden = !any; if (f !== "all") d.open = any;
    });
  }));
  // /teaching/rl-exercises/#lec-3 or #c-3.4 opens that section
  const t = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (t) { let d = t; while (d) { if (d.tagName === "DETAILS") d.open = true; d = d.parentElement; } t.scrollIntoView(); }
})();
</script>
