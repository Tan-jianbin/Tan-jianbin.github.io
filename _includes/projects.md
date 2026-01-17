<style>
.project-item{ margin: 18px 0 22px 0; }

/* Group headings */
.project-group{
  margin: 18px 0 8px 0;
  font-size: 1.25rem;
  font-weight: 900;
}
.project-group-note{
  margin: 0 0 12px 0;
  opacity: .85;
}

/* Single separator between the two big categories */
.project-divider{
  border: none;
  border-top: 1px solid rgba(255,255,255,.12);
  margin: 22px 0 22px 0;
}

/* Title */
.project-title{ font-size: 1.35rem; font-weight: 800; margin: 0 0 6px 0; }
.project-title a{ text-decoration: none; }

/* Summary */
.project-summary{ margin: 0 0 10px 0; line-height: 1.55; }

/* Figure */
.project-figure{ margin: 0 0 10px 0; }
.project-figure img{
  display:block; width:100%; max-width:100%; height:auto; border-radius:10px;
}

/* Meta lines */
.project-meta{ margin: 0 0 6px 0; line-height: 1.45; }
.project-meta strong{ font-weight: 800; }
.project-meta a{ margin-right: 10px; }
</style>


<!-- ===================== -->
<!-- Group 1: Applications -->
<!-- ===================== -->
<div class="project-group">Application</div>
<p class="project-group-note">
  Projects organized by application domains and problem settings.
</p>

<!-- Project 1 -->
<div class="project-item">
  <div class="project-title">
    <a href="PROJECT_URL">Health Data Analysis</a>
  </div>

  <p class="project-summary">
    This project develops statistical methods for electronic health records with complex missingness and irregular sampling,
    enabling reliable downstream representation learning for prediction and inference.
  </p>

  <div class="project-figure">
    <img src="assets/img/PROJECT1_FIG.png" alt="Project figure">
  </div>

  <p class="project-meta">
    <strong>Representative publications:</strong>
    <a href="https://arxiv.org/abs/2508.13831">Smooth Flow Matching</a>
    &nbsp;|&nbsp;
    <a href="https://arxiv.org/abs/2410.03619">Functional-SVD for Heterogeneous Trajectories: Case Studies in Health</a>
    &nbsp;|&nbsp;
    <a href="https://doi.org/10.1016/j.jbi.2025.104933">Integrated analysis for electronic health records with structured and sporadic missingness</a>
  </p>

  <p class="project-meta">
    <strong>Related code:</strong>
    <a href="https://github.com/Jianbin-Tan/Smooth-Flow-Matching">Smooth Flow Matching</a>
    &nbsp;|&nbsp;
    <a href="https://github.com/Jianbin-Tan/Functional-Singular-Value-Decompostion">Functional Singular Value Decomposition</a>
    &nbsp;|&nbsp;
    <a href="https://github.com/Tan-jianbin/Macomss">Matrix Completion with Structured and Sporadic Missingness</a>
  </p>
</div>

<!-- Add more projects in the SAME group here (no separators needed) -->
<!-- <div class="project-item"> ... </div> -->


<!-- ===== ONLY divider between the two big categories ===== -->
<hr class="project-divider">


<!-- ===================== -->
<!-- Group 2: Methods      -->
<!-- ===================== -->
<div class="project-group">Statistical Method</div>
<p class="project-group-note">
  Projects organized by methodological themes (e.g., generative modeling, imputation, representation learning).
</p>

<!-- Project 2 -->
<div class="project-item">
  <div class="project-title">
    <a href="PROJECT_URL_2">Project Title 2</a>
  </div>

  <p class="project-summary">
    Summary line for project 2 (method-focused).
  </p>

  <div class="project-figure">
    <img src="assets/img/PROJECT2_FIG.png" alt="Project figure">
  </div>

  <p class="project-meta">
    <strong>Representative publication:</strong>
    <a href="PAPER_URL_2">Paper Title 2</a>
  </p>

  <p class="project-meta">
    <strong>Related code:</strong>
    <a href="CODE_URL_2">GitHub repository</a>
  </p>
</div>