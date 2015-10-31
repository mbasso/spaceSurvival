var game;

function onStateChange(){
    game.input.onDown.removeAll();
}

function onGamePaused(){

    switch(game.state.current){
        case 'SinglePlayer':

            if(!this.texts.center){
                this.texts.center = game.add.bitmapText(game.world.centerX, game.world.centerY, 'carrier_command','----- Pause -----\n\nClick to continue', 15);
                this.texts.center.anchor.set(0.5);
            }

            break;
    }

}

function onGameResume(){

    switch(game.state.current){
        case 'SinglePlayer':

            if(game.paused)
                break;

            game.world.remove(this.texts.center);
            this.texts.center = null;

            break;
    }

}

window.onload = function() {

	var gameArea = document.getElementById('game-area');
	
    game = new Phaser.Game(gameArea.clientWidth, gameArea.clientHeight, Phaser.CANVAS, 'game-area', menu);
    
    game.state.add('Menu', menu);
    game.state.add('SinglePlayer', singlePlayer);
    game.state.add('Help', help);
    game.state.onStateChange.add(onStateChange);

    delete gameArea;
    delete menu;
    delete singlePlayer;
    delete help;

};