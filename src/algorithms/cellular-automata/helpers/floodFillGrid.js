import lodash from "lodash";
import { uniqueIdGenerator } from "../../../commons/globalFunctions";
import startCountingRecursively from "./startCountingRecursively";
import { DIRECTIONS } from "../../../commons/globalVariables";

export default function floodFillGrid() {
  const idGenerator = uniqueIdGenerator(0);
  for (let indexOfAxisY in this.globals.CA.grid) {
    indexOfAxisY = +indexOfAxisY;
    let axisY = this.globals.CA.grid[indexOfAxisY];
    for (let indexOfTile in this.globals.CA.grid[indexOfAxisY]) {
      indexOfTile = +indexOfTile;
      let tile = axisY[indexOfTile];
      const tileId = idGenerator.next().value;
      if (tile && tile.state && tile.visitorId === undefined) {
        tile.visitorId = tileId;
        this.globals.CA.floodFill[tileId] = 1;
        startCountingRecursively.call(
          this,
          tileId, // id rekurencji
          DIRECTIONS.E, // id pola z którego przychodzę
          indexOfAxisY,
          indexOfTile
        );
      }
    }
  }
  let arrayOfFloodFill = Object.keys(this.globals.CA.floodFill).map((key) => ({
    key,
    value: this.globals.CA.floodFill[key],
  }));
  arrayOfFloodFill = lodash.sortBy(arrayOfFloodFill, ["value"]);
  this.globals.CA.primeId = +arrayOfFloodFill[arrayOfFloodFill.length - 1].key;
}
