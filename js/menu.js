var menu = {
	textHeight: null,
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

		game.load.baseURL = 'assets/';
	    game.load.crossOrigin = 'anonymous';

		game.load.bitmapFont('carrier_command', 'fonts/bitmapFonts/carrier_command.png', 'fonts/bitmapFonts/carrier_command.xml');
	
	},
	create: function(){

		this.textHeight = 150;

		this.texts.title = game.add.bitmapText(game.world.centerX, 100, 'carrier_command','Space Survival', 22);
		this.texts.title.anchor.set(0.5);

	    this.texts.singleplayer = this.setText('Singleplayer', function(){
			game.state.start('SinglePlayer');
		});

		this.texts.multiplayerPvp = this.setText('Coop Online', function(){
			game.state.start('OnlineCoop');
		});

		this.texts.multiplayerPvp = this.setText('Multiplayer PVP', function(){
			game.state.start('MultiPlayerPvp');
		});

		this.texts.github = this.setText('Fork me on github', function(){
			window.open('https://github.com/mbasso/spaceSurvival', '_blank');
		});

		this.texts.help = this.setText('Help', function(){
			game.state.start('Help');
		});

		game.onPause.add(onGamePaused, this);
	    game.onResume.add(onGameResume, this);
	    game.onBlur.add(onGamePaused, this);
	    game.onFocus.add(onGameResume, this);

	},
	setText: function(text, callback){
		this.textHeight += 50;
		var variable = game.add.bitmapText(game.world.centerX, this.textHeight, 'carrier_command', text, 15);
		variable.anchor.set(0.5);
		variable.inputEnabled = true;
		if(callback)
			variable.events.onInputUp.add(callback, this);
		return variable;
	}
};