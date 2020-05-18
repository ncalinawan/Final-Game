class LevelOne extends Phaser.Scene{
    constructor(){
        super("First");
    }
    
        preload() {
        //mai's bonus, temporary clowning
        this.load.image('clowning', './assets/other/clowning.png');
    }

    create(){
        this.add.image(0,0, 'land').setOrigin(0,0);
        this.add.image(0,0,'clowning').setOrigin(0,0);
    }
    
}
