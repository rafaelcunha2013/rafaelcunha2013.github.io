---
layout: page
title: Faithfulness of explanations in deep reinforcement learning
description: Faithulles of xrl tequiniques when interpreting the policies
img: assets/img/projects/illustrative_work_commute.png
importance: 8
category: old
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
<h7 style="display: inline;">Explanable Reinforcement Learning, Explanability, Deep Learning </h7>

<br>
<h2 style="color: #00ab37;">Problem:</h2>
<div class="row">
    <!-- Text section occupying 2/3 of the width -->
    <div class="col-sm-8 mt-3 mt-md-0" style="text-align: justify;">
        Neural Networks (NNs) are often cited as black-boxes, i.e., models which are not interpretable by human cognition and whose function learnt from the data is not directly accessible. For this reason, several techniques for trying to probe into one or more aspects of the inner functioning of NNs have been proposed, and this field has been dubbed Explainable AI (XAI). Input Attribution (IA) methods are tools to approximate which parts of an input are important in determining the model prediction.

        <br><br>

        The combination of reinforcement learning (RL) with deep learning is a promising approach to tackle important sequential decisionmaking problems that are currently intractable. One obstacle to overcome is the amount of data needed by learning systems of this type.  

        Complex decision problems can be naturally decomposed into multiple tasks that unfold in sequence or in parallel. By associating each task with a reward function, this problem decomposition can be seamlessly accommodated within the standard reinforcement-learning formalism.

        If the reward function of a task can be well approximated as a linear combination of the reward functions of tasks previously solved, we can reduce a reinforcement-learning problem to a simpler linear regression [1].
        <br><br>
        Successor features (SF) is a value function representation that decouples the dynamics of the environment from the rewards, and generalized policy improvement (GPI) is a generalization of dynamic programming’s policy improvement operation that considers a set of policies rather than a single one. Put together, the two ideas lead to an approach that integrates seamlessly within the RL framework and allows the free exchange of information across tasks [3].
        <br><br>
        If reward functions are expressed linearly, and the agent has previously learned a set of policies for different tasks, successor features (SFs) can be exploited to combine such policies and identify reasonable solutions for new problems [2]. The paper [2] allows RL agents to combine existing policies and directly identify optimal policies for arbitrary new problems, without requiring any further interactions with the environment. It shows that the transfer learning problem tackled by SFs is equivalent to the problem of learning to optimize multiple objectives in RL.
        <br><br>
        We would like to investigate the relation between SF and multi-objective problems further, understanding the minimum set of policies that can deliver reasonable performance for different types of environments. In other words, empirically gain an intuition of what characteristics of different environments impact more on the size of this set of policies.
        
    </div>

    <!-- Images section occupying 1/3 of the width -->
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/gridworld.jpg" title="example image" class="img-fluid rounded z-depth-1 mb-3" %}
        {% include figure.html path="assets/img/projects/corner_weights.png" title="example image" class="img-fluid rounded z-depth-1" %}
        <div class="caption mt-2">
            In the top figure, an agent must choose the path that gives more return depending on rewards given for collect triangles or squares [1]. In the bottom figure, a schematic representation of the algorithm that suggests how to add new policies to the set of optimum policies by solving different tasks.
        </div>
    </div>
</div>

<br>
<h2 style="color: #00ab37;">Goal:</h2>
Understand if explanable reinforcement learning techniques are faithul to the policy?

<br>
<h2 style="color: #00ab37;">Preliminary work:</h2>
[1] investigates how to do transfer learning using SF and GPI, and the work of [2] focuses on the algorithm to find the set of policies to deliver the optimum solution when using SF and GPI. 

<br>
<h2 style="color: #00ab37;">Tasks:</h2>
This project can include
<li>Make a literature review on explanable reinforcement learning (xrl) techniques</li>
<li>Analyse how faithul is xrl when relating to the learned policy</li>
<li>Make some numerical simulations in python solving </li>
<li>Run empirical analysis on how the size of the set of optimal policies is inpacted by some environments from the MO-Gymnasium library. </li>
<br>
The final tasks will be discussed with the supervisor. Please feel free to get in contact.
 

<br>
<h3 style="color: #00ab37;">References</h3>

<li>[1] Barreto, André, et al. <a href="https://www.davidsilver.uk/wp-content/uploads/2020/09/Fast-reinforcement.pdf">Fast reinforcement learning with generalized policy updates.</a> <i>Proceedings of the National Academy of Sciences 117.48</i>, (2020): 30079-30087. Click <a href="https://www.youtube.com/watch?v=6_7vE08acVM">here</a> for a video presentation, and <a href="https://www.deepmind.com/blog/fast-reinforcement-learning-through-the-composition-of-behaviours">here</a> for the Google DeepMind blog post about the topic.</li>

<li>[2] Alegre, Lucas Nunes, Ana Bazzan, and Bruno C. Da Silva. <a href="https://proceedings.mlr.press/v162/alegre22a.html">Optimistic linear support and successor features as a basis for optimal policy transfer.</a> <i>International Conference on Machine Learning. PMLR</i>, 2022.</li>

<li>[3] Barreto, André, et al. <a href="https://proceedings.neurips.cc/paper/2017/hash/350db081a661525235354dd3e19b8c05-Abstract.html">Successor features for transfer in reinforcement learning.</a> <i>Advances in neural information processing systems 30</i>, 2017.</li>

<li>[4] Alegre, Lucas N., et al. <a href="https://mo-gymnasium.farama.org/">MO-Gymnasium (Software) </a> <i>Multi-Objective Gymnasium type environment</i>, 2022.</li>



<br>
<h4 style="color: #00ab37;">Supervision</h4>
Supervisor: <a href="https://www.rug.nl/staff/r.f.cunha/?lang=en">Rafael Fernandes Cunha</a>  
Room: 5161.0438 (Bernoulliborg)  
Email: r.f.cunha@rug.nl






