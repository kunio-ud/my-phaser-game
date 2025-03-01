import Phaser from 'phaser';

export default class EndScene extends Phaser.Scene {
  constructor() {
    super({ key: 'EndScene' });
  }

  create(): void {
    const { width, height } = this.cameras.main;
    const endText = this.add.text(width / 2, height / 2, 'エンド画面\nクリックでタイトルに戻る', {
      fontSize: '32px',
      align: 'center'
    });
    endText.setOrigin(0.5);

    // クリックでTitleSceneへ戻る
    this.input.once('pointerdown', () => {
      this.scene.start('TitleScene');
    });
  }
}
