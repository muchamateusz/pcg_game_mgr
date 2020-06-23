import Room from '../../classes/Room';
import { DIRECTION } from "../commons/globalVariables";
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

  const finishLoopAfter = 2; // 4 iterations will generate 16 rooms
  const numOfExecution = 0;

  useSplitRoom.call(this, finishLoopAfter, numOfExecution, firstRoom);

  // draw walls
  this.globals.bsp.grid.iterations.forEach((setOfPairs, index) => {
    setOfPairs.forEach(pairOfRooms => {

      const stRoom = pairOfRooms[0];

      const {
        parent: {
          height,
          width,
          splittance,
          pointOfSplit,
          xy
        },
        splittance: childSplittance,
        pointOfSplit: childPointOfSplit,
        xy: childXY
      } = stRoom;

      const areSplitsEqual = childSplittance === splittance;

      const isSplittanceHOR = split => split === DIRECTION.HORIZONTAL;

      const parentHORthen1 = isSplittanceHOR(splittance) ? 1 : 0;
      const parentHORthen0 = isSplittanceHOR(splittance) ? 0 : 1;

      const child_YorX = !areSplitsEqual ? parentHORthen1 : parentHORthen0;

      const getParentWidhOrHeight = condition => condition ? height : width;

      const getParentWidthIfVER = getParentWidhOrHeight(isSplittanceHOR(splittance));
      const getParentWidthIfHOR = getParentWidhOrHeight(!isSplittanceHOR(splittance));

      const doWhileCondition = !areSplitsEqual
          ? childXY[parentHORthen1] >= pointOfSplit
            ? getParentWidthIfVER + childXY[child_YorX]
            : getParentWidthIfVER
          : getParentWidthIfHOR + childXY[child_YorX]


      let iteration = xy[isSplittanceHOR(childSplittance) ? 0 : 1];

      const iterationOrChildSplit = condition => condition ? iteration : childPointOfSplit

      // TODO: w aktualnie rysowanej scianie wyznacz losowo miejsce na drzwi
      // i uwzględnij to miejsce podczas losowania pointOfSplit w potomkach
      // stwórz globalną tablicę przejść, i podczas wyznaczania każdego pointOfSplit
      // bierz poprawkę na pozycję xy przejść..

      while (iteration < doWhileCondition) {
        this.globals.bsp.walls.add(
          this.physics.add.image(
            iterationOrChildSplit(isSplittanceHOR(childSplittance)),
            iterationOrChildSplit(!isSplittanceHOR(childSplittance)),
            `WALL_BRICK`
          ).setImmovable()
        );
        iteration = iteration + 1;
      };

    });

  });

  this.physics.world.enable(this.globals.bsp.walls);
}
