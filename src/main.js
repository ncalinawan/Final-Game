let config = {
    type: Phaser.CANVAS,
    width: 1200,        //recommend having it at 2400 so we can see the entire stage
    height: 600,        //hopefully we can set up a camera that can pan around
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade:{
            width: 2400,
            height: 575
        }
    },
    scene: [Tutorial]
}

let game = new Phaser.Game(config);

let cursors;
let keyA, keyD;
