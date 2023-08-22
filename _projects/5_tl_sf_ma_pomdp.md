---
layout: page
title: Transfer learning in multi-agent RL settings
description: Finding and simulating a set of policies to transfer learning in multi-agent reinforcement learning settings
img: assets/img/projects/four_room_ma.gif
importance: 4
category: fun
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
<h7 style="display: inline;">Multi-agent Reinforcement Learning, Transfer Learning, Successor features, Descentralized Partially-Observable Markov decision proccess (DEC-POMDP) </h7>

<br>
<h2 style="color: #00ab37;">Problem:</h2>
<div class="row">
    <!-- Text section occupying 2/3 of the width -->
    <div class="col-sm-8 mt-3 mt-md-0" style="text-align: justify;">
        Decentralized partially observable Markov decision processes (Dec-POMDPs) provide a general model for decision-making under uncertainty in decentralized settings, but are difficult to solve optimally. Transforming a Dec-POMDP into a continuous-state deterministic MDP with a piecewise-linear and convex value function, and using the fact that planning can be accomplished in a centralized offline manner, while execution can still be decentralized, we can use the occupancy MDP framework to solve this family of problems.

        <br><br>
        Successor features (SF) separate environmental dynamics from rewards, while generalized policy improvement (GPI) considers multiple policies. Together, they facilitate cross-task information exchange in the RL framework [2].

        <br><br>
        We can consider a environment with different tasks when only the reward function changes. If we try to combine SF with the occupancy MDP framework, we may be able to transfer learning among different tasks in Dec-POMDP problems.  

        <br><br>
        This project will focus on the simulations aspects of this ideas, trying to get insight if this is possible by analysing the results of numerical experiments of algorithms that combine the tools previously described. 

        
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

<li>[1] Barreto, André, et al. <a href="https://www.davidsilver.uk/wp-content/uploads/2020/09/Fast-reinforcement.pdf">Fast reinforcement learning with generalized policy updates.</a> <i>Proceedings of the National Academy of Sciences 117.48</i>, (2020): 30079-30087. Click <a href="https://www.youtube.com/watch?v=6_7vE08acVM">here</a> for a video presentation, and <a href="https://www.deepmind.com/blog/fast-reinforcement-learning-through-the-composition-of-behaviours">here</a> for the Google DeepMind blog post about the topic.</li>

<li>[3] Dibangoye, Jilles Steeve, et al. <a href="http://proceedings.mlr.press/v139/gupta21a">Optimally solving Dec-POMDPs as continuous-state MDPs. </a> <i>Journal of Artificial Intelligence Research 55 (443-497)</i>, 2016.</li>


<li>[5] Barreto, André, et al. <a href="https://proceedings.neurips.cc/paper/2017/hash/350db081a661525235354dd3e19b8c05-Abstract.html">Successor features for transfer in reinforcement learning.</a> <i>Advances in neural information processing systems 30</i>, 2017.</li>

<li>[6] Alegre, Lucas N., et al. <a href="https://mo-gymnasium.farama.org/">MO-Gymnasium (Software) </a> <i>Multi-Objective Gymnasium type environment</i>, 2022.</li>



<br>
<h4 style="color: #00ab37;">Supervision</h4>
Supervisor: <a href="https://www.rug.nl/staff/r.f.cunha/?lang=en">Rafael Fernandes Cunha</a>  
Room: 5161.0438 (Bernoulliborg)  
Email: r.f.cunha@rug.nl


Dibangoye, Jilles Steeve, et al. "Optimally solving Dec-POMDPs as continuous-state MDPs." Journal of Artificial Intelligence Research 55 (2016): 443-497.