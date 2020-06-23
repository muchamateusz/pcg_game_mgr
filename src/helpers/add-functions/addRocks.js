export default function addRocks() {
  this.globals.rocks = this.add.group(this.game.world, "rocks", false);
  this.globals.rocks.active = false;
  for (let i = 0; i < 10; i += 1) {
    const x = Math.floor(Math.random() * (599 - 50 + 1) + 50);
    const y = Math.floor(Math.random() * (599 - 50 + 1) + 50);
    if (x + 74 < 100 || x > 150 || y + 74 < 450 || y > 500) {
      this.globals.rocks.add(
        this.physics.add.image(x, y, "ROCK").setImmovable()
      );
    }
  }
  this.physics.world.enable(this.globals.rocks);
}
