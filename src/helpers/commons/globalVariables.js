export let globals = {
  mapSize: 1200,
  backgroundTileSize: 64,
  player: undefined,
  mapBoundries: undefined,
  gameSceneBg: undefined,
  titleSceneBg: undefined,
  cursors: undefined,
  camera: undefined,
  lastHeroPosition: undefined,
  bsp: {
    grid: {
      root: [],
      iterations: [[], [], [], []],
    },
    walls: [],
  },
  ca: {
    grid: [],
    noGoSprites: []
  },
  rocks: [],
  idGenerator: undefined
};

export let config = {
  type: Phaser.AUTO,
  backgroundColor: 0x000000,
  width: globals.mapSize,
  height: globals.mapSize,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0, x: 0 },
    },
  },
};

export const DIRECTION = {
  HORIZONTAL: "HORIZONTAL",
  VERTICAL: "VERTICAL",
};
