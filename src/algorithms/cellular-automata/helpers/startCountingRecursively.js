import { DIRECTIONS } from "../../../helpers/commons/globalVariables";

export default function startCountingRecursively(
  visitorId,
  direction,
  rowId,
  tileId
) {
  // find new directions
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
  let iterator = tileId;
  while (
    this.globals.CA.grid[rowId][iterator] &&
    this.globals.CA.grid[rowId][iterator].state
  ) {
    this.globals.CA.grid[rowId][iterator].visitorId = visitorId;
    this.globals.CA.floodFill[visitorId] += 1;
    // call myself for other possible directions
    Object.keys(neighbours).forEach((key) => {
      const getRowByDirection = () => {
        if (key === DIRECTIONS.N) {
          return rowId - 1;
        } else if (key === DIRECTIONS.S) {
          return rowId + 1;
        } else {
          return rowId;
        }
      };
      const getTileIdByDirection = () => {
        if (key === DIRECTIONS.E) {
          return tileId + 1;
        } else if (key === DIRECTIONS.W) {
          return tileId - 1;
        } else {
          return tileId;
        }
      };

      if (
        (key !== direction,
        neighbours[key] && neighbours[key].state && !neighbours[key].visitorId)
      ) {
        startCountingRecursively.call(
          this,
          visitorId,
          key,
          getRowByDirection(),
          getTileIdByDirection()
        );
      }
    });

    iterator += 1;
  }

  // if (neighbour && neighbour.state && !neighbour.visitorId) {
  // if (neighbour && neighbour.state) {
  //   if (!neighbour.visitorId) {
  //     neighbour.visitorId = prevTileId;
  //   }
  //   this.globals.CA.floodFill[prevTileId] += 1;
  //   startCountingRecursively.call(
  //     this,
  //     prevTileId,
  //     this.globals.CA.grid[indexOfAxisY][indexOfTile - 1],
  //     indexOfAxisY,
  //     indexOfTile - 1
  //   );
  // } else {
  //   // on left side there is no grid or grid is no_go
  //   if (
  //     this.globals.CA.grid[indexOfAxisY + 1] &&
  //     this.globals.CA.grid[indexOfAxisY + 1][indexOfTile]
  //   ) {
  //     startCountingRecursively.call(
  //       this,
  //       prevTileId,
  //       this.globals.CA.grid[indexOfAxisY + 1][indexOfTile],
  //       indexOfAxisY + 1,
  //       indexOfTile
  //     );
  //   } else if (
  //     this.globals.CA.grid[indexOfAxisY][indexOfTile + 1]
  //   ) {
  //     startCountingRecursively.call(
  //       this,
  //       prevTileId,
  //       this.globals.CA.grid[indexOfAxisY][indexOfTile + 1],
  //       indexOfAxisY,
  //       indexOfTile + 1
  //     );
  //   } else if (
  //     this.globals.CA.grid[indexOfAxisY - 1] &&
  //     this.globals.CA.grid[indexOfAxisY - 1][indexOfTile]
  //   ) {
  //     startCountingRecursively.call(
  //       this,
  //       prevTileId,
  //       this.globals.CA.grid[indexOfAxisY - 1][indexOfTile],
  //       indexOfAxisY - 1,
  //       indexOfTile
  //     );
  //   } else {
  //     console.log('wtf ?!');
  //   }
  // }
}
