import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create(): void {
    const { width, height } = this.cameras.main;
    const gameText = this.add.text(width / 2, height / 2, 'ゲーム中...', {
      fontSize: '32px',
      align: 'center'
    });
    gameText.setOrigin(0.5);

    // 例として、5秒後にEndSceneへ遷移
    this.time.delayedCall(5000, () => {
      this.scene.start('EndScene');
    });
  }
}
