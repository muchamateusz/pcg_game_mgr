import Phaser from "phaser";
import Engine from "./classes/Engine";
import { globals, config } from "./helpers/commons/globalVariables";
import "./index.css";

window.onload = () => {
  const game = new Phaser.Game(config);
  game.scene.add("engine", new Engine(globals));
  game.scene.start("engine");
  window.focus();
};
