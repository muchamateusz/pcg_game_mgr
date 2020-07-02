import { DIRECTION } from "../commons/globalVariables";
import Room from "../../classes/Room";
import {
  calculateProperPointOfSplit,
  isSplittanceHOR,
} from "../commons/globalFunctions";

export default function useSplitRoom(finishLoopAfter, numOfExecution, parent) {
  if (numOfExecution < finishLoopAfter) {
    const nextRooms = [];

    const { width, height, xy, id } = parent;

    const splittance =
      Math.round(Math.random() * 10) % 2
        ? DIRECTION.HORIZONTAL
        : DIRECTION.VERTICAL;
    const pointOfSplit = calculateProperPointOfSplit(
      xy,
      splittance,
      width,
      height
    );

    nextRooms.push(
      new Room({
        splittance,
        pointOfSplit,
        xy,
        parent,
        id: id + 1,
        width: !isSplittanceHOR(splittance) ? pointOfSplit : width,
        height: isSplittanceHOR(splittance) ? pointOfSplit : height,
      })
    );

    nextRooms.push(
      new Room({
        splittance,
        pointOfSplit,
        parent,
        id: id + 2,
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

    this.globals.bsp.grid.iterations[numOfExecution].push(nextRooms);

    useSplitRoom.call(this, finishLoopAfter, numOfExecution + 1, nextRooms[0]);
    useSplitRoom.call(this, finishLoopAfter, numOfExecution + 1, nextRooms[1]);
  }
}
