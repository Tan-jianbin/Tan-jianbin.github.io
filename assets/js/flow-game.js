(function () {
  "use strict";

  const root = document.getElementById("gameExperience");
  if (!root) return;

  const library = document.getElementById("gameLibrary");
  const panel = document.getElementById("flowGamePanel");
  const openButton = document.getElementById("openFlowGameCard");
  const closeButton = document.getElementById("closeFlowGame");
  const inputCanvas = document.getElementById("flowInputCanvas");
  const outputCanvas = document.getElementById("flowOutputCanvas");
  const fieldCanvas = document.getElementById("flowFieldCanvas");
  const thumbnailCanvas = document.getElementById("flowGameThumbnail");
  const newGameButton = document.getElementById("newFlowGameBtn");
  const runButton = document.getElementById("runFlowBtn");
  const hitsLabel = document.getElementById("flowHits");
  const rmseLabel = document.getElementById("flowRmse");
  const drawState = document.getElementById("flowDrawState");
  const outputState = document.getElementById("flowOutputState");

  if (!library || !panel || !openButton || !inputCanvas || !outputCanvas || !fieldCanvas || !thumbnailCanvas) return;

  const POINT_COUNT = 121;
  const FLOW_STEPS = 60;
  const TARGET_COUNT = 8;
  const REQUIRED_HITS = 6;
  const HIT_TOLERANCE = 0.085;
  const T_VALUES = Array.from({ length: POINT_COUNT }, function (_, index) {
    return index / (POINT_COUNT - 1);
  });

  const colors = {
    paper: "#fbfdfc",
    ink: "#18314a",
    muted: "#75808a",
    grid: "rgba(4, 51, 97, 0.14)",
    blue: "#166fa6",
    cyan: "#42bec4",
    gold: "#e7b848",
    red: "#d65245"
  };

  const colorStops = [
    [10, 45, 130],
    [0, 105, 190],
    [0, 193, 207],
    [37, 181, 91],
    [255, 221, 42],
    [238, 64, 35]
  ];

  let vectorField;
  let targets = [];
  let draftRaw = new Array(POINT_COUNT).fill(NaN);
  let draftCurve = null;
  let submittedCurve = null;
  let outputCurve = null;
  let targetHits = [];
  let drawing = false;
  let lastDrawPoint = null;
  let running = false;
  let fieldYaw = -0.34;
  let fieldPitch = 0.66;
  let rotatingField = false;
  let previousPointer = null;
  let fieldRenderFrame = null;
  let fieldSliceCache = [];
  let fieldMaximum = 1;

  function randomBetween(minimum, maximum) {
    return minimum + Math.random() * (maximum - minimum);
  }

  function fitCanvas(canvas) {
    const bounds = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(220, Math.round(bounds.width));
    const height = Math.max(170, Math.round(bounds.height));
    const pixelWidth = Math.round(width * ratio);
    const pixelHeight = Math.round(height * ratio);

    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
    }

    const context = canvas.getContext("2d");
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    canvas.flowWidth = width;
    canvas.flowHeight = height;
    return context;
  }

  function clearCanvas(context, canvas) {
    context.clearRect(0, 0, canvas.flowWidth, canvas.flowHeight);
    context.fillStyle = colors.paper;
    context.fillRect(0, 0, canvas.flowWidth, canvas.flowHeight);
  }

  function curvePlotBox(canvas) {
    return {
      left: 44,
      right: 14,
      top: 13,
      bottom: 36,
      width: canvas.flowWidth - 58,
      height: canvas.flowHeight - 49
    };
  }

  function curveX(box, t) {
    return box.left + t * box.width;
  }

  function curveY(box, value) {
    return box.top + (1 - (value + 1) / 2) * box.height;
  }

  function formatTick(value) {
    if (Math.abs(value) < 1e-8) return "0";
    if (Math.abs(value - Math.round(value)) < 1e-8) return String(Math.round(value));
    return value.toFixed(1);
  }

  function drawCurveAxes(context, canvas) {
    const box = curvePlotBox(canvas);
    context.save();
    context.font = "11px Ubuntu Mono, monospace";
    context.lineWidth = 0.65;
    context.strokeStyle = colors.grid;
    context.fillStyle = colors.muted;

    for (let index = 0; index <= 5; index += 1) {
      const t = index / 5;
      const x = curveX(box, t);
      context.beginPath();
      context.moveTo(x, box.top);
      context.lineTo(x, box.top + box.height);
      context.stroke();
      context.beginPath();
      context.moveTo(x, box.top + box.height);
      context.lineTo(x, box.top + box.height + 4);
      context.strokeStyle = colors.muted;
      context.stroke();
      context.strokeStyle = colors.grid;
      context.textAlign = "center";
      context.fillText(formatTick(t), x, box.top + box.height + 16);
    }

    for (let index = 0; index <= 4; index += 1) {
      const value = -1 + index * 0.5;
      const y = curveY(box, value);
      context.beginPath();
      context.moveTo(box.left, y);
      context.lineTo(box.left + box.width, y);
      context.stroke();
      context.beginPath();
      context.moveTo(box.left - 4, y);
      context.lineTo(box.left, y);
      context.strokeStyle = colors.muted;
      context.stroke();
      context.strokeStyle = colors.grid;
      context.textAlign = "right";
      context.fillText(formatTick(value), box.left - 7, y + 4);
    }

    context.strokeStyle = colors.muted;
    context.lineWidth = 0.85;
    context.beginPath();
    context.moveTo(box.left, box.top);
    context.lineTo(box.left, box.top + box.height);
    context.lineTo(box.left + box.width, box.top + box.height);
    context.stroke();

    context.textAlign = "center";
    context.fillText("Domain of function", box.left + box.width / 2, canvas.flowHeight - 5);
    context.save();
    context.translate(11, box.top + box.height / 2);
    context.rotate(-Math.PI / 2);
    context.fillText("Value of Function", 0, 0);
    context.restore();
    context.restore();
    return box;
  }

  function drawCurvePath(context, canvas, curve, color, width, alpha, dashed) {
    if (!curve) return;
    const box = curvePlotBox(canvas);
    context.save();
    context.strokeStyle = color;
    context.lineWidth = width;
    context.globalAlpha = alpha;
    context.lineCap = "round";
    context.lineJoin = "round";
    if (dashed) context.setLineDash([6, 5]);
    context.beginPath();
    curve.forEach(function (value, index) {
      if (!Number.isFinite(value)) return;
      const x = curveX(box, T_VALUES[index]);
      const y = curveY(box, value);
      if (index === 0 || !Number.isFinite(curve[index - 1])) context.moveTo(x, y);
      else context.lineTo(x, y);
    });
    context.stroke();
    context.restore();
  }

  function renderInput() {
    if (panel.classList.contains("closed")) return;
    const context = fitCanvas(inputCanvas);
    clearCanvas(context, inputCanvas);
    drawCurveAxes(context, inputCanvas);

    const hasDraft = drawing || Boolean(draftCurve);
    if (submittedCurve) {
      drawCurvePath(
        context,
        inputCanvas,
        submittedCurve,
        hasDraft ? colors.muted : colors.blue,
        hasDraft ? 1.7 : 2.8,
        hasDraft ? 0.72 : 1,
        hasDraft
      );
    }
    if (drawing) drawCurvePath(context, inputCanvas, draftRaw, colors.cyan, 2.2, 0.92, false);
    if (draftCurve) drawCurvePath(context, inputCanvas, draftCurve, colors.cyan, 2.8, 1, false);
  }

  function renderOutput(curve) {
    if (panel.classList.contains("closed")) return;
    const context = fitCanvas(outputCanvas);
    clearCanvas(context, outputCanvas);
    const box = drawCurveAxes(context, outputCanvas);

    targets.forEach(function (target, index) {
      const hit = Boolean(targetHits[index]);
      const x = curveX(box, target.t);
      const y = curveY(box, target.y);
      context.save();
      context.beginPath();
      context.arc(x, y, hit ? 5.7 : 4.7, 0, Math.PI * 2);
      context.fillStyle = hit ? colors.gold : colors.paper;
      context.fill();
      context.strokeStyle = colors.gold;
      context.lineWidth = hit ? 2.6 : 2;
      context.stroke();
      context.restore();
    });

    if (curve) drawCurvePath(context, outputCanvas, curve, colors.blue, 2.8, 1, false);
  }

  function createVectorField() {
    const phaseOne = randomBetween(0, Math.PI * 2);
    const phaseTwo = randomBetween(0, Math.PI * 2);
    const phaseFlow = randomBetween(0, Math.PI * 2);
    const amplitudeOne = randomBetween(0.5, 0.72);
    const amplitudeTwo = randomBetween(0.18, 0.34);
    const transportDirection = Math.random() < 0.5 ? -1 : 1;
    const transportBias = transportDirection * randomBetween(0.38, 0.58);
    const speed = randomBetween(1.35, 1.75);
    const xCoupling = randomBetween(0.1, 0.2);

    return function velocity(u, t, x) {
      const smoothDrive =
        transportBias +
        amplitudeOne * Math.sin(2 * Math.PI * t + phaseOne) +
        amplitudeTwo * Math.cos(4 * Math.PI * t + phaseTwo) +
        0.28 * Math.sin(2 * Math.PI * u + phaseFlow) +
        0.18 * Math.cos(Math.PI * (t + u) + phaseTwo) +
        xCoupling * Math.sin(Math.PI * x + phaseFlow);
      return speed * (1 - x * x) * Math.tanh(smoothDrive);
    };
  }

  function hiddenInitialCurve() {
    const phaseOne = randomBetween(0, Math.PI * 2);
    const phaseTwo = randomBetween(0, Math.PI * 2);
    const amplitudeOne = randomBetween(0.2, 0.4);
    const amplitudeTwo = randomBetween(0.08, 0.2);
    const shift = randomBetween(-0.22, 0.22);

    return T_VALUES.map(function (t) {
      const value = shift + amplitudeOne * Math.sin(2 * Math.PI * t + phaseOne) + amplitudeTwo * Math.cos(4 * Math.PI * t + phaseTwo);
      return Math.max(-0.78, Math.min(0.78, value));
    });
  }

  function rk4(value, u, t, step) {
    const k1 = vectorField(u, t, value);
    const k2 = vectorField(u + step / 2, t, value + step * k1 / 2);
    const k3 = vectorField(u + step / 2, t, value + step * k2 / 2);
    const k4 = vectorField(u + step, t, value + step * k3);
    const next = value + step * (k1 + 2 * k2 + 2 * k3 + k4) / 6;
    return Math.max(-0.999, Math.min(0.999, next));
  }

  function flowFrames(initial) {
    const current = initial.slice();
    const frames = [current.slice()];
    const step = 1 / FLOW_STEPS;

    for (let flowStep = 0; flowStep < FLOW_STEPS; flowStep += 1) {
      const u = flowStep * step;
      for (let index = 0; index < POINT_COUNT; index += 1) {
        current[index] = rk4(current[index], u, T_VALUES[index], step);
      }
      if ((flowStep + 1) % 3 === 0) frames.push(current.slice());
    }
    return frames;
  }

  function generateTargets() {
    const solution = flowFrames(hiddenInitialCurve()).slice(-1)[0];
    const generated = [];
    for (let index = 0; index < TARGET_COUNT; index += 1) {
      const base = 9 + index * (POINT_COUNT - 19) / (TARGET_COUNT - 1);
      const pointIndex = Math.max(5, Math.min(POINT_COUNT - 6, Math.round(base + randomBetween(-2, 2))));
      generated.push({ index: pointIndex, t: T_VALUES[pointIndex], y: solution[pointIndex] });
    }
    return generated.sort(function (left, right) {
      return left.index - right.index;
    });
  }

  function interpolateMissing(values) {
    const filled = values.slice();
    const known = [];
    filled.forEach(function (value, index) {
      if (Number.isFinite(value)) known.push(index);
    });
    if (known.length < 2) return null;

    for (let index = 0; index < known[0]; index += 1) filled[index] = filled[known[0]];
    for (let index = known[known.length - 1] + 1; index < POINT_COUNT; index += 1) {
      filled[index] = filled[known[known.length - 1]];
    }
    for (let segment = 0; segment < known.length - 1; segment += 1) {
      const left = known[segment];
      const right = known[segment + 1];
      for (let index = left + 1; index < right; index += 1) {
        const weight = (index - left) / (right - left);
        filled[index] = filled[left] * (1 - weight) + filled[right] * weight;
      }
    }
    return filled;
  }

  function smoothCurve(values, lambda) {
    const length = values.length;
    const matrix = Array.from({ length: length }, function () {
      return new Float64Array(length);
    });
    const rightHandSide = Float64Array.from(values);
    const secondDifference = [1, -2, 1];

    for (let index = 0; index < length; index += 1) matrix[index][index] = 1;
    for (let row = 0; row < length - 2; row += 1) {
      for (let first = 0; first < 3; first += 1) {
        for (let second = 0; second < 3; second += 1) {
          matrix[row + first][row + second] += lambda * secondDifference[first] * secondDifference[second];
        }
      }
    }

    const lower = Array.from({ length: length }, function () {
      return new Float64Array(length);
    });
    for (let row = 0; row < length; row += 1) {
      for (let column = 0; column <= row; column += 1) {
        let sum = matrix[row][column];
        for (let index = 0; index < column; index += 1) sum -= lower[row][index] * lower[column][index];
        lower[row][column] = row === column ? Math.sqrt(Math.max(sum, 1e-12)) : sum / lower[column][column];
      }
    }

    const forward = new Float64Array(length);
    for (let row = 0; row < length; row += 1) {
      let sum = rightHandSide[row];
      for (let index = 0; index < row; index += 1) sum -= lower[row][index] * forward[index];
      forward[row] = sum / lower[row][row];
    }

    const result = new Float64Array(length);
    for (let row = length - 1; row >= 0; row -= 1) {
      let sum = forward[row];
      for (let index = row + 1; index < length; index += 1) sum -= lower[index][row] * result[index];
      result[row] = sum / lower[row][row];
    }

    return Array.from(result, function (value) {
      return Math.max(-0.96, Math.min(0.96, value));
    });
  }

  function pointerToCurve(event) {
    const bounds = inputCanvas.getBoundingClientRect();
    const box = curvePlotBox(inputCanvas);
    const localX = event.clientX - bounds.left;
    const localY = event.clientY - bounds.top;
    const t = Math.max(0, Math.min(1, (localX - box.left) / box.width));
    const value = Math.max(-1, Math.min(1, 1 - 2 * (localY - box.top) / box.height));
    return { index: Math.round(t * (POINT_COUNT - 1)), value: value };
  }

  function recordDrawPoint(point) {
    if (!lastDrawPoint) {
      draftRaw[point.index] = point.value;
      lastDrawPoint = point;
      return;
    }

    const start = Math.min(lastDrawPoint.index, point.index);
    const end = Math.max(lastDrawPoint.index, point.index);
    for (let index = start; index <= end; index += 1) {
      const distance = Math.abs(point.index - lastDrawPoint.index);
      const fraction = distance === 0 ? 1 : Math.abs(index - lastDrawPoint.index) / distance;
      draftRaw[index] = lastDrawPoint.value + fraction * (point.value - lastDrawPoint.value);
    }
    lastDrawPoint = point;
  }

  function beginDrawing(event) {
    if (running) return;
    drawing = true;
    draftRaw = new Array(POINT_COUNT).fill(NaN);
    draftCurve = null;
    lastDrawPoint = null;
    inputCanvas.setPointerCapture(event.pointerId);
    recordDrawPoint(pointerToCurve(event));
    drawState.textContent = submittedCurve ? "Previous run retained · drawing current" : "Drawing current curve";
    runButton.disabled = true;
    renderInput();
  }

  function continueDrawing(event) {
    if (!drawing) return;
    recordDrawPoint(pointerToCurve(event));
    renderInput();
  }

  function finishDrawing(event) {
    if (!drawing) return;
    drawing = false;
    if (inputCanvas.hasPointerCapture(event.pointerId)) inputCanvas.releasePointerCapture(event.pointerId);
    const filled = interpolateMissing(draftRaw);

    if (filled) {
      draftCurve = smoothCurve(filled, 180);
      drawState.textContent = submittedCurve ? "Dashed: previous · solid: current" : "Current curve smoothed";
      runButton.disabled = false;
    } else {
      draftCurve = null;
      drawState.textContent = submittedCurve ? "Previous run retained" : "Draw farther from left to right";
    }
    renderInput();
  }

  function magnitudeRgb(value) {
    const normalized = Math.max(0, Math.min(1, value));
    const position = normalized * (colorStops.length - 1);
    const index = Math.min(colorStops.length - 2, Math.floor(position));
    const amount = position - index;
    return colorStops[index].map(function (channel, channelIndex) {
      return Math.round(channel + (colorStops[index + 1][channelIndex] - channel) * amount);
    });
  }

  function magnitudeColor(value) {
    return "rgb(" + magnitudeRgb(value).join(",") + ")";
  }

  function prepareFieldSlices() {
    const sliceCount = 65;
    const textureWidth = 104;
    const textureHeight = 72;
    const rawSlices = [];
    let maximum = 0;

    for (let sliceIndex = 0; sliceIndex < sliceCount; sliceIndex += 1) {
      const x = -0.98 + 1.96 * sliceIndex / (sliceCount - 1);
      const values = new Float32Array(textureWidth * textureHeight);
      for (let row = 0; row < textureHeight; row += 1) {
        const u = row / (textureHeight - 1);
        for (let column = 0; column < textureWidth; column += 1) {
          const t = column / (textureWidth - 1);
          const magnitude = Math.abs(vectorField(u, t, x));
          values[row * textureWidth + column] = magnitude;
          maximum = Math.max(maximum, magnitude);
        }
      }
      rawSlices.push({ x: x, values: values });
    }

    fieldMaximum = Math.max(maximum, 1e-8);
    fieldSliceCache = rawSlices.map(function (slice) {
      const canvas = document.createElement("canvas");
      canvas.width = textureWidth;
      canvas.height = textureHeight;
      const context = canvas.getContext("2d");
      const imageData = context.createImageData(textureWidth, textureHeight);

      slice.values.forEach(function (magnitude, index) {
        const normalized = magnitude / fieldMaximum;
        const rgb = magnitudeRgb(normalized);
        const offset = index * 4;
        imageData.data[offset] = rgb[0];
        imageData.data[offset + 1] = rgb[1];
        imageData.data[offset + 2] = rgb[2];
        imageData.data[offset + 3] = Math.round(82 + 82 * normalized);
      });
      context.putImageData(imageData, 0, 0);
      return { x: slice.x, canvas: canvas };
    });
  }

  function projectThumbnail(u, t, value) {
    const width = thumbnailCanvas.width;
    const height = thumbnailCanvas.height;
    const yaw = -0.42;
    const domain = t - 0.5;
    const flow = u - 0.5;
    const horizontal = domain * Math.cos(yaw) - flow * Math.sin(yaw);
    const depth = domain * Math.sin(yaw) + flow * Math.cos(yaw);
    return {
      x: width * 0.48 + horizontal * width * 0.58,
      y: height * 0.5 - depth * height * 0.25 - value * height * 0.25,
      depth: depth + value * 0.08
    };
  }

  function renderThumbnail() {
    const context = thumbnailCanvas.getContext("2d");
    const width = thumbnailCanvas.width;
    const height = thumbnailCanvas.height;
    const cells = [];
    let maximum = 0;
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#edf5f6";
    context.fillRect(0, 0, width, height);

    for (let valueIndex = 0; valueIndex < 13; valueIndex += 1) {
      const x = -0.96 + 1.92 * valueIndex / 12;
      for (let flowIndex = 0; flowIndex < 11; flowIndex += 1) {
        const u0 = flowIndex / 11;
        const u1 = (flowIndex + 1) / 11;
        for (let domainIndex = 0; domainIndex < 17; domainIndex += 1) {
          const t0 = domainIndex / 17;
          const t1 = (domainIndex + 1) / 17;
          const magnitudes = [
            Math.abs(vectorField(u0, t0, x)),
            Math.abs(vectorField(u1, t0, x)),
            Math.abs(vectorField(u1, t1, x)),
            Math.abs(vectorField(u0, t1, x))
          ];
          const points = [
            projectThumbnail(u0, t0, x),
            projectThumbnail(u1, t0, x),
            projectThumbnail(u1, t1, x),
            projectThumbnail(u0, t1, x)
          ];
          const magnitude = magnitudes.reduce(function (sum, value) { return sum + value; }, 0) / 4;
          maximum = Math.max(maximum, magnitude);
          cells.push({
            points: points,
            magnitude: magnitude,
            depth: points.reduce(function (sum, point) { return sum + point.depth; }, 0) / 4
          });
        }
      }
    }

    cells.sort(function (left, right) {
      return left.depth - right.depth;
    }).forEach(function (cell) {
      const normalized = maximum > 0 ? cell.magnitude / maximum : 0;
      context.beginPath();
      context.moveTo(cell.points[0].x, cell.points[0].y);
      context.lineTo(cell.points[1].x, cell.points[1].y);
      context.lineTo(cell.points[2].x, cell.points[2].y);
      context.lineTo(cell.points[3].x, cell.points[3].y);
      context.closePath();
      context.fillStyle = magnitudeColor(normalized);
      context.globalAlpha = 0.27 + normalized * 0.41;
      context.fill();
    });
    context.globalAlpha = 1;
  }

  function projectField(u, t, value) {
    const width = fieldCanvas.flowWidth;
    const height = fieldCanvas.flowHeight;
    const domain = t - 0.5;
    const flow = u - 0.5;
    const cosineYaw = Math.cos(fieldYaw);
    const sineYaw = Math.sin(fieldYaw);
    const horizontal = domain * cosineYaw - flow * sineYaw;
    const depth = domain * sineYaw + flow * cosineYaw;
    const depthScale = height * (0.165 + 0.10 * Math.cos(fieldPitch));
    const valueScale = height * (0.155 + 0.125 * Math.sin(fieldPitch));

    return {
      x: width * 0.47 + horizontal * width * 0.56,
      y: height * 0.54 - depth * depthScale - value * valueScale,
      depth: depth + value * 0.08
    };
  }

  function drawFieldLine(context, from, to, color, width, alpha) {
    context.save();
    context.strokeStyle = color;
    context.lineWidth = width;
    context.globalAlpha = alpha;
    context.beginPath();
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.stroke();
    context.restore();
  }

  function drawFieldLegend(context, maximum) {
    const width = Math.min(260, fieldCanvas.flowWidth * 0.34);
    const left = fieldCanvas.flowWidth / 2 - width / 2;
    const top = 10;
    const gradient = context.createLinearGradient(left, 0, left + width, 0);
    colorStops.forEach(function (stop, index) {
      gradient.addColorStop(index / (colorStops.length - 1), "rgb(" + stop.join(",") + ")");
    });

    context.save();
    context.fillStyle = gradient;
    context.fillRect(left, top, width, 9);
    context.strokeStyle = colors.grid;
    context.strokeRect(left, top, width, 9);
    context.fillStyle = colors.muted;
    context.textAlign = "center";
    context.fillText("0", left, top + 25);
    context.fillText((maximum / 2).toFixed(2), left + width / 2, top + 25);
    context.fillText(maximum.toFixed(2), left + width, top + 25);
    context.restore();
  }

  function drawAxisTitle(context, label, from, to, offset) {
    let angle = Math.atan2(to.y - from.y, to.x - from.x);
    if (angle > Math.PI / 2 || angle < -Math.PI / 2) angle += Math.PI;
    const middleX = (from.x + to.x) / 2;
    const middleY = (from.y + to.y) / 2;
    const normalX = -Math.sin(angle);
    const normalY = Math.cos(angle);
    context.save();
    context.translate(middleX + normalX * offset, middleY + normalY * offset);
    context.rotate(angle);
    context.fillStyle = "#313b45";
    context.font = "12px Arial, sans-serif";
    context.textAlign = "center";
    context.fillText(label, 0, 0);
    context.restore();
  }

  function drawFieldAxes(context) {
    const floor = -0.94;
    const origin = projectField(0, 0, floor);
    const tEnd = projectField(0, 1, floor);
    const flowEnd = projectField(1, 1, floor);
    const valueEnd = projectField(0, 0, 0.94);
    drawFieldLine(context, origin, tEnd, "#313b45", 0.9, 0.86);
    drawFieldLine(context, tEnd, flowEnd, "#313b45", 0.9, 0.86);
    drawFieldLine(context, origin, valueEnd, "#313b45", 0.9, 0.86);

    context.save();
    context.font = "10px Arial, sans-serif";
    context.fillStyle = "#46515b";
    context.textAlign = "center";

    for (let index = 0; index <= 5; index += 1) {
      const value = index / 5;
      const uTick = projectField(value, 1, floor);
      const uTickEnd = projectField(value, 1, floor + 0.035);
      drawFieldLine(context, uTick, uTickEnd, "#313b45", 0.55, 0.78);
      context.textAlign = "left";
      context.fillText(formatTick(value), uTick.x + 7, uTick.y + 4);

      const tTick = projectField(0, value, floor);
      const tTickEnd = projectField(0, value, floor + 0.035);
      drawFieldLine(context, tTick, tTickEnd, "#313b45", 0.55, 0.78);
      context.textAlign = "center";
      if (index > 0) context.fillText(formatTick(value), tTick.x + 1, tTick.y + 13);
    }

    [-0.8, -0.4, 0, 0.4, 0.8].forEach(function (value) {
      const tick = projectField(0, 0, value);
      const tickEnd = projectField(0.028, 0, value);
      drawFieldLine(context, tick, tickEnd, "#313b45", 0.55, 0.78);
      context.textAlign = "right";
      context.fillText(formatTick(value), tick.x - 5, tick.y + 3);
    });
    context.restore();

    drawAxisTitle(context, "Continuous Flow", tEnd, flowEnd, 29);
    drawAxisTitle(context, "Domain of Functions", origin, tEnd, 25);
    drawAxisTitle(context, "Value of Functions", origin, valueEnd, -31);
  }

  function drawVolumeBox(context) {
    const corners = {
      low00: projectField(0, 0, -1),
      low10: projectField(1, 0, -1),
      low01: projectField(0, 1, -1),
      low11: projectField(1, 1, -1),
      high00: projectField(0, 0, 1),
      high10: projectField(1, 0, 1),
      high01: projectField(0, 1, 1),
      high11: projectField(1, 1, 1)
    };
    [
      ["low00", "low10"], ["low00", "low01"], ["low10", "low11"], ["low01", "low11"],
      ["high00", "high10"], ["high00", "high01"], ["high10", "high11"], ["high01", "high11"],
      ["low00", "high00"], ["low10", "high10"], ["low01", "high01"], ["low11", "high11"]
    ].forEach(function (edge) {
      drawFieldLine(context, corners[edge[0]], corners[edge[1]], "#315d78", 0.6, 0.28);
    });
  }

  function renderField() {
    if (panel.classList.contains("closed")) return;
    const context = fitCanvas(fieldCanvas);
    clearCanvas(context, fieldCanvas);
    if (fieldSliceCache.length === 0) prepareFieldSlices();

    drawVolumeBox(context);
    fieldSliceCache.map(function (slice) {
      const point00 = projectField(0, 0, slice.x);
      const point10 = projectField(0, 1, slice.x);
      const point01 = projectField(1, 0, slice.x);
      const point11 = projectField(1, 1, slice.x);
      return {
        canvas: slice.canvas,
        point00: point00,
        point10: point10,
        point01: point01,
        depth: (point00.depth + point10.depth + point01.depth + point11.depth) / 4
      };
    }).sort(function (left, right) {
      return left.depth - right.depth;
    }).forEach(function (slice) {
      const textureWidth = slice.canvas.width;
      const textureHeight = slice.canvas.height;
      context.save();
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      context.filter = "blur(0.85px)";
      context.transform(
        (slice.point10.x - slice.point00.x) / textureWidth,
        (slice.point10.y - slice.point00.y) / textureWidth,
        (slice.point01.x - slice.point00.x) / textureHeight,
        (slice.point01.y - slice.point00.y) / textureHeight,
        slice.point00.x,
        slice.point00.y
      );
      context.drawImage(slice.canvas, 0, 0);
      context.restore();
    });

    drawVolumeBox(context);
    drawFieldLegend(context, fieldMaximum);
    drawFieldAxes(context);
  }

  function evaluateOutput(curve) {
    const errors = targets.map(function (target) {
      return Math.abs(curve[target.index] - target.y);
    });
    targetHits = errors.map(function (error) {
      return error <= HIT_TOLERANCE;
    });
    const hits = targetHits.filter(Boolean).length;
    const rmse = Math.sqrt(errors.reduce(function (sum, error) {
      return sum + error * error;
    }, 0) / errors.length);
    return { hits: hits, rmse: rmse };
  }

  function startNewGame() {
    if (running) return;
    drawing = false;
    vectorField = createVectorField();
    fieldSliceCache = [];
    prepareFieldSlices();
    targets = generateTargets();
    draftRaw = new Array(POINT_COUNT).fill(NaN);
    draftCurve = null;
    submittedCurve = null;
    outputCurve = null;
    targetHits = [];
    lastDrawPoint = null;
    fieldYaw = -0.34;
    fieldPitch = 0.66;
    hitsLabel.textContent = "—";
    rmseLabel.textContent = "—";
    drawState.textContent = "";
    outputState.textContent = "Target points";
    runButton.disabled = true;
    renderThumbnail();
    renderInput();
    renderOutput(null);
    renderField();
  }

  function runFlow() {
    if (!draftCurve || running) return;
    running = true;
    submittedCurve = draftCurve.slice();
    draftCurve = null;
    draftRaw = new Array(POINT_COUNT).fill(NaN);
    lastDrawPoint = null;
    drawState.textContent = "";
    renderInput();

    runButton.disabled = true;
    newGameButton.disabled = true;
    targetHits = [];
    const frames = flowFrames(submittedCurve);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reducedMotion ? 0 : 1100;
    const start = performance.now();

    function finishRun() {
      outputCurve = frames[frames.length - 1];
      const result = evaluateOutput(outputCurve);
      hitsLabel.textContent = result.hits + " / " + TARGET_COUNT;
      rmseLabel.textContent = result.rmse.toFixed(3);
      outputState.textContent = result.hits >= REQUIRED_HITS ? "Challenge complete" : "";
      renderOutput(outputCurve);
      running = false;
      newGameButton.disabled = false;
    }

    if (duration === 0) {
      finishRun();
      return;
    }

    function animate(now) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const frameIndex = Math.min(frames.length - 1, Math.floor(eased * frames.length));
      outputCurve = frames[frameIndex];
      outputState.textContent = "u = " + (frameIndex / (frames.length - 1)).toFixed(2);
      renderOutput(outputCurve);
      if (progress < 1) window.requestAnimationFrame(animate);
      else finishRun();
    }

    window.requestAnimationFrame(animate);
  }

  openButton.addEventListener("click", function () {
    library.hidden = true;
    panel.classList.remove("closed");
    startNewGame();
  });

  closeButton.addEventListener("click", function () {
    panel.classList.add("closed");
    library.hidden = false;
    openButton.focus();
  });

  inputCanvas.addEventListener("pointerdown", beginDrawing);
  inputCanvas.addEventListener("pointermove", continueDrawing);
  inputCanvas.addEventListener("pointerup", finishDrawing);
  inputCanvas.addEventListener("pointercancel", finishDrawing);

  fieldCanvas.addEventListener("pointerdown", function (event) {
    rotatingField = true;
    previousPointer = { x: event.clientX, y: event.clientY };
    fieldCanvas.setPointerCapture(event.pointerId);
  });

  fieldCanvas.addEventListener("pointermove", function (event) {
    if (!rotatingField) return;
    fieldYaw += (event.clientX - previousPointer.x) * 0.008;
    fieldPitch = Math.max(0.18, Math.min(1.18, fieldPitch + (event.clientY - previousPointer.y) * 0.008));
    previousPointer = { x: event.clientX, y: event.clientY };
    if (fieldRenderFrame === null) {
      fieldRenderFrame = window.requestAnimationFrame(function () {
        fieldRenderFrame = null;
        renderField();
      });
    }
  });

  fieldCanvas.addEventListener("pointerup", function (event) {
    rotatingField = false;
    if (fieldCanvas.hasPointerCapture(event.pointerId)) fieldCanvas.releasePointerCapture(event.pointerId);
  });

  fieldCanvas.addEventListener("pointercancel", function () {
    rotatingField = false;
  });

  newGameButton.addEventListener("click", startNewGame);
  runButton.addEventListener("click", runFlow);

  let resizeFrame;
  window.addEventListener("resize", function () {
    if (panel.classList.contains("closed")) return;
    window.cancelAnimationFrame(resizeFrame);
    resizeFrame = window.requestAnimationFrame(function () {
      renderInput();
      renderOutput(outputCurve);
      renderField();
    });
  });

  vectorField = createVectorField();
  targets = generateTargets();
  renderThumbnail();
}());
