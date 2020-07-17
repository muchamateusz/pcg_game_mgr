export default function fillTilesWithNeighbours() {
  for (let indexOfAxisY in this.globals.CA.grid) {
    indexOfAxisY = +indexOfAxisY;
    let axisY = this.globals.CA.grid[indexOfAxisY];

    for (let indexOfTile in this.globals.CA.grid[indexOfAxisY]) {
      indexOfTile = +indexOfTile;
      let tile = axisY[indexOfTile];
      tile.neighbours = [];
      let upperYAxis = this.globals.CA.grid[indexOfAxisY - 1];
      let lowerYAxis = this.globals.CA.grid[indexOfAxisY + 1];
      // uncomment to make it Moore Neighborhood
      if (upperYAxis) {
        tile.neighbours.push(
          this.globals.CA.grid[indexOfAxisY - 1][indexOfTile]
        );
        // if (this.globals.CA.grid[indexOfAxisY - 1][indexOfTile - 1]) {
        //   tile.neighbours.push(
        //     this.globals.CA.grid[indexOfAxisY - 1][indexOfTile - 1]
        //   );
        // }
        // if (this.globals.CA.grid[indexOfAxisY - 1][indexOfTile + 1]) {
        //   tile.neighbours.push(
        //     this.globals.CA.grid[indexOfAxisY - 1][indexOfTile + 1]
        //   );
        // }
      }
      if (lowerYAxis) {
        tile.neighbours.push(
          this.globals.CA.grid[indexOfAxisY + 1][indexOfTile]
        );
        // if (this.globals.CA.grid[indexOfAxisY + 1][indexOfTile - 1]) {
        //   tile.neighbours.push(
        //     this.globals.CA.grid[indexOfAxisY + 1][indexOfTile - 1]
        //   );
        // }
        // if (this.globals.CA.grid[indexOfAxisY + 1][indexOfTile + 1]) {
        //   tile.neighbours.push(
        //     this.globals.CA.grid[indexOfAxisY + 1][indexOfTile + 1]
        //   );
        // }
      }

      if (this.globals.CA.grid[indexOfAxisY][indexOfTile - 1]) {
        tile.neighbours.push(
          this.globals.CA.grid[indexOfAxisY][indexOfTile - 1]
        );
      }
      if (this.globals.CA.grid[indexOfAxisY][indexOfTile + 1]) {
        tile.neighbours.push(
          this.globals.CA.grid[indexOfAxisY][indexOfTile + 1]
        );
      }
    }
  }
}
