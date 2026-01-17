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
<!-- Project 1 (template)  -->
<!-- ===================== -->
<div class="project-item">

  <!-- 1) Title -->
  <div class="project-title">
    <a href="PROJECT_URL">Project Title</a>
  </div>

  <!-- 2) Summary -->
  <p class="project-summary">
    One–two sentences describing the problem, key idea, and outcome.
  </p>

  <!-- 3) Big figure -->
  <div class="project-figure">
    <img src="assets/img/PROJECT1_FIG.png" alt="Project figure">
  </div>

  <!-- 4) Representative publication -->
  <p class="project-meta">
    <strong>Representative publication:</strong>
    <a href="PAPER_URL">Paper Title</a>
    <em>(Venue / status, Year)</em>
    &nbsp;|&nbsp;
    <a href="PAPER_URL">Paper</a>
    <a href="ARXIV_OR_DOI_URL">ArXiv/DOI</a>
  </p>

  <!-- 5) Related code -->
  <p class="project-meta">
    <strong>Related code:</strong>
    <a href="CODE_URL">GitHub repository</a>
    <!-- optional -->
    <!-- &nbsp;|&nbsp; <a href="DEMO_URL">Demo</a> -->
    <!-- &nbsp;|&nbsp; <a href="DOC_URL">Docs</a> -->
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