var menu = {

	create: function() {
		this.game.add.text(20, 20, "Score: " + score, { font: "35px Arial", fill: "#000", align: "center" });
		score = 0;
		spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		//Lag meny her
	},

	update: function() {

		if (game.input.activePointer.isDown)
	    {
			this.game.state.start('play');		
	    }
	}
};
