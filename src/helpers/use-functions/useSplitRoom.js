import { DIRECTION } from '../common-variables/globals';
import Room from '../../classes/Room';
import weightedRandom from '../add-functions/addWeightedRandom';

export default function useSplitRoom (finishLoopAfter, numOfExecution, parent) {

    if (numOfExecution < finishLoopAfter) {

      const nextRooms = [];
      const splittance = (Math.round(Math.random() * 10)) % 2 ? DIRECTION.HORIZONTAL : DIRECTION.VERTICAL;
      const width = parent.width;
      const height = parent.height;
      const xy = parent.xy;
      const pointOfSplit = calculateProperPointOfSplit(xy, splittance, width, height);

      nextRooms.push(
        new Room({
          id: setTimeout(Date.now() + 1),
          width: splittance === DIRECTION.VERTICAL ? pointOfSplit : width,
          height: splittance === DIRECTION.HORIZONTAL ? pointOfSplit : height,
          splittance,
          pointOfSplit,
          xy,
          parent
        })
      );

      nextRooms.push(
        new Room({
          id: setTimeout(Date.now() + 2),
          width: splittance === DIRECTION.VERTICAL ? width - pointOfSplit : width,
          height: splittance === DIRECTION.HORIZONTAL
            ? height - pointOfSplit
            : height,
          splittance,
          pointOfSplit,
          xy: [
            splittance === DIRECTION.VERTICAL ? xy[0] + pointOfSplit : xy[0],
            splittance === DIRECTION.HORIZONTAL ? xy[1] + pointOfSplit : xy[1]
          ],
          parent
        })
      );

      this.globals.bsp.grid.iterations[numOfExecution].push(nextRooms);

      useSplitRoom.call(this, finishLoopAfter, numOfExecution + 1, nextRooms[0]);
      useSplitRoom.call(this, finishLoopAfter, numOfExecution + 1, nextRooms[1]);

    }

}
// TODO : przenieś picker gdzieś do globali i reużywaj
const picker = (splittance, width, height) =>
    splittance === DIRECTION.VERTICAL ? width : height;

const calculateProperPointOfSplit = (xy, splittance, width, height) => {
  const directionPointZero = picker(splittance, xy[0], xy[1]);
  const directionSize = picker(splittance, width, height);
  return directionPointZero + weightedRandom(directionSize, 10);
};
