import Phaser from 'phaser';
import Engine from './classes/Engine';
import './index.css';
import { globals } from './helpers/common-variables/globals';
// first load 'hello world' and let the user to choose algorithm
// but underneath show canvas-holder (grayed field or smth)
window.onload = () => {
  new Phaser.Game({
    type: Phaser.AUTO,
    backgroundColor: 0x000000,
    width: globals.mapSize,
    height: globals.mapSize,
    pixelArt: true,
    scene: new Engine(globals)
  });
  window.focus();
};
