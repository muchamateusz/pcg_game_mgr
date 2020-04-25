import addHeroAnimations from "../add-functions/addHeroAnimations";
import Room from "../../classes/Room";

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

  const initiateGridGeneration = () => {
    const firstRoom = new Room();
    this.globals.bsp.grid.push();
    // create an array of arrays with rooms instances
    // create class room with width, height, flag : vertical/horizontal splittinga, point of split
    // split the map in 4 iterations onto rooms with randomly placed lines.
      // for (4 iterations)
      // generate a value from 100 to 600 and save it as a point of split
      // choose flag value comparing width to height and choose randomly if they are similar
      // generate two rooms from initial one, save them to array and rerun yourself

    // create an an inner room inside the space room.
    // create walls
    // connect rooms from last iteration
    // connect one of the rooms from last iteration with one of the room from previous iteration
    // draw a tunnel on connections
    // place a hero i one of the rooms and an exit in another

  };

  // create rooms
  // set player position in a room
  // fog map
  // close map boundries
  initiatePhysics();
  initiateGridGeneration();
  addHeroAnimations.call(this);
}
