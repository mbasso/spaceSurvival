function update () {

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

    game.physics.arcade.collide(bullets, enemy.sprites, killEnemy, null, this);

    addEnemy();
    moveEnemies();

}

function fireBullet () {

    if (game.time.time > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

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

    if (button.addEnemy.isDown || game.time.time > enemy.time)
    {
        var sprite = game.add.sprite(game.rnd.integerInRange(0, enemy.world.x), game.rnd.integerInRange(0, enemy.world.y), enemy.images[game.rnd.integerInRange(0, 5)]);
        game.physics.enable(sprite, Phaser.Physics.ARCADE);
        sprite.body.collideWorldBounds = false;
        sprite.body.checkCollision.up = false;
        sprite.body.checkCollision.down = true;
        enemy.sprites.push(sprite);
        enemy.time = game.time.time + 700;   
    }

}

function moveEnemies() {
    if (game.time.time > enemy.time - 700 || !enemy.sprites)
        return;

    for (i = 0; i < enemy.sprites.length; i++) {
        if(!enemy.sprites[i].body)
            continue;

        if(game.rnd.integerInRange(0, 2) == 1)
            enemy.sprites[i].body.velocity.x = enemy.velocity;
        else
            enemy.sprites[i].body.velocity.x = -enemy.velocity;
    }
}

function killEnemy (bullet, opposed) {
    bullet.kill();
    opposed.kill();
    audio.alien_death1.play();
}

function resetBullet (bullet) {
    bullet.kill();
}