import 'phaser';

let player,
  platforms,
  bg,
  cursors,
  camera,
  lastHeroPosition;

export default class GamePlay extends Phaser.Scene {
  constructor() {
    super('GamePlay');
  }

  preload() {
    this.gWidht = this.sys.game.config.width;
    this.gHeight = this.sys.game.config.height;
    this.load.image('mud', 'public/assets/mud.png');
    this.load.image('rock', 'public/assets/rock.png');
    this.load.image('sand', 'public/assets/sand.png');
    this.load.image('ground', 'public/assets/platform_horizontal.png');
    this.load.image('wall', 'public/assets/platform_vertical.png');
    this.load.spritesheet('dude', 'public/assets/hero.png', {
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
          bg = this.add.sprite(i, y, 'sand');
          bg.setFlip(Math.floor(Math.random() * 2), Math.floor(Math.random() * 2));
        }
      }
    }
    const addHeroAnimations = () => {
      // MOVE
      this.anims.create({
        key: 'front-walk',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: 'right-walk',
        frames: this.anims.generateFrameNumbers('dude', { start: 3, end: 5 }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: 'back-walk',
        frames: this.anims.generateFrameNumbers('dude', { start: 6, end: 8 }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: 'left-walk',
        frames: this.anims.generateFrameNumbers('dude', { start: 9, end: 11 }),
        frameRate: 10,
        repeat: -1
      });
      // STOP
      this.anims.create({
        key: 'stop-front',
        frames: [{ key: 'dude', frame: 1 }],
        frameRate: 20
      });
      this.anims.create({
        key: 'stop-right',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
      });
      this.anims.create({
        key: 'stop-back',
        frames: [{ key: 'dude', frame: 7 }],
        frameRate: 20
      });
      this.anims.create({
        key: 'stop-left',
        frames: [{ key: 'dude', frame: 10 }],
        frameRate: 20
      });
    }

    camera = this.cameras3d.add(85).setPosition(0, 0, 200);
    player = this.add.sprite(100, 450, 'dude');
    player.depth = 1;

    addBackground();
    addMapBounds();
    addHeroAnimations();

  }

  update() {
    cursors = this.input.keyboard.createCursorKeys();
    const manageMovements = () => {
      if (cursors.left.isDown) {
        lastHeroPosition = cursors.left;
        player.setPosition(player.x - 2, player.y);
        player.anims.play('left-walk', true);
      } else if (cursors.right.isDown) {
        lastHeroPosition = cursors.right;
        player.setPosition(player.x + 2, player.y);
        player.anims.play('right-walk', true);
      } else if (cursors.up.isDown) {
        lastHeroPosition = cursors.up;
        player.setPosition(player.x, player.y - 2);
        player.anims.play('back-walk', true);
      } else if (cursors.down.isDown) {
        lastHeroPosition = cursors.down;
        player.setPosition(player.x, player.y + 2);
        player.anims.play('front-walk', true);
      } else {
        if (lastHeroPosition === cursors.up) {
          player.anims.play('stop-back');
        } else if (lastHeroPosition === cursors.left) {
          player.anims.play('stop-left');
        } else if (lastHeroPosition === cursors.right) {
          player.anims.play('stop-right');
        } else {
          player.anims.play('stop-front');
        }
      }
    }
    manageMovements(cursors);
  }
}
