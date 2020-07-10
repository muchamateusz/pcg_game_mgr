import Tile from "../../classes/Tile";
import { uniqueIdGenerator } from "../commons/globalFunctions";
import addColliders from "./addColliders";

export default function addCellularAutomata() {
  fillCAGrid.call(this);
  setStatesInGridTiles.call(this);
  drawTiles.call(this);
  // napisz metode która będzie usuwała niedostępne jaskinie
  // używając do tego flood fill algorytmu
  // trzeba wypuścić rekursywnie zgodnie z algorytmem
  // na kopii grida oznaczanie kafelków
  // jeśli wypełni wszystkie to znajdź kafelek niepomalowany ze state === floor
  // jeśli taki jest to w jego współrzędnej puść ten sam algorytm i zapisz poprzednią i obecną jaskinię
  // do jakichś zmiennych (a najlepiej to liczbę pomalowanych kafelków)
  // powtórz dwa ostatnie 'jeśli' aż do momentu gdy nie ma więcej niepomalowanych floorów
  // następnie porównaj wielkości jaskiń, wybierz największą a resztę wypełnij ścianami używając tego samego algorytmu
}
function fillCAGrid() {
  const amountOfTiles = this.globals.mapSize / this.globals.ca.gradient;
  const idGenerator = uniqueIdGenerator();

  for (let i = 0; i < amountOfTiles; i++) {
    // fill grid with 30 x arrays - this represents Y axis
    this.globals.ca.grid[i] = [];
    for (let j = 0; j < amountOfTiles; j++) {
      // each array will contain 30 x Tile - this represents X axis
      this.globals.ca.grid[i].push(
        new Tile({
          id: `${idGenerator.next().value}`,
          state: setInitialState(this.globals.ca.wallsAreaRatio),
          neighbours: [],
          x: `${i * this.globals.ca.gradient}`,
          y: `${j * this.globals.ca.gradient}`,
        })
      );
    }
    console.log(this.globals.ca.grid[i].filter((tile) => tile.state).length);
  }
}
function fillTilesWithNeighbours() {
  for (let indexOfAxisY in this.globals.ca.grid) {
    indexOfAxisY = +indexOfAxisY;
    let axisY = this.globals.ca.grid[indexOfAxisY];

    for (let indexOfTile in this.globals.ca.grid[indexOfAxisY]) {
      indexOfTile = +indexOfTile;
      let tile = axisY[indexOfTile];
      tile.neighbours = [];
      let upperYAxis = this.globals.ca.grid[indexOfAxisY - 1];
      let lowerYAxis = this.globals.ca.grid[indexOfAxisY + 1];
      // uncomment to make it Moore Neighborhood
      if (upperYAxis) {
        tile.neighbours.push(
          this.globals.ca.grid[indexOfAxisY - 1][indexOfTile]
        );
        // if (this.globals.ca.grid[indexOfAxisY - 1][indexOfTile - 1]) {
        //   tile.neighbours.push(
        //     this.globals.ca.grid[indexOfAxisY - 1][indexOfTile - 1]
        //   );
        // }
        // if (this.globals.ca.grid[indexOfAxisY - 1][indexOfTile + 1]) {
        //   tile.neighbours.push(
        //     this.globals.ca.grid[indexOfAxisY - 1][indexOfTile + 1]
        //   );
        // }
      }
      if (lowerYAxis) {
        tile.neighbours.push(
          this.globals.ca.grid[indexOfAxisY + 1][indexOfTile]
        );
        // if (this.globals.ca.grid[indexOfAxisY + 1][indexOfTile - 1]) {
        //   tile.neighbours.push(
        //     this.globals.ca.grid[indexOfAxisY + 1][indexOfTile - 1]
        //   );
        // }
        // if (this.globals.ca.grid[indexOfAxisY + 1][indexOfTile + 1]) {
        //   tile.neighbours.push(
        //     this.globals.ca.grid[indexOfAxisY + 1][indexOfTile + 1]
        //   );
        // }
      }

      if (this.globals.ca.grid[indexOfAxisY][indexOfTile - 1]) {
        tile.neighbours.push(
          this.globals.ca.grid[indexOfAxisY][indexOfTile - 1]
        );
      }
      if (this.globals.ca.grid[indexOfAxisY][indexOfTile + 1]) {
        tile.neighbours.push(
          this.globals.ca.grid[indexOfAxisY][indexOfTile + 1]
        );
      }
    }
  }
}
function setStatesInGridTiles() {
  for (let epoch = 0; epoch < this.globals.ca.epochs; epoch++) {
    fillTilesWithNeighbours.call(this);
    for (let indexOfAxisY in this.globals.ca.grid) {
      indexOfAxisY = +indexOfAxisY;
      let axisY = this.globals.ca.grid[indexOfAxisY];

      for (let indexOfTile in this.globals.ca.grid[indexOfAxisY]) {
        indexOfTile = +indexOfTile;
        let tile = axisY[indexOfTile];
        tile.state = getState(tile);
      }
    }
  }
}
function drawTiles() {
  this.globals.ca.noGoSprites = this.add.group(
    this.game.world,
    "noGoSprites",
    false
  );
  this.globals.ca.noGoSprites.active = false;

  for (let indexOfAxisY in this.globals.ca.grid) {
    indexOfAxisY = +indexOfAxisY;
    let axisY = this.globals.ca.grid[indexOfAxisY];

    for (let indexOfTile in this.globals.ca.grid[indexOfAxisY]) {
      indexOfTile = +indexOfTile;
      let tile = axisY[indexOfTile];
      if (!tile.state) {
        this.globals.ca.noGoSprites.add(
          this.physics.add
            .image(+tile.x + 25, +tile.y + 25, `NO_GO`)
            .setImmovable()
        );
      }
    }
  }
  this.physics.world.enable(this.globals.ca.noGoSprites);
  addColliders.call(this, [this.globals.ca.noGoSprites]);
}

const getState = (myself) => {
  const aliveNeighboursAmount =
  myself.neighbours.filter((nb) => nb.state).length;
  // const deadNeighboursAmount = myself.neighbours.filter((nb) => !nb.state)
  /*
    If a cell is a wall and less than 3 cells in the Moore neighborhood are walls, the cell changes state to a floor.
    If a cell is a floor and greater than 4 cells in the Moore neighborhood are walls, the cell changes state to a wall.
    Otherwise, the cell remains in its current state.
  */
  // return !myself.state ? deadNeighboursAmount < 3 : !(deadNeighboursAmount > 4);
  /*
    Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
    Any live cell with two or three live neighbours lives on to the next generation.
    Any live cell with more than three live neighbours dies, as if by overpopulation.
    Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
  */
  // state = false = dead = no_go && state = true = alive = floor
  return myself.state
    ? !aliveNeighboursAmount < 2 || !aliveNeighboursAmount > 3
    : aliveNeighboursAmount === 3;
};
const setInitialState = (wallsAreaRatio) =>
  Math.round((Math.random() + Number.EPSILON) * 100) / 100 > wallsAreaRatio;
