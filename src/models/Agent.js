function gridRespectsBoundaries(sizeX, sizeY, posX, posY) {
  if (posX < 0 || posY < 0) return false;
  if (posX >= sizeX || posY >= sizeY) return false;
  return true;
}

module.exports = class Agent {
  constructor(startX, startY) {
    this.currentX = startX;
    this.currentY = startY;
    this.count = 0;
    this.steps = [];
  }

  calculateHeuristicCost(newX, newY, cost) {
    return cost + this.calculateDistance({ x: newX, y: newY });
  }

  executeMove(grid, gridSizeX, gridSizeY) {
    const neighbors = this.findNeighbors(grid, gridSizeX, gridSizeY);
    const near = this.findNearestNeighbor(neighbors);
    this.move(near.x, near.y);
  }

  move(newX, newY) {
    this.count++;
    this.steps.push({ x: this.currentX, y: this.currentY });
    this.currentX = newX;
    this.currentY = newY;
  }

  calculateDistance(target) {
    return Math.sqrt(
      Math.pow(this.currentX - target.x, 2) +
        Math.pow(this.currentY - target.y, 2)
    );
  }

  isNotCurrentElement(x, y) {
    return this.currentX !== x || this.currentY !== y ? true : false;
  }

  findNeighbors(grid, gridSizeX, gridSizeY) {
    let nodePositions = [];
    let gridNode = null;

    for (let i = this.currentX - 1; i <= this.currentX + 1; i++) {
      for (let j = this.currentY - 1; j <= this.currentY + 1; j++) {
        if (
          this.isNotCurrentElement(i, j) &&
          gridRespectsBoundaries(gridSizeX, gridSizeY, i, j)
        ) {
          nodePositions.push(grid[i][j]);
        }
      }
    }
    return nodePositions;
  }

  findNearestNeighbor(neighbors) {
    let near = undefined;
    let tempCost = undefined;
    let fasterRouteCost = Number.MAX_VALUE;

    neighbors.forEach(el => {
      tempCost = this.calculateHeuristicCost(el.x, el.y, el.cost);
      if (tempCost < fasterRouteCost) {
        near = el;
        fasterRouteCost = tempCost;
      }
    });

    return near;
  }
};
