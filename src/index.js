import Phaser from 'phaser';
import GamePlay from './classes/GamePlay';
import './index.css';

window.onload = () => {
  new Phaser.Game({
    type: Phaser.AUTO,
    backgroundColor: 0x000000,
    width: 800,
    height: 600,
    pixelArt: true,
    scene: GamePlay
  });
  window.focus();
};
