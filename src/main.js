/*
Created by Turnip Stonks: Mai Ngyuen, Kiara Yupangco, and Noel Calinawan
Game Title: The MS Paint Adventures of Frog (and friends)
*/
let config = {
    type: Phaser.AUTO,
    width: 1200,        //recommend having it at 2400 so we can see the entire stage
    height: 600,        //hopefully we can set up a camera that can pan around
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade:{
            width: 3600,
            height: 575
        }
    },
    scene: [ Preload, Load, Title, Tutorial, LevelOne]  
}

let game = new Phaser.Game(config);

let cursors;
let keyA, keyS, keyD, keyF, keyG, keyR
let frog, mole, cat;
