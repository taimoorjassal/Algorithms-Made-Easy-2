var started = false;
var generateObstacles = false;

var obstacleRatio = 0.38;

var canvasX=50;
var canvasY=50;

var rows = 30;
var cols = 30;

var reachedEnd=false;

var grid = new Array(cols);

var openSet = []; //array stores points that are to be reviewed
var closedSet = []; //array stores points that are discarded

var startNode; //starting point of path
var endNode; // ending point of path

var w; //width of each cell of grid
var h; //height of each cell of  grid

var path = [];
var noPath = false;

function starts() {
  started = true;
}
function reset(){
  location.reload();
}

function generateObstacle() {
  generateObstacles = true;
}

//func to remove element from array
function removeFromArray(arr, element) {
  // looping through array in reverse order
  // to not to skip any element in the Array
  // when an element is spliced all the remaining
  //elements moove backwards
  // i.e their index value is reduced by one

  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == element) {
      arr.splice(i, 1);
    }
  }
}
//function finds the distance between two points
function heuristic(a, b) {
  // var d = dist(a.i, a.j, b.i, b.j); //euclidean distance
  var d = abs(a.i - b.i) + abs(a.j - b.j); //diff in x and y values, no diagonal distance
  return d;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function completed(wait){


  for (let p of path) {
    await sleep(wait);
    noFill();
    strokeWeight(3);
    stroke(0,250,0);
    beginShape();
    vertex(p.i * w + w / 2, p.j * h + h / 2);
    endShape();
  }
  }
