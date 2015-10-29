function preload() {

    game.load.baseURL = 'http://examples.phaser.io/assets/'; // Edit this line to:    game.load.baseURL = 'assets/';
    game.load.crossOrigin = 'anonymous';

    game.load.image('ship', 'sprites/thrust_ship2.png');
    game.load.image('ship1', 'sprites/thrust_ship.png');

    game.load.image('starfield','misc/starfield.png');

    game.load.image('bullet', 'misc/bullet0.png');
    game.load.image('bullet1', 'misc/particle_small.png');

    game.load.audio('bulletToBullet', 'audio/SoundEffects/lazer.wav');
    game.load.audio('player_death', 'audio/SoundEffects/player_death.wav');
    game.load.audio('blaster', 'audio/SoundEffects/blaster.mp3');

    game.load.bitmapFont('carrier_command', 'fonts/bitmapFonts/carrier_command.png', 'fonts/bitmapFonts/carrier_command.xml');

}