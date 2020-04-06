export default function useManageMovements() {
  if (this.globals.cursors.left.isDown) {
    this.globals.lastHeroPosition = this.globals.cursors.left;
    if (this.globals.player.x > this.globals.mapBoundryWidth + 2) {
      this.globals.player.setPosition(
        this.globals.player.x - 2,
        this.globals.player.y
      );
    }
    this.globals.player.anims.play("left-walk", true);

  } else if (this.globals.cursors.right.isDown) {
    this.globals.lastHeroPosition = this.globals.cursors.right;
    if (
      this.globals.player.x <
      this.globals.mapSize - (this.globals.mapBoundryWidth + 2)
    ) {
      this.globals.player.setPosition(
        this.globals.player.x + 2,
        this.globals.player.y
      );
    }
    this.globals.player.anims.play("right-walk", true);

  } else if (this.globals.cursors.up.isDown) {
    this.globals.lastHeroPosition = this.globals.cursors.up;
    if (this.globals.player.y > this.globals.mapBoundryWidth + 12) {
      this.globals.player.setPosition(
        this.globals.player.x,
        this.globals.player.y - 2
      );
    }
    this.globals.player.anims.play("back-walk", true);

  } else if (this.globals.cursors.down.isDown) {
    this.globals.lastHeroPosition = this.globals.cursors.down;
    if (
      this.globals.player.y <
      this.globals.mapSize - (this.globals.mapBoundryWidth + 12)
    ) {
      this.globals.player.setPosition(
        this.globals.player.x,
        this.globals.player.y + 2
      );
    }
    this.globals.player.anims.play("front-walk", true);

  } else {
    if (this.globals.lastHeroPosition === this.globals.cursors.up) {
      this.globals.player.anims.play("stop-back");
    } else if (this.globals.lastHeroPosition === this.globals.cursors.left) {
      this.globals.player.anims.play("stop-left");
    } else if (this.globals.lastHeroPosition === this.globals.cursors.right) {
      this.globals.player.anims.play("stop-right");
    } else {
      this.globals.player.anims.play("stop-front");
    }
  }
}
