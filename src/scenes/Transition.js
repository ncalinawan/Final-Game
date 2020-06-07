class Transition extends Phaser.Scene {
    constructor () {
        super('Transition');
    }

    preload() {
        this.load.atlas('cutscene', './assets/other/transition/sceneTransition.png', './assets/other/transition/tutorial_to_beach.json');
    }

    create(){
    //transition cutscene
    this.anims.create({
        key: 'tutorial_cutscene',
        frames: this.anims.generateFrameNames('cutscene', {
            prefix: 'beach_transition',
            start: 1,
            end: 30
        }),
        frameRate: 8,
        repeat: 0
    });

    this.add.sprite(0, 0, 'cutscene', 'beach_transition1').play('tutorial_cutscene').setOrigin(0, 0);
    }

    update(){
            this.sceneChange = this.time.delayedCall(3500, () => {
                this.scene.start("First");
            }, null, this);
    }
    
}