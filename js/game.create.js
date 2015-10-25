var player;

var bullets;
var bulletTime = 0;
var bullet;

var cursors;

var button = {
	fire: null,
	addEnemy: null
};

var audio = {
	alien_death1: null,
	player_death: null,
	blaster: null
};

var enemy = {
	world: { x: 1280, y: 200 },
	images: ['ufo', 'wabbit' , 'yellow_ball', 'tomato', 'phaser-ship', 'phaser-dude'],
	velocity: 200,
	time: 0,
	sprites: []
};

function create() {

	game.physics.startSystem(Phaser.Physics.ARCADE);
	//game.stage.backgroundColor = '#124184';

    bullets = game.add.physicsGroup();
    bullets.createMultiple(32, 'bullet', false);
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);

    player = game.add.sprite(650, 530, 'ship');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    cursors = game.input.keyboard.createCursorKeys();
    button.fire = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    button.addEnemy = game.input.keyboard.addKey(Phaser.Keyboard.F1);

    audio.alien_death1 = game.add.audio('alien_death1');
    audio.player_death = game.add.audio('player_death');
    audio.blaster = game.add.audio('blaster');

}