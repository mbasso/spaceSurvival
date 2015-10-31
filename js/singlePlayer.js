var enemies;
var enemyConfig;
var enemyBullets;

function initVariables(){
	enemyConfig = {
		images: ['ufo', 'wabbit' , 'yellow_ball', 'tomato', 'phaser-ship', 'phaser-dude'],
		velocity: 200,
		time: 0,
	    spawnTime: 700
	};
}

var singlePlayer = {
	player: null,
	score: null,
	timer: null,
	gameOver: null,
	audio: {
		alien_death1: null,
		player_death: null
	},
	texts: {
	    score: null,
	    center: null,
	    menu: null,
	    timer: null
	},
	button: {
		addEnemy: null,
	    restart: null,
	    pause: null
	},
	preload: function(){

		game.load.baseURL = 'http://examples.phaser.io/assets/';
	    game.load.crossOrigin = 'anonymous';

	    game.load.image('ship', 'sprites/thrust_ship2.png');

	    game.load.image('ufo', 'sprites/ufo.png');
	    game.load.image('wabbit', 'sprites/wabbit.png');
	    game.load.image('yellow_ball', 'sprites/yellow_ball.png');
	    game.load.image('hotdog', 'sprites/hotdog.png');
	    game.load.image('tomato', 'sprites/tomato.png');
	    game.load.image('phaser-ship', 'sprites/phaser-ship.png');
	    game.load.image('phaser-dude', 'sprites/phaser-dude.png');
	    game.load.image('starfield','misc/starfield.png');

	    game.load.image('bullet', 'misc/bullet0.png');
	    game.load.image('particle_small', 'misc/particle_small.png');

	    game.load.audio('alien_death1', 'audio/SoundEffects/alien_death1.wav');
	    game.load.audio('player_death', 'audio/SoundEffects/player_death.wav');
	    game.load.audio('blaster', 'audio/SoundEffects/blaster.mp3');

	},
	create: function(){

		this.score = 0;
		this.gameOver = false;
		
		game.physics.startSystem(Phaser.Physics.ARCADE);

	    game.add.tileSprite(0, 0, game.world.width, game.world.height, 'starfield');

	    enemyBullets = game.add.physicsGroup();
	    //enemyBullets.createMultiple(32, 'particle_small', false);
	    enemyBullets.setAll('checkWorldBounds', true);
	    enemyBullets.setAll('outOfBoundsKill', true);
	    enemyBullets.setAll('checkCollision.down', true);

	    enemies = game.add.physicsGroup();
	    enemies.setAll('outOfBoundsKill', true);

	    this.button.addEnemy = game.input.keyboard.addKey(Phaser.Keyboard.F1);
	    this.button.restart = game.input.keyboard.addKey(Phaser.KeyCode.R);
	    this.button.pause = game.input.keyboard.addKey(Phaser.KeyCode.P);

	    this.audio.alien_death1 = game.add.audio('alien_death1');
	    this.audio.player_death = game.add.audio('player_death');

	    this.player = new player('ship', 
	    	'bullet', 
	    	'blaster', 
	    	'left', 
	    	game.input.keyboard.createCursorKeys(), 
	    	game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
	    );

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

	    game.onPause.add(this.onGamePaused, this);
	    game.onResume.add(this.onGameResume, this);
	    game.onBlur.add(this.onGamePaused, this);
	    game.onFocus.add(this.onGameResume, this);

	    game.input.onDown.add(function(event){
	        if(this.gameOver)
	            game.state.restart();
	        else
	            game.paused = false;
	    }, this);

	},
	render: function(){
		this.texts.timer.setText(this.timer.getFormattedTime());
	},
	update: function(){
		if (this.button.restart.isDown)
    	{
	        game.state.restart();
	    }

	    if (this.button.pause.isDown)
	    {
	        game.paused = true;
	    }

	    this.player.update();

	    game.physics.arcade.collide(this.player.bullets, enemies, this.killEnemy, null, this);
	    game.physics.arcade.collide(enemyBullets, this.player.ship, this.onGameOver, null, this);

	    this.addEnemy();
	    this.moveEnemies();	
	},
	addEnemy: function() {

	    if (this.button.addEnemy.isDown || game.time.time > enemyConfig.time)
	    {
	        var enemy = enemies.create(game.rnd.integerInRange(0, game.width), game.rnd.integerInRange(25, game.height / 3 + 50), enemyConfig.images[game.rnd.integerInRange(0, enemyConfig.images.length -1)]);
	        enemy.fireTime = 0;
	        enemyConfig.time = game.time.time + enemyConfig.spawnTime;   
	    }

	},
	fireEnemyBullet: function(enemy) {

	    if (game.time.time > enemy.fireTime)
	    {
	        var bullet = enemyBullets.create(enemy.x - 6, enemy.y + 12, 'particle_small');

	        if (bullet)
	        {
	            bullet.body.velocity.y = 200;
	            enemy.fireTime = game.time.time + enemyConfig.spawnTime * 3;
	        }
	    }

	},
	moveEnemies: function() {
	    if (game.time.time > enemyConfig.time -  enemyConfig.spawnTime || !enemies)
	        return;

	    for (var i = 0; i < enemies.children.length; i++) {
	        if(!enemies.children[i].body)
	            continue;

	        this.fireEnemyBullet(enemies.children[i]);

	        if(game.rnd.integerInRange(0, 2) == 1)
	            enemies.children[i].body.velocity.x = enemyConfig.velocity;
	        else
	            enemies.children[i].body.velocity.x = -enemyConfig.velocity;
	    }
	},
	killEnemy: function(bullet, enemy) {
	    bullet.kill();
	    enemy.destroy();
	    this.audio.alien_death1.play();

	    this.score += 55;
	    this.texts.score.setText("Score: " + this.score);
	    //enemyConfig.velocity += 2;
	    enemyConfig.spawnTime -= 5;
	},
	onGameOver: function(bullet, player) {
	    if(!this.texts.center){
	        this.texts.center = game.add.bitmapText(game.world.centerX, game.world.centerY, 'carrier_command','----- Game Over -----\n\nScore: ' + this.score + '\n\n' + 'Time: ' + this.timer.getFormattedTime() + '\n\n\nClick to restart', 15);
	        this.texts.center.anchor.set(0.5);
	    }

	    game.paused = true;
	    this.gameOver = true;
	},
	onGamePaused: function(){

	    if(!this.texts.center){
	        this.texts.center = game.add.bitmapText(game.world.centerX, game.world.centerY, 'carrier_command','----- Pause -----\n\nClick to continue', 15);
	        this.texts.center.anchor.set(0.5);
	    }

	},
	onGameResume: function(){

	    if(game.paused)
	        return;

	    game.world.remove(this.texts.center);
	    this.texts.center = null;
	}
};