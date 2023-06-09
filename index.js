'use strict';

const run = document.getElementById('run');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const W = canvas.width;
const H = canvas.height;
const size = 20;
const ANIMATION_SPEED = 10;
const heights = [];
const backgroundColor = '#333';

let isRunning = false;

setBackground(backgroundColor);

run.addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    runBubbleSort();
  }
});

function runBubbleSort() {
  let i = 0;
  let j = 0;
  let request;
  generateHeights();

  function bubbleSort() {
    setBackground(backgroundColor);
    renderBars();
    bar(i, heights[i], '#ff0000', '#fff');
    if (heights[i] > heights[i + 1]) swap(heights, i, i + 1);
    if (i === heights.length - 2 - j) {
      i = 0;
      j++;
    } else i++;

    setTimeout(() => {
      if (checkSorted(heights)) {
        setBackground(backgroundColor);
        renderBars();
        console.log('sorted');
        cancelAnimationFrame(request);
        isRunning = false;
        return;
      }
      request = requestAnimationFrame(bubbleSort);
    }, ANIMATION_SPEED);
  }

  request = requestAnimationFrame(bubbleSort);
}

function generateHeights() {
  if (heights.length) heights.splice(0, heights.length);
  for (let i = 0; i < W / size; i++) {
    heights.push(Math.floor(Math.random() * H) + 1);
  }
}

function bar(x, height, fill, stroke) {
  ctx.save();
  ctx.lineWidth = 2;
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.fillRect(x * size, H - height, size, height);
  ctx.strokeRect(x * size, H - height, size, height);
  ctx.restore();
}

function renderBars() {
  for (const [index, height] of heights.entries()) {
    bar(index, height, '#77ff77', '#11aa11');
  }
}

function swap(arr, i, j) {
  if (i < 0 || j < 0 || i > arr.length - 1 || j > arr.length - 1) throw new Error('ERROR: invalid index');
  let aux = arr[j];
  arr[j] = arr[i];
  arr[i] = aux;
}

function checkSorted(arr) {
  let flag = 1;
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) flag = 0;
  }
  return flag;
}

function setBackground(style) {
  ctx.save();
  ctx.fillStyle = style;
  ctx.fillRect(0, 0, W, H);
  ctx.restore();
}
