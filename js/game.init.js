window.onload = function() {

	var gameArea = document.getElementById('game-area');
	
    game = new Phaser.Game(gameArea.clientWidth, gameArea.clientHeight, Phaser.CANVAS, 'game-area', { 
			preload: preload,
			create: create,
			render: render,
			update: update });

};