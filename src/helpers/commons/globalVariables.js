
export const ALGORITHMS = {
  BSP: "BSP", // "BINARY_SPACE_PARTITIONING",
  CA: "CA", // "CELLULAR_AUTOMATA",
  DW: "DW", // "DRUNKARD_WALK",
  PRNG: "PRNG", // "PSEUDO_RANDOM_NUMBER_GENERATION"
};

export let globals = {
  mapSize: 800,
  backgroundTileSize: 64,
  player: undefined,
  portals: [],
  mapBoundries: undefined,
  gameSceneBg: undefined,
  titleSceneBg: undefined,
  cursors: undefined,
  camera: undefined,
  lastHeroPosition: undefined,
  whichAlgorithm: ALGORITHMS.BSP,
  BSP: { // binary space partitioning
    grid: [[], [], [], [], []],
    walls: [],
    complexity: 3,
    doorWidth: 80
  },
  CA: { // cellular automata
    grid: [],
    noGoSprites: [],
    stars: [],
    starsRatio: 0.15,
    wallsAreaRatio: 0.5,
    epochs: 6,
    floodFill: {},
    primeId: undefined
  },
  DW: { // drunkard walk
    grid: [],
    stars: [],
    starsRatio: 0.2,
    howManyDrunkers: 4,
    howLongWalk: 150, // iterations
    drunkardPaths: undefined
  },
  PRNG: [], // rocks
  tileSize: 50,
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

export const DIRECTIONS = {
  N: "NORTH",
  E: "EAST",
  S: "SOUTH",
  W: "WEST",
};

export const BIN_DIR_MAP = [
  [
    DIRECTIONS.N,
    DIRECTIONS.S
  ],
  [
    DIRECTIONS.E,
    DIRECTIONS.W  ]
]