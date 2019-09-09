var FileReader = require("./models/FileReader");
var Grid = require("./models/Grid");
var Agent = require("./models/Agent");

const [x, y, result] = FileReader.init(process.argv[2]);

let grid = new Grid(x, y, result);
let agent = new Agent(grid.start.x, grid.start.y);
console.log("[START]", agent);
while (grid.end.x !== agent.currentX || grid.end.y !== agent.currentY) {
  agent.executeMove(grid.map, grid.xSize, grid.ySize);
}
console.log("[END]", agent);
