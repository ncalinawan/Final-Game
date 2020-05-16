let config = {
    type: Phaser.CANVAS,
    width: 2400,        //recommend having it at 2400 so we can see the entire stage
    height: 600,        //hopefully we can set up a camera that can pan around
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
    },
    scene: [Tutorial]
}

let game = new Phaser.Game(config);

let cursors;
