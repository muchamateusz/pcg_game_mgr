export const ALGORITHMS = {
  BSP: "BSP", // "BINARY_SPACE_PARTITIONING",
  CA: "CA", // "CELLULAR_AUTOMATA",
  DW: "DW", // "DRUNKARD_WALK",
  RPR: "RPR", // "PSEUDO_RANDOM_NUMBER_GENERATION"
};
export let globals = {
  mapSize: 1000,
  heroSpeed: 50,
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
    starsRatio: 0.2,
    complexity: 3,
    doorWidth: 80,
    stars: [],
    starsRatio: 0.2,
  },
  CA: {
    // cellular automata
    grid: [],
    noGoSprites: [],
    stars: [],
    starsRatio: 0.2,
    wallsAreaRatio: 0.6, // im większa liczba tym mniej ścian
    epochs: 5,
    floodFill: {},
    primeId: undefined,
  },
  DW: {
    // drunkard walk
    grid: [],
    stars: [],
    starsRatio: 0.2,
    howManyDrunkers: 4,
    howLongWalk: 50, // iterations
    drunkardPaths: undefined,
  },
  PRNG: [], // rocks
  tileSize: 50,
  idGenerator: undefined,
  points: 0,
};

// export let defaultGlobals = JSON.parse(JSON.stringify(globals));
export let defaultGlobals = { ...globals };
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
