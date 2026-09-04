将学校分组之间的间距从 `30px` 缩小到 `18px`，学校名称与地点也稍微收紧：

```html
<style>
.teaching-card{
  margin: 26px 0 45px 0;
  padding: 0;
}
.teaching-school{
  margin-bottom: 18px;
}
.teaching-school:last-child{
  margin-bottom: 0;
}
.teaching-school-name{
  margin: 0 0 2px 0;
  font-size: 1.15rem;
  font-weight: 700;
}
.teaching-school-location{
  margin: 0 0 10px 0;
  color: #666;
  font-size: 0.95rem;
}
.teaching-school ul{
  margin: 0;
  padding-left: 22px;
}
.teaching-school li{
  margin: 0 0 12px 0;
  padding-left: 4px;
  line-height: 1.5;
}
.teaching-school li:last-child{
  margin-bottom: 0;
}
.teaching-term{
  font-weight: 600;
}
.teaching-course{
  font-style: italic;
}
</style>

<div class="teaching-card">

  <section class="teaching-school">
    <h3 class="teaching-school-name">Duke University</h3>
    <p class="teaching-school-location">
      Durham, North Carolina, USA
    </p>

    <ul>
      <li>
        <span class="teaching-term">Fall 2026</span> — Graduate Teaching Assistant,
        BIOSTAT/STAT/COMPSCI
        <span class="teaching-course">High-Dimensional Statistics and Machine Learning</span>.
      </li>

      <li>
        <span class="teaching-term">Fall 2024</span> — Graduate Teaching Assistant,
        BIOSTAT/STAT/COMPSCI
        <span class="teaching-course">High-Dimensional Statistics and Machine Learning</span>.
      </li>
    </ul>
  </section>

  <section class="teaching-school">
    <h3 class="teaching-school-name">Sun Yat-sen University</h3>
    <p class="teaching-school-location">
      Guangzhou, Guangdong, China
    </p>

    <ul>
      <li>
        <span class="teaching-term">Spring 2021</span> — Undergraduate Teaching Assistant,
        STAT/APPLIED STAT
        <span class="teaching-course">Survival Analysis</span>.
      </li>

      <li>
        <span class="teaching-term">Fall 2019</span> — Undergraduate Teaching Assistant,
        STAT/APPLIED STAT
        <span class="teaching-course">Multivariate Statistical Analysis</span>.
      </li>

      <li>
        <span class="teaching-term">Spring 2018 and Spring 2019</span> —
        Undergraduate Teaching Assistant, STAT/APPLIED STAT
        <span class="teaching-course">Statistical Computation</span>.
      </li>
    </ul>
  </section>

</div>
```