import Room from '../../classes/Room';
import { DIRECTION } from "../common-variables/globals";
import useSplitRoom from '../use-functions/useSplitRoom';

export default function addBspWalls () {
  this.globals.bsp.walls = this.add.group(this.game.world, "walls", false);
  this.globals.bsp.walls.active = false;

  const firstRoom = new Room({
    id: setTimeout(Date.now()),
    width: this.globals.mapSize,
    height: this.globals.mapSize,
    xy: [0, 0]
  });

  this.globals.bsp.grid.root = firstRoom;

  const finishLoopAfter = 3; // 4 iterations will generate 16 rooms
  const numOfExecution = 0;

  useSplitRoom.call(this, finishLoopAfter, numOfExecution, firstRoom);

  // draw walls
  this.globals.bsp.grid.iterations.forEach((setOfPairs, index) => {
    // const setOfPairs = this.globals.bsp.grid.iterations[finishLoopAfter - 1];
    setOfPairs.forEach((pairOfRooms, idx) => {

      const stRoom = pairOfRooms[0];
      const ndRoom = pairOfRooms[1];
      const parentWallSize = stRoom.parent.splittance === DIRECTION.HORIZONTAL ? 'height' : 'width';
      const wallPositionIdx = stRoom.parent.splittance === DIRECTION.HORIZONTAL ? 0 : 1;

      // if current splittance is different then parent splittance
      // start with parent.pointOfSplit
      // else start with 0
      let doWhileCondition = idx % 2
      ? (ndRoom.parent[parentWallSize] + ndRoom.xy[wallPositionIdx])
      : (stRoom.parent[parentWallSize] + stRoom.xy[wallPositionIdx]);

      let iteration = stRoom.splittance
        ? idx % 2
          ? ndRoom.splittance !== ndRoom.parent.splittance
            ? ndRoom.parent.pointOfSplit
            : 0
          : 0
        : 0;
      // TODO: w aktualnie rysowanej scianie wyznacz losowo miejsce na drzwi
      // i uwzględnij to miejsce podczas losowania pointOfSplit w potomkach
      // stwórz globalną tablicę przejść, i podczas wyznaczania każdego pointOfSplit
      // bierz poprawkę na pozycję xy przejść..
      console.log(setOfPairs);
      // debugger;
      do {
        this.globals.bsp.walls.add(
          this.physics.add.image(
            stRoom.splittance === DIRECTION.HORIZONTAL
              ? iteration
              : stRoom.pointOfSplit,
            stRoom.splittance === DIRECTION.VERTICAL
              ? iteration
              : stRoom.pointOfSplit,
            `bb${index}`
          ).setImmovable()
        );
        iteration = iteration + 5;
      } while (iteration < doWhileCondition);

    });

  });

  this.physics.world.enable(this.globals.bsp.walls);
}
