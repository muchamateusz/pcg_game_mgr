import { isSplittanceHOR } from "../commons/globalFunctions";

export default function useRoomsToDrawWalls() {
  this.globals.bsp.grid.iterations.forEach((setOfPairs) => {
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
          iteration < doorCoords ||
          iteration > doorCoords + this.globals.doorWidth
        ) {
          this.globals.bsp.walls.add(
            this.physics.add
              .image(
                iterationOrChildSplit(isSplittanceHOR(childSplittance)),
                iterationOrChildSplit(!isSplittanceHOR(childSplittance)),
                `WALL_BRICK`
              )
              .setImmovable()
          );
        }
        if (
          iteration === doorCoords ||
          iteration === doorCoords + this.globals.doorWidth
        ) {
          for (let i = 0; i < 2; i++) {
            this.globals.bsp.walls.add(
              this.physics.add
                .image(
                  isSplittanceHOR(childSplittance) ? iteration : childPointOfSplit - 5,
                  !isSplittanceHOR(childSplittance) ? iteration : childPointOfSplit - 5,
                  `WALL_BRICK`
                )
                .setImmovable()
            );
            this.globals.bsp.walls.add(
              this.physics.add
                .image(
                  isSplittanceHOR(childSplittance) ? iteration : childPointOfSplit + 5,
                  !isSplittanceHOR(childSplittance) ? iteration : childPointOfSplit + 5,
                  `WALL_BRICK`
                )
                .setImmovable()
            );
          }
        }
        iteration = iteration + 1;
      }
    });
  });

  this.physics.world.enable(this.globals.bsp.walls);
}
