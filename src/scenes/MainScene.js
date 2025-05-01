export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  preload() {
    this.load.image('logo', 'assets/images/phaser-logo.png');
    this.load.audio('click', 'assets/sounds/click.wav');
  }

  create() {
    this.score = 0;
    this.text = this.add.text(20, 20, 'Score: 0', { fontSize: '32px', fill: '#fff' });

    this.add.text(250, 50, 'Hello Phaser Game', { fontSize: '40px', fill: '#ff0' });
    this.add.text(180, 500, 'Click the logo to score!', { fontSize: '24px', fill: '#ccc' });

    this.soundClick = this.sound.add('click');

    this.logo = this.add.image(400, 300, 'logo').setInteractive();
    this.logo.on('pointerdown', () => {
      this.score += 10;
      this.text.setText('Score: ' + this.score);
      this.soundClick.play();
      this.tweens.add({
        targets: this.logo,
        angle: 360,
        duration: 300,
        onComplete: () => this.logo.setAngle(0)
      });
    });

    // Timer Extension
    this.timerText = this.add.text(600, 20, 'Time: 30', { fontSize: '28px', fill: '#f00' });
    this.timeLeft = 30;
    this.timer = this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        this.timeLeft--;
        this.timerText.setText('Time: ' + this.timeLeft);
        if (this.timeLeft <= 0) {
          this.scene.pause();
          this.add.text(250, 250, 'Time\'s up!', { fontSize: '48px', fill: '#ff0000' });
        }
      }
    });
  }

  update() { }
}
