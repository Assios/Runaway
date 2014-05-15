var play = {

	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.sky = game.add.sprite(0, 0, 'sky');

	    this.player = game.add.sprite(w/2, h - 500, 'circle');
	    this.player.scale.setTo(0.05, 0.05);
	    game.physics.arcade.enable(this.player);
	    this.player.body.gravity.y = 1000;
	    this.player.body.collideWorldBounds = true;
	    this.player.body.bounce.y = 0.7;
	    this.player.jumpCount = 0;

	    this.ground = game.add.sprite(0, 300, 'ground');
	    game.physics.arcade.enable(this.ground);
	    this.ground.body.immovable = true;



	    //Add evil blocks
	    this.spikes = game.add.group();
		this.spikes.createMultiple(10, 'spike');
		this.spikes.setAll('checkWorldBounds', true);	
		this.spikes.setAll('outOfBoundsKill', true);

		//START
		this.blockTime = game.time.now + 1000;

		var style = { font: "35px Arial", fill: "#fff", align: "center" };
		this.label_score = this.game.add.text(20, 20, "Score: 0", style);
	},

	update: function() {
		game.physics.arcade.collide(this.player, this.ground);
        game.physics.arcade.collide(this.player, this.spikes, this.restart_game, null, this);

	    game.input.onDown.add(this.jump, this);

	    if (this.player.body.touching.down) {
	    	this.player.jumpCount = 0;
	    }

	    if (game.time.now > this.blockTime) {
	    	this.addBlock()
	    	this.blockTime += Math.floor(Math.random() * 1200) + 300;
	    }
	},

	jump: function() {
		if (this.player.jumpCount < 2) {
	        this.player.body.velocity.y = -300;
	        this.player.jumpCount += 1;
		}
	},

	restart_game: function() {  
	    this.game.state.start('menu');
	},

	addBlock: function() {
		var spike = this.spikes.getFirstDead();
	    game.physics.arcade.enable(spike);

	    spike.reset(w, h-330);

	    spike.body.velocity.x = -SPEED;

	    this.updateScore();
	},

	/*newDistance: function() {
		distance += (SPEED - STONESPEED) * 0.05;
		this.label_distance.setText("Distance: " + Math.floor(distance) + " meters");
		this.randomStoneSpeed();
	},*/

	updateScore: function() {
		score += 1;
		this.label_score.setText("Score: " + score);
	},

	randomStoneSpeed: function() {
		num = Math.floor(Math.random() * 101) - 50;
		STONESPEED = 420 + num;
	}
}
