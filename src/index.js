import Phaser from "phaser";
import EngineController from "./engine/EngineController";
import { globals, config } from "./helpers/commons/globalVariables";
import "./index.css";

window.onload = () => {
  const game = new Phaser.Game(config);
  game.scene.add("engine", new EngineController(globals));
  game.scene.start("engine");
  window.focus();
};
