---
layout: homepage
---

## Welcome to Jia<span style="color: orange;">nbin's homepage!</span>

I am currently a [Postdoctoral Associate](https://biostat.duke.edu/profile/jianbin-tan) in the Department of Biostatistics & Bioinformatics at Duke University, working with Prof. [Anru Zhang](https://anruzhang.github.io) and Prof. [Pixu Shi](https://pixushi.github.io). I received my Ph.D. in Statistics from Sun Yat-sen University in 2023 under the supervision of Prof. [Hui Huang](http://cfas.ruc.edu.cn/kydw/zzyjy/hh/index.htm). 

I received the [Outstanding Doctoral Thesis Award](https://mp.weixin.qq.com/s/p0YuztNT93S-eUhu0AwBYg) (2023), the [IMS New Researcher Travel Award](https://imstat.org/ims-awards/ims-awards-recipients/) (2026), and the [ICSA Travel Award](https://symposium2026.icsa.org/nsf-travel-award-for-icsa/) (2026).

I am interested in developing <span style="color: orange;">statistical and generative AI methods</span> for dynamic, longitudinal, and spatiotemporal data, supporting analysis in health, environmental, and epidemiological sciences.

<!-- I was a [visiting student](https://statlab905.github.io/author/jianbin-tan/) working with Prof. [Xueqin Wang](https://bs.ustc.edu.cn/english/profile.php?id=650) in the School of Management, USTC, in 2022.
My research interests lie in statistical learning for data with dynamic, longitudinal, or functional structures. Such data often exhibit complicated dependencies and heterogeneity, as well as challenges arising from irregular sampling and high/infinite-dimensionality. To address these, I focus on developing new methodologies for learning with  <span style="color: orange;"> functions, flows, and differential equations</span>, supporting effective analysis in health, epidemiology, and environmental science.-->

<!-- Tabs -->
<div class="rp-tabs" role="tablist" aria-label="Homepage sections" style="margin: 18px 0;">
  <button type="button" id="tab-button-projects" class="rp-tab active" role="tab" aria-selected="true" aria-controls="tab-projects" data-target="tab-projects">Research</button>
  <button type="button" id="tab-button-papers" class="rp-tab" role="tab" aria-selected="false" aria-controls="tab-papers" data-target="tab-papers">Publications</button>
  <button type="button" id="tab-button-teaching" class="rp-tab" role="tab" aria-selected="false" aria-controls="tab-teaching" data-target="tab-teaching">Teaching</button>
</div>

<div id="tab-projects" class="rp-tabcontent" role="tabpanel" aria-labelledby="tab-button-projects">
  {% include_relative _includes/projects.md %}
</div>

<div id="tab-papers" class="rp-tabcontent" role="tabpanel" aria-labelledby="tab-button-papers" style="display:none;">
  {% include_relative _includes/publications.md %}
</div>

<div id="tab-teaching" class="rp-tabcontent" role="tabpanel" aria-labelledby="tab-button-teaching" style="display:none;">
  {% include_relative _includes/teaching.md %}
</div>

<style>
  /* Use the same blue as links (fallback provided) */
  .rp-tabs { color: var(--link-color, #4aa3ff); }

  .rp-tab{
    background: rgba(74, 163, 255, 0.10);   /* subtle fill */
    color: currentColor;
    border: 2px solid currentColor;         /* thicker border */

    padding: 10px 22px;                     /* bigger button */
    font-size: 18px;                        /* larger text */
    line-height: 1.1;
    border-radius: 999px;
    font-weight: 800;                       /* bolder text */
    cursor: pointer;
    margin-right: 14px;

    box-shadow: 0 8px 18px rgba(0,0,0,0.10);
    transition: transform .12s ease, box-shadow .12s ease, background .12s ease;
  }

  .rp-tab:hover{
    background: rgba(74, 163, 255, 0.18);
    transform: translateY(-1px);
    box-shadow: 0 12px 26px rgba(0,0,0,0.14);
  }

  .rp-tab.active{
    background: rgba(74, 163, 255, 0.22);
    box-shadow: 0 0 0 3px rgba(74, 163, 255, 0.25), 0 12px 26px rgba(0,0,0,0.14);
  }

  @media (max-width: 600px) {
    .rp-tabs { display: flex; flex-wrap: wrap; gap: 8px; }
    .rp-tab { margin-right: 0; padding: 9px 11px; font-size: 15px; }
  }
</style>

<script>
  (function () {
    const tabs = document.querySelectorAll(".rp-tab");
    const panels = document.querySelectorAll(".rp-tabcontent");

    tabs.forEach(btn => {
      btn.addEventListener("click", () => {
        tabs.forEach(b => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");

        const target = btn.getAttribute("data-target");
        panels.forEach(p => p.style.display = (p.id === target ? "" : "none"));
      });
    });
  })();
</script>
