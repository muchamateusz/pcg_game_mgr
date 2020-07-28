import Room from "../../classes/Room";
import { ALGORITHMS } from "../../commons/globalVariables";
import { addColliders, putHeroAndDoorOnMap, getActualPoints } from "../../commons/globalFunctions";
import splitRoom from "./helpers/splitRoom";
import drawWalls from "./helpers/drawWalls";

export default function BinarySpacePartitioningController() {
  console.time('BSP');
  this.globals.BSP.walls = this.add.group(this.game.world, "walls", false);
  this.globals.BSP.stars = this.add.group(this.game.world, "stars", false);
  this.globals.BSP.stars.active = false;
  this.globals.BSP.walls.active = false;
  const rootRoom = new Room({
    id: '0',
    width: this.globals.mapSize,
    height: this.globals.mapSize,
    xy: [0, 0],
  });

  // first arg of useSplitRoom is responsible for amount of rooms
  splitRoom.call(this, this.globals.BSP.complexity, 0, rootRoom);
  drawWalls.call(this);
  putHeroAndDoorOnMap.call(this, ALGORITHMS.BSP);
  this.physics.add.collider(
    this.globals.player,
    this.globals.BSP.stars,
    (hero, star) => {
      this.globals.points += 1;
      this.globals.heroSpeed += 10;
      this.globals.pointsInstance.setText(getActualPoints.call(this));
      star.disableBody(true, true);
    }
  );
  addColliders.call(this, [this.globals.PRNG, this.globals.BSP.walls]);
  console.timeEnd('BSP');
}
