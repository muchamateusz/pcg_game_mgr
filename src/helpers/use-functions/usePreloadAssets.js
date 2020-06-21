export default function preloadAssets () {

  this.gWidht = this.sys.game.config.width;
  this.gHeight = this.sys.game.config.height;

  this.load.image("bb0", "public/assets/black_block_5_0.png");
  this.load.image("bb1", "public/assets/black_block_5_1.png");
  this.load.image("bb2", "public/assets/black_block_5_2.png");
  this.load.image("bb3", "public/assets/black_block_5_3.png");
  this.load.image("ground", "public/assets/platform_horizontal.png");
  this.load.image("mud", "public/assets/mud.png");
  this.load.image("rock", "public/assets/rock.png");
  this.load.image("sand", "public/assets/sand.png");
  this.load.image("star", "public/assets/star.png");
  this.load.image("wall", "public/assets/platform_vertical.png");

  this.load.spritesheet("dude", "public/assets/hero.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
}
