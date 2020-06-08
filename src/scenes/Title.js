class Title extends Phaser.Scene{
    constructor(){
        super("titleScene");
    }

    preload() {
        this.load.atlas('title', './assets/title/title_frames.png', './assets/title/title_all.json');
    }

    create(){
    //temporary background (to see the animations)
    this.add.rectangle(0, 0, 3600, 600, 0xFFFFFF).setOrigin(0, 0);

    //title
    this.anims.create({
        key: 'titleAll',
        frames: this.anims.generateFrameNames('title', {
            prefix: 'full_title',
            start: 1,
            end: 4
        }),
        frameRate: 5,
        repeat: -1
    });

    this.bgm = this.sound.add('title', {
        mute: false,
        volume: 0.35,
        rate: 1,
        loop: true
    }); 
    this.bgm.play();

    this.interact = this.sound.add('interacting', {
        mute: false,
        volume: 0.50,
        rate: 1,
    }); 

    this.add.sprite(560, 290, 'title', 'full_title1').play('titleAll');

    keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyG)){
            this.cameras.main.fade(2000);
            this.sceneChange = this.time.delayedCall(2000, () => {
                this.scene.start("tutorialScene");
            }, null, this);
            this.interact.play();
            this.bgm.stop();
        }
    }
    
}
