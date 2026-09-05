(function () {
  "use strict";

  const gameRoot = document.getElementById("gameExperience");
  if (!gameRoot) return;

  const GRID_SIZE = 32;
  const MAX_POINTS = 10;

  const canvas = document.getElementById("heatmap");
  const context = canvas.getContext("2d");
  const panel = document.getElementById("gamePanel");
  const closeGameButton = document.getElementById("closeGame");
  const openGameCard = document.getElementById("openGameCard");
  const gameLibrary = document.getElementById("gameLibrary");
  const thumbnail = document.getElementById("gameThumbnail");
  const thumbnailContext = thumbnail.getContext("2d");
  const undoButton = document.getElementById("undoBtn");
  const newMapButton = document.getElementById("newBtn");
  const reconstructButton = document.getElementById("reconstructBtn");
  const sampleCount = document.getElementById("sampleCount");
  const rmseValue = document.getElementById("rmseValue");
  const bestValue = document.getElementById("bestValue");
  const gameHelp = document.getElementById("gameHelp");
  const attemptList = document.getElementById("attemptList");
  const resultNote = document.getElementById("resultNote");
  const mapShield = document.getElementById("mapShield");
  const viewTabs = Array.from(document.querySelectorAll(".game-view-tab"));

  let seed = 73421;
  let target = [];
  let reconstruction = null;
  let selected = [];
  let currentView = "target";
  let attempts = [];
  let improvementStreak = 0;
  let lastReconstructedCount = 0;
  let completed = false;
  let mapBest = null;

  function random() {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  }

  function generateSurface() {
    const bumps = Array.from({ length: 4 }, function (_, index) {
      return {
        x: 0.12 + random() * 0.76,
        y: 0.12 + random() * 0.76,
        sx: 0.09 + random() * 0.16,
        sy: 0.09 + random() * 0.16,
        amp: index === 3 ? -0.55 : 0.65 + random() * 0.65
      };
    });

    const raw = [];
    for (let y = 0; y < GRID_SIZE; y += 1) {
      for (let x = 0; x < GRID_SIZE; x += 1) {
        const px = x / (GRID_SIZE - 1);
        const py = y / (GRID_SIZE - 1);
        let value = 0.16 * px - 0.11 * py + 0.06 * Math.sin(px * 7 + py * 3);

        bumps.forEach(function (bump) {
          const dx = (px - bump.x) / bump.sx;
          const dy = (py - bump.y) / bump.sy;
          value += bump.amp * Math.exp(-0.5 * (dx * dx + dy * dy));
        });

        raw.push(value);
      }
    }

    const low = Math.min.apply(null, raw);
    const high = Math.max.apply(null, raw);
    return raw.map(function (value) {
      return (value - low) / (high - low);
    });
  }

  function surfaceId(values) {
    return values.slice(0, 48).reduce(function (hash, value) {
      return ((hash * 31) + Math.round(value * 10000)) >>> 0;
    }, 2166136261).toString(16);
  }

  const colorStops = [
    [16, 38, 84],
    [31, 119, 180],
    [55, 191, 198],
    [242, 205, 93],
    [232, 111, 53]
  ];

  function heatColor(value) {
    const normalized = Math.max(0, Math.min(1, value));
    const position = normalized * (colorStops.length - 1);
    const index = Math.min(colorStops.length - 2, Math.floor(position));
    const amount = position - index;
    const rgb = colorStops[index].map(function (channel, channelIndex) {
      return Math.round(channel + (colorStops[index + 1][channelIndex] - channel) * amount);
    });
    return "rgb(" + rgb.join(",") + ")";
  }

  function renderThumbnail() {
    thumbnail.dataset.surfaceId = surfaceId(target);
    const cellWidth = thumbnail.width / GRID_SIZE;
    const cellHeight = thumbnail.height / GRID_SIZE;

    for (let y = 0; y < GRID_SIZE; y += 1) {
      for (let x = 0; x < GRID_SIZE; x += 1) {
        thumbnailContext.fillStyle = heatColor(target[y * GRID_SIZE + x]);
        thumbnailContext.fillRect(x * cellWidth, y * cellHeight, cellWidth + 0.5, cellHeight + 0.5);
      }
    }
  }

  function renderHeatmap(values) {
    const cell = canvas.width / GRID_SIZE;
    for (let y = 0; y < GRID_SIZE; y += 1) {
      for (let x = 0; x < GRID_SIZE; x += 1) {
        context.fillStyle = heatColor(values[y * GRID_SIZE + x]);
        context.fillRect(x * cell, y * cell, cell + 0.6, cell + 0.6);
      }
    }

    if (currentView !== "target") return;

    selected.forEach(function (point, index) {
      const centerX = (point.x + 0.5) * cell;
      const centerY = (point.y + 0.5) * cell;
      const radius = cell * 0.54;

      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.fillStyle = "rgba(255,255,255,0.96)";
      context.fill();
      context.lineWidth = 3;
      context.strokeStyle = "#043361";
      context.stroke();
      context.fillStyle = "#043361";
      context.font = "700 " + Math.max(15, cell * 0.68) + "px Ubuntu Mono, monospace";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(index + 1, centerX, centerY + 0.5);
    });
  }

  function renderVictory() {
    const width = canvas.width;
    const height = canvas.height;
    const confetti = ["#3eb7f0", "#e9932e", "#54bda5", "#f0c85a"];

    context.fillStyle = "#fff8df";
    context.fillRect(0, 0, width, height);

    for (let index = 0; index < 34; index += 1) {
      const x = (index * 83) % width;
      const y = (index * 137) % Math.round(height * 0.72);
      const size = 5 + (index % 4) * 2;
      context.save();
      context.translate(x, y);
      context.rotate((index % 7) * 0.34);
      context.fillStyle = confetti[index % confetti.length];
      context.fillRect(-size / 2, -size / 2, size, size * 1.8);
      context.restore();
    }

    const glow = context.createRadialGradient(width * 0.5, height * 0.45, 20, width * 0.5, height * 0.47, width * 0.25);
    glow.addColorStop(0, "#f6cf61");
    glow.addColorStop(0.48, "#42bec4");
    glow.addColorStop(1, "#196fa5");
    context.beginPath();
    context.arc(width * 0.5, height * 0.45, width * 0.22, 0, Math.PI * 2);
    context.fillStyle = glow;
    context.fill();
    context.lineWidth = 9;
    context.strokeStyle = "#043361";
    context.stroke();

    context.fillStyle = "#fff";
    context.beginPath();
    context.arc(width * 0.435, height * 0.41, 22, 0, Math.PI * 2);
    context.arc(width * 0.565, height * 0.41, 22, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = "#043361";
    context.beginPath();
    context.arc(width * 0.44, height * 0.415, 9, 0, Math.PI * 2);
    context.arc(width * 0.57, height * 0.415, 9, 0, Math.PI * 2);
    context.fill();
    context.beginPath();
    context.arc(width * 0.5, height * 0.48, 58, 0.15 * Math.PI, 0.85 * Math.PI);
    context.lineWidth = 10;
    context.lineCap = "round";
    context.strokeStyle = "#043361";
    context.stroke();

    context.textAlign = "center";
    context.fillStyle = "#043361";
    context.font = "600 42px Crimson Pro, serif";
    context.fillText("Challenge complete!", width * 0.5, height * 0.76);
    context.font = "700 18px Ubuntu Mono, monospace";
    context.fillStyle = "#5b7484";
    context.fillText("3 IMPROVEMENTS IN A ROW", width * 0.5, height * 0.815);
  }

  function kernel(first, second) {
    const dx = (first.x - second.x) / (GRID_SIZE - 1);
    const dy = (first.y - second.y) / (GRID_SIZE - 1);
    const lengthScale = 0.21;
    return Math.exp(-(dx * dx + dy * dy) / (2 * lengthScale * lengthScale));
  }

  function solve(matrix, values) {
    const size = values.length;
    const augmented = matrix.map(function (row, index) {
      return row.concat(values[index]);
    });

    for (let column = 0; column < size; column += 1) {
      let pivot = column;
      for (let row = column + 1; row < size; row += 1) {
        if (Math.abs(augmented[row][column]) > Math.abs(augmented[pivot][column])) pivot = row;
      }

      const temporary = augmented[column];
      augmented[column] = augmented[pivot];
      augmented[pivot] = temporary;

      const divisor = augmented[column][column] || 1e-9;
      for (let item = column; item <= size; item += 1) augmented[column][item] /= divisor;

      for (let row = 0; row < size; row += 1) {
        if (row === column) continue;
        const factor = augmented[row][column];
        for (let item = column; item <= size; item += 1) {
          augmented[row][item] -= factor * augmented[column][item];
        }
      }
    }

    return augmented.map(function (row) {
      return row[size];
    });
  }

  function reconstruct(points) {
    const mean = points.reduce(function (sum, point) {
      return sum + point.value;
    }, 0) / points.length;

    const matrix = points.map(function (first, rowIndex) {
      return points.map(function (second, columnIndex) {
        return kernel(first, second) + (rowIndex === columnIndex ? 0.004 : 0);
      });
    });
    const alpha = solve(matrix, points.map(function (point) {
      return point.value - mean;
    }));
    const prediction = [];

    for (let y = 0; y < GRID_SIZE; y += 1) {
      for (let x = 0; x < GRID_SIZE; x += 1) {
        let value = mean;
        points.forEach(function (point, index) {
          value += kernel({ x: x, y: y }, point) * alpha[index];
        });
        prediction.push(Math.max(0, Math.min(1, value)));
      }
    }

    return prediction;
  }

  function calculateRmse(prediction, points) {
    const used = new Set(points.map(function (point) {
      return point.y * GRID_SIZE + point.x;
    }));
    let total = 0;
    let count = 0;

    target.forEach(function (value, index) {
      if (used.has(index)) return;
      total += Math.pow(value - prediction[index], 2);
      count += 1;
    });

    return Math.sqrt(total / count);
  }

  function addRandomPoint() {
    let x;
    let y;
    do {
      x = Math.floor(random() * GRID_SIZE);
      y = Math.floor(random() * GRID_SIZE);
    } while (selected.some(function (point) {
      return point.x === x && point.y === y;
    }));

    selected.push({ x: x, y: y, value: target[y * GRID_SIZE + x] });
  }

  function renderAttempts() {
    if (!attempts.length) {
      attemptList.innerHTML = '<span class="attempt-empty">No reconstructions yet</span>';
      return;
    }

    attemptList.innerHTML = attempts.map(function (attempt, index) {
      const improvedClass = attempt.improved ? " improved" : "";
      return '<span class="attempt-chip' + improvedClass + '">' + (index + 1) + ": " + (attempt.rmse * 100).toFixed(1) + "%</span>";
    }).join("");
  }

  function setView(view) {
    currentView = view;
    viewTabs.forEach(function (tab) {
      const isActive = tab.dataset.view === view;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });
  }

  function update() {
    const remaining = MAX_POINTS - selected.length;
    sampleCount.textContent = selected.length + " / " + MAX_POINTS;
    undoButton.disabled = completed;
    reconstructButton.disabled = completed || selected.length === lastReconstructedCount;

    if (completed) {
      gameHelp.innerHTML = "<strong>You passed this map.</strong> Start a new map to play again.";
    } else {
      gameHelp.innerHTML = "<strong>" + remaining + " sample" + (remaining === 1 ? "" : "s") + " remaining.</strong> <span>Press the Reconstruct button below to reconstruct.</span>";
    }

    renderAttempts();
    if (completed) {
      renderVictory();
    } else {
      renderHeatmap(currentView === "target" || !reconstruction ? target : reconstruction);
    }
  }

  function resetMap() {
    seed = (Date.now() + Math.floor(Math.random() * 1000000000)) >>> 0;
    target = generateSurface();
    canvas.dataset.surfaceId = surfaceId(target);
    selected = [];
    addRandomPoint();
    reconstruction = null;
    attempts = [];
    improvementStreak = 0;
    lastReconstructedCount = 0;
    completed = false;
    rmseValue.textContent = "—";
    mapBest = null;
    bestValue.textContent = "—";
    resultNote.classList.remove("show");
    viewTabs[0].disabled = false;
    viewTabs[1].disabled = true;
    setView("target");
    update();
  }

  function restartSampling() {
    selected = [];
    addRandomPoint();
    reconstruction = null;
    lastReconstructedCount = 0;
    completed = false;
    rmseValue.textContent = "—";
    resultNote.classList.remove("show");
    viewTabs[0].disabled = false;
    viewTabs[1].disabled = true;
    setView("target");
    update();
  }

  function selectPoint(event) {
    if (currentView !== "target" || completed || selected.length >= MAX_POINTS) return;

    const bounds = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(GRID_SIZE - 1, Math.floor((event.clientX - bounds.left) / bounds.width * GRID_SIZE)));
    const y = Math.max(0, Math.min(GRID_SIZE - 1, Math.floor((event.clientY - bounds.top) / bounds.height * GRID_SIZE)));
    const duplicate = selected.some(function (point) {
      return point.x === x && point.y === y;
    });
    if (duplicate) return;

    selected.push({ x: x, y: y, value: target[y * GRID_SIZE + x] });
    update();
  }

  async function finishReconstruction() {
    if (completed || selected.length === lastReconstructedCount) return;

    mapShield.classList.add("show");
    await new Promise(function (resolve) {
      window.setTimeout(resolve, 420);
    });

    reconstruction = reconstruct(selected);
    const rmse = calculateRmse(reconstruction, selected);
    const previous = attempts.length ? attempts[attempts.length - 1].rmse : undefined;
    const improved = previous !== undefined && rmse < previous - 1e-8;

    improvementStreak = improved ? improvementStreak + 1 : 0;
    attempts.push({ rmse: rmse, improved: improved });
    lastReconstructedCount = selected.length;
    rmseValue.textContent = (rmse * 100).toFixed(1) + "%";

    if (mapBest === null || rmse < mapBest) mapBest = rmse;
    bestValue.textContent = (mapBest * 100).toFixed(1) + "%";

    completed = improvementStreak >= 3;
    if (completed) {
      resultNote.textContent = "Three improvements in a row — map completed!";
      currentView = "victory";
      viewTabs.forEach(function (tab) {
        tab.disabled = true;
        tab.classList.remove("active");
        tab.setAttribute("aria-selected", "false");
      });
    } else {
      if (previous === undefined) {
        resultNote.textContent = "Baseline recorded. Add another observation and improve it.";
      } else if (improved) {
        resultNote.textContent = "Improved — " + improvementStreak + " of 3 in a row.";
      } else {
        resultNote.textContent = "No improvement this time. The streak starts again.";
      }
      viewTabs[0].disabled = false;
      viewTabs[1].disabled = false;
      setView("reconstruction");
    }

    resultNote.classList.add("show");
    mapShield.classList.remove("show");
    update();
  }

  canvas.addEventListener("pointerdown", selectPoint);
  undoButton.addEventListener("click", restartSampling);
  newMapButton.addEventListener("click", resetMap);
  reconstructButton.addEventListener("click", finishReconstruction);

  viewTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      if (tab.disabled || completed) return;
      setView(tab.dataset.view);
      update();
    });
  });

  openGameCard.addEventListener("click", function () {
    gameLibrary.hidden = true;
    panel.classList.remove("closed");
    resetMap();
  });

  closeGameButton.addEventListener("click", function () {
    panel.classList.add("closed");
    gameLibrary.hidden = false;
    openGameCard.focus();
  });

  target = generateSurface();
  renderThumbnail();
  bestValue.textContent = "—";
  update();
}());
