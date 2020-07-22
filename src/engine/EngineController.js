import "phaser";
import CellularAutomataController from "../algorithms/cellular-automata/CellularAutomataController";
import BinarySpacePartitioningController from "../algorithms/binary-space-partitioning/BinarySpacePartitioningController";
import DrunkardWalkController from "../algorithms/drunkard-walk/DrunkardWalkController";
import RandomlyPlaceRocksController from "../algorithms/randomly-place-rocks/RandomlyPlaceRocksController";
import { ALGORITHMS } from "../commons/globalVariables";
import assetsPreloader from "./helpers/assetsPreloader";
import addBackground from "./helpers/addBackground";
import movementsManager from "./helpers/movementsManager";
import addHeroAnimations from "./helpers/addHeroAnimations";

export default class EngineController extends Phaser.Scene {
  constructor(globals) {
    super("engine");
    this.globals = globals;
  }

  preload() {
    assetsPreloader.call(this);
  }

  create() {
    this.globals.camera = this.cameras3d.add(85).setPosition(0, 0, 200);
    addBackground.call(this);
    switch (this.globals.whichAlgorithm) {
      case ALGORITHMS.BSP:
        BinarySpacePartitioningController.call(this);
        break;
      case ALGORITHMS.CA:
        CellularAutomataController.call(this);
        break;
      case ALGORITHMS.DW:
        DrunkardWalkController.call(this);
        break;
      case ALGORITHMS.RPR:
        RandomlyPlaceRocksController.call(this);
        break;
      default:
        break;
    }
    addHeroAnimations.call(this);
  }

  update() {
    this.globals.player.body.velocity.setTo(0);
    this.globals.cursors = this.input.keyboard.createCursorKeys();
    movementsManager.call(this);
  }
}
