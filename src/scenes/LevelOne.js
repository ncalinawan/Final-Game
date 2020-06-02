class LevelOne extends Phaser.Scene{
    constructor(){
        super("First");
    }
    
    //apparently load only works for the tutorial screen :/ for now, im putting this here so i can set up the scene
    /*preload() {
        this.load.image('clowning', './assets/other/clowning.png');
        this.load.image('base', './assets/bgs/bg_base.png');
        this.load.atlas('beach_stuff', './assets/bgs/beach_assets.png', './assets/bgs/beach_assets.json');

        //temporarily copy + pasting this here
        this.load.atlas('froggie', './assets/chars/frog/frog.png', './assets/chars/frog/frog.json');
        this.load.atlas('mole', './assets/chars/mole/mole.png', './assets/chars/mole/mole.json');
        this.load.atlas('stretchCat', './assets/chars/cat/cat_stretching.png', './assets/chars/cat/cat_walking.json');
        this.load.atlas('cat', './assets/chars/cat/stretchy_cat.png', './assets/chars/cat/cat_walking.json');
        this.load.image('shittyFrog', './assets/chars/frog/shitty_frog.png');
        this.load.atlas('shittyCat', './assets/chars/cat/shitty_cat.png', './assets/chars/cat/shitty_cat.json')
        this.load.image('shittyMole', './assets/chars/mole/shitty_mole.png')
    }
    */

    create(){
        this.cameras.main.fadeIn(2000);
        cursors = this.input.keyboard.createCursorKeys();
        this.learnStretch = true;

    //-----------------------------------------------------------------------------------animations -------------------------------------------------------------------
        this.anims.create({
            key: 'crab',
            frames: this.anims.generateFrameNames('beach_stuff',{
                prefix: 'crab',
                start: 1,
                end: 2
             }),
             frameRate: 5,
             repeat: -1
        });

        // ------------------------------------------------------------------- background setup ---------------------------------------------------------------------------------------

        //background base
        this.add.image(0,0, 'base').setOrigin(0,0);

        //midground
        this.add.sprite(3300,280, 'beach_stuff', 'palm_tree').setScale(0.7);
        this.add.sprite(2800,325, 'beach_stuff', 'palm_tree').setScale(0.5);
        this.add.sprite(0,0, 'beach_stuff', 'tree2').setOrigin(0,0);
        this.add.sprite(1500,500,'beach_stuff', 'crab1').setScale(0.3).play('crab');
        this.add.sprite(1300,490,'beach_stuff', 'crab1').setScale(0.3).play('crab');
        this.add.sprite(900, 500, 'beach_stuff', 'shells1');
        this.add.sprite(700,550, 'beach_stuff', 'shells2');
        this.add.sprite(1950,550, 'beach_stuff', 'sand_castle').setScale(0.5);
        this.add.sprite(2500,525, 'beach_stuff', 'shells').setScale(0.5);
        
        //foreground
        this.add.sprite(0,0, 'beach_stuff', 'tree1').setOrigin(0,0);

        //characters -- if someone move them a little bit up that'd be great
        this.physics.world.gravity.y = 1000;
        this.velocity = 300;
        frog = this.physics.add.sprite(340, 450, 'frog', 'frog_walk1').setScale(0.3);
        frog.setCollideWorldBounds(true);
        this.distorted = false;
        this.start = true;
        this.firstDistort = true;
 
        mole = this.physics.add.sprite(40, 450, 'mole', 'mole_walk1').setScale(0.38);
        mole.setCollideWorldBounds(true);
        this.isDigging = false;

        cat = this.physics.add.sprite(190, 450, 'cat', 'cat_walk1').setScale(0.33);
        cat.setCollideWorldBounds(true);
        this.isStretching = false;
       
        //camera follow froggie :)
        this.cameras.main.setBounds(0, 0, 3600, 600);
        this.cameras.main.setZoom(1);
        this.cameras.main.startFollow(frog);

        //set up input
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        
    }
    
    update() {
    }
}
