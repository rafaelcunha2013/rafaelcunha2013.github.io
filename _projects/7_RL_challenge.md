---
layout: page
title: CityLearn Chalenge 2023
description: CityLearn Challenge 2023. Using AI for Building's Energy Management
img: assets/img/projects/citylearn_challenge_banner.png
importance: 7
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
<h7 style="display: inline;">Reinforcement Learning, Climate Change, CityLearn, NeurIps RL challenge</h7>

<br>
<h2 style="color: #00ab37;">Problem:</h2>
<div class="row">
    <!-- Text section occupying 2/3 of the width -->
    <div class="col-sm-8 mt-3 mt-md-0" style="text-align: justify;">
        Buildings are responsible for 30% of greenhouse gas emissions. At the same time buildings are taking a more active role in the power system by providing benefits to the electrical grid. As such, buildings are an unexplored opportunity to address climate change.

        Advanced control systems such as model predictive control (MPC) and reinforcement learning control (RLC) are well-suited for automated building energy management in a multi-task environment, while adapting to individual characteristics of occupants and buildings.

        Model-free RLC is a data-driven solution and as more training data become available, it implicitly learns the model of the building or system under control thus, achieves comparable performance as MPC as model-based RLC. One of the strengths of RLC is its ability to adapt to disturbances in the building it controls as the thermal or occupant dynamics change. 

        <br><br>
        The CityLearn Challenge makes use of the CityLearn Gym environment as an opportunity to compete in investigating the potential of artificial intelligence (AI) and distributed control systems to tackle multiple problems within the built-environment domain. It is designed to attract a multidisciplinary participation audience including researchers, industry experts, sustainability enthusiasts and AI hobbyists as a means of crowd-sourcing solutions to these problems.

        <br><br>
        The CityLearn Challenge 2023 addresses this multi-faceted nature of advanced control in buildings by blending the challenges of control algorithm design, forecast quality and grid-resilience. The CityLearn Challenge 2023 presents a control track as done in previous challenges as well as introduces an independent forecast track where, both tracks are run in parallel and utilize the same dataset.

        <br><br>
        In the control track, participants will develop energy management agent(s) and an optional custom reward function (in RLC solutions) to manage electrical and domestic hot water energy storage systems, and heat pump power in a synthetic single-family neighborhood under normal grid-operation and power outages.

        <br><br>
        This project will focus on the control track of the above challenge. 

        
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


https://www.aicrowd.com/challenges/neurips-2023-citylearn-challenge