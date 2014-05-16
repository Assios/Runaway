var menu = {

	create: function() {
		this.game.add.text(20, 20, "Score: " + SCORE, { font: "35px Arial", fill: "#000", align: "center" });
		SCORE = 0;
		//Lag meny her
	},

	update: function() {

		if (game.input.activePointer.isDown)
	    {
			this.game.state.start('play');		
	    }
	}
};
