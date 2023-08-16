---
layout: page
title: Transfer and Bias
description: Is negative transfer in DRL related to primacy bias?
img: assets/img/projects/primacy_bias.png
importance: 1
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
<h7 style="display: inline;">Deep Reinforcement Learning (DRL), Negative transfer in DRL, primacy bias </h7>

<br>
<div class="row">
    <!-- Text section occupying 2/3 of the width -->
    <div class="col-sm-8 mt-3 mt-md-0" style="text-align: justify;">
        <h2 style="color: #00ab37;">Problem:</h2>
        Deep Reinforcement Learning (DRL) combines deep learning and reinforcement learning to enable AI agents to learn from raw input data and make decisions. DRL uses neural networks to approximate complex policies and value functions. It has achieved breakthroughs in tasks like game playing, robotics, and complex decision-making. 
        <br><br>
        Primacy bias is a tendency that DRL algorithms have to rely on early interactions and ignore useful evidence encountered later. Because of training on progressively growing datasets, deep RL agents incur a risk of overfitting to earlier experiences, negatively affecting the rest of the learning process [1].
        <br><br>
        Transfer Learning (TL) is an efficient machine learning paradigm that allows overcoming some of the hurdles that characterize the successful training of deep neural networks, ranging from long training times to the needs of large datasets. Transferring neural networks in a DRL context can be particularly challenging and is a process which in most cases results in negative transfer [2]. 
        <br><br>
        It may be the case that negative transfer in TL is related to primacy bias.
    </div>

    <!-- Images section occupying 1/3 of the width -->
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/primacy_bias.png" title="example image" class="img-fluid rounded z-depth-1 mb-3" %}
        {% include figure.html path="assets/img/projects/negative_transfer.png" title="example image" class="img-fluid rounded z-depth-1" %}
        <div class="caption mt-2">
            On the left, an undicounted returns on quadruped-run for SAC with and without heavy priming on the first 100 transitions. An agent affected by the primacy bias is unable to learn [1]. On the right, a negative transfer scheme showing that you can have lower accuracy after transferring source information to train with the target. 
        </div>
    </div>
</div>

<!--
Deep Reinforcement Learning (DRL) combines deep learning and reinforcement learning to enable AI agents to learn from raw input data and make decisions. DRL uses neural networks to approximate complex policies and value functions. It has achieved breakthroughs in tasks like game playing, robotics, and complex decision-making.  

Primacy bias is a tendency that DRL algorithms have to rely on early interactions and ignore useful evidence encountered later. Because of training on
progressively growing datasets, deep RL agents incur a risk of overfitting to earlier experiences, negatively affecting the rest of the learning process [1].

Transfer Learning (TL) is an efficient machine learning paradigm that allows overcoming some of the hurdles that characterize the successful training of deep neural networks, ranging from long training times to the needs of large datasets. Transferring neural networks in a DRL context can be particularly challenging and is a process which in most cases results in negative transfer [2]. 

It may be the case that negative transfer in TL is related to primacy bias.

<div class="row justify-content-sm-center">
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/primacy_bias.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/negative_transfer.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    On the left, an undicounted returns on quadruped-run for SAC with and without heavy priming on the first 100 transitions. An agent affected by the primacy bias is unable to learn [1]. On the right, a negative transfer scheme showing that you can have lower accuracy after transfering source information to train with the target. 
</div>
--> 

<br>
<h2 style="color: #00ab37;">Goal:</h2>
Identify if negative transfer is related to primacy bias in finite environments.

<br>
<h2 style="color: #00ab37;">Preliminary work:</h2>
There are works made analysing the problem of negative transfer, and primacy bias, but to our knowledge, there is no investigation if the two phenomenons are related.

<br>
<h2 style="color: #00ab37;">Tasks:</h2>
<li>Understanding the theory surrounding negative transfer in TL, and primacy bias</li>
<li>Make some numerical simulations in python to replicate the phenomena from the papers in the reference.</li>
<li>Make a theoretical analyses considering if negative transfer is connected with the primacy bias problem in finite environments. </li>
<li>Choose some environments and propose a numerical simulation where the supposed connection can been show. </li>
 

<br>
<h3 style="color: #00ab37;">Reference</h3>

<li>[1] Nikishin, Evgenii, et al. <a href="https://proceedings.mlr.press/v162/nikishin22a">The primacy bias in deep reinforcement learning.</a> <i>International conference on machine learning. PMLR</i>, 2022.</li>

<li>[2] Sabatelli, Matthia, and Pierre Geurts. <a href="https://arxiv.org/pdf/2110.02639.pdf">On the transferability of deep-q networks.</a> <i>arXiv preprint arXiv:2110.02639</i>, 2021.</li>

<br>
<h4 style="color: #00ab37;">Supervision</h4>
Contact: <a href="https://www.rug.nl/staff/r.f.cunha/?lang=en">Rafael Fernandes Cunha</a>  
Room: 5161.0438 (Bernoulliborg)  
Email: r.f.cunha@rug.nl

Contact: Matthia Sabatelli  
Email: m.sabatelli@rug.nl


<div class="row">
    <!-- Text section occupying 2/3 of the width -->
    <div class="col-sm-8 mt-3 mt-md-0" style="text-align: justify;">
        <h2 style="color: #00ab37;">Problem:</h2>
        Deep Reinforcement Learning (DRL) combines deep learning and reinforcement learning to enable AI agents to learn from raw input data and make decisions. DRL uses neural networks to approximate complex policies and value functions. It has achieved breakthroughs in tasks like game playing, robotics, and complex decision-making. 
        <br><br>
        Primacy bias is a tendency that DRL algorithms have to rely on early interactions and ignore useful evidence encountered later. Because of training on progressively growing datasets, deep RL agents incur a risk of overfitting to earlier experiences, negatively affecting the rest of the learning process [1].
        <br><br>
        Transfer Learning (TL) is an efficient machine learning paradigm that allows overcoming some of the hurdles that characterize the successful training of deep neural networks, ranging from long training times to the needs of large datasets. Transferring neural networks in a DRL context can be particularly challenging and is a process which in most cases results in negative transfer [2]. 
        <br><br>
        It may be the case that negative transfer in TL is related to primacy bias.
    </div>

    <!-- Images section occupying 1/3 of the width -->
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/primacy_bias.png" title="example image" class="img-fluid rounded z-depth-1 mb-3" %}
        {% include figure.html path="assets/img/projects/negative_transfer.png" title="example image" class="img-fluid rounded z-depth-1" %}
        <div class="caption mt-2">
            On the left, an undicounted returns on quadruped-run for SAC with and without heavy priming on the first 100 transitions. An agent affected by the primacy bias is unable to learn [1]. On the right, a negative transfer scheme showing that you can have lower accuracy after transferring source information to train with the target. 
        </div>
    </div>
</div>




