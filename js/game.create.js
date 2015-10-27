var player;

var bullets;
var bulletTime = 0;

var enemyBullets;

var cursors;

var background;

var enemies;

var gameOver = false;

var timer = {
    time: 0,
    self: null
};

var texts = {
    score: null,
    center: null,
    menu: null,
    timer: null
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
    spawnTime: 700
};

function create() {

	game.physics.startSystem(Phaser.Physics.ARCADE);

	game.stage.backgroundColor = '#182d3b';
    background = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'starfield');

    bullets = game.add.physicsGroup();
    bullets.createMultiple(32, 'bullet', false);
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);

    enemyBullets = game.add.physicsGroup();
    //enemyBullets.createMultiple(32, 'particle_small', false);
    enemyBullets.setAll('checkWorldBounds', true);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkCollision.down', true);

    player = game.add.sprite(game.world.centerX, game.height - 50, 'ship');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.checkCollision.up = true;

    enemies = game.add.physicsGroup();
    enemies.setAll('outOfBoundsKill', true);

    cursors = game.input.keyboard.createCursorKeys();
    button.fire = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    button.addEnemy = game.input.keyboard.addKey(Phaser.Keyboard.F1);
    button.restart = game.input.keyboard.addKey(Phaser.KeyCode.R);
    button.pause = game.input.keyboard.addKey(Phaser.KeyCode.P);

    audio.alien_death1 = game.add.audio('alien_death1');
    audio.player_death = game.add.audio('player_death');
    audio.blaster = game.add.audio('blaster');

    texts.score = game.add.bitmapText(10, 10, 'carrier_command','Score: ' + score, 10);

    texts.menu = game.add.bitmapText(game.world.width - 10, 10, 'carrier_command','Menu', 10);
    texts.menu.anchor.x = 1;

    texts.timer = game.add.bitmapText(game.world.centerX, 10, 'carrier_command', '00:00:00', 10);
    texts.timer.anchor.set(0.5);

    timer.self = game.time.create(false);
    timer.self.loop(1000, updateCounter, this);
    timer.self.start();

    game.onPause.add(onGamePaused, this);
    game.onResume.add(onGameResume, this);
    game.onBlur.add(onGamePaused, this);
    game.onFocus.add(onGameResume, this);

    game.input.onDown.add(function(event){
        if(gameOver)
            restartGame();
        else
            game.paused = false;
    }, self);

}

function updateCounter() {
    timer.time++;
}