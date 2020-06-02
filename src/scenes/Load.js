class Load extends Phaser.Scene{
    constructor(){
        super("Loading");
    }
    preload() {
        this.load.image('logo', './assets/title/loading_screen.png');

        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        progressBox.fillStyle(0x222222, .7)
        progressBox.fillRect(445, 280, 300, 50);
        
        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        let percentText = this.make.text({
            x: width / 2,
            y: height / 2 + 5,
            text: '0%',
            style: {
                fontFamily: 'Comic Sans MS',
                fontSize: '18px',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
           // console.log(value);
           percentText.setText(parseInt(value * 100) + '%');
        });
                
        this.load.on('fileprogress', function (file) {
            	
        assetText.setText('Loading asset: ' + file.key);
           // console.log(file.src);
        });
        
        this.load.on('complete', function () {
           // console.log('complete');
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        this.load.on('progress', function (value) {
            //console.log(value);
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(449, 290, 300 * value, 30);
        });
         
        //main characters
        this.load.atlas('cat', './assets/chars/cat/cat.png', './assets/chars/cat/cat.json');
        this.load.atlas('frog', './assets/chars/frog/frog.png', './assets/chars/frog/frog.json');
        this.load.atlas('mole', './assets/chars/mole/mole.png', './assets/chars/mole/mole.json');

        //background assets [ tutorial ]
        this.load.atlas('turtle', './assets/bgs/turtle.png', './assets/bgs/turtle.json');
        this.load.atlas('stuff', './assets/other/interaction.png', './assets/other/interaction.json');
        this.load.atlas('grass', './assets/bgs/grass.png', './assets/bgs/grass.json');
        this.load.atlas('stars', './assets/bgs/stars.png', './assets/bgs/stars.json');
        this.load.image('land','./assets/bgs/land.png');
        this.load.image('sky','./assets/bgs/sky.png');
        this.load.image('snek', './assets/npcs/snek.png');
        this.load.image('inventory', './assets/other/backpack_inventory.png');

        //background assets [ stage 2 ]
        this.load.image('base', './assets/bgs/bg_base.png');
        this.load.atlas('beach_stuff', './assets/bgs/beach_assets.png', './assets/bgs/beach_assets.json');
       
        //visual dialogue assets
        this.load.image('dialoguebox', './assets/other/textbox.png');
        this.load.bitmapFont('gem', './assets/font/gem.png', './assets/font/gem.xml');

        //dialogue preload
        this.load.json('sign', './assets/other/tutorial/sign.json');
        this.load.json('snekBYE', './assets/other/tutorial/snek.json');
        this.load.json('sceneStart', './assets/other/tutorial/sceneStart.json');
        this.load.json('distortion', './assets/other/tutorial/distortion.json');
        this.load.json('fuit', './assets/other/tutorial/fuit.json');
        this.load.json('fuitwhoops', './assets/other/tutorial/fuitwhoops.json');
        
    }
     
    create() {
        this.logo = this.add.image(0, 0, 'logo').setOrigin(0.0);

        this.sceneChange = this.time.delayedCall(2000, () => {
            this.scene.start("titleScene");
        }, null, this);
    }
}
