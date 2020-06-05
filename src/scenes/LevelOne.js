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

        //froggie :3
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
            frames: this.anims.generateFrameNames('bucket',{
                prefix: 'spilled_bucket',
                start: 1,
                end: 9 
             }),
             frameRate: 5,
             repeat: 0
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
        
        this.coconut = this.add.sprite(3260, 130, 'beach_stuff', 'coconut').setScale(.5);
        this.coconutDrop = false;

        this.bathwater = this.add.sprite(200, 200, 'beach_stuff', 'spilled_bucket1' );
        this.add.sprite(900, 500, 'beach_stuff', 'shells1');
        this.add.sprite(700,550, 'beach_stuff', 'shells2');
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
        this.movement = true;
        this.shifted = false;
 
        mole = this.physics.add.sprite(40, 450, 'mole', 'mole_walk1').setScale(0.38);
        mole.setCollideWorldBounds(true);
        this.isDigging = false;

        cat = this.physics.add.sprite(190, 450, 'cat', 'cat_walk1').setScale(0.33);
        cat.setCollideWorldBounds(true);
        this.isStretching = false;
        
        //foreground
        this.tree1 = this.add.sprite(0,0, 'beach_stuff', 'tree1').setOrigin(0,0);
        this.sand_castle = this.add.sprite(1950,550, 'beach_stuff', 'sand_castle').setScale(0.5);

       
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
                if(frog.x >= 3545){
                    frog.body.velocity.x = 0;
                    mole.body.velocity.x = 0;
                    cat.body.velocity.x = 0; 
                }else{
                frog.setVelocityX(this.velocity)
                frog.resetFlip();

                mole.setVelocityX(this.velocity)
                mole.resetFlip();

                cat.setVelocityX(this.velocity)
                cat.resetFlip();
                }
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
                if(frog.x >= 3545){
                    frog.body.velocity.x = 0;
                    mole.body.velocity.x = 0;
                    cat.body.velocity.x = 0; 
                }else{
                    frog.setVelocityX(this.velocity)
                    frog.resetFlip();

                    mole.setVelocityX(this.velocity)
                    mole.resetFlip();

                    cat.setVelocityX(this.velocity)
                    cat.resetFlip();
                }
            }else{
                frog.body.velocity.x = 0;
                mole.body.velocity.x = 0;
                cat.body.velocity.x = 0;
            }
        
        }
        
        //play the dialogue that comes after you clear hell 
        if (tester == true && this.distorted == false && frog.x >= 340 && frog.x <= 360 && this.shifted == false){
            this.moveSprite(frog);
            this.moveSprite(cat);
            this.moveSprite(mole);
            this.shifted = true; 
            this.coconutDrop = false; 
            this.dialogBoxMove('bonked')
            this.typeText();
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
            if(cat.x >= 3230 && cat.x <= 3280 && tester == false){
                if(this.coconutDrop == false){
                    this.dialogBoxMove('shake');
                    this.typeText();
                   
                    this.time.delayedCall(1300, () => {
                        //this.typeText(); 
                        this.catStretch();
                    }, null, this); 

                    this.time.delayedCall(1900, () => {
                        //this.typeText(); 
                    }, null, this); 

                    this.time.delayedCall(2550, () => {
                    if(this.coconutDrop == false){
                        this.fuitDrop();
                        this.coconutDrop = true;
                    }
                    }, null, this);

                    this.time.delayedCall(2550, () => {
                        this.cameras.main.fade(500);
                    }, null, this);
                    
                    this.time.delayedCall(3000, () => {
                        this.scene.switch('Hell');
                    }, null, this);
                    
                }
            }else{
                this.catStretch();
            }
        }

        if(frog.x == 305){
            this.distort(frog);
            this.distort(mole);
            this.distort(cat);
            this.distorted = true;
        }

        if(frog.x >= 400){
            this.fix(frog);
            this.fix(mole);
            this.fix(cat);
            this.distorted = false;
        }

//---------------------------------------------------------- INTERACTIONS ----------------------------------------------------------------------------------------
        
        if(frog.x >= 400 && this.movement == true){
            this.bathwater.anims.play('bathwater', true);
            
        }

        if(frog.x >= 400 && this.movement == true){
            this.dialogBoxMove('beachBeginning');
            this.typeText();
            this.movement = false;
        }
        
        //dig up shells! [ in progress ]
        /*if(this.isDigging == true && mole.x >= 2565 && mole.x <= 2665 && this.fuitGrounded == true){
            this.fuit.destroy();
            this.fuitHave = true;
        }*/
    
    }
//----------------------------------------------------------MECHANICS --------------------------------------------
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
    
    fuitDrop(sprite){ 
        this.drop = this.time.addEvent({
            delay: 7,
            callback: function(){
                if(this.coconut.y <= 500){
                    this.coconut.y += 10
                }
            },
            callbackScope: this,
            loop: true,
        })
    }
    
    //replace old sprites -- this is extremely whack, but somehow it works...
    moveSprite (sprite) {
        //destroy old sprites
        this.coconut.destroy();
        this.tree1.destroy(); 
        this.sand_castle.destroy(); 
        frog.destroy();
        cat.destroy();
        mole.destroy();
        this.coconut = this.add.sprite(3260, 550, 'beach_stuff', 'broken_coconut').setScale(.5);
        
        //if we spawn them like this, then it preserves the order / foreground
        //frog.destroy();
        frog = this.physics.add.sprite(3404, sprite.y + 155, 'frog', 'frog_walk1').setScale(0.3);
        frog.setCollideWorldBounds(true);
        this.cameras.main.startFollow(frog);

        cat = this.physics.add.sprite(3235, sprite.y + 622, 'cat', 'cat_walk1').setScale(0.33);
        cat.setCollideWorldBounds(true);

        mole = this.physics.add.sprite(3100, sprite.y + 120, 'mole', 'mole_walk1').setScale(0.38);
        mole.setCollideWorldBounds(true);

        //respawn them so they can be back in the foreground
        this.tree1 = this.add.sprite(0,0, 'beach_stuff', 'tree1').setOrigin(0,0);
        this.sand_castle = this.add.sprite(1950,550, 'beach_stuff', 'sand_castle').setScale(0.5);
        

    }
    distort(sprite){
        if(this.distorted == false){
            if(sprite == frog){
                frog.destroy();
                frog = this.physics.add.sprite(sprite.x, sprite.y, 'frog', 'shitty_frog').setScale(0.5);
                frog.setCollideWorldBounds(true);
                this.cameras.main.startFollow(frog);
            }
            if(sprite == cat){
                cat.destroy();
                cat = this.physics.add.sprite(sprite.x, sprite.y, 'cat', 'shitty_stretch1').setScale(0.4);
                cat.setCollideWorldBounds(true);
                
            }
            if(sprite == mole){
                mole.destroy();
                mole = this.physics.add.sprite(sprite.x, sprite.y, 'mole', 'shitty_mole').setScale(0.5);
                mole.setCollideWorldBounds(true);
            }
        //foreground
        this.add.sprite(0,0, 'beach_stuff', 'tree1').setOrigin(0,0);
        this.add.sprite(1950,550, 'beach_stuff', 'sand_castle').setScale(0.5);
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
        //foreground
        this.add.sprite(0,0, 'beach_stuff', 'tree1').setOrigin(0,0);
        this.add.sprite(1950,550, 'beach_stuff', 'sand_castle').setScale(0.5);
        }
    }

    dialogBoxMove(text){
        this.dialogbox.visible = true;
        this.dialogConvo = 0;
        this.dialog = this.cache.json.get(text);
        this.dialogbox.destroy();
        this.dialogText.destroy();

        this.DBOX_X = frog.x - 410;			    // dialog box x-position
        this.TEXT_X = frog.x - 360;			// text w/in dialog box x-positio
        this.NEXT_X = frog.x + 545;			// next text prompt x-position
        
        
        //could be redundant code; not sure about it
        if (tester == true){
            this.DBOX_X = 2500;			    
            this.TEXT_X = 2550;		
            this.NEXT_X = 3450;
        }
        
        if(this.movement == false && frog.x <= 2995){
        this.DBOX_X = frog.x - 500;			    // dialog box x-position
        this.TEXT_X = frog.x - 450;			// text w/in dialog box x-position
        this.NEXT_X = frog.x + 450;			// next text prompt x-position
        }else if (this.movement == false &&frog.x >= 3000){
        this.DBOX_X = 2500;			    // dialog box x-position
        this.TEXT_X = 2550;			// text w/in dialog box x-position
        this.NEXT_X = 3450;		
        }
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
