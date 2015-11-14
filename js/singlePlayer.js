var singlePlayer = {
	player: null,
	score: null,
	timer: null,
	gameOver: null,
	enemies: null,
	texts: {
	    score: null,
	    menu: null,
	    timer: null
	},
	button: {
	    restart: null,
	    pause: null
	},
	preload: function(){

		game.load.baseURL = 'assets/';
	    game.load.crossOrigin = 'anonymous';

	    game.load.image('ship', 'sprites/thrust_ship2.png');

	    game.load.image('ufo', 'sprites/ufo.png');
	    game.load.image('wabbit', 'sprites/wabbit.png');
	    game.load.image('yellow_ball', 'sprites/yellow_ball.png');
	    
	    game.load.image('tomato', 'sprites/tomato.png');
	    game.load.image('phaser-ship', 'sprites/phaser-ship.png');
	    game.load.image('phaser-dude', 'sprites/phaser-dude.png');
	    game.load.image('starfield','misc/starfield.png');

	    game.load.image('bullet', 'misc/bullet0.png');
	    game.load.image('particle_small', 'misc/particle_small.png');

	    game.load.audio('alien_death1', 'audio/SoundEffects/alien_death1.wav');
	    game.load.audio('blaster', 'audio/SoundEffects/blaster.mp3');

	},
	create: function(){

		this.score = 0;
		this.gameOver = false;
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
	    game.add.tileSprite(0, 0, game.world.width, game.world.height, 'starfield');

	    this.enemies = new enemiesGroup(
	    	['ufo', 'wabbit' , 'yellow_ball', 'tomato', 'phaser-ship', 'phaser-dude'],
	    	'particle_small',
	    	'alien_death1',
	    	game.input.keyboard.addKey(Phaser.Keyboard.F1),
	    	200,
	    	0,
	    	700
	    );

	    this.button.restart = game.input.keyboard.addKey(Phaser.KeyCode.R);
	    this.button.pause = game.input.keyboard.addKey(Phaser.KeyCode.P);

	    this.player = new player ({
	    	image: 'ship',
	    	bulletImage: 'bullet',
	    	fireSound: 'blaster',
	    	cursors: game.input.keyboard.createCursorKeys(),
	    	fireButton: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
	    });

	    this.texts.score = game.add.bitmapText(10, 10, 'carrier_command','Score: ' + this.score, 10);
	    this.texts.menu = game.add.bitmapText(game.world.width - 10, 10, 'carrier_command','Menu', 10);
	    this.texts.menu.anchor.x = 1;
	    this.texts.menu.inputEnabled = true;
		this.texts.menu.events.onInputUp.add(function(){
			game.state.start('Menu');
		}, this);
	    this.texts.timer = game.add.bitmapText(game.world.centerX, 10, 'carrier_command', '00:00', 10);
	    this.texts.timer.anchor.set(0.5);

	    this.timer = new timer();
	    game.time.events.loop(Phaser.Timer.SECOND, this.timer.updateTime, this);

	    game.input.onDown.add(function(event){
	        if(this.gameOver){
	        	game.paused = false;
	            game.state.restart();
	        }
	        else
	            game.paused = false;
	    }, this);

	},
	render: function(){
		this.texts.timer.setText(this.timer.getFormattedTime());
	},
	update: function(){

		if (this.button.restart.isDown)
	        game.state.restart();

	    if (this.button.pause.isDown)
	        game.paused = true;

	    this.player.update();

	    game.physics.arcade.collide(this.player.bullets, this.enemies.group, this.killEnemy, null, this);
	    game.physics.arcade.collide(this.enemies.bullets, this.player.ship, this.onGameOver, null, this);

	    this.enemies.update();

	},
	killEnemy: function(bullet, enemy) {
	    bullet.kill();
	    this.enemies.kill(enemy);

	    this.score += 55;
	    this.texts.score.setText("Score: " + this.score);
	},
	onGameOver: function(bullet, player) {

        if(!centerText){
            centerText = game.add.bitmapText(game.world.centerX, game.world.centerY, 'carrier_command','----- Game Over -----\n\nScore: ' + this.score + '\n\n' + 'Time: ' + this.timer.getFormattedTime() + '\n\n\nClick to restart', 15);
            centerText.anchor.set(0.5);
        }

        game.paused = true;
        this.gameOver = true;

	}
};