class Ending extends Phaser.Scene {
    constructor () {
        super('Ending');
    }

    create () {
        this.cameras.main.fadeIn(2000);

        //this.add.rectangle(0,200,1032, 441, 0xFFFFFF).setOrigin(0,0);
        this.tutorial = this.add.tileSprite(0,70, 3600, 1200, 'bgs', 'reworked_tutorial').setOrigin(0,0);
        this.beach = this.add.tileSprite(0,70, 3600, 1200, 'bgs', 'beach_scene').setOrigin(0,0);
        this.beach.alpha = 0;
        this.hell = this.add.tileSprite(0,70, 3600, 1200, 'bgs', 'hell_resized').setOrigin(0,0);
        this.hell.alpha = 0; 
        this.tutorialFin = false; 
        this.beachFin = false; 
        this.hellFin = false;

        this.add.sprite(0,0, 'bgs', 'border').setOrigin(0,0);
        this.add.sprite(0,0, 'bgs', 'thanks').setOrigin(0,0);
        this.add.sprite(0,0, 'bgs', 'backpack').setOrigin(0,0);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

        this.bgm = this.sound.add('credits', {
            mute: false,
            volume: 0.35,
            rate: 1,
            loop: true
        }); 
        this.bgm.play();
        
    }

    update () {
        //play tutorial stage pan
        if (this.tutorialFin == false && this.beachFin == false && this.hellFin == false){
            
            this.tutorial.tilePositionX += 1; 
            this.time.delayedCall(23300, () => {
                this.tutorial.tilePositionX += 0;
                this.tutorial.alpha = 0;
                this.tutorialFin = true;    
            }, null, this);

        }
        //beach pan
        else if(this.tutorialFin == true && this.beachFin == false && this.hellFin == false){
            this.beach.alpha = 1; 
            this.beach.tilePositionX += 1;
            this.time.delayedCall(23300, () => {
                this.beach.tilePositionX += 0;
                this.beach.alpha = 0;
                this.beachFin = true;
            }, null, this);
        }
        //hell pan
        else if(this.tutorialFin == true && this.beachFin == true && this.hellFin == false){
            this.hell.alpha = 1; 
            this.hell.tilePositionX += 1;
            this.time.delayedCall(23300, () => {
                this.hell.tilePositionX += 0;
                this.hell.alpha = 0;
                this.hellFin = true;
            }, null, this);
        }

        if(Phaser.Input.Keyboard.JustDown(keyA) && this.tutorialFin == true && this.beachFin == true && this.hellFin == true){
            tester = false;
            this.cameras.main.fade(2000);
            this.sceneChange = this.time.delayedCall(2000, () => {
                this.scene.start("titleScene");
                this.bgm.stop();
            }, null, this);
        }
    }
}