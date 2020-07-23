import { DIRECTION, globals, ALGORITHMS } from "./globalVariables";

export const pickByDirection = (splittance, width, height) =>
  splittance === DIRECTION.VERTICAL ? width : height;

export const getFromGridByCoord = (coord) => coord / globals.tileSize;

export const weightedRandom = (max, bellFactor) => {
  let result = 0;
  for (let i = 0; i < bellFactor; i++) {
    result += Math.random() * (max / bellFactor);
  }
  return Math.floor(result);
};

export const calculateWeightedPointInWall = (xy, splittance, width, height) => {
  const directionPointZero = pickByDirection(splittance, xy[0], xy[1]);
  const directionSize = pickByDirection(splittance, width, height);
  return directionPointZero + weightedRandom(directionSize, 60);
};

export const isSplittanceHOR = (split) => split === DIRECTION.HORIZONTAL;

export const getRandomByRatio = (ratio) =>
  Math.round((Math.random() + Number.EPSILON) * 100) / 100 < ratio;

export const getPlayerCoords = (globals) => {
  const { grid, primeId } = globals[globals.whichAlgorithm];
  let iterator = 0;
  let firstFreeTile = undefined;
  while (!firstFreeTile) {
    firstFreeTile = grid[iterator].find((tile) =>
      primeId ? tile.visitorId === primeId : tile.visitorId
    );
    iterator += 1;
  }
  const x = +firstFreeTile.x + 25 || +firstFreeTile.xy[0] + 25;
  const y = +firstFreeTile.y + 25 || +firstFreeTile.xy[1] + 25;
  return { x, y };
};

export const getPortalCoords = (globals) => {
  const { grid, primeId } = globals[globals.whichAlgorithm];
  let iterator = grid.length - 1;
  let lastFreeTile = undefined;
  let lastFreeTiles = [];
  while (!lastFreeTiles || !lastFreeTiles.length) {
    lastFreeTiles = grid[iterator].filter((tile) =>
      primeId ? tile.visitorId === primeId : tile.visitorId
    );
    iterator -= 1;
  }
  lastFreeTile = lastFreeTiles[lastFreeTiles.length - 1];
  const x = +lastFreeTile.x + 25 || +lastFreeTile.xy[0] + 25;
  const y = +lastFreeTile.y + 25 || +lastFreeTile.xy[1] + 25;
  return { x, y };
};

export function* uniqueIdGenerator(start) {
  let id = 1;
  if (start) {
    id = start;
  }
  while (true) {
    yield id++;
  }
}

export function putHeroAndDoorOnMap(algorythm) {
  switch (algorythm) {
    case ALGORITHMS.BSP:
      this.globals.player = this.add.sprite(10, 0, "HERO");
      this.globals.exit = this.add.sprite(
        this.globals.mapSize - 25,
        this.globals.mapSize - 25,
        "DOOR"
      );
      break;
    case ALGORITHMS.CA:
      const { x: caHeroX, y: caHeroY } = getPlayerCoords(this.globals);
      const { x: caPortalX, y: caPortalY } = getPortalCoords(this.globals);
      this.globals.player = this.add.sprite(caHeroX, caHeroY, "HERO");
      this.globals.exit = this.add.sprite(caPortalX, caPortalY, "DOOR");
      break;
    case ALGORITHMS.DW:
      const { x: dwHeroX, y: dwHeroY } = getPlayerCoords(this.globals);
      const { x: dwPortalX, y: dwPortalY } = getPortalCoords(this.globals);
      this.globals.player = this.add.sprite(dwHeroX, dwHeroY, "HERO");
      this.globals.exit = this.add.sprite(dwPortalX, dwPortalY, "DOOR");
      break;
    case ALGORITHMS.PRNG:
      this.globals.player = this.add.sprite(10, 0, "HERO");
      this.globals.exit = this.add.sprite(
        this.globals.mapSize - 25,
        this.globals.mapSize - 25,
        "DOOR"
      );
      break;
  }

  this.globals.exit.depth = 1;
  this.globals.player.depth = 2;
  this.physics.world.enable(this.globals.player);
  this.globals.player.body.collideWorldBounds = true;
}

export function addColliders(targets) {
  for (let target of targets) {
    this.physics.add.collider(this.globals.player, target, () =>
      this.globals.player.body.velocity.setTo(0)
    );
  }
}
