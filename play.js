var play = {

	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.sky = game.add.sprite(0, 0, 'sky');

	    this.player = game.add.sprite(W/2, H - 500, 'circle');
	    this.player.scale.setTo(0.05, 0.05);
	    game.physics.arcade.enable(this.player);
	    this.player.body.gravity.y = 850;
	    this.player.body.bounce.y = 0.5;
	    this.player.body.xpos = this.player.body.position.x;
	    this.player.jumpCount = 0;

	    this.ground = game.add.sprite(0, 300, 'ground');
	    game.physics.arcade.enable(this.ground);
	    this.ground.body.immovable = true;

	    this.small = game.add.group();
		this.small.createMultiple(10, 'small');
		this.small.setAll('checkWorldBounds', true);	
		this.small.setAll('outOfBoundsKill', true);

	    //Add evil spikes
	    this.spikes = game.add.group();
		this.spikes.createMultiple(10, 'spike');
		this.spikes.setAll('checkWorldBounds', true);	
		this.spikes.setAll('outOfBoundsKill', true);

		//TIMES
		this.spikeTime = game.time.now + 1000;
		this.nextState = game.time.now + 10000;
		this.platformTime = game.time.now + 10400;

		var style = { font: "35px Arial", fill: "#fff", align: "center" };
		this.scoreLabel = this.game.add.text(20, 20, "Score: 0", style);
	},

	update: function() {
		game.physics.arcade.collide(this.player, this.ground);
		game.physics.arcade.collide(this.player, this.small);
        game.physics.arcade.collide(this.player, this.spikes, this.restartGame, null, this);
	    game.input.onDown.add(this.jump, this);

	    //Make sure that the player stays in the same spot
	    this.player.body.position.x = this.player.body.xpos;

	    if (this.player.body.touching.down) {
	    	this.player.jumpCount = 0;
	    }

	    if ((game.time.now > this.spikeTime) && (game.time.now < this.nextState-1000)) {
	    	this.addSpike();
	    	this.spikeTime += Math.floor(Math.random() * 1200) + 300;
	    }

	    if (game.time.now > this.nextState) {
	    	this.ground.body.velocity.x = -SPEED;
	    }

	    if (game.time.now > this.platformTime) {
	    	this.addPlatform();
	    	this.platformTime += 1000;
	    }

	    if (this.player.body.position.y > 500) {
	    	this.restartGame();
	    }
	},

	returnPlayer: function() {
		//Makes the player return to the middle
		//of the screen when it is pushed backwards
        if (this.player.body.position.x < this.player.body.xpos-1) {
        	this.player.body.gravity.x = 50;
        }
        if (this.player.body.velocity.x > 60) {
        	this.player.body.gravity.x = 0.1;
        }
        if (this.player.body.position.x > this.player.body.xpos+1) {
        	this.player.body.velocity.x = 0;
        }
	},

	jump: function() {
		if (this.player.jumpCount < 2) {
	        this.player.body.velocity.y = -300;
	        this.player.jumpCount += 1;
		}
	},

	restartGame: function() {  
	    this.game.state.start('menu');
	},

	addPlatform: function() {
		var smallPlatform = this.small.getFirstDead();
		game.physics.arcade.enable(smallPlatform);
		smallPlatform.body.immovable = true;

		var platformHeight = Array(300, 350, 400, 375, 390);
		var platformHeight = platformHeight[Math.floor(Math.random()*platformHeight.length)];

		smallPlatform.reset(W, H - platformHeight);

		smallPlatform.body.velocity.x = -SPEED;

		this.updateScore();
	},

	addSpike: function() {
		var spike = this.spikes.getFirstDead();
	    game.physics.arcade.enable(spike);

	    spike.reset(W, H-330);

	    spike.body.velocity.x = -SPEED;

	    this.updateScore();
	},

	updateScore: function() {
		SCORE += 1;
		this.scoreLabel.setText("Score: " + SCORE);
	},

	randomStoneSpeed: function() {
		num = Math.floor(Math.random() * 101) - 50;
		STONESPEED = 420 + num;
	}
}
