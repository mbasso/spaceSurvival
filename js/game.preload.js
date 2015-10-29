function preload() {

    game.load.baseURL = 'http://examples.phaser.io/assets/';
    game.load.crossOrigin = 'anonymous';

    game.load.image('ship', 'sprites/thrust_ship2.png');
    game.load.image('ship1', 'sprites/thrust_ship.png');

   /* game.load.image('ufo', 'sprites/ufo.png');
    game.load.image('wabbit', 'sprites/wabbit.png');
    game.load.image('yellow_ball', 'sprites/yellow_ball.png');
    game.load.image('hotdog', 'sprites/hotdog.png');
    game.load.image('tomato', 'sprites/tomato.png');
    game.load.image('phaser-ship', 'sprites/phaser-ship.png');
    game.load.image('phaser-dude', 'sprites/phaser-dude.png');*/
    game.load.image('starfield','misc/starfield.png');

    game.load.image('bullet', 'misc/bullet0.png');
    game.load.image('bullet1', 'misc/particle_small.png');
    //game.load.image('bullet', 'misc/particle_small.png');

    //game.load.audio('player_death1', 'audio/SoundEffects/alien_death1.wav');
    game.load.audio('bulletToBullet', 'audio/SoundEffects/lazer.wav');
    game.load.audio('player_death', 'audio/SoundEffects/player_death.wav');
    game.load.audio('blaster', 'audio/SoundEffects/blaster.mp3');

    game.load.bitmapFont('carrier_command', 'fonts/bitmapFonts/carrier_command.png', 'fonts/bitmapFonts/carrier_command.xml');

}