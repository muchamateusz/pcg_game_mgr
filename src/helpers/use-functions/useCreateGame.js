import addHeroAnimations from "../add-functions/addHeroAnimations";

export default function useCreateGame() {
  const initiatePhysics = () => {
    this.globals.camera = this.cameras3d.add(85).setPosition(0, 0, 200);
    this.globals.player = this.add.sprite(100, 450, "dude");
    this.globals.player.depth = 1;
    this.physics.world.enable(this.globals.player);
    this.globals.player.body.collideWorldBounds = true;
    addBackground();
    addRocks();
  };
  const addRocks = () => {
    this.globals.rocks = this.add.group(this.game.world, "rocks", false);
    this.globals.rocks.active = false;
    for (let i = 0; i < 50; i += 1) {
      const x = Math.floor(Math.random() * (599 - 50 + 1) + 50);
      const y = Math.floor(Math.random() * (599 - 50 + 1) + 50);
      if (x + 74 < 100 || x > 150 || y + 74 < 450 || y > 500) {
        this.globals.rocks.add(this.physics.add.image(x, y, "rock").setImmovable());
      }
    }
    this.physics.world.enable(this.globals.rocks);
  };
  const addBackground = () => {
    for (let i = 0; i <= this.gWidht; i += this.globals.backgroundTileSize) {
      for (let y = 0; y <= this.gHeight; y += this.globals.backgroundTileSize) {
        this.globals.gameSceneBg = this.add.sprite(i, y, "sand");
        this.globals.gameSceneBg.setFlip(
          Math.floor(Math.random() * 2),
          Math.floor(Math.random() * 2)
        );
      }
    }
  };
  const fillGrid = () => {
    // for (let i = 0; i <= this.gWidht; i += 64) {
    //   for (let y = 0; y <= this.gHeight; y += 64) {
    //     background = this.add.sprite(i, y, "sand");
    //     background.setFlip(
    //       Math.floor(Math.random() * 2),
    //       Math.floor(Math.random() * 2)
    //     );
    //   }
    // }
  };

  // create rooms
  // set player position in a room
  // fog map
  // close map boundries
  initiatePhysics();
  fillGrid();
  addHeroAnimations.call(this);
}
