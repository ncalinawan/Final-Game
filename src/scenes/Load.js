class Load extends Phaser.Scene{
    constructor(){
        super("Loading");
    }
    preload() {
        this.logo = this.add.image(0, 0, 'loading').setOrigin(0.0);

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
                fill: '#000000'
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
                fill: '#000000'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#000000'
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
            progressBar.fillRect(445, 290, 300 * value, 30);
        });
//------------------ OVERALL ------------------
        //main characters
        this.load.atlas('cat', './assets/chars/cat/cat.png', './assets/chars/cat/cat.json');
        this.load.atlas('frog', './assets/chars/frog/frog.png', './assets/chars/frog/frog.json');
        this.load.atlas('mole', './assets/chars/mole/mole.png', './assets/chars/mole/mole.json');
        
        //assets
        //this.load.image('inventory', './assets/other/backpack_inventory.png');

        //visual dialogue assets
        this.load.image('dialoguebox', './assets/other/textbox.png');
        this.load.bitmapFont('gem', './assets/font/gem.png', './assets/font/gem.xml');

//------------------ TUTORIAL ------------------
        //background assets [ tutorial ]
        this.load.atlas('turtle', './assets/bgs/turtle.png', './assets/bgs/turtle.json');
        this.load.atlas('grass', './assets/bgs/grass.png', './assets/bgs/grass.json');
        this.load.atlas('stars', './assets/bgs/stars.png', './assets/bgs/stars.json');
        this.load.image('land','./assets/bgs/land.png');
        this.load.image('sky','./assets/bgs/sky.png');
        
        //npcs & assets
        this.load.image('snek', './assets/npcs/snek.png');
        this.load.atlas('stuff', './assets/other/interaction.png', './assets/other/interaction.json');
        
        
        //dialogue preload
        this.load.json('introduction', './assets/other/tutorial/intro.json');
        this.load.json('sign', './assets/other/tutorial/sign.json');
        this.load.json('snekBYE', './assets/other/tutorial/snek.json');
        this.load.json('sceneStart', './assets/other/tutorial/sceneStart.json');
        this.load.json('distortion', './assets/other/tutorial/distortion.json');
        this.load.json('fuit', './assets/other/tutorial/fuit.json');
        this.load.json('fuitwhoops', './assets/other/tutorial/fuitwhoops.json');
        this.load.json('fuitWhere', './assets/other/tutorial/noFuitYet.json');

//------------------ BEACH STAGE (and hell) ------------------
        //background assets [ stage 1 ]
        this.load.atlas('ocean_waves', './assets/bgs/beach_waves.png', './assets/bgs/beach_waves.json');
        this.load.atlas('tutorialBeach', './assets/transition/sceneTransition.png', './assets/transition/tutorial_to_beach.json');
        this.load.image('base', './assets/bgs/bg_base.png');
        this.load.atlas('hell', './assets/bgs/hell.png', './assets/bgs/hell.json');
        this.load.atlas('rave', './assets/bgs/rave.png', './assets/bgs/rave.json');
        this.load.atlas('bgs', './assets/bgs/backgrounds.png', './assets/bgs/backgrounds.json');
        this.load.image('sand_castle', './assets/bgs/sand_castle.png');
        
        //npcs & assets
        this.load.atlas('beach_stuff', './assets/bgs/beach_assets.png', './assets/bgs/beach_assets.json');
        this.load.atlas('bucket', './assets/bgs/spilled_bucket.png', './assets/bgs/spilled_bucket.json');
        this.load.image('fesh', './assets/npcs/sad_fesh.png');
        this.load.image('crub', './assets/npcs/crub.png');
        this.load.image('partyCrub', './assets/npcs/party_crub.png');
       
        //dialogue preload
        this.load.json('shells1', './assets/other/stageOne/shell1.json');
        this.load.json('shells2', './assets/other/stageOne/shells2.json');
        this.load.json('shells3', './assets/other/stageOne/shells3.json');
        this.load.json('beachBeginning', './assets/other/stageOne/stageOneStart.json');
        this.load.json('questStart', './assets/other/stageOne/crubStart.json');
        this.load.json('questOngoing', './assets/other/stageOne/crubOngoing.json');
        this.load.json('questDone', './assets/other/stageOne/crubEnd.json');
        this.load.json('shake', './assets/other/stageOne/shake_coconuts.json');
        this.load.json('gameOver', './assets/other/stageOne/game_over.json');
        this.load.json('bonked', './assets/other/stageOne/bonked.json');
        this.load.json('f', './assets/other/stageOne/fForRespects.json');
        this.load.json('bottle', './assets/other/stageOne/bottle.json');

        this.load.json('welcometohell', './assets/other/hell/welcometohell.json');
        this.load.json('timetogetout', './assets/other/hell/timetogetout.json');
        this.load.json('stop', './assets/other/hell/stop.json');
        this.load.json('hellcontinues', './assets/other/hell/hellcontinues.json');
        
//------------------ SOUNDS ------------------
        //"Fun Loop" by DDmyzik of freesound.org
        this.load.audio('title', './assets/sounds/title.wav');
        
        //"Cartoon_Whistle" by Brsjak of freesound.org [trimmed by AudioTrimmer.com]
        this.load.audio('stretching', './assets/sounds/stretching.wav');
        
        //interaction ding (recorded by Noel Calinawan)
        this.load.audio('interacting', './assets/sounds/InteractionDing.wav');
        
        //Digging audio (recorded by Kiara Yupangco)
        this.load.audio('digging', './assets/sounds/digging.wav');
        
        //"Forest" by JayHu of freesound.org
        this.load.audio('tutorial', './assets/sounds/tutorial.wav');

        //"toy_cannon_shot.wav" by ReadeOnly of freesound.org
        this.load.audio('poof', './assets/sounds/poof.wav');
        
        /*"Carnival Cavalcade – Sunshine filled Reggae with deep bass guitar and rasping sax 
        that brings the street party directly to wherever you are" by David-Gwyn Jones of zapsplat.com*/
        this.load.audio('beachMusic', './assets/sounds/beachMusic.wav');

        //"Water splash, emptying a bucket 7" by wormer2 of freesound.org
        this.load.audio('bucket', './assets/sounds/bucket_spill.wav');

        ////"Caveman Bonk" of myinstants.com
        this.load.audio('bonk', './assets/sounds/bonk.wav');
        
        //"Lava flow" by ZapSplat of zapsplat.com
        this.load.audio('hell', './assets/sounds/hell.wav');
        
        //"instant rave" by supervans of freesound.org
        this.load.audio('beachRave', './assets/sounds/beachRave.wav');
        
        //"Comfort Blanket" by ZapSplat of zapsplat.com
        this.load.audio('credits', './assets/sounds/credits.wav');
        
    }
     
    create() {
        this.sceneChange = this.time.delayedCall(2000, () => {
            this.scene.start("titleScene");
        }, null, this);
    }
}
