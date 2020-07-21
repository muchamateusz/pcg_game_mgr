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
}
