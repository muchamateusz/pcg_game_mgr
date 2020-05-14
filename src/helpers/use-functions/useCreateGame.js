import Room from "../../classes/Room";

import addHeroAnimations from "../add-functions/addHeroAnimations";
import addRocks from "../add-functions/addRocks";
import addBackground from "../add-functions/addBackground";

import { DIRECTION } from "../common-variables/globals";

export default function useCreateGame() {
  const initiatePhysics = () => {
    this.globals.camera = this.cameras3d.add(85).setPosition(0, 0, 200);
    this.globals.player = this.add.sprite(100, 450, "dude");
    this.globals.player.depth = 1;
    this.physics.world.enable(this.globals.player);
    this.globals.player.body.collideWorldBounds = true;
    addBackground.call(this);
    // addRocks.call(this);
  };

  const pickWidthOrHeight = (splittance, width, height) =>
    splittance === DIRECTION.VERTICAL ? width : height;

  const calculateProperPointOfSplit = (splittance, width, height) => {
    return Math.floor(
      Math.random() 
      * (pickWidthOrHeight(splittance, width, height) 
      - Math.floor(pickWidthOrHeight(splittance, width, height) * 0.25))
    );
  };

  const splitRoom = (finishLoopAfter, numOfExecution, prevRoom) => {
    if (numOfExecution < finishLoopAfter) {
      const nextRooms = [];
      const splittance =
        Math.random() >= 0.5 ? DIRECTION.HORIZONTAL : DIRECTION.VERTICAL;
      const width = prevRoom.width;
      const height = prevRoom.height;
      // find the proper way to generate a point somewhere in the middle of new room
      let pointOfSplit = calculateProperPointOfSplit(splittance, width, height);
      // conditions just to be sure it won't create splittance too close of the edge
      if (pointOfSplit < 100) {
        pointOfSplit = pointOfSplit + 100;
      }

      if (pointOfSplit > 500) {
        pointOfSplit = pointOfSplit - 100;
      }

      nextRooms.push(
        new Room({
          id: setTimeout(Date.now() + 1),
          width: splittance === DIRECTION.VERTICAL ? pointOfSplit : width,
          height: splittance === DIRECTION.HORIZONTAL ? pointOfSplit : height,
          splittance: splittance,
          parentId: prevRoom.id,
        })
      );

      nextRooms.push(
        new Room({
          id: setTimeout(Date.now() + 2),
          width:
            splittance === DIRECTION.VERTICAL ? width - pointOfSplit : width,
          height:
            splittance === DIRECTION.HORIZONTAL
              ? height - pointOfSplit
              : height,
          splittance: splittance,
          parentId: prevRoom.id,
        })
      );

      this.globals.bsp.grid.iterations[numOfExecution].push(nextRooms);
      splitRoom(finishLoopAfter, numOfExecution + 1, nextRooms[0]);
      splitRoom(finishLoopAfter, numOfExecution + 1, nextRooms[1]);
    }
  };

  const initiateGridGeneration = () => {
    const firstRoom = new Room({
      id: setTimeout(Date.now()),
      width: this.globals.mapSize,
      height: this.globals.mapSize,
      // cave: new Phaser.Geom.Rectangle(x, y, width, height),
      splittance:
        Math.random() >= 0.5 ? DIRECTION.HORIZONTAL : DIRECTION.VERTICAL,
      parentId: null,
    });
    const finishLoopAfter = 4; // 4 iterations will generate 16 rooms
    const numOfExecution = 1;
    this.globals.bsp.grid.iterations[0].push(firstRoom);
    splitRoom(finishLoopAfter, numOfExecution, firstRoom);
    console.log(this.globals.bsp.grid.iterations);
    // create an inner room inside the space room.
    // create walls
    // connect rooms from last iteration
    // connect one of the rooms from last iteration with one of the room from previous iteration
    // draw a tunnel on connections
    // place a hero i one of the rooms and an exit in another
  };

  // create rooms
  // set player position in a room
  initiatePhysics();
  initiateGridGeneration();
  addHeroAnimations.call(this);
}
