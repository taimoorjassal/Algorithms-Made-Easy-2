var w = 720;
var h = 400;
var x = 0;
var i = 0;
var j = 0;
var k = 0;


  var values =[];


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
    values.push(random(h-10));

  }
}

function draw() {

    background(0);
    drawLines(values);
    bubbleSort(values);
}

function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function bubbleSort() {

  for(k = 0;k<2;k++){
    if(i<values.length){
      let temp = values[j];
      if(values[j] > values[j+1]){
        swap(values,j,j+1);
      }
      j++;

      if(j>=values.length-i-1){
        j = 0;
        i++;
      }
    }
    else{
      noLoop();
    }
  }
}

function drawLines(arr) {

    var maxEl = Math.max.apply(null, arr);

    arr.forEach(function(el, index) {

      if(index === j) stroke(255,0,0);
      else if(index === j+1) stroke(0,255,0);
  	  else stroke(255);

      var x = (index / arr.length) * width;
      var yTo = height - (el / maxEl) * height;

      line(x, height, x, yTo);
    });
}
