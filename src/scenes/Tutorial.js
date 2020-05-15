class Tutorial extends Phaser.Scene{
    constructor(){
        super("tutorialScene");
    }

    preload(){
        this.load.atlas('froggie', './assets/frog_walking.png', './assets/frog_walking.json');
    }

    create(){

        cursors = this.input.keyboard.createCursorKeys();
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('froggie',{
                prefix: 'frog_',
                start: 1,
                end: 2
             }),
             frameRate: 5,
             repeat: -1
        });
        

        this.velocity = 150;
        this.frog = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'froggie', 'frog_1').play('walk');
        this.frog.setCollideWorldBounds(true);

        
        
    }

    update(){
        if(cursors.left.isDown){
            this.frog.setVelocityX(-this.velocity)
            this.frog.setFlip(true, false);
           // this.frog.anims.play('walk', true);
        }else if(cursors.right.isDown){
            this.frog.setVelocityX(this.velocity)
            this.frog.resetFlip();
           // this.frog.anims.play('walk', true);
        }else{
            this.frog.body.velocity.x = 0;
        }

    }
    
}