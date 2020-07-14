import Tile from "../../classes/Tile";
import { uniqueIdGenerator, getRandomByRatio, placeYourHeroAndPortals } from "../commons/globalFunctions";
import addColliders from "./addColliders";
import lodash from "lodash";
import { ALGORITHMS } from "../commons/globalVariables";

export default function addCellularAutomata() {
  fillCAGrid.call(this);
  setStatesInGridTiles.call(this);
  // floodFillGrid.call(this);
  drawTiles.call(this);
  this.physics.world.enable(this.globals.CA.noGoSprites);
  placeYourHeroAndPortals.call(this, ALGORITHMS.CA);
  addColliders.call(this, [this.globals.CA.noGoSprites]);
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
function fillTilesWithNeighbours() {
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
function setStatesInGridTiles() {
  for (let epoch = 0; epoch < this.globals.CA.epochs; epoch++) {
    fillTilesWithNeighbours.call(this);
    for (let indexOfAxisY in this.globals.CA.grid) {
      indexOfAxisY = +indexOfAxisY;
      let axisY = this.globals.CA.grid[indexOfAxisY];

      for (let indexOfTile in this.globals.CA.grid[indexOfAxisY]) {
        indexOfTile = +indexOfTile;
        let tile = axisY[indexOfTile];
        tile.state = getState(tile);
      }
    }
  }
}
function drawTiles() {
  this.globals.CA.noGoSprites = this.add.group(
    this.game.world,
    "noGoSprites",
    false
  );
  this.globals.CA.noGoSprites.active = false;
  this.globals.CA.stars = this.add.group(this.game.world, "stars", false);
  this.globals.CA.stars.active = false;

  for (let indexOfAxisY in this.globals.CA.grid) {
    indexOfAxisY = +indexOfAxisY;
    let axisY = this.globals.CA.grid[indexOfAxisY];

    for (let indexOfTile in this.globals.CA.grid[indexOfAxisY]) {
      indexOfTile = +indexOfTile;
      let tile = axisY[indexOfTile];
      // if (tile.visitorId !== this.globals.CA.primeId && !tile.state) {
      if (!tile.state) {
        this.globals.CA.noGoSprites.add(
          this.physics.add
            .image(+tile.x + 25, +tile.y + 25, `NO_GO`)
            .setImmovable()
        );
      } else if (getRandomByRatio(this.globals.CA.starsRatio)) {
        this.globals.CA.stars.add(
          this.physics.add
            .image(+tile.x + 25, +tile.y + 25, `STAR`)
            .setImmovable()
        );
      }
    }
  }
}
function floodFillGrid() {
  const idGenerator = uniqueIdGenerator();
  for (let indexOfAxisY in this.globals.CA.grid) {
    indexOfAxisY = +indexOfAxisY;
    let axisY = this.globals.CA.grid[indexOfAxisY];
    // oznacz mnie jako visitorId=1 =>
    // rekurencyjnie oznacz każde pole w każdym z czterech kierunków
    // jeśli każde z kolejnych pól jest tile.state = true =>
    // każde pole tile.state = true => countField++;
    // jeśli nie ma gdzie iść => koniec wypełniania => idź dalej po polach
    // aż znajdziesz field.state = true =>
    // visitorId++; i rozpocznij zliczanie kolejnej jaskini.
    for (let indexOfTile in this.globals.CA.grid[indexOfAxisY]) {
      indexOfTile = +indexOfTile;
      let tile = axisY[indexOfTile];
      const tileId = idGenerator.next().value;
      if (tile.state) {
        this.globals.CA.floodFill[tileId] = 1;
        startCountingRecursively.call(
          this,
          tileId,
          tile,
          indexOfAxisY,
          indexOfTile
        );
      }
    }
  }
  // po oznaczeniu całej mapy sprawdź które visitorId ma największy countField
  // zamień wszystkie pola field.state = true i visitorId != maxCountFieldId
  // na noGoZone.
  let arrayOfFoodFill = Object.keys(this.globals.CA.floodFill).map((key) => ({
    key,
    value: this.globals.CA.floodFill[key],
  }));
  arrayOfFoodFill = lodash.sortBy(arrayOfFoodFill, ["value"]);
  this.globals.CA.primeId = arrayOfFoodFill[arrayOfFoodFill.length - 1].key;
}
function startCountingRecursively(
  prevTileId,
  neighbour,
  indexOfAxisY,
  indexOfTile
) {
  // optimization needed due to stack overflow
  let interator = 0;
  while (this.globals.CA.grid[indexOfAxisY + interator]) {}
  if (neighbour && neighbour.state && !neighbour.visitorId) {
    neighbour.visitorId = prevTileId;
    //sprawdz w lewo:
    //  - neighbour.state => oznacz i rusz w lewo
    //  - !neighbour.state => rusz w górę i w dół
    this.globals.CA.floodFill[prevTileId] += 1;
    this.globals.CA.grid[indexOfAxisY][indexOfTile - 1] &&
      startCountingRecursively.call(
        this,
        prevTileId,
        this.globals.CA.grid[indexOfAxisY][indexOfTile + 1],
        indexOfAxisY,
        indexOfTile + 1
      );

    // this.globals.CA.grid[indexOfAxisY][indexOfTile + 1] &&
    //   startCountingRecursively.call(
    //     this,
    //     prevTileId,
    //     this.globals.CA.grid[indexOfAxisY][indexOfTile + 1],
    //     indexOfAxisY,
    //     indexOfTile + 1
    //   );
    // this.globals.CA.grid[indexOfAxisY][indexOfTile - 1] &&
    //   startCountingRecursively.call(
    //     this,
    //     prevTileId,
    //     this.globals.CA.grid[indexOfAxisY][indexOfTile - 1],
    //     indexOfAxisY,
    //     indexOfTile - 1
    //   );
    // this.globals.CA.grid[indexOfAxisY + 1] &&
    //   startCountingRecursively.call(
    //     this,
    //     prevTileId,
    //     this.globals.CA.grid[indexOfAxisY + 1][indexOfTile],
    //     indexOfAxisY + 1,
    //     indexOfTile
    //   );
    // this.globals.CA.grid[indexOfAxisY - 1] &&
    //   startCountingRecursively.call(
    //     this,
    //     prevTileId,
    //     this.globals.CA.grid[indexOfAxisY - 1][indexOfTile],
    //     indexOfAxisY - 1,
    //     indexOfTile
    //   );
  }
}
const getState = (myself) => {
  const aliveNeighboursAmount = myself.neighbours.filter((nb) => nb.state)
    .length;
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