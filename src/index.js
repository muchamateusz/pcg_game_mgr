import Phaser from 'phaser';
import GamePlay from './classes/GamePlay';
import './index.css';

window.onload = () => {
  new Phaser.Game({
    type: Phaser.AUTO,
    backgroundColor: 0x87ceeb,
    width: 800,
    height: 600,
    pixelArt: true,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {
          y: 300
        }
      }
    },
    scene: GamePlay
  });
  window.focus();
};
