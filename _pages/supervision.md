---
layout: page
permalink: /supervision/
title: Supervision
description: Supervised bachelor theses in Artificial Intelligence and related fields, focusing on Reinforcement Learning, Deep Learning, and Machine Learning applications.
nav: true
nav_order: 3
giscus_comments: false
# toc:
#   sidebar: true
---

<style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
            line-height: 1.6;
            background: #f5f5f5;
            padding: 2rem;
        }
        /* Theme Toggle */
        .theme-toggle {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border: 2px solid #333;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            z-index: 1000;
            transition: all 0.3s ease;
        }
        .theme-toggle:hover {
            transform: scale(1.1);
        }
        /* Dark theme variables */
        body.dark-theme {
            background: #1a1a1a;
            color: #e0e0e0;
        }
        body.dark-theme .supervision-section {
            background: #2a2a2a;
            border-color: #404040;
        }
        body.dark-theme .theme-toggle {
            background: #2a2a2a;
            border-color: #e0e0e0;
            color: #e0e0e0;
        }
        .container {
            max-width: 1400px;
            margin: 0 auto;
        }
        .supervision-section {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            border: 2px solid #e0e0e0;
        }
        .section-header {
            margin-bottom: 2rem;
        }
        .section-title {
            font-size: 2rem;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 0.5rem;
            padding-bottom: 0.75rem;
            border-bottom: 3px solid #4b9cd3;
            display: inline-block;
        }
        body.dark-theme .section-title {
            color: #e0e0e0;
        }
        .section-count {
            color: #4b9cd3;
            font-weight: 600;
        }
        .section-description {
            color: #666;
            font-size: 1rem;
            margin-top: 1rem;
        }
        body.dark-theme .section-description {
            color: #999;
        }
        /* Table Style */
        .table-wrapper {
            overflow-x: auto;
            margin-top: 1.5rem;
        }
        .supervision-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0 0.5rem;
        }
        .supervision-table thead th {
            background: linear-gradient(135deg, #4b9cd3, #357ab8);
            color: white;
            padding: 1rem;
            text-align: left;
            font-weight: 600;
            position: sticky;
            top: 0;
            z-index: 10;
        }
        .supervision-table thead th:first-child {
            border-radius: 8px 0 0 8px;
        }
        .supervision-table thead th:last-child {
            border-radius: 0 8px 8px 0;
        }
        .supervision-table tbody tr {
            background: #f8f9fa;
            transition: all 0.3s ease;
        }
        body.dark-theme .supervision-table tbody tr {
            background: #333;
        }
        .supervision-table tbody tr:hover {
            transform: scale(1.01);
            box-shadow: 0 4px 12px rgba(75, 156, 211, 0.2);
        }
        .supervision-table td {
            padding: 1rem;
            border: none;
        }
        .supervision-table tbody tr td:first-child {
            border-radius: 8px 0 0 8px;
        }
        .supervision-table tbody tr td:last-child {
            border-radius: 0 8px 8px 0;
        }
        .table-date {
            font-weight: bold;
            color: #4b9cd3;
            white-space: nowrap;
        }
        .table-link {
            color: #4b9cd3;
            text-decoration: none;
            font-weight: 500;
        }
        .table-link:hover {
            text-decoration: underline;
        }
        .co-supervisor {
            font-size: 0.85rem;
            color: #666;
            font-style: italic;
            margin-top: 0.25rem;
        }
        body.dark-theme .co-supervisor {
            color: #999;
        }
        .output-link {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            background: #d4edda;
            color: #155724;
            padding: 0.35rem 0.75rem;
            border-radius: 6px;
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 500;
            transition: all 0.2s ease;
        }
        .output-link::before {
            content: '📄';
            font-size: 1rem;
        }
        body.dark-theme .output-link {
            background: #1a3a2a;
            color: #6bc98d;
        }
        .output-link:hover {
            background: #c3e6cb;
            transform: translateY(-1px);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        body.dark-theme .output-link:hover {
            background: #234a34;
        }
        /* Responsive Design */
        @media (max-width: 768px) {
            .container {
                padding: 1rem;
            }
            .supervision-section {
                padding: 1rem;
            }
            .section-title {
                font-size: 1.5rem;
            }
            .supervision-table {
                font-size: 0.85rem;
            }
            .supervision-table td {
                padding: 0.5rem;
            }
        }
    </style>
</head>
<body>
    <button class="theme-toggle" onclick="toggleTheme()" aria-label="Toggle theme">🌓</button>
    <div class="container">
        <div class="supervision-section">
            <div class="section-header">
                <h2 class="section-title">Bachelor Thesis Supervision <span class="section-count">— 20 Students</span></h2>
                <p class="section-description">Supervised bachelor theses in Artificial Intelligence and related fields, focusing on Reinforcement Learning, Deep Learning, and Machine Learning applications.</p>
            </div>
            <div class="table-wrapper">
                <table class="supervision-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Student</th>
                            <th>Thesis</th>
                            <th>Research Output</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="table-date">Sep 2025</td>
                            <td>
                                <strong>Kristaps Melbardis</strong>
                                <div style="font-size: 0.85rem; color: #666;">Bachelor in AI</div>
                            </td>
                            <td>
                                <a href="https://fse.studenttheses.ub.rug.nl/37008/" class="table-link" target="_blank" rel="noopener">Enhancing Long-Context Understanding in Language Models via Titans Neural Long-Term Memory: A Case Study with Qwen, and the Babilong Dataset</a>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td class="table-date">Sep 2025</td>
                            <td>
                                <strong>Manos Savvides</strong>
                                <div style="font-size: 0.85rem; color: #666;">Bachelor in CS</div>
                            </td>
                            <td>
                                <a href="https://fse.studenttheses.ub.rug.nl/36738/" class="table-link" target="_blank" rel="noopener">Multi-Agent Reinforcement Learning for Cyber Defence</a>
                                <div class="co-supervisor">Co-supervised with Fatih Turkmen</div>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td class="table-date">Aug 2025</td>
                            <td>
                                <strong>Benediktus Firstian Pradipta</strong>
                                <div style="font-size: 0.85rem; color: #666;">Bachelor in AI</div>
                            </td>
                            <td>
                                <a href="https://fse.studenttheses.ub.rug.nl/36723/" class="table-link" target="_blank" rel="noopener">Shaping Reasoning Through Rewards: Investigating Reward Structures in Post-Training LLMs with Pure Reinforcement Learning</a>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td class="table-date">Aug 2025</td>
                            <td>
                                <strong>Ravindra A. Tarunokusumo</strong>
                                <div style="font-size: 0.85rem; color: #666;">Bachelor in AI</div>
                            </td>
                            <td>
                                <a href="https://fse.studenttheses.ub.rug.nl/36698/" class="table-link" target="_blank" rel="noopener">Boosting Accuracy and Efficiency of Budget Forcing in LLMs via Reinforcement Learning for Mathematical Reasoning</a>
                                <div class="co-supervisor">Co-supervised with T.M. Tashu</div>
                            </td>
                            <td>
                                <a href="https://arxiv.org/abs/2510.21398" class="output-link" target="_blank" rel="noopener">ECAI 2025 (sLLM)</a>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-date">Aug 2025</td>
                            <td>
                                <strong>Andjela Matic</strong>
                                <div style="font-size: 0.85rem; color: #666;">Bachelor in AI</div>
                            </td>
                            <td>
                                <a href="https://fse.studenttheses.ub.rug.nl/36746/" class="table-link" target="_blank" rel="noopener">Outperforming the Baseline: Transfer Learning in Atari via Parallelized Q-Networks</a>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td class="table-date">Jul 2025</td>
                            <td>
                                <strong>Stan Ferguson</strong>
                                <div style="font-size: 0.85rem; color: #666;">Bachelor in AI</div>
                            </td>
                            <td>
                                <a href="https://fse.studenttheses.ub.rug.nl/36511/" class="table-link" target="_blank" rel="noopener">Exploring One-Step Fixed Horizon Q-learning in Tabular Stochastic Environments</a>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td class="table-date">Jun 2025</td>
                            <td>
                                <strong>Quinten Steringa</strong>
                                <div style="font-size: 0.85rem; color: #666;">Bachelor in AI</div>
                            </td>
                            <td>
                                <a href="https://fse.studenttheses.ub.rug.nl/36470/" class="table-link" target="_blank" rel="noopener">No Supervision, No Problem: Pure Reinforcement Learning Improves Mathematical Reasoning in Small Language Models</a>
                            </td>
                            <td>
                                <a href="https://sites.google.com/view/sllm2025/home?authuser=0" class="output-link" target="_blank" rel="noopener">ECAI 2025 (sLLM)</a>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-date">Apr 2025</td>
                            <td>
                                <strong>Rares Stefan Stoian</strong>
                                <div style="font-size: 0.85rem; color: #666;">Bachelor in AI</div>
                            </td>
                            <td>
                                <a href="https://fse.studenttheses.ub.rug.nl/35220/" class="table-link" target="_blank" rel="noopener">Accelerating Model Based Reinforcement Learning Using GPU Through Parallelization of Dyna-Q Architecture</a>
                                <div class="co-supervisor">Co-supervised with Matthia Sabatelli</div>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td class="table-date">Feb 2025</td>
                            <td>
                                <strong>Leon Tanis</strong>
                                <div style="font-size: 0.85rem; color: #666;">Bachelor in AI</div>
                            </td>
                            <td>
                                <a href="https://fse.studenttheses.ub.rug.nl/34812/" class="table-link" target="_blank" rel="noopener">Bridging Faithfulness of Explanations and Deep Reinforcement Learning: A Grad-CAM Analysis of Space Invaders</a>
                                <div class="co-supervisor">Co-supervised with Marco Zullich</div>
                            </td>
                            <td>
                                <a href="https://dl.acm.org/doi/10.1145/3723498.3725723" class="output-link" target="_blank" rel="noopener">FDG 2025</a>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-date">Jan 2025</td>
                            <td>
                                <strong>Catalin Zaharia</strong>
                                <div style="font-size: 0.85rem; color: #666;">Bachelor in AI</div>
                            </td>
                            <td>
                                <a href="https://fse.studenttheses.ub.rug.nl/34861/" class="table-link" target="_blank" rel="noopener">Transfer Learning in Reinforcement Learning: When Task-Specific Adaptation Outperforms Generalization</a>
                                <div class="co-supervisor">Co-supervised with Matthia Sabatelli</div>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td class="table-date">Aug 2024</td>
                            <td>
                                <strong>Andre van Dommele</strong>
                                <div style="font-size: 0.85rem; color: #666;">Bachelor in AI</div>
                            </td>
                            <td>
                                <a href="https://fse.studenttheses.ub.rug.nl/33947/" class="table-link" target="_blank" rel="noopener">Enhancing Football Simulation Performance in Deep Reinforcement Learning Through Analytics-based Dense Reward Shaping</a>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td class="table-date">Aug 2024</td>
                            <td>
                                <strong>Niclas Müller-Horf</strong>
                                <div style="font-size: 0.85rem; color: #666;">Bachelor in AI</div>
                            </td>
                            <td>
                                <a href="https://fse.studenttheses.ub.rug.nl/33952/" class="table-link" target="_blank" rel="noopener">Improving Efficiency of a Hierarchical Reinforcement Learning Algorithm</a>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td class="table-date">Aug 2024</td>
                            <td>
                                <strong>Jeremias Lino Ferrao</strong>
                                <div style="font-size: 0.85rem; color: #666;">Bachelor in AI</div>
                            </td>
                            <td>
                                <a href="https://fse.studenttheses.ub.rug.nl/33851/" class="table-link" target="_blank" rel="noopener">World Model Agents with Changed-Based Intrinsic Motivation</a>
                            </td>
                            <td>
                                <a href="https://proceedings.mlr.press/v265/ferrao25a.html" class="output-link" target="_blank" rel="noopener">NLDL 2025</a>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-date">Aug 2024</td>
                            <td>
                                <strong>Diana-Maria Arapu</strong>
                                <div style="font-size: 0.85rem; color: #666;">Bachelor in AI</div>
                            </td>
                            <td>
                                <a href="https://fse.studenttheses.ub.rug.nl/33859/" class="table-link" target="_blank" rel="noopener">Sparse Rewards Reinforcement Learning: Addressing Vanishing Intrinsic Rewards in Change-Based Exploration Transfer</a>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td class="table-date">Jul 2024</td>
                            <td>
                                <strong>Matej Priesol</strong>
                                <div style="font-size: 0.85rem; color: #666;">Bachelor in AI</div>
                            </td>
                            <td>
                                <a href="https://fse.studenttheses.ub.rug.nl/33903/" class="table-link" target="_blank" rel="noopener">Forecasting Carbon Intensity and Solar Generation in the Building Sector</a>
                                <div class="co-supervisor">Co-supervised with J.D. Cardenas Cartagena</div>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td class="table-date">Mar 2024</td>
                            <td>
                                <strong>Peter van den Bempt</strong>
                                <div style="font-size: 0.85rem; color: #666;">Bachelor in AI</div>
                            </td>
                            <td>
                                <a href="https://fse.studenttheses.ub.rug.nl/32162/" class="table-link" target="_blank" rel="noopener">Investigating Mode-Switching and Reward Stream Separation in Hard-Exploration Problems</a>
                                <div class="co-supervisor">Co-supervised with Matthia Sabatelli</div>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td class="table-date">Jul 2021</td>
                            <td>
                                <strong>Bo T. Kroezen</strong>
                                <div style="font-size: 0.85rem; color: #666;">Bachelor in IEM</div>
                            </td>
                            <td>
                                <a href="https://fse.studenttheses.ub.rug.nl/24641/" class="table-link" target="_blank" rel="noopener">Stochastic Stability Analysis of Selection-Mutation Processes and Signaling Games</a>
                                <div class="co-supervisor">Co-supervised with Ming Cao</div>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td class="table-date">Feb 2021</td>
                            <td>
                                <strong>Tautas Hoedtke</strong>
                                <div style="font-size: 0.85rem; color: #666;">Bachelor in IEM</div>
                            </td>
                            <td>
                                <a href="https://fse.studenttheses.ub.rug.nl/23954/" class="table-link" target="_blank" rel="noopener">Safe Reinforcement Learning</a>
                                <div class="co-supervisor">Co-supervised with Ming Cao</div>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td class="table-date">Jul 2020</td>
                            <td>
                                <strong>Muhammad Aqil Prasetyo</strong>
                                <div style="font-size: 0.85rem; color: #666;">Bachelor in IEM</div>
                            </td>
                            <td>
                                <a href="https://fse.studenttheses.ub.rug.nl/22395/" class="table-link" target="_blank" rel="noopener">Using Reinforcement Learning to Design a State Feedback Controller</a>
                                <div class="co-supervisor">Co-supervised with Ming Cao</div>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td class="table-date">Feb 2020</td>
                            <td>
                                <strong>Martijn van Dis</strong>
                                <div style="font-size: 0.85rem; color: #666;">Bachelor in IEM</div>
                            </td>
                            <td>
                                <a href="https://fse.studenttheses.ub.rug.nl/21541/" class="table-link" target="_blank" rel="noopener">The Performance of Reinforcement Learning with Application for Adaptive Traffic Signal Controllers</a>
                                <div class="co-supervisor">Co-supervised with Ming Cao</div>
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <script>
        function toggleTheme() {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }
        // Load saved theme
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-theme');
        }
    </script>
