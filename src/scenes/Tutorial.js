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
        this.load.image('shittyFrog', './assets/chars/frog/shitty_frog.png');
        this.load.image('shittyCat', './assets/chars/cat/shitty_cat_unstretched.png')
        this.load.image('shittyMole', './assets/chars/mole/shitty_mole.png')

       // this.load.atlas('background', './assets/tutorial_background.png', './assets/tutorial_background.json');
        this.load.atlas('turtle', './assets/bgs/turtle.png', './assets/bgs/turtle.json');
        this.load.atlas('stuff', './assets/other/interaction.png', './assets/other/interaction.json');
        this.load.atlas('grass', './assets/bgs/grass.png', './assets/bgs/grass.json');
        this.load.atlas('stars', './assets/bgs/stars.png', './assets/bgs/stars.json');
        this.load.image('land','./assets/bgs/land.png');
        this.load.image('sky','./assets/bgs/sky.png');
        this.load.image('snek', './assets/npcs/snek.png');
        //this.load.image('distortion','./assets/distortion.png');

        this.load.json('dialogue', './assets/other/dialogue.json');
        this.load.image('dialoguebox', './assets/other/textbox.png');
        this.load.json('sign', './assets/other/sign.json');
        this.load.json('snekBYE', './assets/other/snek.json');
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
        this.door = this.add.sprite(2120,270,'stuff', 'door').setScale(0.8).setOrigin(0,0);             //scale to 80% of size
        this.dirt = this.add.sprite(1500,480,'stuff', 'dirtmound').setScale(2).setOrigin(0,0);          //scale to 2x the original size
        this.fuit = this.add.sprite(1575,490,'stuff', 'fuit').setScale(0.4).setOrigin(0,0);             //scale to of size
        
        this.snek = this.physics.add.sprite(1950,430,'snek').setScale(0.2).setOrigin(0,0); 
        this.snek.setCollideWorldBounds(true);
        this.snek.setImmovable(true);
        this.isBlocking = false;

        this.sign = this.physics.add.sprite(1750,400,'stuff', 'sign').setScale(0.4).setOrigin(0,0); 
        this.sign.setCollideWorldBounds(true);
        this.keyHint = this.add.sprite(this.sign.x + 20, 310,'stuff', 'keyboard_button').setScale(0.2).setOrigin(0,0);
        this.nearSign = false;

        this.dialog = this.cache.json.get('sign');
        this.dialogbox = this.add.sprite(this.DBOX_X, this.DBOX_Y, 'dialoguebox').setOrigin(0);
        this.dialogText = this.add.bitmapText(this.TEXT_X, this.TEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE);
        this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE);
        this.dialogbox.visible = false;
        this.isTalking = false;

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
        frog = this.physics.add.sprite(340, 500, 'froggie', 'frog_1').setScale(0.3);
        frog.setCollideWorldBounds(true);
        this.distorted = false;
 

        mole = this.physics.add.sprite(40, 500, 'mole', 'walk_1').setScale(0.38);
        mole.setCollideWorldBounds(true);
        this.isDigging = false;

        cat = this.physics.add.sprite(190, 500, 'cat', 'walk_1').setScale(0.33);
        cat.setCollideWorldBounds(true);
       

        //camera follow froggie :)
        this.cameras.main.setBounds(0, 0, 2400, 600);
        this.cameras.main.setZoom(1);
        this.cameras.main.startFollow(frog);
        
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    }

    update(){
      
        if(this.distorted == false){
        if(cursors.left.isDown && this.isDigging == false && this.isTalking == false){
            frog.setVelocityX(-this.velocity)
            frog.setFlip(true, false);

            mole.setVelocityX(-this.velocity)
            mole.setFlip(true, false);

            cat.setVelocityX(-this.velocity)
            cat.setFlip(true, false);

            frog.anims.play('frogwalk', true);
            mole.anims.play('molewalk', true);
            cat.anims.play('catwalk', true);
        }else if(cursors.right.isDown && this.isDigging == false && this.isTalking == false){
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

            frog.anims.play('frogwalk', false);
            mole.anims.play('molewalk', false);
            cat.anims.play('catwalk', false);
        }
        }else{
            if(cursors.left.isDown && this.isDigging == false && this.isTalking == false){
            frog.setVelocityX(-this.velocity)
            frog.setFlip(true, false);

            mole.setVelocityX(-this.velocity)
            mole.setFlip(true, false);

            cat.setVelocityX(-this.velocity)
            cat.setFlip(true, false);
        }else if(cursors.right.isDown && this.isDigging == false && this.isTalking == false){
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
   
        if(frog.x >= this.sign.x && frog.x <= 1850){
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

        if(this.isDigging == true && mole.x >= 1575 && mole.x <= 1675 ){
            this.fuit.destroy();
            this.fuitHave = true;
          
        }

        this.physics.world.collide(frog, this.snek, this.snekBlock, null, this);
        if(this.isBlocking == true){
            mole.body.velocity.x = 0;
            cat.body.velocity.x = 0;
        }

        if(cursors.left.isDown && this.isBlocking == true){
        cat.setVelocityX(-this.velocity)
        mole.setVelocityX(-this.velocity)
        this.isBlocking = false;
        }
       
        if(frog.x >= 2175 && frog.x <= 2350){
            this.scene.start("First");
        }

        if(frog.x >= 1400){
            this.distort(frog);
            this.distort(mole);
            this.distort(cat);
            this.distorted = true;
        }

        if(frog.x <= 1350){
            this.fix(frog);
            this.fix(mole);
            this.fix(cat);
            this.distorted = false;
        }
        
    }

    moleDive(){
        mole.y -=50
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

    snekBlock(){
        if(this.isBlocking == false){
            this.isBlocking = true;
        }
        if(this.fuitHave == true){
            this.dialogConvo = 0;
            this.dialog = this.cache.json.get('snekBYE');
            this.dialogbox.visible = true;
            this.typeText();
            this.snekText = this.time.delayedCall(3000, () => { //change value to however long dig animation is
                this.typeText();
            }, null, this);
            this.snekGone = this.time.delayedCall(3000, () => { //change value to however long dig animation is
                this.snek.destroy()
            }, null, this);
            
            this.isBlocking = false;
            
        }
    }

    distort(sprite){
        if(this.distorted == false){
            if(sprite == frog){
                frog.destroy();
                frog = this.physics.add.sprite(sprite.x + 110, sprite.y + 155, 'shittyFrog').setScale(0.5);
                frog.setCollideWorldBounds(true);
                this.cameras.main.startFollow(frog);
            }
            if(sprite == cat){
                cat.destroy();
                cat = this.physics.add.sprite(sprite.x + 250, sprite.y + 250, 'shittyCat').setScale(0.3);
                cat.setCollideWorldBounds(true);
                
            }
            if(sprite == mole){
                mole.destroy();
                mole = this.physics.add.sprite(sprite.x+ 100, sprite.y + 120, 'shittyMole').setScale(0.5);
                mole.setCollideWorldBounds(true);
            
            }
        }
    }

    fix(sprite){
        if(this.distorted == true){
            if(sprite == frog){
                frog.destroy();
                frog = this.physics.add.sprite(sprite.x + 110, sprite.y + 270, 'froggie', 'frog_1').setScale(0.3);
                frog.setCollideWorldBounds(true);
                this.cameras.main.startFollow(frog);
            }
            if(sprite == cat){
                cat.destroy();
                cat = this.physics.add.sprite(sprite.x + 140, sprite.y + 225, 'cat', 'walk_1').setScale(0.33);
                cat.setCollideWorldBounds(true);
                
            }
            if(sprite == mole){
                mole.destroy();
                mole = this.physics.add.sprite(sprite.x+ 95, sprite.y + 170, 'mole', 'walk_1').setScale(0.38);
                mole.setCollideWorldBounds(true);
            
            }
        }

    }

    typeText() {
        // lock input while typing
        this.dialogTyping = true;
        this.isTalking = true;

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

       
          

