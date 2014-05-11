var menu = {

	create: function() {
		spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		//Lag meny her
	},

	update: function() {
		if (spaceKey.isDown) {
			this.game.state.start('play');		
		}
	}
};
