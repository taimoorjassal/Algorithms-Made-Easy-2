//draw function is an infinite loop so
//no need to implement the infinite while loop for algorithm
function draw() {
  frameRate(5);

  if (started) {
    if (generateObstacles) {
      //algorithm starts
      if (openSet.length > 0) {
        //continue
        var lowestF = 0; //lowestF assuming that the node with
        //lowest f value is the starting node
        for (var i = 0; i < openSet.length; i++) {
          if (openSet[i].f < openSet[lowestF].f) {
            lowestF = i;
          }
        }
        var current = openSet[lowestF];

        if (openSet[lowestF] === endNode) {
        reachedEnd=true;
        }
        removeFromArray(openSet, current); //to remove current from openSet
        closedSet.push(current); //adding the current node to closedSet

        var neighbors = current.neighbors;
        for (let neighbor of neighbors) {

          if (!closedSet.includes(neighbor) && !neighbor.wall) {
            var tempG = current.g + 1; //all the nodes have constant distance of 1 so adding 1
            var newPath = false;

            if (openSet.includes(neighbor)) {
              if (tempG < neighbor.g) {
                neighbor.g = tempG;
                newPath = true;
              }
            } else {
              neighbor.g = tempG;
              newPath = true;
              openSet.push(neighbor);
            }
            if (newPath) {
              neighbor.h = heuristic(neighbor, endNode);
              neighbor.f = neighbor.g + neighbor.h;
              neighbor.previous = current;
            }
          }
        }
      } //algorithm code ends
      else {
        //Stop
        alert("No Path Found Please Try Again!")
        noPath = true;
        noLoop();
      }
    } else {
      alert('Please generate obstacles first and Try Again')
    }
  }
  background(0);

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show(color(255), 'rect');
    }
  }
  if (generateObstacles) {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        if (grid[i][j].wall) {
          grid[i][j].show(color(5, 33, 57), 'rect');
        }
      }
    }
  }
  if (started) {
    for (let cs of closedSet) {
      cs.show(color(100, 100, 100), 'rect');
    }
    for (let os of openSet) {
      os.show(color(201, 204, 208), 'rect');
    }

    //find the path

    //to add element in the path
    //adds the end nodes
    //then adds the node connected to end node
    //continues to add nodes connected to previous node
    //until end of path reached
    if (!noPath) {
      path = [];
      var temp = current;
      path.push(temp);
      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }
    }

    for (let p of path) {
      p.show(color(255, 203, 154), 'ellipse');
    }
    // path[path.length-1].show(color(69, 237, 201),'ellipse');
    noFill();
    strokeWeight(3);
    stroke(122, 22, 22);
    beginShape();
    for (let p of path) {
      vertex(p.i * w + w / 2, p.j * h + h / 2);
      endShape();
    }
  }
  startNode.show(color(255, 223, 0), 'ellipse');
  endNode.show(color(255, 223, 0), 'ellipse');
  
  if(reachedEnd){
    completed(50);
    noLoop();
  }
}
