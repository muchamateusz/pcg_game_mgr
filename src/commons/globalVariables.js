export const ALGORITHMS = {
  BSP: "BSP", // "BINARY_SPACE_PARTITIONING",
  CA: "CA", // "CELLULAR_AUTOMATA",
  DW: "DW", // "DRUNKARD_WALK",
  RPR: "RPR", // "PSEUDO_RANDOM_NUMBER_GENERATION"
};
export let defaultGlobals = {
  mapSize: (window.innerHeight / 100).toFixed() * 100 - 50,
  heroSpeed: 100,
  backgroundTileSize: 50,
  player: undefined,
  exit: undefined,
  mapBoundries: undefined,
  gameSceneBg: undefined,
  titleSceneBg: undefined,
  cursors: undefined,
  camera: undefined,
  lastHeroPosition: undefined,
  starsRatio: 0.2,
  BSP: {
    grid: [[], [], [], []],
    walls: [],
    complexity: 3,
    doorWidth: 80,
    stars: [],
  },
  CA: {
    grid: [],
    noGoSprites: [],
    stars: [],
    wallsAreaRatio: 0.5,
    epochs: 10,
    floodFill: {},
    primeId: undefined,
  },
  DW: {
    grid: [],
    stars: [],
    howManyDrunkers: 4,
    howLongWalk: 50,
    drunkardPaths: undefined,
  },
  tileSize: 50,
  idGenerator: undefined,
  points: 0,
};

export let globals = JSON.parse(JSON.stringify(defaultGlobals));

export let config = {
  whichAlgorith: undefined,
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

export const DIRECTIONS = {
  N: "NORTH",
  E: "EAST",
  S: "SOUTH",
  W: "WEST",
};

export const BIN_DIR_MAP = [
  [DIRECTIONS.N, DIRECTIONS.S],
  [DIRECTIONS.E, DIRECTIONS.W],
];
