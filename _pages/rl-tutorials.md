---
layout: page
permalink: /teaching/rl-tutorials/
title: Reinforcement Learning Tutorials
description: Seven hands-on tutorials, from multi-armed bandits to policy gradients. The code runs in your browser.
nav: false
---

<style>
  .rlt { --rlt-accent: var(--global-theme-color); }
  .rlt h2 { font-size: 1.35rem; font-weight: 700; margin: 2.2rem 0 0.8rem; }
  .rlt p, .rlt li { color: var(--global-text-color); }
  .rlt .lead { font-size: 1.05rem; }
  .rlt .facts { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin: 1rem 0 0.5rem; }
  .rlt .fact { border: 1px solid var(--global-divider-color); border-radius: 10px; padding: 1rem 1.1rem; }
  .rlt .fact h3 { font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--global-text-color-light); margin: 0 0 0.4rem; }
  .rlt .fact p, .rlt .fact ul { margin: 0; font-size: 0.95rem; }
  .rlt .fact ul { padding-left: 1.1rem; }
  .rlt .cards { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.9rem; }
  .rlt .card-t {
    display: grid; grid-template-columns: 3rem 1fr auto; gap: 0 1rem; align-items: start;
    padding: 1.1rem 1.2rem; border: 1px solid var(--global-divider-color); border-radius: 12px;
    background: var(--global-bg-color); color: var(--global-text-color); text-decoration: none;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .rlt a.card-t:hover { border-color: var(--rlt-accent); box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06); text-decoration: none; }
  .rlt .card-t.is-soon { opacity: 0.62; }
  .rlt .num { font-size: 1.6rem; font-weight: 700; color: var(--rlt-accent); line-height: 1.2; }
  .rlt .card-t h3 { font-size: 1.1rem; font-weight: 600; margin: 0 0 0.25rem; color: var(--global-text-color); }
  .rlt .card-t p { margin: 0 0 0.5rem; font-size: 0.95rem; color: var(--global-text-color-light); }
  .rlt .meta { display: flex; flex-wrap: wrap; gap: 0.35rem 0.9rem; font-size: 0.82rem; color: var(--global-text-color-light); }
  .rlt .meta b { font-weight: 600; color: var(--global-text-color); }
  .rlt .rlt-badge { font-size: 0.72rem; font-weight: 600; padding: 0.2rem 0.55rem; border-radius: 99px; white-space: nowrap; border: 1px solid currentColor; }
  .rlt .rlt-badge.browser { color: #2e7d32; }
  .rlt .rlt-badge.soon { color: var(--global-text-color-light); }
  html[data-theme="dark"] .rlt .rlt-badge.browser { color: #81c784; }
  .rlt .credit { font-size: 0.9rem; color: var(--global-text-color-light); border-top: 1px solid var(--global-divider-color); padding-top: 1rem; margin-top: 2.5rem; }
  @media (max-width: 600px) {
    .rlt .card-t { grid-template-columns: 2.2rem 1fr; }
    .rlt .card-t .rlt-badge { grid-column: 2; justify-self: start; margin-top: 0.5rem; }
  }
</style>

<div class="rlt">

<p class="lead">
These tutorials accompany an introductory course on reinforcement learning. Each one alternates short explanations, coding tasks with hints, and experiments followed by questions about what the results show. You implement the methods yourself, then test where they work and where they fail.
</p>

<div class="facts">
  <div class="fact">
    <h3>Before you start</h3>
    <ul>
      <li>Python: functions and classes</li>
      <li>NumPy arrays</li>
      <li>Probability: random variables, expected value</li>
    </ul>
  </div>
  <div class="fact">
    <h3>How the pages work</h3>
    <p>Tutorials 1–5 run Python in your browser: no installation and no account. Run the cells in order. Your edits are kept in your browser, and <b>Download .ipynb</b> saves your work as a Jupyter notebook, which you can also <a href="#run-locally">run on your own computer</a>. Tutorials 6–7 use PyTorch, which does not run in the browser: they run on a free <a href="https://mybinder.org">mybinder.org</a> server that the page starts for you.</p>
  </div>
  <div class="fact">
    <h3>Reference text</h3>
    <p>R. S. Sutton and A. G. Barto, <i>Reinforcement Learning: An Introduction</i>, 2nd ed., MIT Press, 2018. Each tutorial lists the chapters it builds on.</p>
  </div>
</div>

<h2>The tutorials</h2>

<ol class="cards">
  <li>
    <a class="card-t" href="tutorial-01.html">
      <div class="num">1</div>
      <div>
        <h3>The Bandit Lab</h3>
        <p>Rewards as random variables; sample-average and constant step-size updates in stationary and non-stationary bandits; greedy and ε-greedy action selection.</p>
        <div class="meta"><span><b>Sutton &amp; Barto</b> Ch. 2</span><span><b>Setting</b> k-armed bandit</span></div>
      </div>
      <span class="rlt-badge browser">Runs in browser</span>
    </a>
  </li>
  <li>
    <a class="card-t" href="tutorial-02.html">
      <div class="num">2</div>
      <div>
        <h3>The RL Detective's Guide</h3>
        <p>Returns of a policy in an MDP: estimating them from simulation, and tracing where their variance comes from.</p>
        <div class="meta"><span><b>Sutton &amp; Barto</b> Ch. 3</span><span><b>Environment</b> FrozenLake</span></div>
      </div>
      <span class="rlt-badge browser">Runs in browser</span>
    </a>
  </li>
  <li>
    <a class="card-t" href="tutorial-03.html">
      <div class="num">3</div>
      <div>
        <h3>The RL Detective's Guide, Part 2</h3>
        <p>Value functions from the Bellman equation, policy improvement, and checking the theory against simulation.</p>
        <div class="meta"><span><b>Sutton &amp; Barto</b> Ch. 3–4</span><span><b>Environment</b> FrozenLake</span></div>
      </div>
      <span class="rlt-badge browser">Runs in browser</span>
    </a>
  </li>
  <li>
    <a class="card-t" href="tutorial-04.html">
      <div class="num">4</div>
      <div>
        <h3>The Detective's Race</h3>
        <p>Monte Carlo and temporal-difference prediction compared on the same task: the bias–variance trade-off.</p>
        <div class="meta"><span><b>Sutton &amp; Barto</b> Ch. 5–6</span><span><b>Environment</b> Random Walk</span></div>
      </div>
      <span class="rlt-badge browser">Runs in browser</span>
    </a>
  </li>
  <li>
    <a class="card-t" href="tutorial-05.html">
      <div class="num">5</div>
      <div>
        <h3>The RL Detective's Field Manual</h3>
        <p>From prediction to control: reading Q-tables, implementing Q-learning, behaviour versus target policy, and how the discount factor shapes what the agent learns.</p>
        <div class="meta"><span><b>Sutton &amp; Barto</b> Ch. 6</span><span><b>Environments</b> CliffWalking, FrozenLake, Taxi</span></div>
      </div>
      <span class="rlt-badge browser">Runs in browser</span>
    </a>
  </li>
  <li>
    <a class="card-t" href="tutorial-06.html">
      <div class="num">6</div>
      <div>
        <h3>The Modern RL Practitioner's Toolkit</h3>
        <p>Deep Q-Networks with Stable-Baselines3, what the hyperparameters do, and automated tuning with Optuna.</p>
        <div class="meta"><span><b>Sutton &amp; Barto</b> Ch. 9–10, §16.5</span><span><b>Environment</b> CartPole</span></div>
      </div>
      <span class="rlt-badge browser">Runs on Binder</span>
    </a>
  </li>
  <li>
    <a class="card-t" href="tutorial-07.html">
      <div class="num">7</div>
      <div>
        <h3>Policy Gradients and PyTorch Foundations</h3>
        <p>Learning a policy directly with a PyTorch policy network and probability distributions, for continuous actions.</p>
        <div class="meta"><span><b>Sutton &amp; Barto</b> Ch. 13</span><span><b>Environment</b> MountainCarContinuous</span></div>
      </div>
      <span class="rlt-badge browser">Runs on Binder</span>
    </a>
  </li>
</ol>

<h2 id="run-locally">Running the notebooks on your own computer</h2>

<p>Every tutorial page has a <b>Download .ipynb</b> button. To run the downloaded notebook in Jupyter on your own computer, install Python 3.11, 3.12 or 3.13, save <a href="requirements.txt">requirements.txt</a> (the packages, at the versions the tutorials were tested with), and run these commands in the folder where you saved it:</p>

<pre><code>python3 -m venv rl-env
source rl-env/bin/activate
pip install -r requirements.txt
jupyter lab</code></pre>

<p>On Windows, the first two lines are <code>py -m venv rl-env</code> and <code>rl-env\Scripts\activate</code>. Then open the notebook from the Jupyter window. The virtual environment <code>rl-env</code> keeps these packages separate from your other Python projects; activate it again (line 2) each time before you start Jupyter. The installation takes about 1 GB, most of it PyTorch for Tutorials 6–7. PyTorch 2.8 has no build for Macs with an Intel processor: on those, run Tutorials 6–7 on their pages.</p>

<p class="credit">
© 2025–2026 Rafael Fernandes Cunha · Text licensed under <a href="https://creativecommons.org/licenses/by/4.0/" rel="license">CC BY 4.0</a> · Code licensed under the <a href="https://opensource.org/license/mit" rel="license">MIT License</a><br>
Originally developed for Reinforcement Learning (WBAI061-05), University of Groningen.
</p>

</div>
