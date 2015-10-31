var game;

window.onload = function() {

	var gameArea = document.getElementById('game-area');
	
    game = new Phaser.Game(gameArea.clientWidth, gameArea.clientHeight, Phaser.CANVAS, 'game-area', menu);
    
    game.state.add('Menu', menu);
    game.state.add('SinglePlayer', singlePlayer);
    game.state.add('Help', help);
    game.state.onStateChange.add(initVariables);

    delete gameArea;
    delete menu;
    delete singlePlayer;
    delete help;

};