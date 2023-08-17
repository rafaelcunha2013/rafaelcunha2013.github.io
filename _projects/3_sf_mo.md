---
layout: page
title: Transfer in multiobjective scenarios
description: Transfer learning using successor features interpreted as a multiobjectve problem
img: assets/img/projects/illustrative_work_commute.png
importance: 2
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
<h7 style="display: inline;">Deep Reinforcement Learning, Transfer Learning, Successor features, Multi-objective environments </h7>

<br>
<div class="row">
    <!-- Text section occupying 2/3 of the width -->
    <div class="col-sm-8 mt-3 mt-md-0" style="text-align: justify;">
        <h2 style="color: #00ab37;">Problem:</h2>
        The combination of reinforcement learning (RL) with deep learning is a promising approach to tackle important sequential decisionmaking problems that are currently intractable. One obstacle to overcome is the amount of data needed by learning systems of this type.  

        Complex decision problems can be naturally decomposed into multiple tasks that unfold in sequence or in parallel. By associating each task with a reward function, this problem decomposition can be seamlessly accommodated within the standard reinforcement-learning formalism.

        If the reward function of a task can be well approximated as a linear combination of the reward functions of tasks previously solved, we can reduce a reinforcement-learning problem to a simpler linear regression [1].
        <br><br>
        Successor features (SF) is a value function representation that decouples the dynamics of the environment from the rewards, and generalized policy improvement (GPI) is a generalization of dynamic programming’s policy improvement operation that considers a set of policies rather than a single one. Put together, the two ideas lead to an approach that integrates seamlessly within the RL framework and allows the free exchange of information across tasks [3].
        <br><br>
        If reward functions are expressed linearly, and the agent has previously learned a set of policies for different tasks, successor features (SFs) can be exploited to combine such policies and identify reasonable solutions for new problems [2]. The paper [2] allows RL agents to combine existing policies and directly identify optimal policies for arbitrary new problems, without requiring any further interactions with the environment. It shows that the transfer learning problem tackled by SFs is equivalent to the problem of learning to optimize multiple objectives in RL.
        <br><br>
        We would like to investigate the relation of SF and multi-objective problems further, understanding the minimum set of policies that is able to delivery a resonable performance for different types of environments. In other words, emperically have a intuition of what characteristics of different environments inpact more on the size of this set of policies. 
        
    </div>

    <!-- Images section occupying 1/3 of the width -->
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/gridworld.jpg" title="example image" class="img-fluid rounded z-depth-1 mb-3" %}
        {% include figure.html path="assets/img/projects/corner_weights.png" title="example image" class="img-fluid rounded z-depth-1" %}
        <div class="caption mt-2">
            In the top figure, an angent must choose the path that gives more return depending on rewards given for colect triangles or squares[1]. In the bottom figure, a schematic representation of the algorithm that suggest how to add new policies to the set of optimum policies by solving different tasks.
        </div>
    </div>
</div>

<br>
<h2 style="color: #00ab37;">Goal:</h2>
Identify enpirically the connection of the size of the set of policies capable of delivery a resonable peformance when using SF and GPI with the characteristics of different multi-objective RL environments from the MO-Gymnasium library [4].

<br>
<h2 style="color: #00ab37;">Preliminary work:</h2>
[1] investigate how to do transfer learning using SF and GPI, and the work of [2] focus on the algorithm to find the set of policies to delivery the optimum solution when using SF and GPI. 

<br>
<h2 style="color: #00ab37;">Tasks:</h2>
This project can include
<li>Understanding the theory surrounding SF and GPI</li>
<li>Understanding how problems using SF can be interpreted as multi-opjective environments</li>
<li>Make some numerical simulations in python solving some multi-objective environments using SF, GPI, and the set of optimal policies.</li>
<li>Run empirical analysis on how the size of the set of optimal policies is been inpacted by some environments from the MO-Gymnasium library. </li>

The final tasks will be discussed with the supervisor. Please feel free to get in contact.
 

<br>
<h3 style="color: #00ab37;">References</h3>

<li>[1] Barreto, André, et al. <a href="https://www.davidsilver.uk/wp-content/uploads/2020/09/Fast-reinforcement.pdf">Fast reinforcement learning with generalized policy updates.</a> <i>Proceedings of the National Academy of Sciences 117.48</i>, (2020): 30079-30087. Click <a href="https://www.youtube.com/watch?v=6_7vE08acVM">here</a>for a videos presentation, and <a href="https://www.deepmind.com/blog/fast-reinforcement-learning-through-the-composition-of-behaviours">here</a> for the Google DeepMind blog post about the topic.</li>

<li>[2] Alegre, Lucas Nunes, Ana Bazzan, and Bruno C. Da Silva. <a href="https://proceedings.mlr.press/v162/alegre22a.html">Optimistic linear support and successor features as a basis for optimal policy transfer.</a> <i>International Conference on Machine Learning. PMLR</i>, 2022.</li>

<li>[3] Barreto, André, et al. <a href="https://proceedings.neurips.cc/paper/2017/hash/350db081a661525235354dd3e19b8c05-Abstract.html">Successor features for transfer in reinforcement learning.</a> <i>Advances in neural information processing systems 30</i>, 2017.</li>

<li>[4] Alegre, Lucas N., et al. <a href="https://mo-gymnasium.farama.org/">MO-Gymnasium (Software) </a> <i>Multi-Objective Gymnasium type environment</i>, 2022.</li>



<br>
<h4 style="color: #00ab37;">Supervision</h4>
Supervisor: <a href="https://www.rug.nl/staff/r.f.cunha/?lang=en">Rafael Fernandes Cunha</a>  
Room: 5161.0438 (Bernoulliborg)  
Email: r.f.cunha@rug.nl






