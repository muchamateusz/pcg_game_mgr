import {
  uniqueIdGenerator,
  getFromGridByCoord as get,
  getRandomByRatio,
  placeYourHeroAndPortals,
} from "../commons/globalFunctions";
import { DIRECTIONS, BIN_DIR_MAP, ALGORITHMS } from "../commons/globalVariables";
import Tile from "../../classes/Tile";
import addColliders from "./addColliders";

export default function addDrunkardWalk() {
  const idGenerator = uniqueIdGenerator();
  const {
    DW: { howManyDrunkers },
    mapSize,
    tileSize,
  } = this.globals;
  const amountOfTiles = mapSize / tileSize;
  // const drunkers = [];

  for (let i = 0; i < amountOfTiles; i++) {
    // fill grid with 30 x arrays - this represents Y axis
    this.globals.DW.grid[i] = [];
    for (let j = 0; j < amountOfTiles; j++) {
      // each array will contain 30 x Tile - this represents X axis
      this.globals.DW.grid[i].push(
        new Tile({
          id: `${idGenerator.next().value}`,
          x: `${j * tileSize}`,
          y: `${i * tileSize}`,
        })
      );
    }
  }
  for (let drunker = 1; drunker <= howManyDrunkers; drunker++) {
    const {
      DW: { howLongWalk },
      mapSize,
      tileSize,
    } = this.globals;
    const startingPoint = mapSize / 2;
    const initialYCoord = startingPoint / tileSize;
    const initialXCoord = startingPoint / tileSize;
    const initialTile = this.globals.DW.grid[initialYCoord][initialXCoord];
    initialTile.visitorId = drunker;
    initialTile.state = DIRECTIONS[getDirectionById(drunker)];
    startDrunkersWalk.call(this, drunker, howLongWalk, initialTile);
  }
  drawPaths.call(this);
  this.physics.world.enable(this.globals.DW.drunkardPaths);
  placeYourHeroAndPortals.call(this, ALGORITHMS.DW);
  addColliders.call(this, [this.globals.DW.drunkardPaths]);
}

function startDrunkersWalk(visitorId, distance, startTile) {
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

function drawPaths() {
  this.globals.DW.drunkardPaths = this.add.group(
    this.game.world,
    "drunkardPaths",
    false
  );
  this.globals.DW.drunkardPaths.active = false;
  this.globals.DW.stars = this.add.group(this.game.world, "stars", false);
  this.globals.DW.stars.active = false;
  for (let indexOfAxisY in this.globals.DW.grid) {
    indexOfAxisY = +indexOfAxisY;
    let axisY = this.globals.DW.grid[indexOfAxisY];

    for (let indexOfTile in this.globals.DW.grid[indexOfAxisY]) {
      indexOfTile = +indexOfTile;
      let tile = axisY[indexOfTile];
      if (!tile.visitorId) {
        this.globals.DW.drunkardPaths.add(
          this.physics.add
            .image(+tile.x + 25, +tile.y + 25, `NO_GO`)
            .setImmovable()
        );
      } else if (getRandomByRatio(this.globals.DW.starsRatio)) {
        this.globals.DW.stars.add(
          this.physics.add
            .image(+tile.x + 25, +tile.y + 25, `STAR`)
            .setImmovable()
        );
      }
    }
  }
}

function getTileByDirection(tile) {
  const { grid } = this.globals.DW;
  // const directionId = Math.round((Math.random() * 1000) % 3);
  const direction =
    tile.state ||
    BIN_DIR_MAP[Math.round(Math.random())][Math.round(Math.random())];
  switch (direction) {
    case DIRECTIONS.N:
      const newNorthRow = grid[get(tile.y) - 1];
      return newNorthRow && newNorthRow[get(tile.x)];
    case DIRECTIONS.S:
      const newSouthRow = grid[get(tile.y) + 1];
      return newSouthRow && newSouthRow[get(tile.x)];
    case DIRECTIONS.E:
      return grid[get(tile.y)][get(tile.x) + 1];
    case DIRECTIONS.W:
      return grid[get(tile.y)][get(tile.x) - 1];
    default:
      break;
  }
}

const getDirectionById = (id) =>
  Object.keys(DIRECTIONS).find((val, idx) => idx === id && val);
