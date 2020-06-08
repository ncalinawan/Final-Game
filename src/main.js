/*
Created by Turnip Stonks: Mai Ngyuen, Kiara Yupangco, and Noel Calinawan
Game Title: The MS Paint Adventures of Frog (and friends)

+additional notes:+
- it's recommended to play the game on other browsers, as chrome slows a lot of things down
- after getting the party hats, make sure to move a little closer and press A to activate rave
- once the scrolling screen is done in the ending scene, you can now press A to get back to the title screen
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
    scene: [ Preload, Load, Title, Tutorial, Transition, LevelOne, Hell, Ending]  
}

let game = new Phaser.Game(config);

let cursors;
let keyA, keyS, keyD, keyF, keyG, keyR
let frog, mole, cat;
let tester = false;
let distorted = false;
