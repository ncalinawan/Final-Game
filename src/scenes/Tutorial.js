class Tutorial extends Phaser.Scene{
    constructor(){
        super("tutorialScene");
    }

    preload(){
        this.load.atlas('froggie', './assets/frog_walking.png', './assets/frog_walking.json');
        this.load.atlas('background', './assets/tutorial_background.png', './assets/tutorial_background.json');
        this.load.atlas('turtle', './assets/turtle.png', './assets/turtle.json');
        this.load.atlas('stuff', './assets/interaction.png', './assets/interaction.json');
        this.load.atlas('grass', './assets/grass.png', './assets/grass.json');
        this.load.atlas('stars', './assets/stars.png', './assets/stars.json');
        this.load.image('land','./assets/land.png');
        this.load.image('sky','./assets/sky.png');
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
            key: 'walk',
            frames: this.anims.generateFrameNames('froggie',{
                prefix: 'frog_',
                start: 1,
                end: 2
             }),
             frameRate: 5,
             repeat: -1
        });
        
        this.physics.world.gravity.y = 1000;
        this.velocity = 150;
        this.frog = this.physics.add.sprite(40, 500, 'froggie', 'frog_1').setScale(0.3);
        this.frog.setCollideWorldBounds(true);

        
        
    }

    update(){
        if(cursors.left.isDown){
            this.frog.setVelocityX(-this.velocity)
            this.frog.setFlip(true, false);
            this.frog.anims.play('walk', true);
        }else if(cursors.right.isDown){
            this.frog.setVelocityX(this.velocity)
            this.frog.resetFlip();
            this.frog.anims.play('walk', true);
        }else{
            this.frog.body.velocity.x = 0;
            this.frog.anims.play('walk', false);
        }

    }
    
}
