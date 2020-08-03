import "phaser";
import CellularAutomataController from "../algorithms/cellular-automata/CellularAutomataController";
import BinarySpacePartitioningController from "../algorithms/binary-space-partitioning/BinarySpacePartitioningController";
import DrunkardWalkController from "../algorithms/drunkard-walk/DrunkardWalkController";
import { ALGORITHMS, defaultGlobals, config } from "../commons/globalVariables";
import { getActualPoints } from "../commons/globalFunctions";
import { IMAGE_URL } from "..";

export default class Engine extends Phaser.Scene {
  constructor(globals) {
    super("engine");
    this.globals = globals;
  }

  preload() {
    this.gWidht = this.sys.game.config.width;
    this.gHeight = this.sys.game.config.height;
    this.load.image("HUD_BG", `${IMAGE_URL}public/assets/hud_text_backgound.png`);
    this.load.image("ICE_WALL", `${IMAGE_URL}public/assets/ice_wall.png`);
    this.load.image("ROCK", `${IMAGE_URL}public/assets/rock.png`);
    this.load.image("BACKGROUND", `${IMAGE_URL}public/assets/sand.png`);
    this.load.image("STAR", `${IMAGE_URL}public/assets/star.png`);
    this.load.image("NO_GO", `${IMAGE_URL}public/assets/ca_no_go_zone.png`);
    this.load.image("DOOR", `${IMAGE_URL}public/assets/door.png`);
    this.load.spritesheet("HERO", `${IMAGE_URL}public/assets/hero.png`, {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    this.addBackground();
    switch (config.whichAlgorithm) {
      case ALGORITHMS.BSP:
        BinarySpacePartitioningController.call(this);
        break;
      case ALGORITHMS.CA:
        CellularAutomataController.call(this);
        break;
      case ALGORITHMS.DW:
        DrunkardWalkController.call(this);
        break;
      default:
        break;
    }
    this.addHeroAnimations();
    this.addHUD();
  }

  update() {
    this.globals.player.body.velocity.setTo(0);
    this.globals.cursors = this.input.keyboard.createCursorKeys();
    this.movementsManager();
  }
  addHUD() {
    const { mapSize } = this.globals;
    const style = {
      fontFamily: 'Verdana, "Times New Roman", Tahoma, serif',
      fontSize: "20px",
    };
    const hudBg = this.add.image(mapSize - 175, 0, "HUD_BG");
    const reload = this.add.text(mapSize - 345, 0, "RELOAD", {
      ...style,
      color: "yellow",
    });
    reload.setInteractive({ useHandCursor: true });
    reload.on("pointerdown", () => {
      this.globals = {
        ...defaultGlobals,
        BSP: { ...defaultGlobals.BSP, grid: [[], [], [], [], []] },
        CA: { ...defaultGlobals.CA, floodFill: {} },
        DW: { ...defaultGlobals.DW },
        player: this.globals.player
      };
      this.scene.restart("engine");
    });
    const separator_1 = this.add.text(mapSize - 265, 0, " | ", style);
    const restart = this.add.text(mapSize - 245, 0, "RESTART", {
      ...style,
      color: "red",
    });
    restart.setInteractive({ useHandCursor: true });
    restart.on("pointerdown", () => {
      location.reload();
    });
    const separator_2 = this.add.text(mapSize - 155, 0, " | ", style);
    this.globals.pointsInstance = this.add.text(
      mapSize - 105,
      0,
      getActualPoints.call(this),
      style
    );

    hudBg.depth = 3;
    this.globals.pointsInstance.depth = 4;
    restart.depth = 4;
    reload.depth = 4;
    separator_1.depth = 4;
    separator_2.depth = 4;
  }
  addBackground() {
    for (let i = 0; i <= this.gWidht; i += this.globals.backgroundTileSize) {
      for (let y = 0; y <= this.gHeight; y += this.globals.backgroundTileSize) {
        this.globals.gameSceneBg = this.add.sprite(i, y, "BACKGROUND");
        this.globals.gameSceneBg.setFlip(
          Math.floor(Math.random() * 2),
          Math.floor(Math.random() * 2)
        );
      }
    }
  }
  movementsManager() {
    const {
      cursors: { left, right, down, up },
    } = this.globals;
    switch (true) {
      case left.isDown:
        this.globals.lastHeroPosition = left;
        this.globals.player.body.velocity.x -= this.globals.heroSpeed;
        this.globals.player.anims.play("left-walk", true);
        break;
      case right.isDown:
        this.globals.lastHeroPosition = right;
        this.globals.player.body.velocity.x += this.globals.heroSpeed;
        this.globals.player.anims.play("right-walk", true);
        break;
      case up.isDown:
        this.globals.lastHeroPosition = up;
        this.globals.player.body.velocity.y -= this.globals.heroSpeed;
        this.globals.player.anims.play("back-walk", true);
        break;
      case down.isDown:
        this.globals.lastHeroPosition = down;
        this.globals.player.body.velocity.y += this.globals.heroSpeed;
        this.globals.player.anims.play("front-walk", true);
        break;
      default:
        if (this.globals.lastHeroPosition === up) {
          this.globals.player.anims.play("stop-back");
        } else if (this.globals.lastHeroPosition === left) {
          this.globals.player.anims.play("stop-left");
        } else if (this.globals.lastHeroPosition === right) {
          this.globals.player.anims.play("stop-right");
        } else {
          this.globals.player.anims.play("stop-front");
        }
        break;
    }
  }
  addHeroAnimations() {
    // MOVE
    this.anims.create({
      key: "front-walk",
      frames: this.anims.generateFrameNumbers("HERO", { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "right-walk",
      frames: this.anims.generateFrameNumbers("HERO", { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "back-walk",
      frames: this.anims.generateFrameNumbers("HERO", { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "left-walk",
      frames: this.anims.generateFrameNumbers("HERO", { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });
    // STOP
    this.anims.create({
      key: "stop-front",
      frames: [{ key: "HERO", frame: 1 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "stop-right",
      frames: [{ key: "HERO", frame: 4 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "stop-back",
      frames: [{ key: "HERO", frame: 7 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "stop-left",
      frames: [{ key: "HERO", frame: 10 }],
      frameRate: 20,
    });
  }
}
