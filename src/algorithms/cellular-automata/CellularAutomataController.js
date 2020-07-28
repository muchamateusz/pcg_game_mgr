import { ALGORITHMS } from "../../commons/globalVariables";
import fillGridWithTiles from "./helpers/fillGridWithTiles";
import floodFillGrid from "./helpers/floodFillGrid";
import drawTilesOnScreen from "./helpers/drawTilesOnScreen";
import setTilesStates from "./helpers/setTilesStates";
import {
  addColliders,
  putHeroAndDoorOnMap,
  getActualPoints,
} from "../../commons/globalFunctions";

export default function CellularAutomataController() {
  console.time("CA");
  fillGridWithTiles.call(this);
  setTilesStates.call(this);
  floodFillGrid.call(this);
  drawTilesOnScreen.call(this);
  putHeroAndDoorOnMap.call(this, ALGORITHMS.CA);
  this.physics.add.collider(
    this.globals.player,
    this.globals.CA.stars,
    (hero, star) => {
      this.globals.points += 1;
      this.globals.heroSpeed += 10;
      this.globals.pointsInstance.setText(getActualPoints.call(this));
      star.disableBody(true, true);
    }
  );
  addColliders.call(this, [this.globals.CA.noGoSprites]);
  console.timeEnd("CA");
}
