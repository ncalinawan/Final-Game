class Preload extends Phaser.Scene{
    constructor(){
        super("Preload");
    }

    preload() {
        this.load.image('preload', './assets/title/preload_screen.png');
        this.load.image('loading', './assets/title/loading_screen.png');

        //make loading screen and preload it here
    }

    create(){
        this.logo = this.add.image(0, 0, 'preload').setOrigin(0.0);

        this.sceneChange = this.time.delayedCall(2000, () => {
            this.scene.start("Loading");
        }, null, this);
    }
}
