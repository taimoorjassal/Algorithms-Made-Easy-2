let values = [];
let startSort = true;

var startBtn = document.getElementById("start");
var resetBtn = document.getElementById("reset");

function started(){
  start = true;
}
function reset(){
  location.reload();
}

function setup() {
    let c = createCanvas(720, 400);
    c.parent("jumbo-canvas");
    frameRate(60);
}

let numOfRects = 100;
let rectWidth;
function draw() {
    if (startSort) {
        startSort = false;

        rectWidth = floor(width / numOfRects);
        values = new Array(floor(width / rectWidth));
        for (let i = 0; i < values.length; i++) {
            values[i] = random(height);
        }

        mergeSort(values);
    }

    background(23);
   
    strokeWeight(4);
    drawLines(values);
}

function drawLines(arr) {

  var maxEl = Math.max.apply(null, arr);

  arr.forEach(function(el, index) {

    if(index === el) stroke(255,0,0);
    else stroke(255);

    var x = (index / arr.length) * width;
    var yTo = height - (el / maxEl) * height;

    line(x, height, x, yTo);
  });
}

function mergeSort(a) {
    // create copy of the array
    copy = a.slice()
    // asynchronous sort the copy
    mergeSortSlice(copy, 0, copy.length);
    return;
}

async function mergeSortSlice(a, start, end) {
    if (end-start <= 1)
        return;

    var mid = Math.round((end+start) / 2);

    // wait till divides are sort
    await mergeSortSlice(a, start, mid);
    await mergeSortSlice(a, mid, end);

     // merge divides
    let i = start, j = mid;
    while (i < end && j < end) {
        if (a[i] > a[j]) {
            let t = a[j]; a.splice(j, 1); a.splice(i, 0, t);
            j ++;
        }
        i ++;
        if (i==j) j ++;

        // copy back the current state of the sorting
        values = a.slice();

        // slow down
        await sleep(50);
    }

    // restart
    if (start == 0 && end == a.length) {
        noLoop();
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
