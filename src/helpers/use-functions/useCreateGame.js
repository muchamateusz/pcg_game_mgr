import addHeroAnimations from "../add-functions/addHeroAnimations";
import addBackground from "../add-functions/addBackground";
import addCellularAutomata from "../add-functions/addCellularAutomata";
import addRocks from "../add-functions/addRocks";
import addBinarySpacePartitioning from "../add-functions/addBinarySpacePartitioning";
import { ALGORITHMS } from '../commons/globalVariables';

export default function useCreateGame() {
  this.globals.camera = this.cameras3d.add(85).setPosition(0, 0, 200);
  this.globals.player = this.add.sprite(10, 0, "HERO");
  this.globals.star = this.add.sprite(
    this.globals.mapSize - 20,
    this.globals.mapSize - 20,
    "STAR"
  );
  this.globals.star.depth = 1;
  this.globals.player.depth = 2;

  this.physics.world.enable(this.globals.player);
  this.globals.player.body.collideWorldBounds = true;

  addBackground.call(this);
  switch (this.globals.whichAlgorithm) {
    case ALGORITHMS.BSP:
      addBinarySpacePartitioning.call(this);
      break;
    case ALGORITHMS.CA:
      addCellularAutomata.call(this);
      break;
    case ALGORITHMS.ROCKS:
      addRocks.call(this);
      break;
    default:
      break;
  }
  addHeroAnimations.call(this);
}
