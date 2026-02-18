---
layout: page
permalink: /teaching/
title: Teaching
description: I am a Lecturer in Artificial Intelligence at the University of Groningen, where I teach courses across the bachelor's and master's programs in Reinforcement Learning, Deep Learning, and Object-Oriented Programming. I have served as course coordinator, creator, and lecturer since joining in 2023.
nav: true
nav_order: 4
giscus_comments: false
# toc:
#   sidebar: true
---

<style>
        /* Teaching section wrapper */
        .teaching-section {
            background: var(--global-bg-color);
            border-radius: 12px;
            padding: 1.5rem 0;
        }
        /* Section header */
        .section-header {
            margin-bottom: 2rem;
        }
        .section-title {
            font-size: 1.75rem;
            font-weight: 700;
            color: var(--global-text-color);
            margin-bottom: 0.5rem;
            padding-bottom: 0.75rem;
            border-bottom: 3px solid #4b9cd3;
            display: inline-block;
        }
        .section-description {
            color: var(--global-text-color-light);
            font-size: 1rem;
            margin-top: 0.75rem;
        }
        /* Table */
        .table-wrapper {
            overflow-x: auto;
            margin-top: 1.5rem;
        }
        .teaching-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0 0.5rem;
        }
        .teaching-table thead th {
            background: linear-gradient(135deg, #4b9cd3, #357ab8);
            color: white;
            padding: 1rem;
            text-align: left;
            font-weight: 600;
        }
        .teaching-table thead th:first-child {
            border-radius: 8px 0 0 8px;
        }
        .teaching-table thead th:last-child {
            border-radius: 0 8px 8px 0;
        }
        .teaching-table tbody tr {
            background: var(--global-code-bg-color);
            transition: all 0.3s ease;
        }
        .teaching-table tbody tr:hover {
            transform: scale(1.01);
            box-shadow: 0 4px 12px rgba(75, 156, 211, 0.2);
        }
        .teaching-table td {
            padding: 1rem;
            border: none;
            color: var(--global-text-color);
        }
        .teaching-table tbody tr td:first-child {
            border-radius: 8px 0 0 8px;
        }
        .teaching-table tbody tr td:last-child {
            border-radius: 0 8px 8px 0;
        }
        .year-block {
            font-weight: bold;
            color: #4b9cd3;
            white-space: nowrap;
        }
        .course-link {
            color: #4b9cd3;
            text-decoration: none;
            font-weight: 500;
        }
        .course-link:hover {
            text-decoration: underline;
        }
        .level-badge {
            display: inline-block;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.85rem;
            font-weight: 500;
        }
        .level-bachelor {
            background: #e3f2fd;
            color: #1565c0;
        }
        .level-master {
            background: #f3e5f5;
            color: #6a1b9a;
        }
        html[data-theme="dark"] .level-bachelor {
            background: #1a3a4a;
            color: #64b5f6;
        }
        html[data-theme="dark"] .level-master {
            background: #3a1a4a;
            color: #ba68c8;
        }
        .role-badge {
            display: inline-block;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.85rem;
            font-weight: 500;
            background: #fff3e0;
            color: #e65100;
        }
        html[data-theme="dark"] .role-badge {
            background: #4a3a1a;
            color: #ffb74d;
        }
        .notes-text {
            font-size: 0.9rem;
            color: var(--global-text-color-light);
            font-style: italic;
        }
        /* Responsive */
        @media (max-width: 768px) {
            .section-title {
                font-size: 1.4rem;
            }
            .teaching-table {
                font-size: 0.85rem;
            }
            .teaching-table td {
                padding: 0.5rem;
            }
        }
</style>

<div class="teaching-section">
    <div class="section-header">
        <h2 class="section-title">Teaching Experience</h2>
        <p class="section-description">Courses taught at the University of Groningen across bachelor's and master's programs, with roles ranging from guest lecturer to course coordinator and creator.</p>
    </div>
    <div class="table-wrapper">
        <table class="teaching-table">
            <thead>
                <tr>
                    <th>Year/Block</th>
                    <th>Course</th>
                    <th>Level</th>
                    <th>Role</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="year-block">2025/26 IA</td>
                    <td>
                        <a href="https://ocasys.rug.nl/2025-2026/catalog/course/WBAI061-05" class="course-link" target="_blank" rel="noopener">Reinforcement Learning</a>
                    </td>
                    <td><span class="level-badge level-bachelor">Bachelor</span></td>
                    <td><span class="role-badge">Coordinator & Lecturer</span></td>
                    <td></td>
                </tr>
                <tr>
                    <td class="year-block">2025/26 IA</td>
                    <td>
                        <a href="https://ocasys.rug.nl/2025-2026/catalog/course/WBAI045-05" class="course-link" target="_blank" rel="noopener">Object-Oriented Programming (for AI)</a>
                    </td>
                    <td><span class="level-badge level-bachelor">Bachelor</span></td>
                    <td><span class="role-badge">Lecturer</span></td>
                    <td><span class="notes-text">Guest lecture</span></td>
                </tr>
                <tr>
                    <td class="year-block">2024/25 IA</td>
                    <td>
                        <a href="https://ocasys.rug.nl/2024-2025/catalog/course/WBAI061-05" class="course-link" target="_blank" rel="noopener">Reinforcement Learning</a>
                    </td>
                    <td><span class="level-badge level-bachelor">Bachelor</span></td>
                    <td><span class="role-badge">Coordinator & Lecturer</span></td>
                    <td></td>
                </tr>
                <tr>
                    <td class="year-block">2024/25 IA</td>
                    <td>
                        <a href="https://ocasys.rug.nl/2024-2025/catalog/course/WMAI029-05" class="course-link" target="_blank" rel="noopener">Responsible AI</a>
                    </td>
                    <td><span class="level-badge level-master">Master</span></td>
                    <td><span class="role-badge">Guest Lecturer</span></td>
                    <td><span class="notes-text">Topic: Responsible and explainable AI systems</span></td>
                </tr>
                <tr>
                    <td class="year-block">2024/25 IB</td>
                    <td>
                        <a href="https://ocasys.rug.nl/2024-2025/catalog/course/WBAI015-05" class="course-link" target="_blank" rel="noopener">Reinforcement Learning Practical</a>
                    </td>
                    <td><span class="level-badge level-bachelor">Bachelor</span></td>
                    <td><span class="role-badge">Coordinator & Lecturer</span></td>
                    <td><span class="notes-text">Complete course redesign</span></td>
                </tr>
                <tr>
                    <td class="year-block">2024/25 IIB</td>
                    <td>
                        <a href="https://ocasys.rug.nl/2024-2025/catalog/course/WMAI024-05" class="course-link" target="_blank" rel="noopener">Deep Reinforcement Learning</a>
                    </td>
                    <td><span class="level-badge level-master">Master</span></td>
                    <td><span class="role-badge">Lecturer</span></td>
                    <td><span class="notes-text">Created and delivered lecture on Multi-Agent RL</span></td>
                </tr>
                <tr>
                    <td class="year-block">2023/24 IA</td>
                    <td>
                        <a href="https://ocasys.rug.nl/2023-2024/catalog/course/WMAI029-05" class="course-link" target="_blank" rel="noopener">Topics in AI</a>
                    </td>
                    <td><span class="level-badge level-master">Master</span></td>
                    <td><span class="role-badge">Guest Lecturer</span></td>
                    <td><span class="notes-text">Topic: RL applied to vehicle platoon and transfer learning</span></td>
                </tr>
                <tr>
                    <td class="year-block">2023/24 IB</td>
                    <td>
                        <a href="https://ocasys.rug.nl/2023-2024/catalog/course/WBAI045-05" class="course-link" target="_blank" rel="noopener">Object-Oriented Programming (for AI)</a>
                    </td>
                    <td><span class="level-badge level-bachelor">Bachelor</span></td>
                    <td><span class="role-badge">Co-creator & Lecturer</span></td>
                    <td></td>
                </tr>
                <tr>
                    <td class="year-block">2023/24 IB</td>
                    <td>
                        <a href="https://ocasys.rug.nl/2023-2024/catalog/course/WBAI015-05" class="course-link" target="_blank" rel="noopener">Reinforcement Learning Practical</a>
                    </td>
                    <td><span class="level-badge level-bachelor">Bachelor</span></td>
                    <td><span class="role-badge">Lecturer</span></td>
                    <td><span class="notes-text">Two lectures: Dynamic Programming; Policy Gradients and Actor-Critic</span></td>
                </tr>
                <tr>
                    <td class="year-block">2023/24 IIA</td>
                    <td>
                        <a href="https://ocasys.rug.nl/2023-2024/catalog/course/WBAI061-05" class="course-link" target="_blank" rel="noopener">Reinforcement Learning</a>
                    </td>
                    <td><span class="level-badge level-bachelor">Bachelor</span></td>
                    <td><span class="role-badge">Creator, Coordinator & Lecturer</span></td>
                    <td></td>
                </tr>
                <tr>
                    <td class="year-block">2023/24 IIB</td>
                    <td>
                        <a href="https://ocasys.rug.nl/2023-2024/catalog/course/WMAI024-05" class="course-link" target="_blank" rel="noopener">Deep Reinforcement Learning</a>
                    </td>
                    <td><span class="level-badge level-master">Master</span></td>
                    <td><span class="role-badge">Lecturer</span></td>
                    <td><span class="notes-text">Two lectures: Policy Gradients and Actor-Critic methods</span></td>
                </tr>
                <tr>
                    <td class="year-block">2023/24 IIB</td>
                    <td>
                        <a href="https://ocasys.rug.nl/2023-2024/catalog/course/WBAI023-05" class="course-link" target="_blank" rel="noopener">Artificial Intelligence 1</a>
                    </td>
                    <td><span class="level-badge level-bachelor">Bachelor</span></td>
                    <td><span class="role-badge">Lecturer</span></td>
                    <td><span class="notes-text">Two lectures: Adversarial search and Games; Constraint satisfaction problems</span></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<br>

<div class="teaching-section">
    <div class="section-header">
        <h2 class="section-title">Other Activities</h2>
    </div>
    <div style="padding: 0 0.5rem;">
        <p><strong>2024/25</strong> — Organized the Machine Learning Groningen meetup at RUG, where I gave one of the two talks.</p>
    </div>
</div>