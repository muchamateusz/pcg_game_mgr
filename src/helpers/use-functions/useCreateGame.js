import addHeroAnimations from "../add-functions/addHeroAnimations";

export default function useCreateGame() {
  const addMapBounds = () => {
    for (let i = 0; i <= this.gWidht; i += this.globals.platformSize) {
      this.globals.mapBoundries = this.add.sprite(
        this.globals.mapSize,
        i,
        "wall"
      );
      this.globals.mapBoundries = this.add.sprite(0, i, "wall");
      this.globals.mapBoundries = this.add.sprite(i, 0, "ground");
      this.globals.mapBoundries = this.add.sprite(
        i,
        this.globals.mapSize,
        "ground"
      );
    }
  };
  const addBackground = () => {
    for (let i = 0; i <= this.gWidht; i += this.globals.backgroundTileSize) {
      for (let y = 0; y <= this.gHeight; y += this.globals.backgroundTileSize) {
        this.globals.background = this.add.sprite(i, y, "sand");
        this.globals.background.setFlip(
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

  this.globals.camera = this.cameras3d.add(85).setPosition(0, 0, 200);
  this.globals.player = this.add.sprite(100, 450, "dude");
  this.globals.player.depth = 1;

  addBackground();
  fillGrid();
  addMapBounds();
  addHeroAnimations.call(this);
}
