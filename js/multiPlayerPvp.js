var multiPlayerPvp = {
	player1: null,
	player2: null,
	score1: 0,
	score2: 0,
	timer: null,
	gameOver: null,
	lives: {
		player1: null,
		player2: null
	},
	audio: {
		player_death: null
	},
	texts: {
	    score: 'P1 0, P2 0',
	    menu: null,
	    timer: null
	},
	button: {
	    restart: null,
	    pause: null
	},
	player2_cursor: {
	    left: null,
	    right: null
	},
	preload: function(){

		game.load.baseURL = 'http://examples.phaser.io/assets/';
	    game.load.crossOrigin = 'anonymous';

	    game.load.image('ship', 'sprites/thrust_ship2.png');
		game.load.image('ufo', 'sprites/ufo.png');
	    
	    game.load.image('starfield','misc/starfield.png');

	    game.load.image('bullet1', 'misc/bullet0.png');
	    game.load.image('bullet2', 'misc/particle_small.png');

	    
	    game.load.audio('player_death', 'audio/SoundEffects/player_death.wav');
	    game.load.audio('bulletCollision', 'audio/SoundEffects/lazer.wav');
	    game.load.audio('blaster', 'audio/SoundEffects/blaster.mp3');

	},
	create: function(){

		this.lives.player1 = 3;
		this.lives.player2 = 3;

		this.gameOver = false;
		this.player2_cursor.left = game.input.keyboard.addKey(Phaser.KeyCode.A);
		this.player2_cursor.right = game.input.keyboard.addKey(Phaser.KeyCode.D);

		game.physics.startSystem(Phaser.Physics.ARCADE);
	    game.add.tileSprite(0, 0, game.world.width, game.world.height, 'starfield');

	    this.button.restart = game.input.keyboard.addKey(Phaser.KeyCode.R);
	    this.button.pause = game.input.keyboard.addKey(Phaser.KeyCode.P);

	    this.audio.player_death = game.add.audio('player_death');
	    this.audio.bulletCollision = game.add.audio('bulletCollision');

	    this.player1 = new player('ship', 
	    	'bullet1', 
	    	'blaster', 
	    	'up', 
	    	game.input.keyboard.createCursorKeys(), 
	    	game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
	    );

	    this.player2 = new player('ufo', 
	    	'bullet2', 
	    	'blaster', 
	    	'down', 
	    	this.player2_cursor, 
	    	game.input.keyboard.addKey(Phaser.Keyboard.W)
	    );

	    this.player2.ship.angle = 0;

	    this.texts.score = game.add.bitmapText(game.world.leftX, 10, 'carrier_command', this.texts.score, 10);

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

		/*if (this.button.restart.isDown)
	        game.state.restart();*/

	    if (this.button.pause.isDown)
	        game.paused = true;

	    this.player1.update();
	    this.player2.update();

	    game.physics.arcade.collide(this.player1.bullets, this.player2.ship, this.killPlayer, null, this);
	    game.physics.arcade.collide(this.player2.bullets, this.player1.ship, this.killPlayer, null, this);
	    game.physics.arcade.collide(this.player1.bullets, this.player2.bullets, this.bulletCollision, null, this);

	},

	bulletCollision: function(bullet2, bullet1){
		bullet1.kill();
		bullet2.kill();
		this.audio.bulletCollision.play();
	},

	killPlayer: function(player, bullet){
		if(player == this.player1.ship)
			this.lives.player1--;
		else
			this.lives.player2--;
		this.audio.player_death.play();
		bullet.kill();

		if(this.lives.player2 == 0)
			this.score1++;
		if(this.lives.player1 == 0)
			this.score2++;

		if(this.lives.player1 == 0 || this.lives.player2 == 0)
		{
			player.kill();
			this.texts.score = 'P1 ' + this.score1 + ', P2 ' + this.score2;
			this.onGameOver();
		}
	},
	
	onGameOver: function() {

        if(!centerText){
            centerText = game.add.bitmapText(game.world.centerX, game.world.centerY, 'carrier_command','----- Game Over -----\n\nScore: ' + this.texts.score + '\n\n' + 'Time: ' + this.timer.getFormattedTime() + '\n\n\nClick to restart', 15);
            centerText.anchor.set(0.5);
        }

        game.paused = true;
        this.gameOver = true;

	}
};