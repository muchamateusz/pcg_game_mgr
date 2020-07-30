import "phaser";
import { ALGORITHMS, config, defaultGlobals } from "../commons/globalVariables";

export default class TitleScreen extends Phaser.Scene {
  constructor(globals) {
    super("title_screen");
    this.globals = globals;
  }

  preload() {}

  create() {
    const { mapSize } = this.globals;
    this.renderTitle(mapSize);
    this.renderOptions(mapSize);
  }

  update() {}

  renderOptions(mapSize) {
    const options = [
      {
        name: ALGORITHMS.BSP,
        value: "- BINARILY PARTITIONATED SPACE",
        y: 3,
        prompt: {
          message: "Type amount of splits (2 splits = 4 rooms, 3 = 8, 4 = 16):",
          key: "complexity",
          value: this.globals[ALGORITHMS.BSP].complexity
        }
      },
      {
        name: ALGORITHMS.CA,
        value: "- CELLULAR AUTOMATA",
        y: 4,
        prompt: {
          message: "Type amount of generation iterations:",
          key: "epochs",
          value: this.globals[ALGORITHMS.CA].epochs
        }
      },
      {
        name: ALGORITHMS.DW,
        value: "- DRUNKARD WALKER",
        y: 5,
        prompt: {
          message: "Type amount of steps, each walker should be making:",
          key: "howLongWalk",
          value: this.globals[ALGORITHMS.DW].howLongWalk
        }
      },
    ];
    this.add.text(
      mapSize / 2 - mapSize / 2.5,
      mapSize - (mapSize / 12) * 6,
      "CHOOSE TYPE OF MAP GENERATOR:",
      {
        color: "yellow",
        fontFamily: 'Verdana, "Times New Roman", Tahoma, serif',
        fontSize: 1.75 * Math.round(defaultGlobals.mapSize / 100) * 1.8,
      }
    );
    options.forEach((opt) => {
      const text = this.add.text(
        mapSize / 2 - mapSize / 2.5,
        mapSize - (mapSize / 12) * opt.y,
        opt.value,
        {
          fontFamily: 'Verdana, "Times New Roman", Tahoma, serif',
          fontSize: 1.5 * Math.round(defaultGlobals.mapSize / 100) * 1.8,
        }
      );
      text.setInteractive({ useHandCursor: true });
      text.on("pointerdown", () => {
        const value = prompt(opt.prompt.message, opt.prompt.value);
        defaultGlobals[opt.name][opt.prompt.key] = +value;
        this.globals[opt.name][opt.prompt.key] = +value;
        config.whichAlgorithm = opt.name;
        this.scene.start("engine");
        this.scene.destroy("title_screen");
      });
    });
  }
  renderTitle(mapSize) {
    this.add.text(mapSize / 2 - mapSize / 2.5, 100, "INFINITE STARS GAINER", {
      fontFamily: 'Verdana, "Times New Roman", Tahoma, serif',
      fontSize: 3.125 * Math.round(defaultGlobals.mapSize / 100) * 1.8,
      color: "lightgrey",
      fontWeight: "bold",
    });
    this.add.text(
      mapSize / 2 - mapSize / 2.5,
      1.125 * Math.round(defaultGlobals.mapSize / 100) * 20,
      "ROGUELIKE GAME LIKE NO OTHER!",
      {
        fontFamily: 'Verdana, "Times New Roman", Tahoma, serif',
        fontSize: 1.125 * Math.round(defaultGlobals.mapSize / 100) * 1.8,
        color: "lightgrey",
      }
    );
  }
}
