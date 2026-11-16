---
layout: page
permalink: /teaching/rl-lectures/
title: Reinforcement Learning Lectures
description: Eight lectures, from multi-armed bandits to model-based reinforcement learning, as interactive slides.
nav: false
---

<style>
  .rll { --rll-accent: var(--global-theme-color); }
  .rll h2 { font-size: 1.35rem; font-weight: 700; margin: 2.2rem 0 0.8rem; }
  .rll p, .rll li { color: var(--global-text-color); }
  .rll .lead { font-size: 1.05rem; }
  .rll .facts { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin: 1rem 0 0.5rem; }
  .rll .fact { border: 1px solid var(--global-divider-color); border-radius: 10px; padding: 1rem 1.1rem; }
  .rll .fact h3 { font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--global-text-color-light); margin: 0 0 0.4rem; }
  .rll .fact p, .rll .fact ul { margin: 0; font-size: 0.95rem; }
  .rll .fact ul { padding-left: 1.1rem; }
  .rll .cards { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.9rem; }
  .rll .card-l {
    display: grid; grid-template-columns: 3rem 1fr; gap: 0 1rem; align-items: start;
    padding: 1.1rem 1.2rem; border: 1px solid var(--global-divider-color); border-radius: 12px;
    background: var(--global-bg-color); color: var(--global-text-color); text-decoration: none;
    transition: border-color 0.15s, box-shadow 0.15s; position: relative;
  }
  .rll .card-l:hover { border-color: var(--rll-accent); box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06); }
  /* The title link covers the whole card (stretched link); the tutorial link sits above it. */
  .rll .card-link { color: inherit; text-decoration: none; }
  .rll .card-link::after { content: ""; position: absolute; inset: 0; border-radius: 12px; }
  .rll .card-link:hover { text-decoration: none; }
  .rll .card-l:focus-within { outline: 2px solid var(--rll-accent); outline-offset: 2px; }
  .rll .card-link:focus-visible { outline: none; }
  .rll .card-tut { position: relative; z-index: 1; font-weight: 600; color: var(--rll-accent); }
  .rll .card-tut:hover { text-decoration: underline; }
  .rll .num { font-size: 1.6rem; font-weight: 700; color: var(--rll-accent); line-height: 1.2; }
  .rll .card-l h3 { font-size: 1.1rem; font-weight: 600; margin: 0 0 0.25rem; color: var(--global-text-color); }
  .rll .card-l p { margin: 0 0 0.5rem; font-size: 0.95rem; color: var(--global-text-color-light); }
  .rll .meta { display: flex; flex-wrap: wrap; gap: 0.35rem 0.9rem; font-size: 0.82rem; color: var(--global-text-color-light); }
  .rll .meta b { font-weight: 600; color: var(--global-text-color); }
  .rll .credit { font-size: 0.9rem; color: var(--global-text-color-light); border-top: 1px solid var(--global-divider-color); padding-top: 1rem; margin-top: 2.5rem; }
  @media (max-width: 600px) {
    .rll .card-l { grid-template-columns: 2.2rem 1fr; }
  }
</style>

<div class="rll">

<p class="lead">
These are the lecture slides of an introductory course on reinforcement learning. They follow Sutton and Barto's textbook, from the exploration–exploitation dilemma in bandits to policy gradients and model-based methods. The <a href="/teaching/rl-tutorials/">tutorials</a> put each lecture's methods into code.
</p>

<div class="facts">
  <div class="fact">
    <h3>Video recordings</h3>
    <p>Each lecture as taught in Reinforcement Learning (WBAI061-05) at the University of Groningen, 2025–2026, on the university's video portal. The slides here were lightly edited for the web, so the recordings differ in places.</p>
  </div>
  <div class="fact">
    <h3>Reference text</h3>
    <p>R. S. Sutton and A. G. Barto, <a href="http://incompleteideas.net/book/the-book-2nd.html"><i>Reinforcement Learning: An Introduction</i></a>, 2nd ed., MIT Press, 2018, free online from the authors. Each lecture lists the chapters it covers.</p>
  </div>
</div>

<h2>The lectures</h2>

<ol class="cards">
  <li>
    <div class="card-l">
      <div class="num">1</div>
      <div>
        <h3><a class="card-link" href="lecture-01/">Exploration Methods</a></h3>
        <p>The multi-armed bandit problem: action-value estimates, sample-average and constant step-size updates, greedy and ε-greedy action selection, optimistic initial values, upper confidence bounds and softmax action selection, and the gradient bandit algorithm with action preferences.</p>
        <div class="meta"><span><b>Sutton &amp; Barto</b> Ch. 2</span><span><b>Slides</b> 92 + 10 optional review</span><a class="card-tut" href="https://video.rug.nl/media/0_o36bezqj">Video</a><a class="card-tut" href="/teaching/rl-tutorials/tutorial-01.html">Tutorial 1</a></div>
      </div>
    </div>
  </li>
  <li>
    <div class="card-l">
      <div class="num">2</div>
      <div>
        <h3><a class="card-link" href="lecture-02/">The RL Problem and Finite MDPs</a></h3>
        <p>Agent and environment, Markov decision processes, returns and discounting, value functions, and the Bellman expectation and optimality equations.</p>
        <div class="meta"><span><b>Sutton &amp; Barto</b> Ch. 3</span><span><b>Slides</b> 77</span><a class="card-tut" href="https://video.rug.nl/media/0_27h7azg4">Video</a><a class="card-tut" href="/teaching/rl-tutorials/tutorial-02.html">Tutorial 2</a></div>
      </div>
    </div>
  </li>
  <li>
    <div class="card-l">
      <div class="num">3</div>
      <div>
        <h3><a class="card-link" href="lecture-03/">Dynamic Programming</a></h3>
        <p>Policy evaluation, policy improvement, policy iteration and value iteration; why value iteration converges (Bellman operators and the Banach fixed-point theorem); asynchronous dynamic programming.</p>
        <div class="meta"><span><b>Sutton &amp; Barto</b> Ch. 4</span><span><b>Slides</b> 78</span><a class="card-tut" href="https://video.rug.nl/media/0_3bqlzpfw">Video</a><a class="card-tut" href="/teaching/rl-tutorials/tutorial-03.html">Tutorial 3</a></div>
      </div>
    </div>
  </li>
  <li>
    <div class="card-l">
      <div class="num">4</div>
      <div>
        <h3><a class="card-link" href="lecture-04/">Monte Carlo Methods and Temporal-Difference Learning</a></h3>
        <p>Model-free prediction from sampled experience: Monte Carlo and TD(0), bootstrapping, the bias–variance trade-off, multi-step returns and eligibility traces.</p>
        <div class="meta"><span><b>Sutton &amp; Barto</b> Ch. 5–7, 12</span><span><b>Slides</b> 68</span><a class="card-tut" href="https://video.rug.nl/media/0_9crllstx">Video</a><a class="card-tut" href="/teaching/rl-tutorials/tutorial-04.html">Tutorial 4</a></div>
      </div>
    </div>
  </li>
  <li>
    <div class="card-l">
      <div class="num">5</div>
      <div>
        <h3><a class="card-link" href="lecture-05/">Model-Free Control</a></h3>
        <p>From prediction to control: GLIE Monte Carlo control, SARSA, Q-learning and Expected SARSA, maximisation bias and double Q-learning, the ideas behind DQN, and importance sampling for off-policy learning.</p>
        <div class="meta"><span><b>Sutton &amp; Barto</b> Ch. 5–6, §16.5</span><span><b>Slides</b> 62</span><a class="card-tut" href="https://video.rug.nl/media/0_w2y3zc1y">Video</a><a class="card-tut" href="/teaching/rl-tutorials/tutorial-05.html">Tutorial 5</a></div>
      </div>
    </div>
  </li>
  <li>
    <div class="card-l">
      <div class="num">6</div>
      <div>
        <h3><a class="card-link" href="lecture-06/">Function Approximation</a></h3>
        <p>Value-function approximation by stochastic gradient descent, linear approximation for prediction and control, and when learning converges or diverges.</p>
        <div class="meta"><span><b>Sutton &amp; Barto</b> Ch. 9–11</span><span><b>Slides</b> 65</span><a class="card-tut" href="https://video.rug.nl/media/0_60ysjiwl">Video</a><a class="card-tut" href="/teaching/rl-tutorials/tutorial-06.html">Tutorial 6</a></div>
      </div>
    </div>
  </li>
  <li>
    <div class="card-l">
      <div class="num">7</div>
      <div>
        <h3><a class="card-link" href="lecture-07/">Policy Gradients and Actor-Critic</a></h3>
        <p>Parameterised policies, the policy-gradient theorem, REINFORCE with causality and baselines, actor-critic methods and A2C.</p>
        <div class="meta"><span><b>Sutton &amp; Barto</b> Ch. 13</span><span><b>Slides</b> 58</span><a class="card-tut" href="https://video.rug.nl/media/0_bntj4war">Video</a><a class="card-tut" href="/teaching/rl-tutorials/tutorial-07.html">Tutorial 7</a></div>
      </div>
    </div>
  </li>
  <li>
    <div class="card-l">
      <div class="num">8</div>
      <div>
        <h3><a class="card-link" href="lecture-08/">Model-Based Reinforcement Learning</a></h3>
        <p>Learning a model from experience, Dyna-Q, planning with an inaccurate model, and Monte Carlo tree search.</p>
        <div class="meta"><span><b>Sutton &amp; Barto</b> Ch. 8</span><span><b>Slides</b> 45</span><a class="card-tut" href="https://video.rug.nl/media/0_tysl5v21">Video</a></div>
      </div>
    </div>
  </li>
</ol>

<p class="credit">
© 2025–2026 Rafael Fernandes Cunha · Slides licensed under <a href="https://creativecommons.org/licenses/by/4.0/" rel="license">CC BY 4.0</a>, except figures credited to other sources, which remain their authors'. The video recordings are not covered by this licence.<br>
Originally developed for Reinforcement Learning (WBAI061-05), University of Groningen.
</p>

</div>
