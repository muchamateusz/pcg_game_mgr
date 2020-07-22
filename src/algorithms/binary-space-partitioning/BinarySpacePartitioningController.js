import Room from "../../classes/Room";
import { ALGORITHMS } from "../../commons/globalVariables";
import { addColliders, putHeroAndDoorOnMap } from "../../commons/globalFunctions";
import splitRoom from "./helpers/splitRoom";
import drawWalls from "./helpers/drawWalls";

export default function BinarySpacePartitioningController() {
  this.globals.BSP.walls = this.add.group(this.game.world, "walls", false);

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
  addColliders.call(this, [this.globals.PRNG, this.globals.BSP.walls]);
}
