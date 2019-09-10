var FileReader = require("./models/FileReader");
var Grid = require("./models/Grid");
var Agent = require("./models/Agent");
var Queue = require("./models/Queue");
const [x, y, result] = FileReader.init(process.argv[2]);

let grid = new Grid(x, y, result);
let agent = new Agent(grid.start.x, grid.start.y, result);

console.log("[START]", agent);

const gridStartNode = grid.map[grid.start.x][grid.start.y];

const que = new Queue();

que.add(gridStartNode);

let element = null;
let possibleNeighbors = null;
while (!que.isEmpty()) {
  element = que.remove();

  if (element.equals(grid.end)) {
    break;
  }

  if (!element.visited) {
    element.visited = true;
    agent.move(element.x, element.y);

    possibleNeighbors = agent.findNeighbors(grid.map, grid.xSize, grid.ySize);

    possibleNeighbors.forEach(node => {
      // using flag cost == inf for representing the walls
      if (!node.visited && node.cost !== Infinity) {
        que.add(node);
      }
    });
  }
}

console.log("[END]", agent);
