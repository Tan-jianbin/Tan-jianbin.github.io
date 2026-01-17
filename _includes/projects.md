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

/* Project title (orange). If you don't want it clickable, remove <a> in HTML. */
.project-title{
  font-size: 1.35rem;
  font-weight: 800;
  margin: 0 0 6px 0;
}
.project-title a{
  text-decoration: none;
  color: orange;
}
.project-title a:hover{
  color: orange;
  text-decoration: underline;
}

/* Summary */
.project-summary{
  margin: 0 0 10px 0;
  line-height: 1.55;
}

/* Figure */
.project-figure{ margin: 0 0 10px 0; }
.project-figure img{
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}

/* Meta lines */
.project-meta{
  margin: 0 0 6px 0;
  line-height: 1.45;
  text-align: left !important;
}

/* Label style: bold ONLY */
.project-label{
  font-weight: 800;
  font-style: normal;
}

/* Publication rows */
.pub-list{
  margin-top: 6px;
  text-align: left !important;
}
.pub-row{
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  gap: 12px;
  margin: 6px 0;
}
.pub-title a{ text-decoration: none; }
.pub-title a:hover{ text-decoration: underline; }

/* Journal badge: boxed, no special color */
.pub-badge{
  display: inline-block;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  line-height: 1.2;

  color: inherit;
  border: 1px solid rgba(255,255,255,.35);
  background: transparent;

  white-space: nowrap;
  min-width: 0;
  text-align: left;
}

/* Related code: clickable name with underline to indicate link */
.code-item{
  margin-right: 14px;
  white-space: nowrap;
}
.code-item a{
  text-decoration: underline;   /* always show underline */
}
.code-item a:hover{
  text-decoration: underline;   /* keep underline on hover */
}
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
    <a href="">Health Data Analysis</a>
  </div>

  <p class="project-summary">
    This project develops statistical methods for electronic health records with complex missingness and irregular sampling,
    with an emphasis on generative modeling, representation learning, structure-aware imputation, and reliable downstream tasks for prediction and inference.
  </p>

  <div class="project-figure">
    <img src="assets/img/PROJECT1_FIG.png" alt="Project figure">
  </div>

  <!-- Representative publications -->
  <div class="project-meta">
    <span class="project-label">Representative publications:</span>

    <div class="pub-list">
      <div class="pub-row">
        <span class="pub-title">
          <a href="https://arxiv.org/abs/2508.13831">Smooth Flow Matching</a>
        </span>
        <span class="pub-badge">Preprint</span>
      </div>

      <div class="pub-row">
        <span class="pub-title">
          <a href="https://arxiv.org/abs/2410.03619">Functional-SVD for Heterogeneous Trajectories: Case Studies in Health</a>
        </span>
        <span class="pub-badge">Preprint</span>
      </div>

      <div class="pub-row">
        <span class="pub-title">
          <a href="https://doi.org/10.1016/j.jbi.2025.104933">Integrated Analysis for Electronic Health Records with Structured and Sporadic Missingness</a>
        </span>
        <span class="pub-badge">JBI</span>
      </div>
    </div>
  </div>

  <!-- Related code: name itself is linked and underlined -->
  <p class="project-meta">
    <span class="project-label">Related code:</span>

    <span class="code-item">
      <a href="https://github.com/Jianbin-Tan/Smooth-Flow-Matching">Smooth Flow Matching</a>
    </span>

    <span class="code-item">
      <a href="https://github.com/Jianbin-Tan/Functional-Singular-Value-Decompostion">Functional Singular Value Decomposition</a>
    </span>

    <span class="code-item">
      <a href="https://github.com/Tan-jianbin/Macomss">Matrix Completion with Structured and Sporadic Missingness</a>
    </span>
  </p>
</div>

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

  <div class="project-meta">
    <span class="project-label">Representative publications:</span>

    <div class="pub-list">
      <div class="pub-row">
        <span class="pub-title">
          <a href="PAPER_URL_2">Paper Title 2</a>
        </span>
        <span class="pub-badge">Journal</span>
      </div>
    </div>
  </div>

  <p class="project-meta">
    <span class="project-label">Related code:</span>
    <span class="code-item">
      <a href="CODE_URL_2">GitHub repository</a>
    </span>
  </p>
</div>