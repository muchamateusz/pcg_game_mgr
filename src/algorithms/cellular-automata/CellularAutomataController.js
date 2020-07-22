import { ALGORITHMS } from "../../commons/globalVariables";
import fillGridWithTiles from "./helpers/fillGridWithTiles";
import floodFillGrid from "./helpers/floodFillGrid";
import drawTilesOnScreen from "./helpers/drawTilesOnScreen";
import setTilesStates from "./helpers/setTilesStates";
import { addColliders, putHeroAndDoorOnMap } from "../../commons/globalFunctions";

export default function CellularAutomataController() {
  fillGridWithTiles.call(this);
  setTilesStates.call(this);
  floodFillGrid.call(this);
  drawTilesOnScreen.call(this);
  putHeroAndDoorOnMap.call(this, ALGORITHMS.CA);
  addColliders.call(this, [this.globals.CA.noGoSprites]);
}