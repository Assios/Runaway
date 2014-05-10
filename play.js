var play = {

	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);

	    this.sky = game.add.sprite(0, 0, 'sky');

	    this.ground = game.add.sprite(0, game.world.height - 32, 'ground');
	    this.ground.scale.setTo(2, 2);
	    game.physics.arcade.enable(this.ground);
	    this.ground.body.immovable = true;

	    this.player = game.add.sprite(game.world.width/2-30, game.world.height - 150, 'circle');
	    this.player.scale.setTo(0.05, 0.05);
	    game.physics.arcade.enable(this.player);

	    this.player.body.gravity.y = 800;
	    this.player.body.collideWorldBounds = true;

	    //Add evil blocks
	    this.blocks = game.add.group();
		this.blocks.createMultiple(10, 'block');
		this.blocks.setAll('checkWorldBounds', true);	
		this.blocks.setAll('outOfBoundsKill', true);

		//START
		this.blockTime = game.time.now + 1000;

		var style = { font: "35px Arial", fill: "#fff", align: "center" };
		this.label_distance = this.game.add.text(20, 20, "yfr", style);

		this.timer = this.game.time.events.loop(200, this.newDistance, this);
	},

	update: function() {
		//WRITE DISTANCE

		game.physics.arcade.collide(this.player, this.ground);

		game.physics.arcade.collide(this.player, this.block);

	    if (spaceKey.isDown && this.player.body.touching.down)
	    {
	        this.player.body.velocity.y = -300;
	    }

		if (this.game.time.now > this.blockTime) {
			this.blockTime = game.time.now + 2000;
			this.addBlock();
		}
	},

	addBlock: function() {
		var block = this.blocks.getFirstDead();
	    game.physics.arcade.enable(block);
	    block.scale.setTo(0.3, 0.3);

	    block.reset(w, h-68);

	    block.body.velocity.x = -SPEED;
	},

	newDistance: function() {
		distance += (SPEED - STONESPEED) * 0.05;
		this.label_distance.setText("Distance: " + Math.floor(distance) + " meters");
		this.randomStoneSpeed();
	},

	randomStoneSpeed: function() {
		num = Math.floor(Math.random() * 101) - 50;
		STONESPEED = 420 + num;
	}
}

