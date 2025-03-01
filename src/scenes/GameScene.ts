import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private obstacles!: Phaser.Physics.Arcade.Group;
  private survivalTime: number = 0;
  private survivalText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'GameScene' });
  }

  preload(): void {
    // プレイヤー画像をロード。assetsフォルダに適切な画像を配置してください。
    this.load.image('player', 'assets/player.png');
  }

  create(): void {
    const { width, height } = this.scale;

    // プレイヤーを画面左側中央に配置
    this.player = this.physics.add.sprite(100, height / 2, 'player');
    this.player.setCollideWorldBounds(true);

    // 重力の設定（高めに設定してフラッピーバード風の落下を再現）
    this.physics.world.gravity.y = 800;

    // タッチまたはクリックでジャンプ（フラップ）を実行
    this.input.on('pointerdown', () => {
      // 速度を上方向に設定。値はお好みに合わせて調整してください。
      this.player.setVelocityY(-900);
    });

    // 障害物グループの作成
    this.obstacles = this.physics.add.group();

    // 障害物を定期的に生成するタイマーイベント
    this.time.addEvent({
      delay: 2500,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true,
    });

    // プレイヤーと障害物の衝突判定
    this.physics.add.collider(
      this.player,
      this.obstacles,
      (player, obstacle) => {
        this.hitObstacle(player as Phaser.Physics.Arcade.Sprite, obstacle as Phaser.Types.Physics.Arcade.GameObjectWithBody);
      },
      undefined, this
    );

    // 生存時間テキストの初期化
    this.survivalTime = 0;
    this.survivalText = this.add.text(100, 20, 'Time: 0.0', {
      fontSize: '32px',
      color: '#fff'
    });
    this.survivalText.setOrigin(0.5);
  }

  spawnObstacle(): void {
    console.log("Spawned obstacle");
    const { width, height } = this.scale;

    // 障害物の隙間位置をランダムに決定
    const gapPosition = Phaser.Math.Between(50, height - 50);

    // 障害物（四角形）
    const pipe = this.add.rectangle(width + 25, gapPosition, 50, 50, 0x00ffff);
    pipe.setOrigin(0, 1);
    this.physics.add.existing(pipe);
    const body = pipe.body as Phaser.Physics.Arcade.Body;
    this.obstacles.add(pipe);
    body.allowGravity = false;
    body.gravity.y = 0;
    body.setVelocityX(-150);
    body.setImmovable(true);

  }

  hitObstacle(
    player: Phaser.Physics.Arcade.Sprite,
    obstacle: Phaser.Types.Physics.Arcade.GameObjectWithBody
  ): void {
    // プレイヤーが障害物に衝突した場合、シーンを再起動（リスタート）
    this.scene.start('EndScene');
  }


  update(time: number, delta: number): void {
    this.obstacles.children.each((obstacle) => {
      const body = obstacle.body as Phaser.Physics.Arcade.Body;
      body.velocity.y = 0;
      return null;
    }, this);

    // プレイヤーの縦方向の速度に応じて角度を変更（上向きなら傾け、下向きなら下向きに）
    if (this.player && (this.player.body?.velocity.y ?? 0) < 0) {
      // 上昇中は少し上向き
      this.player.setAngle(-20);
    } else {
      // 落下中は下向き
      this.player.setAngle(20);
    }

    const screenHeight = this.cameras.main.height;
    if (this.player.y < 65 || this.player.y > screenHeight - 65) {
      this.scene.start('EndScene');  // ゲームオーバーシーンへ遷移
    }

    this.survivalTime += delta;
    const seconds = (this.survivalTime / 1000).toFixed(1);
    this.survivalText.setText(`Time: ${seconds}`);

  }
}
