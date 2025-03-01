import Phaser from 'phaser';
import TitleScene from './scenes/TitleScene';
import GameScene from './scenes/GameScene';
import EndScene from './scenes/EndScene';


const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 300 }, // 重力を設定（必要に応じて調整）
      debug: false,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT, // 画面にフィットさせる
    autoCenter: Phaser.Scale.CENTER_BOTH, // 中央に配置
    width: window.innerWidth,
    height: window.innerHeight,
  },
  scene: [TitleScene, GameScene, EndScene],
};

const game = new Phaser.Game(config);

// ウィンドウリサイズ時にもキャンバスサイズを更新
window.addEventListener('resize', () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
});
