import { DIRECTIONS } from "../../../commons/globalVariables";

export default function startCountingRecursively(
  visitorId,
  direction,
  rowId,
  tileId
) {
  let iterator = tileId;
  while (
    this.globals.CA.grid[rowId][iterator] &&
    this.globals.CA.grid[rowId][iterator].state
  ) {
    const neighbours = {
      [DIRECTIONS.N]:
        this.globals.CA.grid[rowId - 1] &&
        this.globals.CA.grid[rowId - 1][tileId],
      [DIRECTIONS.E]: this.globals.CA.grid[rowId][tileId + 1],
      [DIRECTIONS.S]:
        this.globals.CA.grid[rowId + 1] &&
        this.globals.CA.grid[rowId + 1][tileId],
      [DIRECTIONS.W]: this.globals.CA.grid[rowId][tileId - 1],
    };
    if (!this.globals.CA.grid[rowId][iterator].visitorId) {
      this.globals.CA.grid[rowId][iterator].visitorId = visitorId;
      this.globals.CA.floodFill[visitorId] += 1;
    }
    Object.keys(neighbours).forEach((key) => {
      if (
        // key !== direction &&
        neighbours[key] &&
        neighbours[key].state &&
        neighbours[key].visitorId === undefined
      ) {
        startCountingRecursively.call(
          this,
          visitorId,
          key,
          getRowByDirection(key, rowId),
          getTileIdByDirection(key, tileId)
        );
      }
    });
    iterator += 1;
  }
}

const getRowByDirection = (key, rowId) => {
  if (key === DIRECTIONS.N) {
    return rowId - 1;
  } else if (key === DIRECTIONS.S) {
    return rowId + 1;
  } else {
    return rowId;
  }
};

const getTileIdByDirection = (key, tileId) => {
  if (key === DIRECTIONS.E) {
    return tileId + 1;
  } else if (key === DIRECTIONS.W) {
    return tileId - 1;
  } else {
    return tileId;
  }
};
