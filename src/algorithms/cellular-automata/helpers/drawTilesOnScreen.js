import { getRandomByRatio } from "../../../commons/globalFunctions";

export default function drawTilesOnScreen() {
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
      if (tile.visitorId !== this.globals.CA.primeId) {
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
  this.physics.world.enable(this.globals.CA.noGoSprites);
}
