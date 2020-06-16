import Room from '../../classes/Room';
import { DIRECTION } from "../common-variables/globals";
import useSplitRoom from '../use-functions/useSplitRoom';

export default function addBspWalls () {

  this.globals.bsp.walls = this.add.group(this.game.world, "walls", false);
  this.globals.bsp.walls.active = false;

  const firstRoom = new Room({
    id: setTimeout(Date.now()),
    width: this.globals.mapSize,
    height: this.globals.mapSize,
    xy: [0, 0]
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
      // start with parent.pointOfSplit
      // else start with 0
      let doWhileCondition = idx % 2
      ? (ndRoom.parent[wallGenerationDirection] + (ndRoom.parent.pointOfSplit || 0))
      : (stRoom.parent[wallGenerationDirection]);

      let iteration = stRoom.splittance
        ? idx % 2
          ? stRoom.splittance !== stRoom.parent.splittance
            ? stRoom.parent.pointOfSplit
            : 0
          : 0
        : 0;
      // TODO: w aktualnie rysowanej scianie wyznacz losowo miejsce na drzwi
      // i uwzględnij to miejsce podczas losowania pointOfSplit w potomkach
      // stwórz globalną tablicę przejść, i podczas wyznaczania każdego pointOfSplit
      // bierz poprawkę na pozycję xy przejść..
      do {
        this.globals.bsp.walls.add(
          this.physics.add.image(
            stRoom.splittance === DIRECTION.HORIZONTAL ? iteration : stRoom.pointOfSplit,
            stRoom.splittance === DIRECTION.VERTICAL ? iteration : stRoom.pointOfSplit,
            `bb`
          ).setImmovable()
        );
        iteration = iteration + 10;
      } while (iteration < doWhileCondition);

    });

  }

  this.physics.world.enable(this.globals.bsp.walls);
}
