var vertices = [];
var start;
var record = 100000;
var rNode = 16;
var rCheck = 22
var checked = true;
var resetBtn = document.getElementById("reset");

function reset(){
  location.reload();
}
function setup(){
  let c = createCanvas(720, 400);
  c.parent('jumbo-canvas');
}

function check(arr, x, y, r){
  for(var i = 0; i < arr.length; i++){
    if((arr[i].x - r) < x && x < (arr[i].x + r)){
      if((arr[i].y - r) < y && y < (arr[i].y + r)){
        checked =  false;
      }
    }else{
      checked = true;
    }

  }
}
function mousePressed(){
  var x = mouseX;
  var y = mouseY;
  check(vertices, x, y, rCheck);
  if(checked){
    var v = createVector(mouseX, mouseY);
    vertices.push(v);
  }

}

function draw(){
  background(0);

  var reached = [];
  var unreached = [];

  for (var i = 0; i < vertices.length; i++){
    unreached.push(vertices[i]);
  }

  reached.push(unreached[0]);
  unreached.splice(0, 1);

  while(unreached.length > 0){
    var record = 10000;
    var rIndex;
    var uIndex;
    for(var i = 0; i < reached.length; i++){
      for(var j = 0; j < unreached.length; j++){

        var v1 = reached[i];
        var v2 = unreached[j];
        var d = dist(v1.x, v1.y, v2.x, v2.y);

        if(d < record){
          record = d;
          rIndex = i;
          uIndex = j;
        }

      }
    }
    line(reached[rIndex].x, reached[rIndex].y, unreached[uIndex].x, unreached[uIndex].y);

    reached.push(unreached[uIndex]);
    unreached.splice(uIndex, 1);

  }
  for (var i = 0; i < vertices.length; i++){
    fill(255);
    stroke(255);
    ellipse(vertices[i].x, vertices[i].y, rNode, rNode);
  }
}
