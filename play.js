var play = {
	preload: function() {

		game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);

		game.load.image('level', 'assets/level.png');

	},

	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = 800;

	    map = game.add.tilemap('map');
	    map.addTilesetImage('level');

	    this.skyLayer = map.createLayer('sky');
	    this.groundLayer = map.createLayer('ground');
	    this.spikeLayer = map.createLayer('spike');

	    this.player = game.add.sprite(w/2, h - 500, 'circle');
	    this.player.scale.setTo(0.05, 0.05);
	    game.physics.arcade.enable(this.player);
	    game.physics.arcade.enable(this.groundLayer);

	    this.groundLayer.collideWorldBounds = true;
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
		game.physics.arcade.collide(this.player, this.spikeLayer);

	    if ((spaceKey.isDown || game.input.activePointer.isDown) && this.player.body.touching.down)
	    {
	        this.player.body.velocity.y = -300;
	    }
	},

	addBlock: function() {
		var block = this.blocks.getFirstDead();
	    game.physics.arcade.enable(block);

	    block.reset(w, h-340);

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
