function update () {

    if (button.restart.isDown)
    {
        score = 0;
        game.state.restart();
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

    game.physics.arcade.collide(bullets, enemyConfig.sprites, killEnemy, null, this);

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

function addEnemy () {

    if (button.addEnemy.isDown || game.time.time > enemyConfig.time)
    {
        var sprite = game.add.sprite(game.rnd.integerInRange(0, game.width), game.rnd.integerInRange(25, game.height / 3 + 50), enemyConfig.images[game.rnd.integerInRange(0, enemyConfig.images.length -1)]);
        game.physics.enable(sprite, Phaser.Physics.ARCADE);
        sprite.body.collideWorldBounds = false;
        sprite.body.checkCollision.up = false;
        sprite.body.checkCollision.down = true;
        enemyConfig.sprites.push(sprite);
        enemyConfig.time = game.time.time + enemyConfig.spawnTime;   
    }

}

function moveEnemies() {
    if (game.time.time > enemyConfig.time -  enemyConfig.spawnTime || !enemyConfig.sprites)
        return;

    for (i = 0; i < enemyConfig.sprites.length; i++) {
        if(!enemyConfig.sprites[i].body)
            continue;

        if(game.rnd.integerInRange(0, 2) == 1)
            enemyConfig.sprites[i].body.velocity.x = enemyConfig.velocity;
        else
            enemyConfig.sprites[i].body.velocity.x = -enemyConfig.velocity;
    }
}

function killEnemy (bullet, opposed) {
    bullet.kill();
    opposed.kill();
    audio.alien_death1.play();

    score += 55;
    texts.score.setText("Score: " + score);
    //enemyConfig.velocity += 2;
    enemyConfig.spawnTime -= 5;
}

function resetBullet(bullet) {
    bullet.kill();
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