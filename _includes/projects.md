<!-- No <head> here (this is an include) -->
<style>
/* Match your publications layout */
.proj-row{
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  margin-bottom: 6px;
  border-bottom: none;
  padding-bottom: 6px;
}

.proj-figure{
  position: relative;
  padding-right: 15px;
  padding-left: 15px;
  max-width: 150px;
  max-height: 150px;
}

.proj-figure img{
  width: auto;
  height: auto;
  max-width: 150px;
  max-height: 150px;
  display:block;
}

.proj-badge{
  position:absolute;
  top: 6px;
  left: 18px;
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 12px;
  background: rgba(31,111,235,.90);
  color: #fff;
}

.proj-summary{
  margin-top: 6px;
}

.proj-links a{
  margin-right: 14px;
}
</style>

<!-- Optional: remove this header if you already show "Research Projects" elsewhere -->
<h2 id="projects" style="margin: 2px 0px -15px;">Research Projects</h2>

<div class="projects">
  <ol class="bibliography">

    <!-- ===================== -->
    <!-- Project 1 (template)  -->
    <!-- ===================== -->
    <li>
      <div class="proj-row">
        <!-- Left: figure + badge -->
        <div class="col-sm-3 abbr proj-figure">
          <img src="assets/img/PROJECT1.png" alt="Project figure">
          <span class="proj-badge">Project</span>
        </div>

        <!-- Right: title + summary + related paper -->
        <div class="col-sm-9" style="position: relative;padding-right: 15px;padding-left: 20px;">
          <div class="title">
            <a href="PROJECT_PAGE_OR_GITHUB_URL">Project Title (clickable)</a>
          </div>

          <div class="proj-summary">
            <em>Summary:</em>
            One–two sentences describing the problem, your key idea/method, and the main outcome.
          </div>

          <div class="periodical">
            <em>Related paper:</em>
            <a href="RELATED_PAPER_URL">Paper title / venue / year</a>
          </div>

          <div class="proj-links">
            <a href="PROJECT_PAGE_OR_GITHUB_URL">View Project</a>
            <a href="RELATED_PAPER_URL">View Paper</a>
            <!-- Optional extras -->
            <!-- <a href="DEMO_URL">Demo</a> -->
            <!-- <a href="SLIDES_URL">Slides</a> -->
          </div>
        </div>
      </div>
    </li>


    <!-- ===================== -->
    <!-- Project 2 (template)  -->
    <!-- ===================== -->
    <li>
      <div class="proj-row">
        <div class="col-sm-3 abbr proj-figure">
          <img src="assets/img/PROJECT2.png" alt="Project figure">
          <span class="proj-badge">Project</span>
        </div>

        <div class="col-sm-9" style="position: relative;padding-right: 15px;padding-left: 20px;">
          <div class="title">
            <a href="PROJECT_PAGE_OR_GITHUB_URL_2">Project Title 2</a>
          </div>

          <div class="proj-summary">
            <em>Summary:</em>
            One–two sentences summarizing the contribution and what users can do with it.
          </div>

          <div class="periodical">
            <em>Related paper:</em>
            <a href="RELATED_PAPER_URL_2">Paper title / venue / year</a>
          </div>

          <div class="proj-links">
            <a href="PROJECT_PAGE_OR_GITHUB_URL_2">View Project</a>
            <a href="RELATED_PAPER_URL_2">View Paper</a>
          </div>
        </div>
      </div>
    </li>

  </ol>
</div>