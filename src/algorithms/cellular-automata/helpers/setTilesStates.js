import fillTilesWithNeighbours from "./fillTilesWithNeighbours";

export default function setTilesStates() {
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