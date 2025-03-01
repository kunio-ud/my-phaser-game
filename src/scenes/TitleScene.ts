import Phaser from 'phaser';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TitleScene' });
  }

  create(): void {
    const { width, height } = this.cameras.main;
    const titleText = this.add.text(width / 2, height / 2, 'タイトル画面\nクリックで開始', {
      fontSize: '32px',
      align: 'center'
    });
    titleText.setOrigin(0.5);

    // ユーザーのクリックでGameSceneへ遷移
    this.input.once('pointerdown', () => {
      this.scene.start('GameScene');
    });
  }
}
