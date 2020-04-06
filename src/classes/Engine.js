import "phaser";
import createGame from "../helpers/use-functions/useCreateGame.js";
import preloadAssets from "../helpers/use-functions/usePreloadAssets.js";
import useManageMovements from "../helpers/use-functions/useManageMovements.js";

export default class Engine extends Phaser.Scene {

  constructor(globals) {
    super("Engine");
    this.globals = globals;
  }

  preload() {
    preloadAssets.call(this);
  }

  create() {
    createGame.call(this);
  }

  update() {
    this.globals.cursors = this.input.keyboard.createCursorKeys();
    useManageMovements.call(this);
  }
}
