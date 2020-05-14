export default function preloadAssets () {
  this.gWidht = this.sys.game.config.width;
    this.gHeight = this.sys.game.config.height;
    this.load.image("bb", "public/assets/black_block.png");
    this.load.image("mud", "public/assets/mud.png");
    this.load.image("rock", "public/assets/rock.png");
    this.load.image("sand", "public/assets/sand.png");
    this.load.image("ground", "public/assets/platform_horizontal.png");
    this.load.image("wall", "public/assets/platform_vertical.png");
    this.load.spritesheet("dude", "public/assets/hero.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
}
