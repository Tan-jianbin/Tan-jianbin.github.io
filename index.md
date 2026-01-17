---
layout: homepage
---

## Welcome to Jia<n style="color: orange;">nbin's homepage!

I am currently a [Postdoctoral Associate](https://biostat.duke.edu/profile/jianbin-tan) in the Department of Biostatistics & Bioinformatics, Duke University, supervised by Prof. [Anru Zhang](https://anruzhang.github.io) and Prof. [Pixu Shi](https://pixushi.github.io). I received my PhD in Statistics from Sun Yat-sen University in 2023, advised by Prof. [Hui Huang](http://cfas.ruc.edu.cn/kydw/zzyjy/hh/index.htm). I was a [visiting student](https://statlab905.github.io/author/jianbin-tan/) working with Prof. [Xueqin Wang](https://bs.ustc.edu.cn/english/profile.php?id=650) in the School of Management, USTC, in 2022.

My research interests lie in statistical learning for data with <span style="color: orange;">dynamic, longitudinal, or functional structures</span>. Such data often exhibit complicated intrinsic mechanisms, dependencies, and heterogeneity, as well as challenges from noise, irregular sampling, and from high- or infinite-dimensionality. To address these, I focus on developing new methodologies for statistical learning of  <span style="color: orange;"> functions, opearators, and differential equations</span>, supporting effective analysis in health, epidemiology, and environmental science.
<!-- Tabs -->
<div class="rp-tabs" style="margin: 18px 0;">
  <button type="button" class="rp-tab active" data-target="tab-projects">Research Project</button>
  <button type="button" class="rp-tab" data-target="tab-papers">Research Paper</button>
</div>

<div id="tab-projects" class="rp-tabcontent">
  {% include_relative _includes/projects.md %}
</div>

<div id="tab-papers" class="rp-tabcontent" style="display:none;">
  {% include_relative _includes/publications.md %}
</div>

<style>
  .rp-tab{
    border: 1px solid rgba(255,255,255,.15);
    background: transparent;
    color: inherit;
    padding: 8px 12px;
    border-radius: 999px;
    font-weight: 600;
    cursor: pointer;
    margin-right: 10px;
  }
  .rp-tab.active{
    background: rgba(255,255,255,.10);
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