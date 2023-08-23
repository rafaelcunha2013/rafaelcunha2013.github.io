---
layout: page
title: CityLearn Chalenge 2023. Control Track.
description: CityLearn Challenge 2023. Using AI for Building's Energy Management.
img: assets/img/projects/citylearn_challenge_banner.png
importance: 7
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
<h7 style="display: inline;">Reinforcement Learning, Climate Change, CityLearn, NeurIps RL challenge</h7>

<br>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/citylearn_challenge_banner.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<h2 style="color: #00ab37;">Problem:</h2>
<div class="row">
    <!-- Text section occupying 2/3 of the width -->
    <div class="col-sm mt-3 mt-md-0" style="text-align: justify;">
        Buildings are responsible for 30% of greenhouse gas emissions. At the same time buildings are taking a more active role in the power system by providing benefits to the electrical grid. As such, buildings are an unexplored opportunity to address climate change.

        Advanced control systems such as model predictive control (MPC) and reinforcement learning control (RLC) are well-suited for automated building energy management in a multi-task environment, while adapting to individual characteristics of occupants and buildings.

        Model-free RLC is a data-driven solution and as more training data become available, it implicitly learns the model of the building or system under control thus, achieves comparable performance as MPC as model-based RLC. One of the strengths of RLC is its ability to adapt to disturbances in the building it controls as the thermal or occupant dynamics change. 

        <br><br>
        The CityLearn Challenge makes use of the CityLearn Gym environment as an opportunity to compete in investigating the potential of artificial intelligence (AI) and distributed control systems to tackle multiple problems within the built-environment domain. It is designed to attract a multidisciplinary participation audience including researchers, industry experts, sustainability enthusiasts and AI hobbyists as a means of crowd-sourcing solutions to these problems.

        <br><br>
        The CityLearn Challenge 2023 addresses this multi-faceted nature of advanced control in buildings by blending the challenges of control algorithm design, forecast quality and grid-resilience. The CityLearn Challenge 2023 presents a control track as done in previous challenges as well as introduces an independent forecast track where, both tracks are run in parallel and utilize the same dataset.

        <br><br>
        The <a href="https://www.aicrowd.com/challenges/neurips-2023-citylearn-challenge">CityLearn Challenge 2023</a> presents a <span style="color: #00ab37;">control track</span> as done in previous challenges as well as introduces an independent <span style="color: #00ab37;">forecast track</span> where, both tracks are run in parallel and utilize the same dataset.

        <br><br>
        In the <span style="color: #00ab37;">control track</span>, participants will develop energy management agent(s) and an optional custom reward function (in RLC solutions) to manage electrical and domestic hot water energy storage systems, and heat pump power in a synthetic single-family neighborhood under normal grid-operation and power outages.

        <br><br>
        This project will focus on the <span style="color: #00ab37;">control track</span> of the above challenge. 

        <br><br>
        In the control track, your objective is to design your own single-agent or multi-agent reinforcement learning control (RLC) policy. You can also opt to develop a custom reward function. This is targeted for electrical (battery) and domestic hot water storage systems, as well as heat pump control within buildings. The overarching goals are to ensure thermal comfort, decrease carbon emissions, enhance energy efficiency, and provide resilience during power outages.       
    </div>
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/citylearn_challenge_buildings.png" title="example image" class="img-fluid rounded z-depth-1" %}
        <div class="caption mt-2">
            Schematic View of a Neighborhood in the CityLearn Gym Environment.
        </div>
    </div>
</div>

<br>
<h2 style="color: #00ab37;">Goal:</h2>
You are expected to grasp the problem, propose an RL agent, and refine the reward function. Your agent should demonstrate evidence of learning a beneficial policy. You are <span style="color: #00ab37;">NOT</span> expected to discover a policy that delivers outstanding performance due to the challenge's difficulty. However, achieving this would be a significant bonus for your project!


<br>
<h2 style="color: #00ab37;">Preliminary work:</h2>
<a href="https://www.aicrowd.com/challenges/neurips-2022-citylearn-challenge">The CityLearn Challenge 2022</a> also offered a control track. You can gain insights into last year's solutions to build your own solution for this year. Additionally, the <a href="https://www.climatechange.ai/papers/iclr2023/2">tutorial in [4]</a> will provide you with a more hands-on understanding of the problem.

<br>
<h2 style="color: #00ab37;">Tasks:</h2>
This project can include
<li>Understand the CityLearn Challenge 2023 control track problem.</li>
<li>Conduct a literature review on this problem. Papers based on the CityLearn Challenge 2022 may be helpful.</li>
<li>Replicate the results of one of the solutions from the CityLearn Challenge 2022.</li>
<li>Propose an RL algorithm to tackle the problem and design the reward function.</li>
<li>Run simulations with the proposed algorithm and assess the results.</li>
<br>
The final tasks will be discussed with the supervisor. Please feel free to get in contact.
 

<br>
<h3 style="color: #00ab37;">References</h3>

<li>[1] <a href="https://www.aicrowd.com/challenges/neurips-2023-citylearn-challenge">CityLearn Challenge 2023.</a> </li>

<li>[2] <a href="https://www.aicrowd.com/challenges/neurips-2022-citylearn-challenge">CityLearn Challenge 2022.</a> </li>

<li>[3] Vázquez-Canteli, José R., et al. <a href="https://www.citylearn.net/index.html">Citylearn v1. 0: An openai gym environment for demand response with deep reinforcement learning. </a> <i>Proceedings of the 6th ACM International Conference on Systems for Energy-Efficient Buildings, Cities, and Transportation.</i>, 2019.</li>

<li>[4] Nweye, Kingsley et al. <a href="https://www.climatechange.ai/papers/iclr2023/2">CityLearn: A Tutorial on Reinforcement Learning Control for Grid-Interactive Efficient Buildings and Communities. </a> <i>ICLR 2023 Workshop on Tackling Climate Change with Machine Learning.</i>, 2023.</li>


<br>
<h4 style="color: #00ab37;">Supervision</h4>
Supervisor: <a href="https://www.rug.nl/staff/r.f.cunha/?lang=en">Rafael Fernandes Cunha</a>  
Room: 5161.0438 (Bernoulliborg)  
Email: r.f.cunha@rug.nl

Co-supervisor: <a href="https://www.rug.nl/staff/j.d.cardenas.cartagena/?lang=en">Juan Diego Cardenal Cartagena</a>  
Email: j.d.cardenas.cartagena@rug.nl