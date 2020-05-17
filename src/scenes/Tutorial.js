class Tutorial extends Phaser.Scene{
    constructor(){
        super("tutorialScene");

        
        // dialog constants
        this.DBOX_X = 1250;			    // dialog box x-position
        this.DBOX_Y = 30;			    // dialog box y-position
        this.DBOX_FONT = 'gem';	// dialog box font key

        this.TEXT_X = 1300;			// text w/in dialog box x-position
        this.TEXT_Y = 75;			// text w/in dialog box y-position
        this.TEXT_SIZE = 24;		// text font size (in pixels)
        this.TEXT_MAX_WIDTH = 715;	// max width of text within box

        this.NEXT_TEXT = '[SPACE]';	// text to display for next prompt
        this.NEXT_X = 775;			// next text prompt x-position
        this.NEXT_Y = 574;			// next text prompt y-position

        this.LETTER_TIMER = 10;		// # ms each letter takes to "type" onscreen

        // dialog variables
        this.dialogConvo = 0;			// current "conversation"
        this.dialogLine = 0;			// current line of conversation
        this.dialogSpeaker = null;		// current speaker
        this.dialogLastSpeaker = null;	// last speaker
        this.dialogTyping = false;		// flag to lock player input while text is "typing"
        this.dialogText = null;			// the actual dialog text
        this.nextText = null;			// player prompt text to continue typing

     
    }

    preload(){
        //main characters
        this.load.atlas('froggie', './assets/chars/frog/frog_walking.png', './assets/chars/frog/frog_walking.json');
        this.load.atlas('mole', './assets/chars/mole/mole.png', './assets/chars/mole/mole.json');
        this.load.atlas('cat', './assets/chars/cat/stretchy_cat.png', './assets/chars/cat/cat_walking.json');
        
       // this.load.atlas('background', './assets/tutorial_background.png', './assets/tutorial_background.json');
        this.load.atlas('turtle', './assets/bgs/turtle.png', './assets/bgs/turtle.json');
        this.load.atlas('stuff', './assets/other/interaction.png', './assets/other/interaction.json');
        this.load.atlas('grass', './assets/bgs/grass.png', './assets/bgs/grass.json');
        this.load.atlas('stars', './assets/bgs/stars.png', './assets/bgs/stars.json');
        this.load.image('land','./assets/bgs/land.png');
        this.load.image('sky','./assets/bgs/sky.png');
        //this.load.image('distortion','./assets/distortion.png');

        this.load.json('dialogue', './assets/other/dialogue.json');
        this.load.image('dialoguebox', './assets/other/textbox.png');
        this.load.json('sign', './assets/other/sign.json');
        this.load.bitmapFont('gem', './assets/font/gem.png', './assets/font/gem.xml');
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

        this.sign = this.physics.add.sprite(1750,400,'stuff', 'sign').setScale(0.4).setOrigin(0,0); 
        this.sign.setCollideWorldBounds(true);
        this.keyHint = this.add.sprite(this.sign.x + 20, 310,'stuff', 'keyboard_button').setScale(0.2).setOrigin(0,0);
        this.nearSign = false;

        this.dialog = this.cache.json.get('sign');
        this.dialogbox = this.add.sprite(this.DBOX_X, this.DBOX_Y, 'dialoguebox').setOrigin(0);
        this.dialogText = this.add.bitmapText(this.TEXT_X, this.TEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE);
        this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE);
        this.dialogbox.visible = false;

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
            key: 'frogwalk',
            frames: this.anims.generateFrameNames('froggie',{
                prefix: 'frog_',
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
                prefix: 'walk_',
                start: 1,
                end: 3
             }),
             frameRate: 5,
             repeat: -1
        });

        //l o n g  cat
        this.anims.create({
            key: 'catwalk',
            frames: this.anims.generateFrameNames('cat',{
                prefix: 'walk_',
                start: 1,
                end: 3
             }),
             frameRate: 5,
             repeat: -1
        });
        
        this.physics.world.gravity.y = 1000;
        this.velocity = 300;
        this.frog = this.physics.add.sprite(200, 500, 'froggie', 'frog_1').setScale(0.3);
        this.frog.setCollideWorldBounds(true);
        this.frog.setDepth(1);

        this.mole = this.physics.add.sprite(40, 500, 'mole', 'walk_1').setScale(0.38);
        this.mole.setCollideWorldBounds(true);

        this.isDigging = false;

        this.cat = this.physics.add.sprite(340, 500, 'cat', 'walk_1').setScale(0.33);
        this.cat.setCollideWorldBounds(true);

        //camera follow froggie :)
        this.cameras.main.setBounds(0, 0, 2400, 600);
        this.cameras.main.setZoom(1);
        this.cameras.main.startFollow(this.frog);
        
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update(){

        if(cursors.left.isDown && this.isDigging == false){
            this.frog.setVelocityX(-this.velocity)
            this.frog.setFlip(true, false);

            this.mole.setVelocityX(-this.velocity)
            this.mole.setFlip(true, false);

            this.cat.setVelocityX(-this.velocity)
            this.cat.setFlip(true, false);

            this.frog.anims.play('frogwalk', true);
            this.mole.anims.play('molewalk', true);
            this.cat.anims.play('catwalk', true);
        }else if(cursors.right.isDown && this.isDigging == false){
            this.frog.setVelocityX(this.velocity)
            this.frog.resetFlip();

            this.mole.setVelocityX(this.velocity)
            this.mole.resetFlip();

            this.cat.setVelocityX(this.velocity)
            this.cat.resetFlip();

            this.frog.anims.play('frogwalk', true);
            this.mole.anims.play('molewalk', true);
            this.cat.anims.play('catwalk', true);
        }else{
            this.frog.body.velocity.x = 0;
            this.mole.body.velocity.x = 0;
            this.cat.body.velocity.x = 0;

            this.frog.anims.play('frogwalk', false);
            this.mole.anims.play('molewalk', false);
            this.cat.anims.play('catwalk', false);
        }
   
        if(this.frog.x >= this.sign.x && this.frog.x <= 1850){
           this.keyHint.alpha = 1;
           this.nearSign = true;
        }else{
            this.keyHint.alpha = 0;
            this.nearSign = false;
        }
    
        if(Phaser.Input.Keyboard.JustDown(keyA) && !this.dialogTyping && this.nearSign == true) {
            // trigger dialog
            this.dialogbox.visible = true;
            this.typeText();
            this.learnDig = true;
        }

        if(Phaser.Input.Keyboard.JustDown(keyD) && this.learnDig == true){
            this.moleDive();
        }

    }

    moleDive(){
        this.mole.y -=50
        this.isDigging = true;
        this.valueChange = this.time.delayedCall(1000, () => { //change value to however long dig animation is
            this.moleDig();
        }, null, this);
    
    }

    moleDig(){
        if(this.isDigging == true){
            this.isDigging = false;
        }
    }
    typeText() {
        // lock input while typing
        this.dialogTyping = true;

        // clear text
        this.dialogText.text = '';
        this.nextText.text = '';

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
            console.log('End of Conversations');

            // make text box invisible
            this.dialogbox.visible = false;

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

       
          

