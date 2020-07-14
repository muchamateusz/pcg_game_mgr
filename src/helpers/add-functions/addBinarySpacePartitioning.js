import Room from "../../classes/Room";
import useSplitRoom from "../use-functions/useSplitRoom";
import useRoomsToDrawWalls from "../use-functions/useRoomsToDrawWalls";
import addColliders from "./addColliders";
import { ALGORITHMS } from "../commons/globalVariables";
import { placeYourHeroAndPortals } from "../commons/globalFunctions";

export default function addBinarySpacePartitioning() {
  this.globals.BSP.walls = this.add.group(this.game.world, "walls", false);

  this.globals.BSP.walls.active = false;

  const rootRoom = new Room({
    id: '0',
    width: this.globals.mapSize,
    height: this.globals.mapSize,
    xy: [0, 0],
  });

  // first arg of useSplitRoom is responsible for amount of rooms
  useSplitRoom.call(this, this.globals.BSP.complexity, 0, rootRoom);
  useRoomsToDrawWalls.call(this);
  placeYourHeroAndPortals.call(this, ALGORITHMS.BSP);
  addColliders.call(this, [this.globals.PRNG, this.globals.BSP.walls]);
}
