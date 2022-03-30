var w = 720;
var h = 400;
var x = 0;
var i = 1;
var j = i;
var midsorting = false;

var array = [];

var startBtn = document.getElementById("start");
var resetBtn = document.getElementById("reset");

function started(){
  start = true;
}
function reset(){
  location.reload();
}

function setup() {

  let c = createCanvas(w, h);
  c.parent("jumbo-canvas");
  background(0);

  stroke(255);
  strokeWeight(4);

  frameRate(30);
     for (let i = 0; i < width / 12; i++) {
  array.push(random(h-10));

}
}

function draw() {

  background(0);
  drawLines(array);

  if (i >= array.length) {
    return;
  }

  if (!midsorting) {
    j = i;
  }

  if (array[j] < array[j-1] && j >= 0) {

    midsorting = true;

    var temp = array[j-1];
    array[j-1] = array[j];
    array[j] = temp;

    j--;
  } else {

    midsorting = false;
  }

  if (!midsorting) {
    i++;
  }
}

function drawLines(arr) {

  var maxEl = Math.max.apply(null, arr);

  arr.forEach(function(el, index) {

    if(index === j) stroke(255,0,0);
    else stroke(255);

    var x = (index / arr.length) * width;
    var yTo = height - (el / maxEl) * height;

    line(x, height, x, yTo);
  });
}
