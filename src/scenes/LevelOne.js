class LevelOne extends Phaser.Scene{
    constructor(){
        super("First");

        // dialog constants
        this.DBOX_Y = 25;			    // dialog box y-position
        this.DBOX_FONT = 'gem';	// dialog box font key

        this.TEXT_Y = 75;			// text w/in dialog box y-position
        this.TEXT_SIZE = 32;		// text font size (in pixels)
        this.TEXT_MAX_WIDTH = 900;	// max width of text within box

        this.NEXT_TEXT = '[A]';	// text to display for next prompt
        this.NEXT_Y = 250;			// next text prompt y-position

        this.LETTER_TIMER = 1;		// # ms each letter takes to "type" onscreen

        // dialog variables
        this.dialogConvo = 0;			// current "conversation"
        this.dialogLine = 0;			// current line of conversation
        this.dialogSpeaker = null;		// current speaker
        this.dialogLastSpeaker = null;	// last speaker
        this.dialogTyping = false;		// flag to lock player input while text is "typing"
        this.dialogText = null;			// the actual dialog text
        this.nextText = null;			// player prompt text to continue typing

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

        //dialogue assets
        this.dialogbox = this.add.sprite(this.DBOX_X, this.DBOX_Y, 'dialoguebox').setOrigin(0);
        this.dialogText = this.add.bitmapText(this.TEXT_X, this.TEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE);
        this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE);
        this.dialogbox.visible = false;
        this.isTalking = false;

    //-----------------------------------------------------------------------------------animations -------------------------------------------------------------------
        this.anims.create({
            key: 'waves',
            frames:this.anims.generateFrameNames('ocean_waves',{
                prefix: 'beach_',
                start: 1,
                end: 19
            }),
            frameRate: 8,
            repeat: -1
        });
    
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

        this.anims.create({
            key: 'frogwalk',
            frames: this.anims.generateFrameNames('frog',{
                prefix: 'frog_walk',
                start: 1,
                end: 2
             }),
             frameRate: 5,
             repeat: -1
        });

        //mole fren
        this.anims.create({
            key: 'molewalk',
            frames: this.anims.generateFrameNames('mole',{
                prefix: 'mole_walk',
                start: 1,
                end: 2
             }),
             frameRate: 5,
             repeat: -1
        });

        this.anims.create({
            key: 'moledig',
            frames: this.anims.generateFrameNames('mole',{
                prefix: 'dig_',
                start: 1,
                end: 4
             }),
             frameRate: 8,
             repeat: 2
        });

        //l o n g  cat
        this.anims.create({
            key: 'catwalk',
            frames: this.anims.generateFrameNames('cat',{
                prefix: 'cat_walk',
                start: 1,
                end: 9
             }),
             frameRate: 8,
             repeat: 0
        });
        
        this.anims.create({
            key: 'catStretch',
            frames: this.anims.generateFrameNames('cat',{
                prefix: 'stretch_',
                start: 0,
                end: 24
             }),
             frameRate: 12,
             repeat: 0
        });

        this.anims.create({
            key: 'shittystretch',
            frames: this.anims.generateFrameNames('cat',{
                prefix: 'shitty_stretch',
                start: 1,
                end: 9 
             }),
             frameRate: 8,
             repeat: 0
        });
        
        // bucket spilling 
        this.anims.create({
            key: 'bathwater',
            frames: this.anims.generateFrameNames('beach_stuff',{
                prefix: 'spilled_bucket',
                start: 1,
                end: 3 
             }),
             frameRate: 5,
             repeat: 1
        });

        // character poof 
        this.anims.create({
            key: 'poof',
            frames: this.anims.generateFrameNames('beach_stuff',{
                prefix: 'poof_',
                start: 1,
                end: 3 
             }),
             frameRate: 5,
             repeat: 0
        });

        // indicator 
        this.anims.create({
            key: 'indicator',
            frames: this.anims.generateFrameNames('beach_stuff',{
                prefix: 'indicator_',
                start: 1,
                end: 2 
             }),
             frameRate: 5,
             repeat: -1
        });

        //character poof
        this.anims.create({
            key: 'poof',
            frames: this.anims.generateFrameNames('beach_stuff',{
                prefix: 'poof_',
                start: 1,
                end: 3 
             }),
             frameRate: 5,
             repeat: -1
        });

        // ------------------------------------------------------------------- background setup ---------------------------------------------------------------------------------------

        //background base
        //this.add.image(0,0, 'base').setOrigin(0,0);
        this.add.sprite(0, 0, 'ocean_waves', 'beach_1').setOrigin(0, 0).play('waves');

        //midground
        this.add.sprite(3300,280, 'beach_stuff', 'palm_tree').setScale(0.7);
        this.add.sprite(2800,325, 'beach_stuff', 'palm_tree').setScale(0.5);
        this.add.sprite(0,0, 'beach_stuff', 'tree2').setOrigin(0,0);
        this.add.sprite(1300,490,'beach_stuff', 'crab1').setScale(0.3).play('crab');
        this.add.sprite(1500,500,'crub').setScale(0.5);
        this.add.sprite(3260, 130, 'beach_stuff', 'coconut').setScale(.5);
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
       
        if(this.distorted == false){
            if(cursors.left.isDown && this.isDigging == false && this.isStretching == false && this.isTalking == false){
                if(mole.x <= 52){
                    frog.body.velocity.x = 0;
                    mole.body.velocity.x = 0;
                    cat.body.velocity.x = 0;
                }else{
                    frog.setVelocityX(-this.velocity)
                    frog.setFlip(true, false);

                    mole.setVelocityX(-this.velocity)
                    mole.setFlip(true, false);

                    cat.setVelocityX(-this.velocity)
                    cat.setFlip(true, false);
                }
                frog.anims.play('frogwalk', true);
                mole.anims.play('molewalk', true);
                cat.anims.play('catwalk', true);
            }else if(cursors.right.isDown && this.isDigging == false && this.isStretching == false && this.isTalking == false){
                frog.setVelocityX(this.velocity)
                frog.resetFlip();

                mole.setVelocityX(this.velocity)
                mole.resetFlip();

                cat.setVelocityX(this.velocity)
                cat.resetFlip();

                frog.anims.play('frogwalk', true);
                mole.anims.play('molewalk', true);
                cat.anims.play('catwalk', true);
            }else{
                frog.body.velocity.x = 0;
                mole.body.velocity.x = 0;
                cat.body.velocity.x = 0; 
                
                if(this.isStretching == false && this.isDigging == false){
                    frog.anims.play('frogwalk', false);
                    mole.anims.play('molewalk', false);
                    cat.anims.play('catwalk', false);
                }
            }
        }else{
            if(cursors.left.isDown && this.isDigging == false && this.isStretching == false && this.isTalking == false ){
                frog.setVelocityX(-this.velocity)
                frog.setFlip(true, false);

                mole.setVelocityX(-this.velocity)
                mole.setFlip(true, false);

                cat.setVelocityX(-this.velocity)
                cat.setFlip(true, false);
            }else if(cursors.right.isDown && this.isDigging == false && this.isStretching == false && this.isTalking == false){
                frog.setVelocityX(this.velocity)
                frog.resetFlip();

                mole.setVelocityX(this.velocity)
                mole.resetFlip();

                cat.setVelocityX(this.velocity)
                cat.resetFlip();
            
            }else{
                frog.body.velocity.x = 0;
                mole.body.velocity.x = 0;
                cat.body.velocity.x = 0;
            }
        }

        if(Phaser.Input.Keyboard.JustDown(keyA) && !this.dialogTyping) {
            //insert text stuff here

            if(this.isTalking == true && !this.dialogTyping){ 
                this.typeText();
            }
        }

        if(Phaser.Input.Keyboard.JustDown(keyD) && !this.isTalking && this.isStretching == false){
            this.moleDive();
        }

        if(Phaser.Input.Keyboard.JustDown(keyS) && !this.isTalking && this.isDigging == false){
            this.catStretch();
        }
    }

    moleDive(){
        if(this.isDigging == false){    
            this.isDigging = true;
            if(this.distorted == false){
                mole.anims.play('moledig', true);
            }else if(this.distorted == true){
                mole.y -= 50;
            }
            this.valueChange = this.time.delayedCall(1000, () => { //change value to however long dig animation is
                if(this.isDigging == true){
                    this.isDigging = false;
                }
            }, null, this);
        }
    }

    
    catStretch(){
        if(this.isStretching == false){
            this.isStretching = true;
            if(this.distorted == false){
                cat.anims.play('catStretch', true);
                this.valueChange = this.time.delayedCall(2000, () => { //change value to however long stretch animation is
                    if(this.isStretching == true){
                        this.isStretching = false;
                    }
                }, null, this);
            }else if (this.distorted == true){
                cat.anims.play('shittystretch', true);
                this.valueChange = this.time.delayedCall(1000, () => { //change value to however long stretch animation is
                    if(this.isStretching == true){
                        this.isStretching = false;
                    }
                }, null, this);
            }
        }    
    }

    distort(sprite){
        if(this.distorted == false){
            if(sprite == frog){
                frog.destroy();
                frog = this.physics.add.sprite(sprite.x + 110, sprite.y + 155, 'frog', 'shitty_frog').setScale(0.5);
                frog.setCollideWorldBounds(true);
                this.cameras.main.startFollow(frog);
            }
            if(sprite == cat){
                cat.destroy();
                cat = this.physics.add.sprite(sprite.x + 190, sprite.y + 622, 'cat', 'shitty_stretch1').setScale(0.4);
                cat.setCollideWorldBounds(true);
                
            }
            if(sprite == mole){
                mole.destroy();
                mole = this.physics.add.sprite(sprite.x + 100, sprite.y + 120, 'mole', 'shitty_mole').setScale(0.5);
                mole.setCollideWorldBounds(true);
            
            }
        }
    }

    fix(sprite){
        if(this.distorted == true){
            if(sprite == frog){
                frog.destroy();
                frog = this.physics.add.sprite(sprite.x + 110, sprite.y + 270, 'frog', 'frog_walk1').setScale(0.3);
                frog.setCollideWorldBounds(true);
                this.cameras.main.startFollow(frog);
            }
            if(sprite == cat){
                cat.destroy();
                cat = this.physics.add.sprite(sprite.x + 140, sprite.y + 716, 'cat', 'cat_walk1').setScale(0.33);
                cat.setCollideWorldBounds(true);
                
            }
            if(sprite == mole){
                mole.destroy();
                mole = this.physics.add.sprite(sprite.x+ 95, sprite.y + 170, 'mole', 'mole_walk1').setScale(0.38);
                mole.setCollideWorldBounds(true);
    
            }
        }
    }

    dialogBoxMove(text){
        this.dialogbox.visible = true;
        this.dialogConvo = 0;
        this.dialog = this.cache.json.get(text);
        this.dialogbox.destroy();
        this.dialogText.destroy();
        this.DBOX_X = frog.x - 500;			    // dialog box x-position
        
        this.TEXT_X = frog.x - 450;			// text w/in dialog box x-position

        this.NEXT_X = frog.x + 450;			// next text prompt x-position
        this.dialogbox = this.add.sprite(this.DBOX_X, this.DBOX_Y, 'dialoguebox').setOrigin(0);
        this.dialogText = this.add.bitmapText(this.TEXT_X, this.TEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE);
    }

    typeText() { //by sir nathan altice
        // lock input while typing
        this.dialogTyping = true;
        this.isTalking = true;

        // clear text
        this.dialogText.text = '';
        this.nextText.text = '';
        this.dialogText.setDepth(1);

        // make sure there are lines left to read in this convo, otherwise jump to next convo
        if(this.dialogLine > this.dialog[this.dialogConvo].length - 1) {
            this.dialogLine = 0;
            // I increment conversations here, but you could create logic to exit the dialog here
            this.dialogConvo++;
        }
        
        // make sure we haven't run out of conversations...
        if(this.dialogConvo >= this.dialog.length) {
            // here I'm simply "exiting" the last speaker and removing the dialog box,
            // but you could build other logic to change game states here
            this.dialogTyping = false;
            console.log('End of Conversations');

            // make text box invisible
            this.dialogbox.visible = false;
            this.isTalking = false;

        } else {
            // if not, set current speaker
            this.dialogSpeaker = this.dialog[this.dialogConvo][this.dialogLine]['speaker'];

            // build dialog (concatenate speaker + line of text)
            this.dialogLines = this.dialog[this.dialogConvo][this.dialogLine]['speaker'].toUpperCase() + ': ' + this.dialog[this.dialogConvo][this.dialogLine]['dialog'];

            // create a timer to iterate through each letter in the dialog text
            let currentChar = 0; 
            this.textTimer = this.time.addEvent({
                delay: this.LETTER_TIMER,
                repeat: this.dialogLines.length - 1,
                callback: () => { 
                    // concatenate next letter from dialogLines
                    this.dialogText.text += this.dialogLines[currentChar];
                    // advance character position
                    currentChar++;
                    // check if timer has exhausted its repeats 
                    // (necessary since Phaser 3 no longer seems to have an onComplete event)
                    if(this.textTimer.getRepeatCount() == 0) {
                        // show prompt for more text
                        this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, this.NEXT_TEXT, this.TEXT_SIZE).setOrigin(1);
                        // un-lock input
                        this.dialogTyping = false;
                        // destroy timer
                        this.textTimer.destroy();
                    }
                },
                callbackScope: this // keep Scene context
            });
            
            // set bounds on dialog
            this.dialogText.maxWidth = this.TEXT_MAX_WIDTH;

            // increment dialog line
            this.dialogLine++;

            // set past speaker
            this.dialogLastSpeaker = this.dialogSpeaker;
        }
    }
}
