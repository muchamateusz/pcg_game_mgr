import { DIRECTION } from "./globalVariables";

export const picker = (splittance, width, height) =>
  splittance === DIRECTION.VERTICAL ? width : height;

export const weightedRandom = (max, bellFactor) => {
  let result = 0;
  for (let i = 0; i < bellFactor; i++) {
    result += Math.random() * (max / bellFactor);
  }
  return Math.floor(result);
};

export const calculateProperPointOfSplit = (xy, splittance, width, height) => {
  const directionPointZero = picker(splittance, xy[0], xy[1]);
  const directionSize = picker(splittance, width, height);
  return directionPointZero + weightedRandom(directionSize, 10);
};

export const isSplittanceHOR = (split) => split === DIRECTION.HORIZONTAL;

export function* uniqueIdGenerator() {
  let id = 0;
  while(true) {
    yield id++;
  }
}