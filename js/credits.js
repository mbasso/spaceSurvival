var credits = {
	texts:{
		back: null,
		credits: null
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
			'Created by\n\n\nMatteo Basso\n\nFederico Bottoni', 
			15
		).anchor.set(0.5);

	},
	render: function(){
		
	},
	update: function(){
		
	}
};