import "phaser";

export default class TitleScreen extends Phaser.Scene {
  constructor(globals) {
    super("title_screen");
    this.globals = globals;
  }

  preload() {
    this.load.image("background", "public/assets/title_screen_background.jpg");
    this.load.image("text_bg", "public/assets/title_scene_text_backgound.png");
  }

  create() {
    this.globals.titleSceneBg = this.add.sprite(0, 0, "background");
    this.globals.titleSceneBg.setOrigin(0, 0);
    this.globals.titleSceneBg = this.add.sprite(0, 290, "text_bg");
    this.globals.titleSceneBg.setOrigin(0, 0);
    const text = this.add.text(140, 293, "CLICK HERE TO START THE GAME!", {
      fontFamily: 'Verdana, "Times New Roman", Tahoma, serif',
      fontSize: "20px",
    });
    text.setInteractive({ useHandCursor: true });
    text.on("pointerdown", () => this.scene.switch("engine"));
  }

  update() {}
}
