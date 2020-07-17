import { uniqueIdGenerator, putHeroAndDoorOnMap } from "../../helpers/commons/globalFunctions";
import { DIRECTIONS, ALGORITHMS } from "../../helpers/commons/globalVariables";
import Tile from "../../classes/Tile";
import startDrunkersWalk from "./helpers/startDrunkersWalk";
import drawPaths from "./helpers/drawPath";
import addColliders from '../../helpers/add-functions/addColliders';

export default function DrunkardWalkController() {
  const idGenerator = uniqueIdGenerator();
  const {
    DW: { howManyDrunkers },
    mapSize,
    tileSize,
  } = this.globals;
  const amountOfTiles = mapSize / tileSize;

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
    const initialCoord = (mapSize / 2) / tileSize;
    const initialTile = this.globals.DW.grid[initialCoord][initialCoord];
    initialTile.visitorId = drunker;
    initialTile.state = DIRECTIONS[getDirectionById(drunker)];
    startDrunkersWalk.call(this, drunker, howLongWalk, initialTile);
  }
  drawPaths.call(this);
  this.physics.world.enable(this.globals.DW.drunkardPaths);
  putHeroAndDoorOnMap.call(this, ALGORITHMS.DW);
  addColliders.call(this, [this.globals.DW.drunkardPaths]);
}

const getDirectionById = (id) =>
  Object.keys(DIRECTIONS).find((val, idx) => idx === id && val);
