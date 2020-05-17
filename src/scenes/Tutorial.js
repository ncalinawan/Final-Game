class Tutorial extends Phaser.Scene{
    constructor(){
        super("tutorialScene");
    }

    preload(){
        this.load.atlas('froggie', './assets/chars/frog/frog_walking.png', './assets/chars/frog/frog_walking.json');
       // this.load.atlas('background', './assets/tutorial_background.png', './assets/tutorial_background.json');
        this.load.atlas('turtle', './assets/bgs/turtle.png', './assets/bgs/turtle.json');
        this.load.atlas('stuff', './assets/other/interaction.png', './assets/other/interaction.json');
        this.load.atlas('grass', './assets/bgs/grass.png', './assets/bgs/grass.json');
        this.load.atlas('stars', './assets/bgs/stars.png', './assets/bgs/stars.json');
        this.load.atlas('mole', './assets/chars/mole/mole.png', './assets/chars/mole/mole.json');
        this.load.image('land','./assets/bgs/land.png');
        this.load.image('sky','./assets/bgs/sky.png');
        this.load.image('distortion','./assets/distortion.png');
    }

    create(){
        cursors = this.input.keyboard.createCursorKeys();
        this.add.image(0,0,'sky').setOrigin(0,0);

        // -------------------------------------------- animations ---------------------------------------------------------------------

        //stars animation
        this.anims.create({
            key: 'star',
            frames: this.anims.generateFrameNames('stars',{
                prefix: 'star_',
                start: 1,
                end: 19
             }),
             frameRate: 5,
             repeat: -1
        });
        this.add.sprite(0,0,'stars', 'star_1').play('star').setOrigin(0,0);

        //turtle / rock / torterra ripoff animation
        this.anims.create({
            key: 'turtle',
            frames: this.anims.generateFrameNames('turtle',{
                prefix: 'rock_',
                start: 1,
                end: 19
             }),
             frameRate: 5,
             repeat: -1
        });
        this.add.sprite(0,0,'turtle', 'rock_1').play('turtle').setOrigin(0,0);
        

        //add images in the midground to build depth 
        this.add.image(0,0, 'land').setOrigin(0,0);
        this.add.sprite(2000,230,'stuff', 'door').setScale(0.8).setOrigin(0,0);             //scale to 80% of size
        this.add.sprite(1450,480,'stuff', 'dirtmound').setScale(2).setOrigin(0,0);          //scale to 2x the original size
        this.add.sprite(1525,490,'stuff', 'fuit').setScale(0.4).setOrigin(0,0);             //scale to of size

        this.sign = this.physics.add.sprite(1750,400,'stuff', 'sign').setScale(0.4).setOrigin(0,0); 
        this.sign.setCollideWorldBounds(true);
        this.keyHint = this.add.sprite(this.sign.x + 20, 310,'stuff', 'keyboard_button').setScale(0.2).setOrigin(0,0);
        this.nearSign = false;

        //grass animation [ foreground ]
        this.anims.create({
            key: 'grass',
            frames: this.anims.generateFrameNames('grass',{
                prefix: 'grass_',
                start: 1,
                end: 19
             }),
             frameRate: 5,
             repeat: -1
        });
        this.add.sprite(0,0,'grass', 'grass_1').play('grass').setOrigin(0,0);
        
        //froggie :D
        this.anims.create({
            key: 'frogwalk',
            frames: this.anims.generateFrameNames('froggie',{
                prefix: 'frog_',
                start: 1,
                end: 2
             }),
             frameRate: 5,
             repeat: -1
        });

        this.anims.create({
            key: 'molewalk',
            frames: this.anims.generateFrameNames('mole',{
                prefix: 'walk_',
                start: 1,
                end: 3
             }),
             frameRate: 5,
             repeat: -1
        });
        
        this.physics.world.gravity.y = 1000;
        this.velocity = 300;
        this.frog = this.physics.add.sprite(200, 500, 'froggie', 'frog_1').setScale(0.3);
        this.frog.setCollideWorldBounds(true);
        this.frog.setDepth(1);

        this.mole = this.physics.add.sprite(40, 500, 'mole', 'walk_1').setScale(0.38);
        this.mole.setCollideWorldBounds(true);

        //camera follow froggie :)
        this.cameras.main.setBounds(0, 0, 2400, 600);
        this.cameras.main.setZoom(1);
        this.cameras.main.startFollow(this.frog);
        
    }

    update(){
        if(cursors.left.isDown){
            this.frog.setVelocityX(-this.velocity)
            this.frog.setFlip(true, false);

            this.mole.setVelocityX(-this.velocity)
            this.mole.setFlip(true, false);

            this.frog.anims.play('frogwalk', true);
            this.mole.anims.play('molewalk', true);
        }else if(cursors.right.isDown){
            this.frog.setVelocityX(this.velocity)
            this.frog.resetFlip();

            this.mole.setVelocityX(this.velocity)
            this.mole.resetFlip();

            this.frog.anims.play('frogwalk', true);
            this.mole.anims.play('molewalk', true);
        }else{
            this.frog.body.velocity.x = 0;
            this.mole.body.velocity.x = 0;

            this.frog.anims.play('frogwalk', false);
            this.mole.anims.play('molewalk', false);
        }
        console.log(this.nearSign);
        if(this.frog.x >= this.sign.x && this.frog.x <= 1850){
           this.keyHint.alpha = 1;
           this.nearSign = true;
        }else{
            this.keyHint.alpha = 0;
            this.nearSign = false;
        }

    }
    
}

       
          

