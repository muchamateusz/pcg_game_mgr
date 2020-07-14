export default class Tile {
  constructor(tile) {
    if (tile.id) {
      this.id = tile.id;
    }
    if (tile.state) {
      this.state = tile.state;
    }
    if (tile.neighbours) {
      this.neighbours = tile.neighbours;
    }
    if (tile.x) {
      this.x = tile.x;
    }
    if (tile.y) {
      this.y = tile.y;
    }
    if (tile.visitorId) {
      this.visitorId = tile.visitorId;
    }
  }

  getId() {
    return this.id;
  }
  setId(id) {
    this.id = id;
  }

  getState() {
    return this.state;
  }
  setState(state) {
    this.state = state;
  }

  getNeighbours() {
    return this.neighbours;
  }
  setNeighbours(neighbours) {
    this.neighbours = neighbours;
  }

  getX() {
    return this.x;
  }
  setX(x) {
    this.x = x;
  }

  getY() {
    return this.y;
  }
  setY(y) {
    this.y = y;
  }

  getvisitorId() {
    return this.visitorId;
  }
  setvisitorId(visitorId) {
    this.visitorId = visitorId;
  }
}
