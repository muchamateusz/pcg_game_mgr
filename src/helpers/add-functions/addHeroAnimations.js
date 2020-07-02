export default function addHeroAnimations() {
  // MOVE
  this.anims.create({
    key: "front-walk",
    frames: this.anims.generateFrameNumbers("HERO", { start: 0, end: 2 }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "right-walk",
    frames: this.anims.generateFrameNumbers("HERO", { start: 3, end: 5 }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "back-walk",
    frames: this.anims.generateFrameNumbers("HERO", { start: 6, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "left-walk",
    frames: this.anims.generateFrameNumbers("HERO", { start: 9, end: 11 }),
    frameRate: 10,
    repeat: -1,
  });
  // STOP
  this.anims.create({
    key: "stop-front",
    frames: [{ key: "HERO", frame: 1 }],
    frameRate: 20,
  });
  this.anims.create({
    key: "stop-right",
    frames: [{ key: "HERO", frame: 4 }],
    frameRate: 20,
  });
  this.anims.create({
    key: "stop-back",
    frames: [{ key: "HERO", frame: 7 }],
    frameRate: 20,
  });
  this.anims.create({
    key: "stop-left",
    frames: [{ key: "HERO", frame: 10 }],
    frameRate: 20,
  });
}
