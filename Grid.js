var Node = require("./Node");

function isBlockedWay(i, j, grid) {
  return grid[i][j] === "*" ? true : false;
}

const max = Number.MAX_VALUE;

module.exports = class Grid {
  constructor(x, y, rawMap) {
    this.xSize = x;
    this.ySize = y;
    this.start = this.findPoint(rawMap, ">");
    this.end = this.findPoint(rawMap, "x");
    this.map = this.fillGrid(this.xSize, this.ySize, rawMap);
  }

  fillGrid(x, y, rawMap) {
    const grid = [];
    for (let i = 0; i < y; i++) {
      const list = [];
      for (let j = 0; j < x; j++) {
        isBlockedWay(i, j, rawMap)
          ? list.push(new Node(i, j, { x: max, y: max }))
          : list.push(new Node(i, j, this.end));
      }
      grid.push(list);
    }
    return grid;
  }

  findPoint(map, el) {
    let x = undefined;
    let y = undefined;
    map.forEach((element, index) => {
      const lineIndex = element.indexOf(el);
      if (lineIndex !== -1) {
        x = index;
        y = lineIndex;
      }
    });
    return { x, y };
  }
};
