import "phaser";
import createGame from "../helpers/use-functions/useCreateGame.js";
import preloadAssets from "../helpers/use-functions/usePreloadAssets.js";
import useManageMovements from "../helpers/use-functions/useManageMovements.js";

export default class Engine extends Phaser.Scene {
  constructor(globals) {
    super("engine");
    this.globals = globals;
  }

  preload() {
    preloadAssets.call(this);
  }

  create() {
    createGame.call(this);
  }

  update() {
    this.globals.player.body.velocity.setTo(0);
    this.globals.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(this.globals.player, this.globals.rocks, () =>
      this.globals.player.body.velocity.setTo(0)
    );

    useManageMovements.call(this);
  }
}
