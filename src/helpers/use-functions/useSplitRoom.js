import { DIRECTION } from '../common-variables/globals';
import Room from '../../classes/Room';
import weightedRandom from '../add-functions/addWeightedRandom';

export default function useSplitRoom (finishLoopAfter, numOfExecution, prevRoom) {
    if (numOfExecution < finishLoopAfter) {
      const nextRooms = [];
      const splittance = prevRoom.splittance === DIRECTION.HORIZONTAL ? DIRECTION.VERTICAL : DIRECTION.HORIZONTAL;
      const width = prevRoom.width;
      const height = prevRoom.height;
      // find the proper way to generate a point somewhere in the middle of new room
      let pointOfSplit = calculateProperPointOfSplit(splittance, width, height);
      // // conditions just to be sure it won't create splittance too close of the edge
      if (pointOfSplit < 100) {
        pointOfSplit = pointOfSplit + 100;
      }

      if (pointOfSplit > 500) {
        pointOfSplit = pointOfSplit - 100;
      }

      nextRooms.push(
        new Room({
          id: setTimeout(Date.now() + 1),
          width: splittance === DIRECTION.VERTICAL ? pointOfSplit : width,
          height: splittance === DIRECTION.HORIZONTAL ? pointOfSplit : height,
          splittance,
          pointOfSplit,
          parent: prevRoom
        })
      );

      nextRooms.push(
        new Room({
          id: setTimeout(Date.now() + 2),
          width:
            splittance === DIRECTION.VERTICAL ? width - pointOfSplit : width,
          height:
            splittance === DIRECTION.HORIZONTAL
              ? height - pointOfSplit
              : height,
          splittance,
          pointOfSplit,
          parent: prevRoom
        })
      );

      this.globals.bsp.grid.iterations[numOfExecution].push(nextRooms);
      useSplitRoom.call(this, finishLoopAfter, numOfExecution + 1, nextRooms[0]);
      useSplitRoom.call(this, finishLoopAfter, numOfExecution + 1, nextRooms[1]);
    }
}

const pickWidthOrHeight = (splittance, width, height) =>
    splittance === DIRECTION.VERTICAL ? width : height;

const calculateProperPointOfSplit = (splittance, width, height) => {
return weightedRandom(pickWidthOrHeight(splittance, width, height), 20);
};
