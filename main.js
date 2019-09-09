var FileReader = require("./FileReader");
var Grid = require("./Grid");
var Agent = require("./Agent");

const [x, y, result] = FileReader.init("map.txt");

let grid = new Grid(x, y, result);
let agent = new Agent(grid.start.x, grid.start.y);
console.log("antes", agent);
while (grid.end.x !== agent.currentX || grid.end.y !== agent.currentY) {
  agent.executeMove(grid.map, grid.xSize, grid.ySize);
}
console.log("depois", agent);
