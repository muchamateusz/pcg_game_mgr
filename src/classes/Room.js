
export default class Room {

  width = 600;
  height = 600;
  splittance = Math.random() >= 0.5;
  pointOfSplit = Math.floor(Math.random() * 600) + 100;

  constructor(room) {
    super(Room);
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
  }

  getWidth () {
    return width;
  }
  setWidth (width) {
    this.width = width;
  }
  getHeight () {
    return height;
  }  
  setHeight (height) {
    this.height = height;
  }
  getSplittance () {
    return splittance;
  }
  setSplittance (splittance) {
    this.splittance = splittance;
  }
  getPointOfSplit () {
    return pointOfSplit;
  }  
  setPointOfSplit (pointOfSplit) {
    this.pointOfSplit = pointOfSplit;
  }


}