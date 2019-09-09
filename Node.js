module.exports = class Node {
  constructor(x, y, target) {
    this.x = x;
    this.y = y;
    this.cost = this.calculateCost(target);
  }

  calculateCost(target) {
    return Math.sqrt(
      Math.pow(this.x - target.x, 2) + Math.pow(this.y - target.y, 2)
    );
  }
};
