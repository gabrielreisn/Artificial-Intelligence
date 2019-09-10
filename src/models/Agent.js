const FACE = require("./utils");
function gridRespectsBoundaries(sizeX, sizeY, posX, posY) {
  if (posX < 0 || posY < 0) return false;
  if (posX >= sizeX || posY >= sizeY) return false;
  return true;
}

function initialFace(x, y, grid) {
  const gridContent = grid[x][y];
  if (gridContent === ">") return FACE.LESTE;
  if (gridContent === "<") return FACE.OESTE;
  if (gridContent === "^") return FACE.NORTE;
  return FACE.SUL;
}

module.exports = class Agent {
  constructor(startX, startY, rawGrid) {
    this.currentX = startX;
    this.currentY = startY;
    this.face = initialFace(startX, startY, rawGrid);
    this.count = 0;
    this.steps = [];
  }

  calculateHeuristicCost(newX, newY, cost) {
    return cost + this.calculateDistance({ x: newX, y: newY });
  }

  executeMove(grid, gridSizeX, gridSizeY) {
    const neighbors = this.findNeighbors(grid, gridSizeX, gridSizeY);
    const near = this.findNearestNeighbor(neighbors);

    const nface = this.findNeighborFace(near.x, near.y);

    this.alignElements(nface);

    this.move(near.x, near.y, nface);
  }

  alignElements(nface) {
    if (nface !== this.face) {
      const horario = this.shouldRotateH(nface);
      while (nface !== this.face) {
        if (horario) {
          this.moveHorario();
        } else {
          this.moveAntiHorario();
        }
        this.move(this.currentX, this.currentY, this.face);
      }
    }
  }

  move(newX, newY, face = null) {
    this.count++;
    this.steps.push({ x: this.currentX, y: this.currentY, face });
    this.currentX = newX;
    this.currentY = newY;
    this.face = face;
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

  shouldRotateH(neighborFace) {
    const originalFace = this.face;
    let clockCount = 0;
    let counterCount = 0;
    while (neighborFace !== this.face) {
      this.moveHorario();
      clockCount++;
    }

    this.face = originalFace;

    while (neighborFace !== this.face) {
      this.moveAntiHorario();
      counterCount++;
    }

    this.face = originalFace;

    return clockCount < counterCount ? true : false;
  }

  moveAntiHorario() {
    switch (this.face) {
      case FACE.NORTE:
        this.face = FACE.NOROESTE;
        break;
      case FACE.NORDESTE:
        this.face = FACE.NORTE;
        break;
      case FACE.LESTE:
        this.face = FACE.NORDESTE;
        break;
      case FACE.SUDESTE:
        this.face = FACE.LESTE;
        break;
      case FACE.SUL:
        this.face = FACE.SUDESTE;
        break;
      case FACE.SUDOESTE:
        this.face = FACE.SUL;
        break;
      case FACE.OESTE:
        this.face = FACE.SUDOESTE;
        break;
      case FACE.NOROESTE:
        this.face = FACE.OESTE;
        break;
    }
  }

  moveHorario() {
    switch (this.face) {
      case FACE.NORTE:
        this.face = FACE.NORDESTE;
        break;
      case FACE.NORDESTE:
        this.face = FACE.LESTE;
        break;
      case FACE.LESTE:
        this.face = FACE.SUDESTE;
        break;
      case FACE.SUDESTE:
        this.face = FACE.SUL;
        break;
      case FACE.SUL:
        this.face = FACE.SUDOESTE;
        break;
      case FACE.SUDOESTE:
        this.face = FACE.OESTE;
        break;
      case FACE.OESTE:
        this.face = FACE.NOROESTE;
        break;
      case FACE.NOROESTE:
        this.face = FACE.NORTE;
        break;
    }
  }

  findNeighborFace(nx, ny) {
    const difx = nx - this.currentX;
    const dify = ny - this.currentY;

    if (difx === -1 && dify === -1) return FACE.NOROESTE;
    if (difx === 0 && dify === -1) return FACE.NORTE;
    if (difx === 1 && dify === -1) return FACE.NORDESTE;

    if (difx === -1 && dify === 0) return FACE.OESTE;
    if (difx === 1 && dify === 0) return FACE.LESTE;

    if (difx === -1 && dify === 1) return FACE.SUDOESTE;
    if (difx === 0 && dify === 1) return FACE.SUL;
    if (difx === 1 && dify === 1) return FACE.SUDESTE;
  }
};
