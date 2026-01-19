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

/* IMPORTANT: avoid conflict with theme's .pub-title by using proj-pub-title */
.proj-pub-title a{ text-decoration: none; }
.proj-pub-title a:hover{ text-decoration: underline; }

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

/* Related code: underlined, but NOT blue */
.code-item{
  margin-right: 14px;
  white-space: nowrap;
}
.code-item a,
.code-item a:visited{
  color: inherit;
  text-decoration: underline;
}
.code-item a:hover{
  color: inherit;
  text-decoration: underline;
}
</style>


<!-- ===================== -->
<!-- Group 1: Applications -->
<!-- ===================== -->
<div class="project-group">Application</div>
<p class="project-group-note">
  Projects organized by application domains.
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
    <img src="assets/img/ehr.jpg" alt="Project figure">
  </div>

  <div class="project-meta">
    <span class="project-label">Representative publications:</span>

    <div class="pub-list">
      <div class="pub-row">
        <span class="proj-pub-title">
          <a href="https://arxiv.org/abs/2508.13831">Smooth Flow Matching</a>
        </span>
        <span class="pub-badge">Preprint</span>
      </div>

      <div class="pub-row">
        <span class="proj-pub-title">
          <a href="https://arxiv.org/abs/2410.03619">Functional-SVD for Heterogeneous Trajectories: Case Studies in Health</a>
        </span>
        <span class="pub-badge">Preprint</span>
      </div>

      <div class="pub-row">
        <span class="proj-pub-title">
          <a href="https://doi.org/10.1016/j.jbi.2025.104933">Integrated Analysis for Electronic Health Records with Structured and Sporadic Missingness</a>
        </span>
        <span class="pub-badge">JBI</span>
      </div>
    </div>
  </div>

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

<!-- Project 2 (Group 1) -->
<div class="project-item">
  <div class="project-title">
    <a href="">Epidemiologic Data Analysis</a>
  </div>

  <p class="project-summary">
    This project develops statistical methods for dynamic epidemiologic and public health data, including causal inference,
    transmission modeling, and longitudinal association discovery, to characterize time-varying effects and enable reliable
    inference and public health evaluation.
  </p>

  <div class="project-figure">
    <img src="assets/img/epi.jpg" alt="Project figure">
  </div>

  <div class="project-meta">
    <span class="project-label">Representative publications:</span>

    <div class="pub-list">
      <div class="pub-row">
        <span class="proj-pub-title">
          <a href="https://doi.org/10.1080/01621459.2021.1897015">The Effects of Stringent and Mild Interventions for Coronavirus Pandemic</a>
        </span>
        <span class="pub-badge">JASA</span>
      </div>

      <div class="pub-row">
        <span class="proj-pub-title">
          <a href="https://doi.org/10.1017/S0950268822001467">Transmission Roles of Symptomatic and Asymptomatic COVID-19 Cases: A Modelling Study</a>
        </span>
        <span class="pub-badge">I&amp;E</span>
      </div>

      <div class="pub-row">
        <span class="proj-pub-title">
          <a href="https://doi.org/10.1214/24-AOAS1989">Functional Clustering for Longitudinal Associations between Social Determinants of Health and Stroke Mortality in the U.S.</a>
        </span>
        <span class="pub-badge">AOAS</span>
      </div>

      <div class="pub-row">
        <span class="proj-pub-title">
          <a href="https://doi.org/10.1111/biom.13814">Age-Related Model for Estimating the Symptomatic and Asymptomatic Transmissibility of COVID-19 Patients</a>
        </span>
        <span class="pub-badge">BIOM</span>
      </div>
    </div>
  </div>

  <p class="project-meta">
    <span class="project-label">Related code:</span>

    <span class="code-item">
      <a href="https://github.com/tingT0929/The-Effects-of-Stringent-and-Mild-Interventions">Causal Inference for Epidemic Interventions</a>
    </span>

    <span class="code-item">
      <a href="https://github.com/fl81224/Functional-Clustering-of-Longitudinal-Associations?tab=readme-ov-file">Functional Clustering of Longitudinal Associations</a>
    </span>

    <span class="code-item">
      <a href="https://github.com/Jianbin-Tan/Age-related-Model-for-COVID-19-Epidemic">Age-Stratified Epidemic Model</a>
    </span>
  </p>
</div>

<!-- Project 3 (Group 1) -->
<div class="project-item">
  <div class="project-title">
    <a href="">Environmental Daily Curve Analysis</a>
  </div>

  <p class="project-summary">
    This project develops statistical methods for environmental daily curve data, commonly modeled as functional time series, which exhibit complex multi-way
    dependencies due to complicated environmental measurement processes. We focus on dependence-adaptive dimension reduction and frequency-domain approaches
    for dependence-aware inference, enabling tasks such as prediction, graph/network inference, and data integration.
  </p>

  <div class="project-figure">
    <img src="assets/img/PM25.jpg" alt="Project figure">
  </div>

  <div class="project-meta">
    <span class="project-label">Representative publications:</span>

    <div class="pub-list">
      <div class="pub-row">
        <span class="proj-pub-title">
          <a href="https://www.tandfonline.com/doi/full/10.1080/01621459.2024.2302198">Graphical Principal Component Analysis of Multivariate Functional Time Series</a>
        </span>
        <span class="pub-badge">JASA</span>
      </div>

      <div class="pub-row">
        <span class="proj-pub-title">
          <a href="https://arxiv.org/abs/2408.02343">A Unified Principal Components Analysis of Functional Time Series</a>
        </span>
        <span class="pub-badge">Preprint</span>
      </div>

      <div class="pub-row">
        <span class="proj-pub-title">
          <a href="https://doi.org/10.1002/sta4.70140">A Frequency-Domain Approach for Integrating Multiple Functional Time Series</a>
        </span>
        <span class="pub-badge">STAT</span>
      </div>
    </div>
  </div>

  <p class="project-meta">
    <span class="project-label">Related code:</span>

    <span class="code-item">
      <a href="https://github.com/Jianbin-Tan/GFPCA">Graphical Functional Principal Component Analysis</a>
    </span>
  </p>
</div>

<hr class="project-divider">


<!-- ===================== -->
<!-- Group 2: Methods      -->
<!-- ===================== -->
<div class="project-group">Statistical Method</div>
<p class="project-group-note">
  Projects organized by methodological themes.
</p>

<!-- Project 1 (Group 2) -->
<div class="project-item">
  <div class="project-title">
    <a href="">Functional Data Analysis</a>
  </div>

  <p class="project-summary">
    This research develops statistical learning methods for functional data, treating each observation as a random function for statistical analysis.
    We emphasize model-free approaches that provide structural adaptivity and accommodate irregular sampling—key challenges in modern functional data analysis.
  </p>
  
  <div class="project-figure">
    <img src="assets/img/fda.jpg" alt="Project figure">
  </div>

  <div class="project-meta">
    <span class="project-label">Representative publications:</span>

    <div class="pub-list">
      <div class="pub-row">
        <span class="proj-pub-title">
          <a href="https://arxiv.org/abs/2508.13831">Smooth Flow Matching</a>
        </span>
        <span class="pub-badge">Preprint</span>
      </div>

      <div class="pub-row">
        <span class="proj-pub-title">
          <a href="https://arxiv.org/abs/2410.03619">Functional-SVD for Heterogeneous Trajectories: Case Studies in Health</a>
        </span>
        <span class="pub-badge">Preprint</span>
      </div>

      <div class="pub-row">
        <span class="proj-pub-title">
          <a href="https://doi.org/10.1214/24-AOAS1989">Functional Clustering for Longitudinal Associations between Social Determinants of Health and Stroke Mortality in the U.S.</a>
        </span>
        <span class="pub-badge">AOAS</span>
      </div>

      <div class="pub-row">
        <span class="proj-pub-title">
          <a href="https://www.tandfonline.com/doi/full/10.1080/01621459.2024.2302198">Graphical Principal Component Analysis of Multivariate Functional Time Series</a>
        </span>
        <span class="pub-badge">JASA</span>
      </div>

      <div class="pub-row">
        <span class="proj-pub-title">
          <a href="https://arxiv.org/abs/2408.02343">A Unified Principal Components Analysis of Functional Time Series</a>
        </span>
        <span class="pub-badge">Preprint</span>
      </div>
    </div>
  </div>

  <p class="project-meta">
    <span class="project-label">Related code:</span>

    <span class="code-item">
      <a href="https://github.com/Jianbin-Tan/Smooth-Flow-Matching">Smooth Flow Matching</a>
    </span>

    <span class="code-item">
      <a href="https://github.com/Jianbin-Tan/Functional-Singular-Value-Decompostion">Functional Singular Value Decomposition</a>
    </span>

    <span class="code-item">
      <a href="https://github.com/fl81224/Functional-Clustering-of-Longitudinal-Associations?tab=readme-ov-file">Functional Clustering of Longitudinal Associations</a>
    </span>

    <span class="code-item">
      <a href="https://github.com/Jianbin-Tan/GFPCA">Graphical Functional Principal Component Analysis</a>
    </span>
  </p>
</div>

<!-- Project 2 (Group 2) -->
<div class="project-item">
  <div class="project-title">
    <a href="">Statistical Modeling/Learning of Differential Equations</a>
  </div>

  <p class="project-summary">
    This research focuses on developing statistical methods for differential equation modeling and learning, including parameter estimation and vector field inference,
    as well as differential-equation–based generative modeling and other related tasks.
  </p>
  
  <div class="project-figure">
    <img src="assets/img/ode.jpg" alt="Project figure">
  </div>

  <div class="project-meta">
    <span class="project-label">Representative publications:</span>

    <div class="pub-list">
      <div class="pub-row">
        <span class="proj-pub-title">
          <a href="https://doi.org/10.1093/jrsssb/qkae031">Green’s Matching: an Efficient Approach to Parameter Estimation in Complex Dynamic Systems</a>
        </span>
        <span class="pub-badge">JRSSB</span>
      </div>

      <div class="pub-row">
        <span class="proj-pub-title">
          <a href="https://arxiv.org/abs/2508.13831">Smooth Flow Matching</a>
        </span>
        <span class="pub-badge">Preprint</span>
      </div>

      <div class="pub-row">
        <span class="proj-pub-title">
          <a href="https://arxiv.org/abs/2507.20072">Sparse Equation Matching: a Derivative-Free Learning for General-Order Dynamical Systems</a>
        </span>
        <span class="pub-badge">Preprint</span>
      </div>

      <div class="pub-row">
        <span class="proj-pub-title">
          <a href="https://doi.org/10.1111/biom.13814">Age-Related Model for Estimating the Symptomatic and Asymptomatic Transmissibility of COVID-19 Patients</a>
        </span>
        <span class="pub-badge">BIOM</span>
      </div>
    </div>
  </div>

  <p class="project-meta">
    <span class="project-label">Related code:</span>

    <span class="code-item">
      <a href="https://github.com/Jianbin-Tan/Statistical-Inference-in-General-order-Dynamic-Systems">Green's Matching</a>
    </span>

    <span class="code-item">
      <a href="https://github.com/Jianbin-Tan/Smooth-Flow-Matching">Smooth Flow Matching</a>
    </span>

    <span class="code-item">
      <a href="https://github.com/Jianbin-Tan/Age-related-Model-for-COVID-19-Epidemic">Age-Stratified Epidemic Model</a>
    </span>
  </p>
</div>