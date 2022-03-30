var values = [];
var w = 10;
var numLines;
var sortHist = [];
var condition;
function setup() {
  createCanvas(720, 400);
  numLines = width/w;
  for (i = 0; i < numLines/10; i++) {
    values[i] =random(height);
  }
  sortHist = mergeSort(values);
  frameRate(15);
}

var historyIndex = 0;
var tempIndex = 0;
function draw() {
  background(0);
  strokeWeight(4);
  stroke(255,0,0);

  for (i = 0; i < sortHist[historyIndex].length; i++) {
    var location = map(i, 0, sortHist[historyIndex].length, 0, width);
    line(location, height -1, location, height - sortHist[historyIndex][i]);
  }
  historyIndex++;
  if (historyIndex > sortHist.length -1){
    stroke(255);
    for(var k = 0; k < sortHist.length; k++){
      var loc = map(i, 0, sortHist.length, 0, width);
      line(loc, height -1, loc, height - values[i]);
    }
    noLoop();
  }
}

function mergeSort(arr) {
  var array = [arr.slice()],
  n = arr.length,
  array0 = arr,
  array1 = new Array(n);

  for (var m = 1; m < n; m <<= 1) {
    for (var i = 0; i < n; i += (m << 1)) {
      merge(i, Math.min(i + m, n), Math.min(i + (m << 1), n));
    }
    array.push(array1.slice());
    arr = array0, array0 = array1, array1 = arr;
  }

function merge(left, right, end) {
  for (var l = left, r = right, j = left; j < end; ++j) {
    condition = l < right && (r >= end || array0[l] <= array0[r]);
    index = condition ? l++ : r++;
    array1[j] = array0[index];
   }
 }
 return array;
}
