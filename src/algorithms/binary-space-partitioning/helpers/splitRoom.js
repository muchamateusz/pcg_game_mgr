import { DIRECTION } from "../../../commons/globalVariables";
import Room from "../../../classes/Room";
import {
  isSplittanceHOR,
  calculateWeightedPointInWall,
} from "../../../commons/globalFunctions";

export default function splitRoom(finishLoopAfter, numOfExecution, parent) {
  const nextRooms = [];

  const { width, height, xy, id, splittance: parentSplittance } = parent;

  const splittance =
    Math.round(Math.random() * 10) % 2
      ? DIRECTION.HORIZONTAL
      : DIRECTION.VERTICAL;
  const pointOfSplit = calculateWeightedPointInWall(
    xy,
    splittance,
    width,
    height
  );
  if (!parent.doorCoords) {
    const doorCoords = calculateWeightedPointInWall(
      xy,
      parentSplittance,
      width,
      height
    );

    parent.doorCoords =
      pointOfSplit > doorCoords
        ? !(pointOfSplit > doorCoords + this.globals.BSP.doorWidth)
          ? doorCoords
          : doorCoords - this.globals.BSP.doorWidth
        : doorCoords;
  }
  nextRooms.push(
    new Room({
      splittance,
      pointOfSplit,
      xy,
      parent,
      id: `${+id + 1}`,
      width: !isSplittanceHOR(splittance) ? pointOfSplit : width,
      height: isSplittanceHOR(splittance) ? pointOfSplit : height,
    })
  );

  nextRooms.push(
    new Room({
      splittance,
      pointOfSplit,
      parent,
      id: `${+id + 2}`,
      width: !isSplittanceHOR(splittance)
        ? width - (pointOfSplit - xy[0])
        : width,
      height: isSplittanceHOR(splittance)
        ? height - (pointOfSplit - xy[1])
        : height,
      xy: [
        !isSplittanceHOR(splittance) ? pointOfSplit : xy[0],
        isSplittanceHOR(splittance) ? pointOfSplit : xy[1],
      ],
    })
  );

  if (numOfExecution < finishLoopAfter) {
    this.globals.BSP.grid[numOfExecution].push(nextRooms);
    splitRoom.call(this, finishLoopAfter, numOfExecution + 1, nextRooms[0]);
    splitRoom.call(this, finishLoopAfter, numOfExecution + 1, nextRooms[1]);
  }
}
