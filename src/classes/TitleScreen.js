import "phaser";
import { ALGORITHMS } from "../commons/globalVariables";

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
      },
      {
        name: ALGORITHMS.CA,
        value: "- CELLULAR AUTOMATA",
        y: 4,
      },
      {
        name: ALGORITHMS.DW,
        value: "- DRUNKARD WALKER",
        y: 5,
      },
    ];
    this.add.text(
      mapSize / 2 - 300,
      mapSize - (mapSize / 10) * 6,
      "CHOOSE TYPE OF MAP GENERATOR:",
      {
        color: "yellow",
        fontFamily: 'Verdana, "Times New Roman", Tahoma, serif',
        fontSize: "28px",
      }
    );
    options.forEach((opt) => {
      const text = this.add.text(
        mapSize / 2 - 300,
        mapSize - (mapSize / 10) * opt.y,
        opt.value,
        {
          fontFamily: 'Verdana, "Times New Roman", Tahoma, serif',
          fontSize: "24px",
        }
      );
      text.setInteractive({ useHandCursor: true });
      text.on("pointerdown", () => {
        this.globals.whichAlgorithm = opt.name;
        this.scene.start("engine");
        this.scene.destroy("title_screen");
      });
    });
  }
  renderTitle(mapSize) {
    this.add.text(mapSize / 2 - 300, 100, "INFINITE STARS GAINER", {
      fontFamily: 'Verdana, "Times New Roman", Tahoma, serif',
      fontSize: "50px",
      color: "lightgrey",
      fontWeight: "bold",
    });
    this.add.text(mapSize / 2 - 300, 160, "ROGUELIKE GAME LIKE NO OTHER!", {
      fontFamily: 'Verdana, "Times New Roman", Tahoma, serif',
      fontSize: "18px",
      color: "lightgrey",
    });
  }
}
