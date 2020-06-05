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

        //hell bg
        this.add.sprite(0, 0, 'hell', 'hell_background').setOrigin(0, 0);

        //add cat sprite
        this.physics.world.gravity.y = 1000;
        this.velocity = 300;

        cat = this.physics.add.sprite(190, 450, 'cat', 'shitty_cat').setScale(0.33);
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
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)

    }

    update () {
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

        /*if (cat.x >= 3200 && cat.x <= 3600){
            this.scene.switch('First');
        }
        */
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
}