var player;

var bullets;
var bulletTime = 0;

var cursors;

var texts = {
    score: null,
    center: null
};

var score = 0;

var button = {
	fire: null,
	addEnemy: null,
    restart: null,
    pause: null
};

var audio = {
	alien_death1: null,
	player_death: null,
	blaster: null
};

var enemyConfig = {
	images: ['ufo', 'wabbit' , 'yellow_ball', 'tomato', 'phaser-ship', 'phaser-dude'],
	velocity: 200,
	time: 0,
    spawnTime: 700,
	sprites: []
};

function create() {

	game.physics.startSystem(Phaser.Physics.ARCADE);
	//game.stage.backgroundColor = '#124184';

    bullets = game.add.physicsGroup();
    bullets.createMultiple(32, 'bullet', false);
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);

    player = game.add.sprite(game.world.centerX, game.height - 50, 'ship');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    cursors = game.input.keyboard.createCursorKeys();
    button.fire = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    button.addEnemy = game.input.keyboard.addKey(Phaser.Keyboard.F1);
    button.restart = game.input.keyboard.addKey(Phaser.KeyCode.R);
    //button.pause = game.input.keyboard.addKey(Phaser.KeyCode.P);

    audio.alien_death1 = game.add.audio('alien_death1');
    audio.player_death = game.add.audio('player_death');
    audio.blaster = game.add.audio('blaster');

    texts.score = game.add.bitmapText(10, 10, 'carrier_command','Score: ' + score, 10);
    texts.score.inputEnabled = true;
    texts.score.input.enableDrag();

    //game.onPause.add(onGamePaused, this);
    game.onBlur.add(onGamePaused, this);
    game.onFocus.add(onGameResume, this);
    //game.onResume.add(onGameResume, this);
    game.paused = false;

}