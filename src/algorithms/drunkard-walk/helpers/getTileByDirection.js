
import { DIRECTIONS, BIN_DIR_MAP } from "../../../helpers/commons/globalVariables";
import { getFromGridByCoord as get } from '../../../helpers/commons/globalFunctions';

export default function getTileByDirection(tile) {
  const { grid } = this.globals.DW;
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
