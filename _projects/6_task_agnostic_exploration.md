---
layout: page
title: Task-agnostic exploration for sparse reward environments
description: Combine task-agnostic exploration techniques with RL algorithms to solve sparse reward environments
img: assets/img/projects/ObstructedMaze_1Dlhb.gif
importance: 6
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
<h7 style="display: inline;">Reinforcement Learning, Transfer Learning, Sparse Rewards, Exploration</h7>

<br>
<h2 style="color: #00ab37;">Problem:</h2>
<div class="row">
    <!-- Text section occupying 2/3 of the width -->
    <div class="col-sm-8 mt-3 mt-md-0" style="text-align: justify;">
        Exploration is a fundamental aspect of reinforcement learning (RL). Its effectiveness plays a crucial role in the performance of RL algorithms, particularly when confronted with sparse extrinsic rewards.

        In reinforcement learning (RL), exploration is generally divided into two settings. The first, task-driven exploration, involves a well-defined reward where the agent aims to explore to maximize long-term rewards. However, in real-life scenarios, external rewards are often sparse or completely unknown [1]. The second, task-agnostic exploration, occurs when an agent must explore a new environment without the guidance of any external reward


        <br><br>
        [1] describes a setup where the agent first learns to explore multiple environments in a task-agnostic manner without any extrinsic goal. Subsequently, the agent efficiently transfers this learned exploration policy to more effectively explore new environments while solving tasks. The researchers introduced the Change-Based Exploration Transfer (C-BET) algorithm, which merges exploration with both extrinsic and intrinsic goals.

        The C-BET algorithm can be integrated into various RL algorithms. In the paper, IMPALA was the chosen method
 

        <br><br>
        This project will focus on analyzing the C-BET algorithm and conducting simulations to understand its performance with both value-based and policy-based RL algorithms. What impacts do changes in hyperparameters have on the agent's performance?


        
    </div>

    <!-- Images section occupying 1/3 of the width -->
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/mini_grid_sparse_reward.png" title="example image" class="img-fluid rounded z-depth-1 mb-3" %}
        <div class="caption mt-2">
            Change-Based Exploration Transfer (C-BET) trains task-agnostic exploration agents that transfer to new environments. Here the agent learns that keys are interesting, as they allow further interaction with the environment (opening doors). Later, when tasked with reaching a box behind a door, the agent starts by picking up the key. (Extracted from [1])
        </div>
    </div>
</div>

<br>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/exploration_transfer.png" title="example image" class="img-fluid rounded z-depth-1" %}
        <div class="caption mt-2">
            On the left, C-BET pre-training scheme. The agent interacts with environments and learns using intrinsic rewards computed from state and change counts. On the right, C-BET transfer, the pre-trained exploration policy is fixed and guides task-specific policy learning in new environments (Extracted from [1]).
        </div>
    </div>
</div>

<h2 style="color: #00ab37;">Goal:</h2>
Integrate the C-BET algorithm with both a value-based and a policy-based RL algorithm within the mini-grid environment [2], and then analyze the outcomes. How do these results compare to the IMPALA algorithm [3] utilized in the paper?

<br>
<h2 style="color: #00ab37;">Preliminary work:</h2>
[1] introduces an algorithm designed to address sparse reward environments by employing task-agnostic exploration techniques. Simulations were conducted in the mini-grid environment, utilizing a blend of the C-BET and IMPALA algorithms. The study also presented a benchmark and metrics for evaluating task-agnostic exploration strategies.

<br>
<h2 style="color: #00ab37;">Tasks:</h2>
This project can include
<li>Review literature addressing solutions for sparse reward environments.</li>
<li>Grasp the intricacies of the C-BET algorithm and its relation to task-agnostic exploration.</li>
<li>Select both a value-based and a policy-based RL algorithm for integration with the C-BET approach.</li>
<li>Execute simulations using the proposed algorithm and evaluate the outcomes.</li>
<br>
The final tasks will be discussed with the supervisor. Please feel free to get in contact.
 

<br>
<h3 style="color: #00ab37;">References</h3>

<li>[1] Parisi, Simone, et al. <a href="https://proceedings.neurips.cc/paper_files/paper/2021/hash/abe8e03e3ac71c2ec3bfb0de042638d8-Abstract.html">Interesting object, curious agent: Learning task-agnostic exploration.</a> <i>Advances in Neural Information Processing Systems 34</i>, (2021): 20516-20530.</li>

<li>[2] Chevalier-Boisvert, Maxime, et al. <a href="https://arxiv.org/abs/2306.13831">Minigrid & Miniworld: Modular & Customizable Reinforcement Learning Environments for Goal-Oriented Tasks</a> <i>arXiv preprint arXiv:2306.13831</i>, 2023. Check also <a href="https://minigrid.farama.org/">this</a> page for the documentation.</li>

<li>[3] Espeholt, Lasse, et al. <a href="http://proceedings.mlr.press/v80/espeholt18a.html">Impala: Scalable distributed deep-rl with importance weighted actor-learner architectures.</a> <i>International conference on machine learning. PMLR</i>, 2018.</li>

<li>[4] Wan, Shanchuan, et al. <a href="https://arxiv.org/abs/2304.10770">DEIR: Efficient and Robust Exploration through Discriminative-Model-Based Episodic Intrinsic Rewards.</a> <i>arXiv preprint arXiv:2304.10770 (IJCAI)</i>, 2023.</li>


<br>
<h4 style="color: #00ab37;">Supervision</h4>
Supervisor: <a href="https://www.rug.nl/staff/r.f.cunha/?lang=en">Rafael Fernandes Cunha</a>  
Room: 5161.0438 (Bernoulliborg)  
Email: r.f.cunha@rug.nl
