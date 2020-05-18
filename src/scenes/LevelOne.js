class LevelOne extends Phaser.Scene{
    constructor(){
        super("First");
    }

    create(){
        this.add.image(0,0, 'land').setOrigin(0,0);
    }
    
}