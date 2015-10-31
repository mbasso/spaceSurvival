function enemiesGroup(images, bulletImage, deathSound, addEnemyButton, velocity, time, spawnTime) {

    var self = this;

    this.images = images;
    this.bulletImage = bulletImage;
    this.deathSound = game.add.audio(deathSound);
    this.addEnemyButton = addEnemyButton;
    this.velocity = velocity;
    this.time = time;
    this.spawnTime = spawnTime;

    this.group = game.add.physicsGroup();
    this.group.setAll('outOfBoundsKill', true);

    this.bullets = game.add.physicsGroup();
    //bullets.createMultiple(32, 'particle_small', false);
    this.bullets.setAll('checkWorldBounds', true);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkCollision.down', true);
    this.bullets.setAll('checkCollision.up', true);
    this.bullets.setAll('checkCollision.left', true);
    this.bullets.setAll('checkCollision.right', true);

    this.fire = function(enemy) {

        if (game.time.time > enemy.fireTime)
        {
            var bullet = self.bullets.create(enemy.x - 6, enemy.y + 12, self.bulletImage);

            if (bullet)
            {
                bullet.body.velocity.y = 200;
                enemy.fireTime = game.time.time + self.spawnTime * 3;
            }
        }

    }

    this.update = function() {

        if(self.addEnemy())
            self.move();

    }

    this.move = function() {

        for (var i = 0; i < self.group.children.length; i++) {
            if(!self.group.children[i].body)
                continue;

            self.fire(self.group.children[i]);

            if(game.rnd.integerInRange(0, 2) == 1)
                self.group.children[i].body.velocity.x = self.velocity;
            else
                self.group.children[i].body.velocity.x = -self.velocity;
        }

    }

    this.addEnemy = function() {
    
        if (this.addEnemyButton.isDown || game.time.time > self.time)
        {
            var enemy = self.group.create(game.rnd.integerInRange(0, game.width), game.rnd.integerInRange(25, game.height / 3 + 50), self.images[game.rnd.integerInRange(0, self.images.length -1)]);
            enemy.fireTime = 0;
            self.time = game.time.time + self.spawnTime;
            return true;
        }
        return false;

    }

    this.kill = function(enemy) {

        enemy.destroy();
        self.deathSound.play();

        //self.velocity += 2;
        self.spawnTime -= 5;

    }

}