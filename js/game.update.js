function update () {

    if (button.restart.isDown)
    {
        restartGame();
    }

    if (button.pause.isDown)
    {
        game.paused = true;
    }

    player.body.velocity.x = 0;
    player1.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -600;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 600;
    }

    if (button.fire.isDown)
    {
        fireBullet();
    }

    if (button.left1.isDown)
    {
        player1.body.velocity.x = -600;
    }

    else if (button.right1.isDown)
    {
        player1.body.velocity.x = 600;
    }

    if (button.fire1.isDown)
    {
        fireBullet1();
    }

    game.physics.arcade.collide(bullets, player1, shot, null, this);
    game.physics.arcade.collide(bullets1, player, shot, null, this);
    game.physics.arcade.collide(bullets, bullets1, bulletToBullet, null, this);

}

function fireBullet ()
{

    if (game.time.time > bulletTime)
    {
        var bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            audio.blaster.play();
            bullet.reset(player.x + 6, player.y - 12);
            bullet.body.velocity.y = -600;
            bulletTime = game.time.time + 100;
        }
    }

}

function fireBullet1 ()
{

    if (game.time.time > bulletTime1)
    {
        var bullet1 = bullets1.getFirstExists(false);

        if (bullet1)
        {
            audio.blaster.play();
            bullet1.reset(player1.x + 6, player1.y + 12);
            bullet1.body.velocity.y = +600;
            bulletTime1 = game.time.time + 100;
        }
    }

}


function bulletToBullet (bull, bull1) {
    bull.kill();
    bull1.kill();
    audio.bulletToBullet.play();
        }


function shot (play, bull) {
    if(play == player) {
        life--;
    player.body.velocity.y = 0;
    }
    else{
        life1--;
    player1.body.velocity.y = 0;
    }
    bull.kill();
    if(life == 0){
        winner += '2';
        play.kill()
        onGameOver(winner);
    }
    if(life1 == 0) {
        winner += '1';
        play.kill()
        onGameOver(winner);
   }
    audio.player_death.play();
        }

    

function onGameOver (winner) {
    if(!texts.center){
        texts.center = game.add.bitmapText(game.world.centerX, game.world.centerY, 'carrier_command','----- Game Over -----\n\n' + winner + ' wins!\n\n' + 'Time: ' + getFormattedTime() + '\n\n\nClick to restart', 15);
        texts.center.anchor.set(0.5);
    }

    game.paused = true;
    gameOver = true;
}

function onGamePaused(){

    if(!texts.center){
        texts.center = game.add.bitmapText(game.world.centerX, game.world.centerY, 'carrier_command','----- Pause -----\n\nClick to continue', 15);
        texts.center.anchor.set(0.5);
    }

}

function onGameResume(){

    if(game.paused)
        return;

    game.world.remove(texts.center);
    texts.center = null;
}

function restartGame(){
    score = 0;
    life = 3;
    life1 = 3;
    winner = 'player ';
    timer.time = 0;
    gameOver = false;
    game.state.restart();
}