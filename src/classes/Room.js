
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

  getId () {
    return this.id;
  }
  setId (id) {
    this.id = id;
  }

  getWidth () {
    return this.width;
  }
  setWidth (width) {
    this.width = width;
  }

  getHeight () {
    return this.height;
  }
  setHeight (height) {
    this.height = height;
  }

  getSplittance () {
    return this.splittance;
  }
  setSplittance (splittance) {
    this.splittance = splittance;
  }

  getPointOfSplit () {
    return this.pointOfSplit;
  }
  setPointOfSplit (pointOfSplit) {
    this.pointOfSplit = pointOfSplit;
  }

  getParent () {
    return this.parent;
  }
  setParent (parent) {
    this.parent = parent;
  }

  getParent () {
    return this.xy;
  }
  setParent (xy) {
    this.xy = xy;
  }


}
