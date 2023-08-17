---
layout: page
title: Transfer learning in multi-agent RL settings
description: Finding and simulating a set of policies to transfer learning in multi-agent reinforcement learning settings
img: assets/img/projects/four_room_ma.gif
importance: 3
category: current
related_publications: 
---


<style>
    h7:after {
        content: "\A";
        white-space: pre;
    }
</style>
<h6 style="color: #00ab37;display: inline">Course of study:</h6>
<h7 style="display: inline;">Artificial Intelligence</h7>

<h6 style="color: #00ab37;display: inline">Kind of thesis:</h6> 
<h7 style="display: inline;">Theoretical analysis and Numerical Simulation</h7>

<h6 style="color: #00ab37; display: inline">Programming languages:</h6>
<h7 style="display: inline;">Python</h7>

<h6 style="color: #00ab37; display: inline">Keywords:</h6>
<h7 style="display: inline;">Multi-agent Reinforcement Learning, Transfer Learning, Successor features, Multi-objective environments </h7>

<br>
<h2 style="color: #00ab37;">Problem:</h2>
<div class="row">
    <!-- Text section occupying 2/3 of the width -->
    <div class="col-sm-8 mt-3 mt-md-0" style="text-align: justify;">
        The VDN algorithm [1] tackles cooperative multi-agent reinforcement learning with a joint reward signal, made complex by vast action and observation spaces. Some problems can be segmented into tasks with distinct reward functions, integrating easily into standard reinforcement learning.

        <br><br>
        Successor features (SF) separate environmental dynamics from rewards, while generalized policy improvement (GPI) considers multiple policies. Together, they facilitate cross-task information exchange in the RL framework [2].

        <br><br>
        The UneVen algorithm integrates SF with VDN to refine the policy exploration process [3]. In certain environments, SFs can combine policies to identify optimal solutions without added environment interactions [4], emphasizing the parallels between transfer learning via SFs and multi-objective optimization in RL.

        <br><br>
        This project aims to transfer knowledge between cooperative multi-agent reinforcement learning tasks, specifically determining the optimal policy set from [4]. An initial approach might tweak the VDN algorithm [1], drawing inpiration from [2], [3], and [4].

        
    </div>

    <!-- Images section occupying 1/3 of the width -->
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/four_room_ma.gif" title="example image" class="img-fluid rounded z-depth-1 mb-3" %}
        {% include figure.html path="assets/img/projects/corner_weights.png" title="example image" class="img-fluid rounded z-depth-1" %}
        <div class="caption mt-2">
            In the top figure, two agents must choose the path that gives more return depending on rewards given for collect triangles of different colors. In the bottom figure, a schematic representation of the algorithm that suggests how to add new policies to the set of optimum policies by solving different tasks.
        </div>
    </div>
</div>

<br>
<h2 style="color: #00ab37;">Goal:</h2>
Suggest and run simulations of a new cooperative multi-agent reinforcement learning algorithm with a joint reward signal that combines the ideas of VDN, successor features, and the strategy to find a set of optimum policies as described in [4].

<br>
<h2 style="color: #00ab37;">Preliminary work:</h2>
[1] proposes an algorithm to solve cooperative multi-agent reinforcement learning problems. [2] investigates how to do transfer learning using SF and GPI, and [4]'s work focuses on the algorithm to find the set of policies to deliver the optimum solution when using SF and GPI. 

<br>
<h2 style="color: #00ab37;">Tasks:</h2>
This project can include
<li>Read the literature on SF, GPI, MARL, and multi-objective environments.</li>
<li>Choose a multi-agent environment and run some simulations using VDN.</li>
<li>Slightly modify a multi-agent environment to treat it as a multi-objective problem.</li>
<li>Propose an algorithm that combines VDN, SF, and the strategy used in [4] to identify the set of optimal policies.</li>
<li>Run simulations with the proposed algorithm and assess the results.</li>
<br>
The final tasks will be discussed with the supervisor. Please feel free to get in contact.
 

<br>
<h3 style="color: #00ab37;">References</h3>

<li>[1] Sunehag, Peter, et al. <a href="https://arxiv.org/abs/1706.05296">Value-decomposition networks for cooperative multi-agent learning. </a> <i>arXiv preprint arXiv:1706.05296</i>, 2017.</li>

<li>[2] Barreto, André, et al. <a href="https://www.davidsilver.uk/wp-content/uploads/2020/09/Fast-reinforcement.pdf">Fast reinforcement learning with generalized policy updates.</a> <i>Proceedings of the National Academy of Sciences 117.48</i>, (2020): 30079-30087. Click <a href="https://www.youtube.com/watch?v=6_7vE08acVM">here</a> for a video presentation, and <a href="https://www.deepmind.com/blog/fast-reinforcement-learning-through-the-composition-of-behaviours">here</a> for the Google DeepMind blog post about the topic.</li>

<li>[3] Gupta, Tarun, et al. <a href="http://proceedings.mlr.press/v139/gupta21a">Uneven: Universal value exploration for multi-agent reinforcement learning. </a> <i>International Conference on Machine Learning. PMLR</i>, 2021.</li>

<li>[4] Alegre, Lucas Nunes, Ana Bazzan, and Bruno C. Da Silva. <a href="https://proceedings.mlr.press/v162/alegre22a.html">Optimistic linear support and successor features as a basis for optimal policy transfer.</a> <i>International Conference on Machine Learning. PMLR</i>, 2022.</li>

<li>[5] Barreto, André, et al. <a href="https://proceedings.neurips.cc/paper/2017/hash/350db081a661525235354dd3e19b8c05-Abstract.html">Successor features for transfer in reinforcement learning.</a> <i>Advances in neural information processing systems 30</i>, 2017.</li>

<li>[6] Alegre, Lucas N., et al. <a href="https://mo-gymnasium.farama.org/">MO-Gymnasium (Software) </a> <i>Multi-Objective Gymnasium type environment</i>, 2022.</li>



<br>
<h4 style="color: #00ab37;">Supervision</h4>
Supervisor: <a href="https://www.rug.nl/staff/r.f.cunha/?lang=en">Rafael Fernandes Cunha</a>  
Room: 5161.0438 (Bernoulliborg)  
Email: r.f.cunha@rug.nl
