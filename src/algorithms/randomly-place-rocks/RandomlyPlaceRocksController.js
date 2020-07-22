import { ALGORITHMS } from "../../commons/globalVariables";
import { putHeroAndDoorOnMap } from "../../commons/globalFunctions";

export default function RandomlyPlaceRocksController() {
  this.globals.PRNG = this.add.group(this.game.world, "PRNG", false);
  this.globals.PRNG.active = false;
  for (let i = 0; i < 10; i += 1) {
    const x = Math.floor(Math.random() * (599 - 50 + 1) + 50);
    const y = Math.floor(Math.random() * (599 - 50 + 1) + 50);
    if (x + 74 < 100 || x > 150 || y + 74 < 450 || y > 500) {
      this.globals.PRNG.add(
        this.physics.add.image(x, y, "ROCK").setImmovable()
      );
    }
  }
  putHeroAndDoorOnMap.call(this, ALGORITHMS.PRNG);
  this.physics.world.enable(this.globals.PRNG);
}
