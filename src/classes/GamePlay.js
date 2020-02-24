import 'phaser';

let player,
  platforms,
  bg,
  cursors,
  camera;

export default class GamePlay extends Phaser.Scene {
  constructor() {
    super('GamePlay');
  }
  preload() {
    this.gWidht = this.sys.game.config.width;
    this.gHeight = this.sys.game.config.height;
    this.load.image('mud', 'public/assets/mud.png');
    this.load.image('rock', 'public/assets/rock.png');
    this.load.image('ground', 'public/assets/platform_horizontal.png');
    this.load.image('wall', 'public/assets/platform_vertical.png');
    this.load.spritesheet('dude', 'public/assets/dude.png', {
      frameWidth: 32,
      frameHeight: 48
    });
  }
  create() {
    const addMapBounds = () => {
      for (let i = 0; i <= this.gWidht; i += 200) {
        platforms = this.add.sprite(800, i, 'wall');
        platforms = this.add.sprite(0, i, 'wall');
        platforms = this.add.sprite(i, 0, 'ground');
        platforms = this.add.sprite(i, 600, 'ground');
      }
    }
    const addBackground = () => {
      for (let i = 0; i <= this.gWidht; i += 64) {
        for (let y = 0; y <= this.gHeight; y += 64) {
          bg = this.add.sprite(i, y, 'rock');
        }
      }
    }
    camera = this.cameras3d.add(85).setPosition(0, 0, 200);
    player = this.add.sprite(100, 450, 'dude');
    player.depth = 1;
    // CREATE WORLD BOUNDS
    addBackground();
    addMapBounds();
    
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
  }
  update() {
    cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      player.setPosition(player.x-2, player.y);
      // player.flipX = false;
      player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      player.setPosition(player.x+2, player.y);
      player.anims.play('right', true);
    } else {
      player.anims.play('turn');
    }
    if (cursors.up.isDown) {
      player.setPosition(player.x, player.y-2);
    } 
    if (cursors.down.isDown) {
      player.setPosition(player.x, player.y+2);
    }
  }
}
