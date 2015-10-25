(function() {
	
    game = new Phaser.Game(1279, 572, Phaser.CANVAS, 'game-area', { 
			preload: preload,
			create: create,
			render: render,
			update: update });

})();