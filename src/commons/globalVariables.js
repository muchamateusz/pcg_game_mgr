export const ALGORITHMS = {
  BSP: "BSP", // "BINARY_SPACE_PARTITIONING",
  CA: "CA", // "CELLULAR_AUTOMATA",
  DW: "DW", // "DRUNKARD_WALK",
  RPR: "RPR", // "PSEUDO_RANDOM_NUMBER_GENERATION"
};

export let globals = {
  mapSize: 800, // 600, // 852, // 1136, // 1562,
  backgroundTileSize: 50,
  player: undefined,
  exit: undefined,
  mapBoundries: undefined,
  gameSceneBg: undefined,
  titleSceneBg: undefined,
  cursors: undefined,
  camera: undefined,
  lastHeroPosition: undefined,
  whichAlgorithm: ALGORITHMS.CA,
  BSP: {
    // binary space partitioning
    grid: [[], [], [], [], []],
    walls: [],
    complexity: 5,
    doorWidth: 80,
  },
  CA: {
    // cellular automata
    grid: [],
    noGoSprites: [],
    stars: [],
    starsRatio: 0,
    wallsAreaRatio: 0.3, // im większa liczba tym mniej ścian
    epochs: 10,
    floodFill: {},
    primeId: undefined,
  },
  DW: {
    // drunkard walk
    grid: [],
    stars: [],
    starsRatio: 0,
    howManyDrunkers: 4,
    howLongWalk: 400, // iterations
    drunkardPaths: undefined,
  },
  PRNG: [], // rocks
  tileSize: 50,
  idGenerator: undefined,
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
