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
    background: transparent;                 /* 底色跟网页一样 */
    color: #1f6feb;                          /* 蓝色字 */
    border: 2px solid rgba(31,111,235,.55);  /* 蓝色边框 */

    padding: 14px 22px;
    font-size: 18px;
    line-height: 1.1;
    border-radius: 999px;
    font-weight: 700;
    cursor: pointer;
    margin-right: 14px;
  }

  .rp-tab:hover{
    border-color: rgba(31,111,235,.85);
  }

  .rp-tab.active{
    background: transparent;                 /* 仍然不填充 */
    color: #1f6feb;
    border-color: #1f6feb;
    box-shadow: 0 0 0 3px rgba(31,111,235,.18); /* 选中更明显 */
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