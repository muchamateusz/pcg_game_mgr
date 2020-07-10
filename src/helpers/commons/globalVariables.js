export let globals = {
  mapSize: 800,
  backgroundTileSize: 64,
  player: undefined,
  mapBoundries: undefined,
  gameSceneBg: undefined,
  titleSceneBg: undefined,
  cursors: undefined,
  camera: undefined,
  lastHeroPosition: undefined,
  whichAlgorithm: 'ca',
  bsp: { // binary space partitioning
    grid: {
      root: [],
      iterations: [[], [], [], [], []],
    },
    walls: [],
    complexity: 3,
    doorWidth: 80
  },
  ca: { // cellular automata
    grid: [],
    noGoSprites: [],
    wallsAreaRatio: 0.45,
    epochs: 7,
    gradient: 50
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

export const ALGORITHMS = {
  BSP: "bsp",
  CA: "ca",
  ROCKS: "rocks"
};
