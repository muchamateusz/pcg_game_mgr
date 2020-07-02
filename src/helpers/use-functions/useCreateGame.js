import addHeroAnimations from "../add-functions/addHeroAnimations";
import addRocks from "../add-functions/addRocks";
import addBackground from "../add-functions/addBackground";
import addBspWalls from "../add-functions/addBspWalls";

export default function useCreateGame() {
  const initiatePhysics = () => {
    this.globals.camera = this.cameras3d.add(85).setPosition(0, 0, 200);
    this.globals.player = this.add.sprite(10, 0, "HERO");
    this.globals.star = this.add.sprite(
      this.globals.mapSize - 20,
      this.globals.mapSize - 20,
      "STAR"
    );
    this.globals.star.depth = 1;
    this.globals.player.depth = 2;

    this.physics.world.enable(this.globals.player);
    this.globals.player.body.collideWorldBounds = true;

    addBackground.call(this);
    addBspWalls.call(this);
    addRocks.call(this);
  };

  initiatePhysics();
  addHeroAnimations.call(this);
}
