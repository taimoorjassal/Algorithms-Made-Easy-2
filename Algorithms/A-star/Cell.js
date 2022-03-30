//constructor to create objects
function Spot(i, j) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.previous = undefined;
  this.wall = false;

  //to generate random obstacles
  if (random(1) < obstacleRatio) {
    this.wall = true;
  }

  this.neighbors = []; //array containing neighbors of a cell element

  //function to add all the neighbor nodes
  //of a node to the array
  this.addNeighbors = function(grid) {
    var i = this.i;
    var j = this.j;
    if (i < cols - 1) { //adding right neighbor
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) { //adding left neighbor
      this.neighbors.push(grid[i - 1][j]);

    }
    if (j < rows - 1) { //adding top neighbor
      this.neighbors.push(grid[i][j + 1]);

    }
    if (j > 0) { //adding bottom neighbor
      this.neighbors.push(grid[i][j - 1]);
    }
    if (i > 0 && j > 0) { //adding bottom left corner neighbor
      this.neighbors.push(grid[i - 1][j - 1]);
    }
    if (i < cols - 1 && j > 0) { //adding bottom right corner neighbor
      this.neighbors.push(grid[i + 1][j - 1]);
    }
    if (i > 0 && j < rows - 1) { //adding top left corner neighbor
      this.neighbors.push(grid[i - 1][j + 1]);
    }
    if (i < cols - 1 && j < rows - 1) { //adding top right corner neighbor
      this.neighbors.push(grid[i + 1][j + 1]);
    }

  }

  //function creates obstales
  this.show = function(col, shape) {
    if (shape === 'ellipse') {
      fill(col);

      noStroke();
      rect(this.i * w, this.j * h, w - 1, h - 1) //creating a rectangle
      stroke(122, 22, 22);
      ellipse(this.i * w + w / 2, this.j * h + h / 2, w - 10, h - 10) //creating a rectangle
    } else {
      fill(col);

      noStroke();
      rect(this.i * w, this.j * h, w - 1, h - 1) //creating a rectangle
    }

  }
}

