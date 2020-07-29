export const ALGORITHMS = {
  BSP: "BSP", // "BINARY_SPACE_PARTITIONING",
  CA: "CA", // "CELLULAR_AUTOMATA",
  DW: "DW", // "DRUNKARD_WALK",
  RPR: "RPR", // "PSEUDO_RANDOM_NUMBER_GENERATION"
};
export let defaultGlobals = require('../globals.json');
export let globals = JSON.parse(JSON.stringify(defaultGlobals));
export let config = {
  whichAlgorith: 'undefined',
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
