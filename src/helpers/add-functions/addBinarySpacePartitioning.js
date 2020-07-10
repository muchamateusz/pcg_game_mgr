import Room from "../../classes/Room";
import useSplitRoom from "../use-functions/useSplitRoom";
import useRoomsToDrawWalls from "../use-functions/useRoomsToDrawWalls";
import addColliders from "./addColliders";

export default function addBinarySpacePartitioning() {
  this.globals.bsp.walls = this.add.group(this.game.world, "walls", false);

  this.globals.bsp.walls.active = false;

  this.globals.bsp.grid.root = new Room({
    id: '0',
    width: this.globals.mapSize,
    height: this.globals.mapSize,
    xy: [0, 0],
  });

  // first arg of useSplitRoom is responsible for amount of rooms
  useSplitRoom.call(this, 3, 0, this.globals.bsp.grid.root);
  useRoomsToDrawWalls.call(this);
  addColliders.call(this, [this.globals.rocks, this.globals.bsp.walls]);
}
