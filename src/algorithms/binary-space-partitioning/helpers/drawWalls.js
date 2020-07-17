import { isSplittanceHOR } from "../../../helpers/commons/globalFunctions";

export default function drawWalls() {
  this.globals.BSP.grid.forEach((setOfPairs) => {
    setOfPairs.forEach((pairOfRooms) => {
      const {
        parent: { height, width, splittance, pointOfSplit, xy, doorCoords },
        splittance: childSplittance,
        pointOfSplit: childPointOfSplit,
        xy: childXY,
      } = pairOfRooms[0];

      const areSplitsEqual = childSplittance === splittance;

      const parentHORthen1 = isSplittanceHOR(splittance) ? 1 : 0;
      const parentHORthen0 = isSplittanceHOR(splittance) ? 0 : 1;

      const child_YorX = !areSplitsEqual ? parentHORthen1 : parentHORthen0;

      const getParentWidhOrHeight = (condition) => (condition ? height : width);

      const getParentWidthIfVER = getParentWidhOrHeight(
        isSplittanceHOR(splittance)
      );
      const getParentWidthIfHOR = getParentWidhOrHeight(
        !isSplittanceHOR(splittance)
      );

      const doWhileCondition = !areSplitsEqual
        ? childXY[parentHORthen1] >= pointOfSplit
          ? getParentWidthIfVER + childXY[child_YorX]
          : getParentWidthIfVER
        : getParentWidthIfHOR + childXY[child_YorX];

      let iteration = xy[isSplittanceHOR(childSplittance) ? 0 : 1];

      const iterationOrChildSplit = (condition) =>
        condition ? iteration : childPointOfSplit;

      while (iteration < doWhileCondition) {
        if (
          iteration + 30 < doorCoords ||
          iteration > doorCoords + this.globals.BSP.doorWidth
        ) {
          this.globals.BSP.walls.add(
            this.physics.add
              .image(
                iterationOrChildSplit(isSplittanceHOR(childSplittance)),
                iterationOrChildSplit(!isSplittanceHOR(childSplittance)),
                `ICE_WALL`
              )
              .setImmovable()
          );
        }
        iteration = iteration + 30;
      }
    });
  });

  this.physics.world.enable(this.globals.BSP.walls);
}
