var menu = {
	texts:{
		title: null,
		modes: {
			singleplayer: null,
			multiplayerPvp: null,
			multiplayerOnline: null
		},
		github: null,
		help: null,
		information: null
	},
	preload: function(){

		game.load.baseURL = 'http://examples.phaser.io/assets/';
	    game.load.crossOrigin = 'anonymous';

		game.load.bitmapFont('carrier_command', 'fonts/bitmapFonts/carrier_command.png', 'fonts/bitmapFonts/carrier_command.xml');
	
	},
	create: function(){

		this.texts.title = game.add.bitmapText(game.world.centerX, 100, 'carrier_command','Space Survival', 22);
		this.texts.title.anchor.set(0.5);

	    this.texts.singleplayer = this.setText(200, 'Singleplayer', 15, function(){
			game.state.start('SinglePlayer');
		});

		this.texts.multiplayerPvp = this.setText(250, 'Multiplayer PVP', 15, function(){
			game.state.start('MultiPlayerPvp');
		});

		this.texts.github = this.setText(300, 'Fork me on github', 15, function(){
			window.open('https://github.com/mbasso/spaceSurvival', '_blank');
		});

		/*this.texts.help = this.setText(300, 'Help', 15, function(){
			game.state.start('Help');
		});*/

	},
	setText: function(height, text, size, callback){
		var variable = game.add.bitmapText(game.world.centerX, height, 'carrier_command', text, size);
		variable.anchor.set(0.5);
		variable.inputEnabled = true;
		variable.events.onInputUp.add(callback, this);
		return variable;
	}
};