import addHeroAnimations from "../add-functions/addHeroAnimations";
import addBackground from "../add-functions/addBackground";
import addCellularAutomata from "../add-functions/addCellularAutomata";
import addRocks from "../add-functions/addRocks";
import addBinarySpacePartitioning from "../add-functions/addBinarySpacePartitioning";
import addDrunkardWalk from "../add-functions/addDrunkardWalk";
import { ALGORITHMS } from "../commons/globalVariables";

export default function useCreateGame() {
  this.globals.camera = this.cameras3d.add(85).setPosition(0, 0, 200);
  addBackground.call(this);
  switch (this.globals.whichAlgorithm) {
    case ALGORITHMS.BSP:
      addBinarySpacePartitioning.call(this);
      break;
    case ALGORITHMS.CA:
      addCellularAutomata.call(this);
      break;
    case ALGORITHMS.DW:
      addDrunkardWalk.call(this);
      break;
    case ALGORITHMS.PRNG:
      addRocks.call(this);
      break;
    default:
      break;
  }
  addHeroAnimations.call(this);
}
