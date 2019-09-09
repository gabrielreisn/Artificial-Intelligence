module.exports = class Node {
  constructor(x, y, target, visited = false) {
    this.x = x;
    this.y = y;
    this.cost = this.calculateCost(target);
    this.visited = visited;
  }

  calculateCost(target) {
    return Math.sqrt(
      Math.pow(this.x - target.x, 2) + Math.pow(this.y - target.y, 2)
    );
  }

  equals(value) {
    return value.x === this.x && value.y === this.y;
  }
};
