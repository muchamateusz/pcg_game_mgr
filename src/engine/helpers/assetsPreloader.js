export default function assetsPreloader() {
  this.gWidht = this.sys.game.config.width;
  this.gHeight = this.sys.game.config.height;

  this.load.image("WALL_BRICK", "public/assets/black_block.png");
  this.load.image("ICE_WALL", "public/assets/ice_wall.png");
  // this.load.image("WALL_BRICK", "public/assets/green_block.png");
  // this.load.image("mud", "public/assets/mud.png");
  this.load.image("ROCK", "public/assets/rock.png");
  this.load.image("BACKGROUND", "public/assets/sand.png");
  this.load.image("STAR", "public/assets/star.png");
  this.load.image("NO_GO", "public/assets/ca_no_go_zone.png");
  this.load.image("DOOR", "public/assets/door.png");
  this.load.image("bb0", "public/assets/black_block_5_0.png");
  this.load.image("bb1", "public/assets/black_block_5_1.png");
  this.load.image("bb2", "public/assets/black_block_5_2.png");
  this.load.image("bb3", "public/assets/black_block_5_3.png");
  this.load.spritesheet("HERO", "public/assets/hero.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
}
