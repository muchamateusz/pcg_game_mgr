import Room from "../../classes/Room";

import addHeroAnimations from "../add-functions/addHeroAnimations";
// import addRocks from "../add-functions/addRocks";
import addBackground from "../add-functions/addBackground";

import { DIRECTION } from "../common-variables/globals";
import useSplitRoom from './useSplitRoom';

export default function useCreateGame() {
  const initiatePhysics = () => {
    this.globals.camera = this.cameras3d.add(85).setPosition(0, 0, 200);
    this.globals.player = this.add.sprite(100, 450, "dude");
    this.globals.player.depth = 1;
    this.physics.world.enable(this.globals.player);
    this.globals.player.body.collideWorldBounds = true;
    addBackground.call(this);
    // addRocks.call(this);
  };

  const initiateGridGeneration = () => {
    const firstRoom = new Room({
      id: setTimeout(Date.now()),
      width: this.globals.mapSize,
      height: this.globals.mapSize
    });
    const finishLoopAfter = 3; // 4 iterations will generate 16 rooms
    const numOfExecution = 0;
    this.globals.bsp.grid.root.push(firstRoom);
    useSplitRoom.call(this, finishLoopAfter, numOfExecution, this.globals.bsp.grid.root[0]);

    // draw walls
    for (let pairs of this.globals.bsp.grid.iterations) {
      pairs.forEach((pair, idx) => {
        console.log(pair);
        const stRoom = pair[0];
        const ndRoom = pair[1];
        const wallGenerationDirection = stRoom.parent.splittance === DIRECTION.HORIZONTAL ? 'height' : 'width';
        // if current splittance is different then parent splittance
        //  start with parent.pointOfSplit
        // else start with 0

        let doWhileCondition = idx % 2
        ? (ndRoom.parent[wallGenerationDirection] + (ndRoom.parent.pointOfSplit || 0))
        : (stRoom.parent[wallGenerationDirection]);

        let i = stRoom.splittance
          ? idx % 2
            ? stRoom.splittance !== stRoom.parent.splittance
              ? stRoom.parent.pointOfSplit
              : 10
            : 10
          : 10;

// TODO : pointOfSplit powinien wskazywać wartość globalną dla całej mapy a nie dla pokoju w którym znajdują się dzieci
// chyba że znajdziesz sposób na to jak z iteracji na iterację sumować pointOfSplit z wysokością poprzednich parentów
//
         do {
            // this.globals.bsp.walls.push(
              this.add.sprite(
                stRoom.splittance === DIRECTION.HORIZONTAL ? i : stRoom.pointOfSplit,
                stRoom.splittance === DIRECTION.VERTICAL ? i : stRoom.pointOfSplit,
                `bb`
              // )
            );
          i = i + 20;
        } while (i < doWhileCondition);
      });
    }
    // connect rooms from last iteration
    // connect one of the rooms from last iteration with one of the room from previous iteration
    // draw a tunnel on connections
    // place a hero i one of the rooms and an exit in another
  };

  // create rooms
  // set player position in a room
  initiatePhysics();
  initiateGridGeneration();
  addHeroAnimations.call(this);
}
