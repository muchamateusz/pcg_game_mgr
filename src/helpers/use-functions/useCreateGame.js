import addHeroAnimations from "../add-functions/addHeroAnimations";
import addBackground from "../add-functions/addBackground";
import CellularAutomataController from "../../algorithms/cellular-automata/CellularAutomataController";
import BinarySpacePartitioningController from "../../algorithms/binary-space-partitioning/BinarySpacePartitioningController";
import DrunkardWalkController from "../../algorithms/drunkard-walk/DrunkardWalkController";
import RandomlyPlaceRocksController from "../../algorithms/randomly-place-rocks/RandomlyPlaceRocksController";
import { ALGORITHMS } from "../commons/globalVariables";

export default function createGame() {
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
