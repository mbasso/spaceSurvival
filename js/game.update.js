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

    game.physics.arcade.collide(bullets, enemies, killEnemy, null, this);
    game.physics.arcade.collide(enemyBullets, player, onGameOver, null, this);

    addEnemy();
    moveEnemies();

}

function fireBullet () {

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

function fireEnemyBullet (enemy) {

    if (game.time.time > enemy.fireTime)
    {
        var bullet = enemyBullets.create(enemy.x - 6, enemy.y + 12, 'particle_small');

        if (bullet)
        {
            bullet.body.velocity.y = 200;
            enemy.fireTime = game.time.time + enemyConfig.spawnTime * 3;
        }
    }

}

function addEnemy () {

    if (button.addEnemy.isDown || game.time.time > enemyConfig.time)
    {
        var enemy = enemies.create(game.rnd.integerInRange(0, game.width), game.rnd.integerInRange(25, game.height / 3 + 50), enemyConfig.images[game.rnd.integerInRange(0, enemyConfig.images.length -1)]);
        enemy.fireTime = 0;
        enemyConfig.time = game.time.time + enemyConfig.spawnTime;   
    }

}

function moveEnemies() {
    if (game.time.time > enemyConfig.time -  enemyConfig.spawnTime || !enemies)
        return;

    for (var i = 0; i < enemies.children.length; i++) {
        if(!enemies.children[i].body)
            continue;

        fireEnemyBullet(enemies.children[i]);

        if(game.rnd.integerInRange(0, 2) == 1)
            enemies.children[i].body.velocity.x = enemyConfig.velocity;
        else
            enemies.children[i].body.velocity.x = -enemyConfig.velocity;
    }
}

function killEnemy (bullet, enemy) {
    bullet.kill();
    enemy.destroy();
    audio.alien_death1.play();

    score += 55;
    texts.score.setText("Score: " + score);
    //enemyConfig.velocity += 2;
    enemyConfig.spawnTime -= 5;
}

function onGameOver (bullet, player) {
    if(!texts.center){
        texts.center = game.add.bitmapText(game.world.centerX, game.world.centerY, 'carrier_command','----- Game Over -----\n\nScore: ' + score + '\n\n' + 'Time: ' + getFormattedTime() + '\n\n\nClick to restart', 15);
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
    timer.time = 0;
    gameOver = false;
    enemyConfig = {
        images: ['ufo', 'wabbit' , 'yellow_ball', 'tomato', 'phaser-ship', 'phaser-dude'],
        velocity: 200,
        time: 0,
        spawnTime: 700
    };
    game.state.restart();
}