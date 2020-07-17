import { getRandomByRatio } from "../../../helpers/commons/globalFunctions";

export default function drawPaths() {
  this.globals.DW.drunkardPaths = this.add.group(
    this.game.world,
    "drunkardPaths",
    false
  );
  this.globals.DW.drunkardPaths.active = false;
  this.globals.DW.stars = this.add.group(this.game.world, "stars", false);
  this.globals.DW.stars.active = false;
  for (let indexOfAxisY in this.globals.DW.grid) {
    indexOfAxisY = +indexOfAxisY;
    let axisY = this.globals.DW.grid[indexOfAxisY];

    for (let indexOfTile in this.globals.DW.grid[indexOfAxisY]) {
      indexOfTile = +indexOfTile;
      let tile = axisY[indexOfTile];
      if (!tile.visitorId) {
        this.globals.DW.drunkardPaths.add(
          this.physics.add
            .image(+tile.x + 25, +tile.y + 25, `NO_GO`)
            .setImmovable()
        );
      } else if (getRandomByRatio(this.globals.DW.starsRatio)) {
        this.globals.DW.stars.add(
          this.physics.add
            .image(+tile.x + 25, +tile.y + 25, `STAR`)
            .setImmovable()
        );
      }
    }
  }
}
