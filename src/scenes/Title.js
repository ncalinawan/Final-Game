class Title extends Phaser.Scene{
    constructor(){
        super("titleScene");
    }

    preload() {
        this.load.atlas('title', './assets/title/title_and_names.png', './assets/title/title.json');
        this.load.atlas('frog_title', './assets/title/frog_title_walk.png', './assets/title/frog_title.json');
        this.load.atlas('cat_title', './assets/title/cat_title_walk.png', './assets/title/cat_title.json');
        this.load.atlas('mole_title', './assets/title/mole_title_walk.png', './assets/title/mole_title.json');
    }

    create(){
    //temporary background (to see the animations)
    this.add.rectangle(3600, 0, 3600, 600, 0xFFFFFF).setOrigin(0, 0);

    //title & names
        this.anims.create({
            key: 'title&names',
            frames: this.anims.generateFrameNames('title', {
                prefix: 'title_',
                start: 1,
                end: 2
            }),
            frameRate: 5,
            repeat: -1
        });

    //frog walk
        this.anims.create({
            key: 'frog',
            frames: this.anims.generateFrameNames('frog_title', {
                prefix: 'frog_title',
                start: 1,
                end: 4
            }),
            frameRate: 5,
            repeat: -1
        });

    //cat walk
        this.anims.create({
            key: 'cat',
            frames: this.anims.generateFrameNames('cat_title', {
                prefix: 'title_cat',
                start: 1,
                end: 4
            }),
            frameRate: 5,
            repeat: -1
        });

    //mole walk
    this.anims.create({
        key: 'mole',
        frames: this.anims.generateFrameNames('mole_title', {
            prefix: 'title_mole',
            start: 1,
            end: 4
        }),
        frameRate: 5,
        repeat: -1
    });

    this.add.sprite(560, 290, 'title', 'title_1').play('title&names');
    this.add.sprite(755, 362, 'frog', 'frog_title1').play('frog').setScale(0.75);
    this.add.sprite(570, 370, 'cat', 'title_cat1').play('cat').setScale(0.75);
    this.add.sprite(390, 385, 'mole', 'title_mole1').play('mole').setScale(0.75);

    keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyG)){
            this.scene.start("tutorialScene");
        }
    }
    
}
