import getTileByDirection from "./getTileByDirection";

export default function startDrunkersWalk(visitorId, distance, startTile) {
  let currentTile = startTile;
  for (let iteration = 0; iteration < distance; iteration++) {
    let nextTile = undefined;
    do {
      nextTile = getTileByDirection.call(this, currentTile);
    } while (!nextTile);
    currentTile.state = undefined;
    currentTile = nextTile;
    currentTile.visitorId = visitorId;
  }
}
