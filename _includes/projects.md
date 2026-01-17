<style>
.project-item{
  margin: 18px 0 28px 0;
}

/* 1) Title */
.project-title{
  font-size: 1.35rem;
  font-weight: 800;
  margin: 0 0 6px 0;
}
.project-title a{ text-decoration: none; }

/* 2) Summary */
.project-summary{
  margin: 0 0 10px 0;
  line-height: 1.55;
}

/* 3) Figure (same width as summary/text block) */
.project-figure{
  margin: 0 0 10px 0;
}
.project-figure img{
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}

/* 4/5) Links */
.project-meta{
  margin: 0 0 6px 0;
  line-height: 1.45;
}
.project-meta strong{ font-weight: 800; }
.project-meta a{ margin-right: 10px; }

/* Optional subtle separator */
.project-sep{
  border: none;
  border-top: 1px solid rgba(255,255,255,.12);
  margin: 16px 0 0 0;
}
</style>


<!-- ===================== -->
<!-- Project 1              -->
<!-- ===================== -->
<div class="project-item">

  <!-- 1) Title -->
  <div class="project-title">
    <a href="PROJECT_URL">Health Data Analysis</a>
  </div>

  <!-- 2) Summary -->
  <p class="project-summary">
    This project focuses on developing statistical methods for electronic health records under complex missingness patterns or sampling schemes,
with an emphasis on downstream representation learning for reliable prediction and inference.
  </p>

  <!-- 3) Big figure -->
  <div class="project-figure">
    <img src="assets/img/PROJECT1_FIG.png" alt="Project figure">
  </div>

  <!-- 4) Representative publication -->
  <p class="project-meta">
    <strong>Representative publications:</strong>
    <a href="https://arxiv.org/abs/2508.13831">Smooth Flow Matching</a>
    &nbsp;|&nbsp;
    <a href="https://arxiv.org/abs/2410.03619">Functional-SVD for Heterogeneous Trajectories: Case Studies in Health</a>
    &nbsp;|&nbsp;
    <a href="https://doi.org/10.1016/j.jbi.2025.104933">Integrated analysis for electronic health records with structured and sporadic missingness</a>
  </p>

  <!-- 5) Related code -->
  <p class="project-meta">
    <strong>Related code:</strong>
    <a href="https://github.com/Jianbin-Tan/Smooth-Flow-Matching">Smooth Flow Matching</a>
    &nbsp;|&nbsp;
    <a href="https://github.com/Jianbin-Tan/Functional-Singular-Value-Decompostion">Functional Singular Value Decomposition</a>
    &nbsp;|&nbsp;
    <a href="https://github.com/Tan-jianbin/Macomss">Matrix Completion with Structured and Sporadic Missingness</a>
  </p>

  <hr class="project-sep">
</div>


<!-- ===================== -->
<!-- Project 2 (template)  -->
<!-- ===================== -->
<div class="project-item">

  <div class="project-title">
    <a href="PROJECT_URL_2">Project Title 2</a>
  </div>

  <p class="project-summary">
    Summary line for project 2.
  </p>

  <div class="project-figure">
    <img src="assets/img/PROJECT2_FIG.png" alt="Project figure">
  </div>

  <p class="project-meta">
    <strong>Representative publication:</strong>
    <a href="PAPER_URL_2">Paper Title 2</a>
    <em>(Venue / status, Year)</em>
    &nbsp;|&nbsp;
    <a href="PAPER_URL_2">Paper</a>
  </p>

  <p class="project-meta">
    <strong>Related code:</strong>
    <a href="CODE_URL_2">GitHub repository</a>
  </p>

</div>