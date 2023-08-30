---
layout: page
title: Faithfulness of explanations in deep reinforcement learning
description: Faithulles of xrl tequiniques when interpreting the policies
img: assets/img/projects/inputAttibution.jpg
importance: 8
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
<h7 style="display: inline;">Explanable Reinforcement Learning (XRL), Explanable AI, Input Attribution (IA) </h7>

<br>
<h2 style="color: #00ab37;">Problem:</h2>
<div class="row">
    <!-- Text section occupying 2/3 of the width -->
    <div class="col-sm-8 mt-3 mt-md-0" style="text-align: justify;">
        Neural Networks (NNs) are often cited as black-boxes, i.e., models which are not interpretable by human cognition and whose function learnt from the data is not directly accessible. For this reason, several techniques for trying to probe into one or more aspects of the inner functioning of NNs have been proposed, and this field has been dubbed Explainable AI (XAI). Input Attribution (IA) methods are tools to approximate which parts of an input are important in determining the model prediction.

        <br><br>

        NNs can also be employed as controllers of Reinforcement Learning (RL)-based agents, whereas the model is used to learn the best policy for navigating an environment in a given state. In this sense, IA methods, or any other explainability technique, can be a great tool for getting intuitions about the reasons why an agent executes a specific action.

        <br><br>

        One of the most pressing challenges of XAI is connected to the assessment of the quality of the explanations provided: in fact, many XAI tools are mere approximations of the underlying decision process operated by the NN, and the explanations can be widely inaccurate in that regard. A straightforward way of evaluating the explanations is to consider the faithfulness of the explanation: for instance, we could ask ourselves whether the input parts identified via IA are actually important for the NN—by perturbing or masking these areas, one reasonably expects the action of the underlying RL agent to change. The field that looks for explainability in RL agent behaviors is called explainable RL (XRL). The goal of XRL is to elucidate the decision-making process of learning agents in sequential decision-making settings.

        <br><br>
        We would like to investigate the relation between SF and multi-objective problems further, understanding the minimum set of policies that can deliver reasonable performance for different types of environments. In other words, empirically gain an intuition of what characteristics of different environments impact more on the size of this set of policies.
        
    </div>

    <!-- Images section occupying 1/3 of the width -->
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/xrl_taxonomy.png" title="example image" class="img-fluid rounded z-depth-1 mb-3" %}
        {% include figure.html path="assets/img/projects/explainable-ai.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
        <div class="caption mt-2">
            In the top figure, XRL taxonomy and its relationship to the RL process [4]. In the bottom figure, resons to study explanable AI.
        </div>
    </div>
</div>

<br>
<h2 style="color: #00ab37;">Goal:</h2>
Are input attribution methods applied to deep reinforcement learning agents faithful to the policy learned?


<br>
<h2 style="color: #00ab37;">Preliminary work:</h2>
In [1], you can find an introductory course on XAI. [2] offers a comprehensive introduction to the evaluation of XAI techniques. [3] provides an example where input attribution methods exhibit low faithfulness, and [4] presents a literature review of some XRL methods.


<br>
<h2 style="color: #00ab37;">Tasks:</h2>
This project can include
<li>Literature review on XAI and XRL.</li>
<li>Literature review on assessing quality of XAI tools.</li>
<li>Run simulations in a chosen atari gym environment. </li>
<li>Analyze results.</li>
<br>
The final tasks will be discussed with the supervisor. Please feel free to get in contact.
 

<br>
<h3 style="color: #00ab37;">References</h3>

<li>[1] <a href="https://hcixaitutorial.github.io/"> Course on XAI. </a> </li>

<li>[2] Nauta, Meike, et al. <a href="https://arxiv.org/abs/2201.08164">From anecdotal evidence to quantitative evaluation methods: A systematic review on evaluating explainable ai.</a> <i>ACM Computing Surveys 55.13s: 1-42</i>, 2023.</li>

<li>[3] Arrighi, Leonardo, et al. <a href="https://drive.google.com/file/d/1WpfTWjSV6uS576-uF27NHzZBnWnWiN-8/view">Explainable Automated Anomaly Recognition in Failure Analysis: is Deep Learning Doing it Correctly?.</a> <i> XAI conference (2023). Under publication.</i>, 2023.</li>

<li>[4] Milani, Stephanie, et al.  <a href="https://mo-gymnasium.farama.org/">A survey of explainable reinforcement learning.</a> <i>arXiv preprint arXiv:2202.08434</i>, 2022.</li>

<li>[5] Milani, Stephanie, et al.  <a href="https://gymnasium.farama.org/environments/atari/complete_list/">A complete list of atari gym environments.</a></li>



<br>
<h4 style="color: #00ab37;">Supervision</h4>
Supervisor: <a href="https://www.rug.nl/staff/r.f.cunha/?lang=en">Rafael Fernandes Cunha</a>  
Room: 5161.0438 (Bernoulliborg)  
Email: r.f.cunha@rug.nl  

Supervisor: <a href="https://www.rug.nl/staff/m.zullich/?lang=en">Marco Zullich</a>  
Room: 5161.0438 (Bernoulliborg)  
Email: m.zullich@rug.nl






