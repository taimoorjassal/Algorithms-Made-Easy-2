
let values = [];
let w = 7;
let states = [];
var x = 720;
var y = 400;
function setup() {
var start = false;

var startBtn = document.getElementById("start");
var resetBtn = document.getElementById("reset");

function started(){
  start = true;
}
function reset(){
  location.reload();
}
  // Create Canvas of given Size
  let c = createCanvas(720, 400);
  c.parent('jumbo-canvas');

  // Assign Array of Random Values
  values = new Array(floor(width / w));

  for (let i = 0; i < values.length; i++) {
    values[i] = float(random(height));
    states[i] = -1;
  }
frameRate(60);
  // To print values to Browser's Console
  print("Unsorted Array:" + values);

  // Invoke QuickSort Function
  quickSort(values, 0, values.length);

  print("Sorted Array:" + values);
}

// Asynchronous Definition of Quick Sort Function
async function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let index = await partition(arr, start, end);
  states[index] = -1;

  // Promise.all is used so that each function
  // should invoke simultaneously
  await Promise.all([quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end)
  ]);
}

// Asynchronous Definition of Partition Function
async function partition(arr, start, end) {

  for (let i = start; i < end; i++) {
    states[i] = 1;
  }

  let pivotIndex = start;
  let pivotValue = arr[end];
  states[pivotIndex] = 0;

  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }

  await swap(arr, pivotIndex, end);

  for (let i = start; i < end; i++) {
    states[i] = -1;
  }

  return pivotIndex;
}

// Definition of Draw function
function draw() {

  // Set Background Color
  background(0);

if(start){
  for (let i = 0; i < values.length; i++) {


    if (states[i] == 0) {

      // Pivot Element
      stroke(255, 0, 0);
    } else if (states[i] == 1) {
      // Sorting bar
      stroke(0,255,0);
    } else {
      // Sorted Bars
      stroke(255);
    }
    strokeWeight(4);
    line(i * w, height-1, i * w, height-values[i]);
  }
}
}

async function swap(arr, a, b) {

  // Call to sleep function
  await sleep(100);
  let t = arr[a];
  arr[a] = arr[b];
  arr[b] = t;
}

// Definition of sleep function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var started = false;

function starts() {
  started = true;
}

function reset() {
  location.reload();
}
