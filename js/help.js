var help = {
	texts:{
		back: null,
		help: null
	},
	preload: function(){

	},
	create: function(){
		this.texts.back = game.add.bitmapText(10, 10, 'carrier_command','Back', 10);
		this.texts.back.inputEnabled = true;
		this.texts.back.events.onInputUp.add(function(){
			game.state.start('Menu');
		}, this);

		game.add.bitmapText(
			game.world.centerX, 
			game.world.centerY, 
			'carrier_command', 
			'R - restart\n\nP - pause\n\nSpacebar - fire\n\nArrows - move\n\n\nPlayer 2:\n\nA/D - move\n\nW - fire', 
			15
		).anchor.set(0.5);

	},
	render: function(){
		
	},
	update: function(){
		
	}
};