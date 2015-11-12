var game;
var centerText;

function onStateChange(){
    game.input.onDown.removeAll();
}

function onGamePaused(){

    switch(game.state.current){
        case 'SinglePlayer':
        case 'MultiPlayerPvp':

            if(!centerText){
                centerText = game.add.bitmapText(game.world.centerX, game.world.centerY, 'carrier_command','----- Pause -----\n\nClick to continue', 15);
                centerText.anchor.set(0.5);
            }

            break;

    }

}

function onGameResume(){

    switch(game.state.current){
        case 'SinglePlayer':
        case 'MultiPlayerPvp':

            if(game.paused)
                break;

            game.world.remove(centerText);
            centerText = null;

            break;
    }

}

window.onload = function() {

	var gameArea = document.getElementById('game-area');
	
    game = new Phaser.Game(gameArea.clientWidth, gameArea.clientHeight, Phaser.CANVAS, 'game-area', menu);
    
    game.state.add('Menu', menu);
    game.state.add('SinglePlayer', singlePlayer);
    game.state.add('OnlineCoop', onlineCoop);
    game.state.add('MultiPlayerPvp', multiPlayerPvp);
    game.state.add('Help', help);
    game.state.onStateChange.add(onStateChange);

    delete gameArea;
    delete menu;
    delete singlePlayer;
    delete onlineCoop;
    delete multiPlayerPvp;
    delete help;

};