import { getRandomByRatio, uniqueIdGenerator } from "../../../commons/globalFunctions";
import Tile from "../../../classes/Tile";

export default function fillGridWithTiles() {
  const amountOfTiles = this.globals.mapSize / this.globals.tileSize;
  const idGenerator = uniqueIdGenerator();

  for (let i = 0; i < amountOfTiles; i++) {
    // fill grid with 30 x arrays - this represents Y axis
    this.globals.CA.grid[i] = [];
    for (let j = 0; j < amountOfTiles; j++) {
      // each array will contain 30 x Tile - this represents X axis
      this.globals.CA.grid[i].push(
        new Tile({
          id: `${idGenerator.next().value}`,
          state: getRandomByRatio(this.globals.CA.wallsAreaRatio),
          neighbours: [],
          x: `${j * this.globals.tileSize}`,
          y: `${i * this.globals.tileSize}`,
        })
      );
    }
  }
}