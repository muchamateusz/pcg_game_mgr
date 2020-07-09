import Tile from "../../classes/Tile";
import { uniqueIdGenerator } from "../commons/globalFunctions";
import addColliders from "./addColliders";

export default function addCellularAutomata(gradient = 50, epochs = 1) {
  const amountOfTiles = this.globals.mapSize / gradient;
  const fillCAGrid = () => {
    const setInitialState = (i, j) => {
      return Math.round((Math.random() + Number.EPSILON) * 100) / 100 > 0.45;
    };
    const idGenerator = uniqueIdGenerator();
    for (let i = 0; i < amountOfTiles; i++) {
      // fill grid with 30 x arrays - this represents Y axis
      this.globals.ca.grid[i] = [];
      for (let j = 0; j < amountOfTiles; j++) {
        // each array will contain 30 x Tile - this represents X axis
        // newTile.neighbours = getNeighbours(newTile);
        this.globals.ca.grid[i].push(
          new Tile({
            id: `${idGenerator.next().value}`,
            state: setInitialState(i, j), // true = floor && false = wall
            neighbours: [],
            x: `${i * gradient}`,
            y: `${j * gradient}`,
          })
        );
      }
    }
  };
  const fillTilesWithNeighbours = () => {
    for (let indexOfAxisY in this.globals.ca.grid) {
      indexOfAxisY = +indexOfAxisY;
      let axisY = this.globals.ca.grid[indexOfAxisY];

      for (let indexOfTile in this.globals.ca.grid[indexOfAxisY]) {
        indexOfTile = +indexOfTile;
        let tile = axisY[indexOfTile];

        let upperYAxis = this.globals.ca.grid[indexOfAxisY - 1];
        let lowerYAxis = this.globals.ca.grid[indexOfAxisY + 1];

        if (upperYAxis) {
          tile.neighbours.push(
            this.globals.ca.grid[indexOfAxisY - 1][indexOfTile]
          );
          if (this.globals.ca.grid[indexOfAxisY - 1][indexOfTile - 1]) {
            tile.neighbours.push(
              this.globals.ca.grid[indexOfAxisY - 1][indexOfTile - 1]
            );
          }
          if (this.globals.ca.grid[indexOfAxisY - 1][indexOfTile + 1]) {
            tile.neighbours.push(
              this.globals.ca.grid[indexOfAxisY - 1][indexOfTile + 1]
            );
          }
        }
        if (lowerYAxis) {
          tile.neighbours.push(
            this.globals.ca.grid[indexOfAxisY + 1][indexOfTile]
          );
          if (this.globals.ca.grid[indexOfAxisY + 1][indexOfTile - 1]) {
            tile.neighbours.push(
              this.globals.ca.grid[indexOfAxisY + 1][indexOfTile - 1]
            );
          }
          if (this.globals.ca.grid[indexOfAxisY + 1][indexOfTile + 1]) {
            tile.neighbours.push(
              this.globals.ca.grid[indexOfAxisY + 1][indexOfTile + 1]
            );
          }
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
  };
  const setStatesInGridTiles = () => {
    const getState = (myself) => {
      const deadNeighboursAmount = myself.neighbours.filter((nb) => !nb.state)
        .length;
      /*
        If a cell is a wall and less than 3 cells in the Moore neighborhood are walls, the cell changes state to a floor.
        If a cell is a floor and greater than 4 cells in the Moore neighborhood are walls, the cell changes state to a wall.
        Otherwise, the cell remains in its current state.
      */
      if (!myself.state) {
        // false -> wall
        return deadNeighboursAmount < 3;
      } else {
        // true -> floor
        return !(deadNeighboursAmount > 4);
      }
      // if (myself.state) {
      //   // - Any alive cell with fewer than two alive neighbors dies, as if caused by under-population.
      //   // - Any alive cell with two or three live neighbors lives on to the next generation.
      //   // - Any alive cell with more than three live neighbors dies, as if by overcrowding.
      //   return !(aliveNeighboursAmount < 2 || aliveNeighboursAmount > 3);
      // } else {
      //   // - Any dead cell with exactly three live neighbors becomes alive cell, as if by reproduction.
      //   return aliveNeighboursAmount === 3;
      // }
    };
    for (let epoch = 0; epoch < epochs; epoch++) {
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
  };
  const drawTiles = () => {
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
  };
  fillCAGrid();
  fillTilesWithNeighbours();
  setStatesInGridTiles();
  drawTiles();
}
