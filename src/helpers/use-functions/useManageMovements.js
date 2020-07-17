export default function manageMovements() {
  const {
    cursors: { left, right, down, up },
  } = this.globals;
  switch (true) {
    case left.isDown:
      this.globals.lastHeroPosition = left;
      this.globals.player.body.velocity.x -= 100;
      this.globals.player.anims.play("left-walk", true);
      break;
    case right.isDown:
      this.globals.lastHeroPosition = right;
      this.globals.player.body.velocity.x += 100;
      this.globals.player.anims.play("right-walk", true);
      break;
    case up.isDown:
      this.globals.lastHeroPosition = up;
      this.globals.player.body.velocity.y -= 100;
      this.globals.player.anims.play("back-walk", true);
      break;
    case down.isDown:
      this.globals.lastHeroPosition = down;
      this.globals.player.body.velocity.y += 100;
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
