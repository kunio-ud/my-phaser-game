import Phaser from 'phaser';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TitleScene' });
  }

  create(): void {
    const { width, height } = this.cameras.main;
    // 画面中央にタイトルテキストを表示
    const titleText = this.add.text(width / 2, height / 2, 'タイトル画面\nタッチして開始', {
      fontSize: '32px',
      align: 'center',
    });
    titleText.setOrigin(0.5);

    // タッチまたはクリックで反応
    this.input.once('pointerdown', () => {
      this.scene.start('GameScene');
    });
  }
}
