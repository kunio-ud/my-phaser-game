import Phaser from 'phaser';

export default class EndScene extends Phaser.Scene {
  constructor() {
    super({ key: 'EndScene' });
  }

  create(): void {
    const { width, height } = this.cameras.main;
    this.add.text(width / 2, height / 3, 'エンド画面', {
      fontSize: '32px',
      align: 'center'
    }).setOrigin(0.5);

    // 「タイトルに戻る」ボタン
    const titleButton = this.add.text(width / 2, height / 2, 'タイトルに戻る', {
      fontSize: '24px',
      color: '#ffffff',
      backgroundColor: '#0000ff'
    })
      .setOrigin(0.5)
      .setPadding(10)
      .setInteractive({ useHandCursor: true });

    titleButton.on('pointerdown', () => {
      this.scene.start('TitleScene');
    });

    // 「リスタート」ボタン
    const restartButton = this.add.text(width / 2, height / 2 + 100, 'リスタート', {
      fontSize: '24px',
      color: '#ffffff',
      backgroundColor: '#00aa00'
    })
      .setOrigin(0.5)
      .setPadding(10)
      .setInteractive({ useHandCursor: true });

    restartButton.on('pointerdown', () => {
      this.scene.start('GameScene');
    });

  }
}
