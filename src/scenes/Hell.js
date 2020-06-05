class Hell extends Phaser.Scene{
    constructor(){
        super("Hell");

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

        //booleans to prevent dialogue from repeating
        this.quip1 = false; 
        this.quip2 = false; 
        this.quip3 = false; 

        //hell bg
        this.add.sprite(0, 0, 'hell', 'hell_background').setOrigin(0, 0);

        //add cat sprite
        this.physics.world.gravity.y = 1000;
        this.velocity = 1200;

        cat = this.physics.add.sprite(190, 450, 'cat', 'shitty_stretch1').setScale(0.33);
        cat.setCollideWorldBounds(true);
        this.isStretching = false;
        this.distorted = false;
        this.start = true;
        this.firstDistort = true;
        this.movement = true;

        this.cameras.main.setBounds(0, 0, 3600, 600);
        this.cameras.main.setZoom(1);
        this.cameras.main.startFollow(cat);

        //hell foreground
        this.add.sprite(0, 0, 'hell', 'hell_foreground').setOrigin(0, 0);

        //set up keys
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    }

    update () {
    //------------------------------------------------------------------ MOVEMENT ---------------------------------------------------------------------------------------
        if(this.distorted == false){
            if(cursors.left.isDown && this.isStretching == false && this.isTalking == false){
                if(cat.x <= 52){
                    cat.body.velocity.x = 0;
                }else{
                    cat.setVelocityX(-this.velocity)
                    cat.setFlip(true, false);
                }
                cat.anims.play('catwalk', true);
            }else if(cursors.right.isDown && this.isStretching == false && this.isTalking == false){
                if(cat.x >= 3545){
                    cat.body.velocity.x = 0; 
                }else{

                cat.setVelocityX(this.velocity)
                cat.resetFlip();
                }
                cat.anims.play('catwalk', true);
            }else{
                cat.body.velocity.x = 0; 
                
                if(this.isStretching == false){
                    cat.anims.play('catwalk', false);
                }
            }
        }else{
            if(cursors.left.isDown && this.isStretching == false && this.isTalking == false ){
                cat.setVelocityX(-this.velocity)
                cat.setFlip(true, false);
            }else if(cursors.right.isDown && this.isStretching == false && this.isTalking == false){
                if(cat.x >= 3545){
                    cat.body.velocity.x = 0; 
                }else{
                    cat.setVelocityX(this.velocity)
                    cat.resetFlip();
                }
            }else{
                cat.body.velocity.x = 0;
            }
        }

        
        if(Phaser.Input.Keyboard.JustDown(keyA) && !this.dialogTyping) {
            //insert text stuff here
            if(this.isTalking == true && !this.dialogTyping){ 
                this.typeText();
            }
        }

        //------------------------------------------------------------------ DIALOGUE ------------------------------------------------------------------------------------------

        if(cat.x >= 65 && cat.x <= 550 && this.quip1 == false){
            this.dialogBoxMove('welcometohell');
            this.typeText();
            this.quip1 = true;
        }

        if(cat.x >= 840 && cat.x <= 1195  && this.quip2 == false && this.quip1 == true){
            this.dialogBoxMove('hellcontinues');
            this.typeText();
            this.quip2 = true;
        }

        if(cat.x >= 2105 && cat.x <= 2695 && this.quip3 == false && this.quip1 == true && this.quip2 == true){
            this.dialogBoxMove('timetogetout');
            this.typeText();
            this.quip3 = true;
        }
        
        if (cat.x >= 3500 && cat.x <= 3600){
            tester = true;
            this.scene.wake('First');
            this.scene.moveAbove('Hell','First');
            this.cameras.main.fade(500);
            this.scene.switch('First');
        }
    }

    //------------------------------------------------------------------ MECHANICS ------------------------------------------------------------------------------------------
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
    dialogBoxMove(text){
        this.dialogbox.visible = true;
        this.dialogConvo = 0;
        this.dialog = this.cache.json.get(text);
        this.dialogbox.destroy();
        this.dialogText.destroy();

        this.DBOX_X = cat.x - 500;			    // dialog box x-position
        this.TEXT_X = cat.x - 447;			// text w/in dialog box x-positio
        this.NEXT_X = cat.x + 450;			// next text prompt x-position

        if(this.quip1 == false && cat.x <= 550){
        this.DBOX_X = cat.x - 100;			    // dialog box x-position
        this.TEXT_X = cat.x - 55;			// text w/in dialog box x-position
        this.NEXT_X = cat.x + 830;			// next text prompt x-position
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
