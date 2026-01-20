---
layout: homepage
---

## Welcome to Jia<n style="color: orange;">nbin's homepage!

I am currently a [Postdoctoral Associate](https://biostat.duke.edu/profile/jianbin-tan) in the Department of Biostatistics & Bioinformatics, Duke University, supervised by Prof. [Anru Zhang](https://anruzhang.github.io) and Prof. [Pixu Shi](https://pixushi.github.io). I received my PhD in Statistics from Sun Yat-sen University in 2023, advised by Prof. [Hui Huang](http://cfas.ruc.edu.cn/kydw/zzyjy/hh/index.htm). I was a [visiting student](https://statlab905.github.io/author/jianbin-tan/) working with Prof. [Xueqin Wang](https://bs.ustc.edu.cn/english/profile.php?id=650) in the School of Management, USTC, in 2022.

My research interests lie in statistical learning for data with <span style="color: orange;">dynamic, longitudinal, or functional structures</span>. Such data often exhibit complicated intrinsic mechanisms, dependencies, and heterogeneity, as well as challenges from noise, irregular sampling, and from high- or infinite-dimensionality. To address these, I focus on developing new methodologies for statistical learning of  <span style="color: orange;"> functions, opearators, and differential equations</span>, supporting effective analysis in health, epidemiology, and environmental science.

<!-- Tabs -->
<div class="rp-tabs" style="margin: 18px 0;">
  <button type="button" class="rp-tab active" data-target="tab-projects">Research</button>
  <button type="button" class="rp-tab" data-target="tab-papers">Publications</button>
</div>

<div id="tab-projects" class="rp-tabcontent">
  {% include_relative _includes/projects.md %}
</div>

<div id="tab-papers" class="rp-tabcontent" style="display:none;">
  {% include_relative _includes/publications.md %}
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
</style>

<script>
  (function () {
    const tabs = document.querySelectorAll(".rp-tab");
    const panels = document.querySelectorAll(".rp-tabcontent");

    tabs.forEach(btn => {
      btn.addEventListener("click", () => {
        tabs.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const target = btn.getAttribute("data-target");
        panels.forEach(p => p.style.display = (p.id === target ? "" : "none"));
      });
    });
  })();
</script>