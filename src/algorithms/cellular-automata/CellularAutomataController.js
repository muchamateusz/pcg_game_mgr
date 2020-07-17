import addColliders from "../../helpers/add-functions/addColliders";

import { ALGORITHMS } from "../../helpers/commons/globalVariables";
import fillGridWithTiles from "./helpers/fillGridWithTiles";
import floodFillGrid from "./helpers/floodFillGrid";
import drawTilesOnScreen from "./helpers/drawTilesOnScreen";
import setTilesStates from "./helpers/setTilesStates";
import { putHeroAndDoorOnMap } from "../../helpers/commons/globalFunctions";

export default function CellularAutomataController() {
  fillGridWithTiles.call(this);
  setTilesStates.call(this);
  floodFillGrid.call(this);
  drawTilesOnScreen.call(this);
  putHeroAndDoorOnMap.call(this, ALGORITHMS.CA);
  addColliders.call(this, [this.globals.CA.noGoSprites]);
  // napisz metode która będzie usuwała niedostępne jaskinie
  // używając do tego flood fill algorytmu
  // trzeba wypuścić rekursywnie zgodnie z algorytmem
  // na kopii grida oznaczanie kafelków
  // jeśli wypełni wszystkie to znajdź kafelek niepomalowany ze state === floor
  // jeśli taki jest to w jego współrzędnej puść ten sam algorytm i zapisz poprzednią i obecną jaskinię
  // do jakichś zmiennych (a najlepiej to liczbę pomalowanych kafelków)
  // powtórz dwa ostatnie 'jeśli' aż do momentu gdy nie ma więcej niepomalowanych floorów
  // następnie porównaj wielkości jaskiń, wybierz największą a resztę wypełnij ścianami używając tego samego algorytmu
}