//setup function only runs once
function setup() {
  var a = window.innerWidth/3.5;
  let cn;
  console.log(canvasX );
  if (a > 400){
    cn =createCanvas(400,400);
    a = 400;
  }
  else{
    cn=createCanvas(a,a);
  }
  var x = 40;
  var y = 60;
  console.log(window.innerWidth)
  console.log(canvas)
  cn.parent("jumbo-canvas");
  cn.position(x, y);

  obstacleButton = createButton('Generate Obstacles');
  obstacleButton.size(130,25);
  obstacleButton.style("background","#fff");
  obstacleButton.position(x, a+y+20);
  obstacleButton.mousePressed(generateObstacle);

  startButton = createButton('Start');
  startButton.size(40,25);
  startButton.style("background","#fff");
  startButton.position(obstacleButton.size().width+(2*x), a+y+20);
  startButton.mousePressed(starts);

  resetButton = createButton('Reset');
  resetButton.size(50,25);
  resetButton.style("background","#fff");
  resetButton.position(obstacleButton.size().width+startButton.size().width+3*x, a+y+20);
  resetButton.mousePressed(reset);


  //dimensions of one cell
  w = width / cols;
  h = height / rows;

  //making 2d array
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j); //creating new object at position (i,j)
    }
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
      // grid[i][j].generateObstacles();
    }
  }
  startNode = grid[0][0];
  endNode = grid[cols - 1][rows - 1];
  startNode.wall = false;
  endNode.wall = false;

  grid[0][1].wall = false;
  grid[1][0].wall = false;
  grid[rows-1][cols-2].wall = false;
  grid[rows-2][cols-1].wall = false;
  //adding new item to openset
  //start node is always visited at the start once
  //so it is in the openSet by default
  openSet.push(startNode);
}
