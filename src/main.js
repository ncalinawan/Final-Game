let config = {
    type: Phaser.CANVAS,
    width: 1200,
    height: 600,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
    },
    //scene: []
}

let game = new Phaser.Game(config);