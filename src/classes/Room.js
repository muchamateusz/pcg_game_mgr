export default class Room {
  constructor(room) {
    if (room.id) {
      this.id = room.id;
    }
    if (room.width) {
      this.width = room.width;
    }
    if (room.height) {
      this.height = room.height;
    }
    if (room.splittance) {
      this.splittance = room.splittance;
    }
    if (room.pointOfSplit) {
      this.pointOfSplit = room.pointOfSplit;
    }
    if (room.parent) {
      this.parent = room.parent;
    }
    if (room.xy) {
      this.xy = room.xy;
    }
  }
}
