function player(config) {

    /*
    {
        image: 'ship',
        bulletImage: 'bullet',
        fireSound: 'blaster',
        direction: 'up',
        cursors: game.input.keyboard.createCursorKeys(),
        fireButton: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
        id: 'AhdjlcUdhjds97fdHShl',
        x: 100,
        y: 250
    }
    */

    var self = this;

    (function setup() {

        this.direction = function (){

            self.direction = config.direction;

            switch(self.direction){
                case 'down':
                    self.ship.angle = 180;
                    self.bulletConfig.startX = -self.ship.width / 4;
                    self.bulletConfig.startY = -self.ship.height / 2;
                    self.bulletConfig.velocityY = 600;
                    self.bulletConfig.angle = 0;
                    self.ship.body.checkCollision.down = true;
                    break;
                case 'up':
                    self.ship.angle = 0;
                    self.bulletConfig.startX = self.ship.width / 4;
                    self.bulletConfig.startY = -self.ship.height / 2;
                    self.bulletConfig.velocityY = -600;
                    self.bulletConfig.angle = 0;
                    self.ship.body.checkCollision.up = true;
                    break;
                case 'left':
                    self.ship.angle = 270;
                    self.bulletConfig.startX = -self.ship.width / 2;
                    self.bulletConfig.startY = -self.ship.height / 4;
                    self.bulletConfig.velocityX = -600;
                    self.bulletConfig.angle = 270;
                    self.ship.body.checkCollision.left = true;
                    break;
                case 'right':
                    self.ship.angle = 90;
                    self.bulletConfig.startX = self.ship.width / 2;
                    self.bulletConfig.startY = self.ship.height / 4;
                    self.bulletConfig.velocityX = 600;
                    self.bulletConfig.angle = 90;
                    self.ship.body.checkCollision.right = true;
                    break;
            }

        }

        this.fire = function (){

            self.fireSound = game.add.audio(config.fireSound);

            if(config.fireButton)
                self.cursors.fire = config.fireButton;

        }

        this.bullets = function (){

            self.bulletConfig = {
                time: null,
                startX: null,
                startY: null,
                velocity: null,
                angle: null
            };

            self.bullets = null;
            self.bullets = game.add.physicsGroup();
            self.bullets.createMultiple(32, config.bulletImage, false);
            self.bullets.setAll('checkWorldBounds', true);
            self.bullets.setAll('outOfBoundsKill', true);
            self.bullets.setAll('angle', self.bulletConfig.angle);

        }

        this.variables = function (){

            self.alive = true;
            self.id = config.id;
            self.velocity = 600;

        }

        this.ship = function (){

            self.ship = game.add.sprite(config.x, config.y, config.image);
            game.physics.arcade.enable(self.ship);
            self.ship.body.collideWorldBounds = true;

        }

        this.cursors = function (){

            self.cursors = config.cursors;
            self.input = {};
            self.cursorState = {};

        }

        this.defaultConfig = function (){

            if(!config.direction)
                config.direction = "up";

            if(!config.id)
                config.id = null;

            if(!config.x){
                switch(config.direction){
                    case 'down':
                    case 'up':
                        config.x = game.world.centerX;
                        break;
                    case 'left':
                        config.x = game.width - 50;
                        break;
                    case 'right':
                        config.x = 50;
                        break;
                }
            }

            if(!config.y){
                switch(config.direction){
                    case 'down':
                        config.y = 50;
                        break;
                    case 'up':
                        config.y = game.height - 50;
                        break;
                    case 'left':
                    case 'right':
                        config.y = game.world.centerY;
                        break;
                }
            }

        }

        this.defaultConfig();
        this.variables();
        this.bullets();
        this.ship();
        this.cursors();
        this.fire();
        this.direction();

    })();

    this.fire = function() {

        if (!self.alive)
            return;

        if (game.time.time > self.bulletConfig.time){

            var bullet = self.bullets.getFirstExists(false);

            if (bullet){

                bullet.reset(self.ship.x + self.bulletConfig.startX, self.ship.y + self.bulletConfig.startY);
                
                if(self.bulletConfig.velocityY)
                    bullet.body.velocity.y = self.bulletConfig.velocityY;
                else
                    bullet.body.velocity.x = self.bulletConfig.velocityX;

                self.bulletConfig.time = game.time.time + 100;

                if(self.fireSound)
                    self.fireSound.play();
            }
        }

    }

    this.kill = function (){
        self.alive = false;
        self.ship.kill();
    }

    this.update = function(eurecaServer, id) {

        if(eurecaServer)
            self.updateOnline(eurecaServer, id);
        else
            self.updateOffline();

    }

    this.updateOnline = function(eurecaServer, id) {

        var inputChanged = (
            self.cursorState.left != self.input.left ||
            self.cursorState.right != self.input.right ||
            self.cursorState.fire != self.input.fire
        );
            
            
        if (inputChanged){

            if (self.id == id){

                self.input.x = self.ship.body.velocity.x;
                self.input.y = self.ship.body.velocity.y;
                    
                eurecaServer.handleKeys(self.input);
            }
        }

        self.ship.body.velocity.x = 0;
        self.ship.body.velocity.y = 0;

        if (self.cursorState.left && (self.direction == "up" || self.direction == "down"))
            self.ship.body.velocity.x = -self.velocity;
        else if (self.cursorState.left && self.direction == "left")
            self.ship.body.velocity.y = self.velocity;
        else if (self.cursorState.left && self.direction == "right")
            self.ship.body.velocity.y = -self.velocity;
        else if (self.cursorState.right && (self.direction == "up" || self.direction == "down"))
            self.ship.body.velocity.x = self.velocity;
        else if (self.cursorState.right && self.direction == "left")
            self.ship.body.velocity.y = -self.velocity;
        else if (self.cursorState.right && self.direction == "right")
            self.ship.body.velocity.y = self.velocity;

        if (self.cursorState.fire)
            self.fire();

    }

    this.updateOffline = function (){

        self.ship.body.velocity.x = 0;
        self.ship.body.velocity.y = 0;

        if (self.cursors.left.isDown && (self.direction == "up" || self.direction == "down"))
            self.ship.body.velocity.x = -self.velocity;
        else if (self.cursors.left.isDown && self.direction == "left")
            self.ship.body.velocity.y = self.velocity;
        else if (self.cursors.left.isDown && self.direction == "right")
            self.ship.body.velocity.y = -self.velocity;
        else if (self.cursors.right.isDown && (self.direction == "up" || self.direction == "down"))
            self.ship.body.velocity.x = self.velocity;
        else if (self.cursors.right.isDown && self.direction == "left")
            self.ship.body.velocity.y = -self.velocity;
        else if (self.cursors.right.isDown && self.direction == "right")
            self.ship.body.velocity.y = self.velocity;

        if (self.cursors.fire && self.cursors.fire.isDown)
            self.fire();

    }

    this.updateInput = function() {
        self.input.left = self.cursors.left.isDown;
        self.input.right = self.cursors.right.isDown;
        
        if(self.cursors.fire)
            self.input.fire = self.cursors.fire.isDown;
    }

}