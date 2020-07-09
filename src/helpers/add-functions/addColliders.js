export default function addColliders(targets) {
  for (let target of targets) {
    this.physics.add.collider(this.globals.player, target, () =>
      this.globals.player.body.velocity.setTo(0)
    );
  }
}
