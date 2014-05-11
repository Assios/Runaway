var load = {
	preload: function() {
		game.stage.backgroundColor = '#dddddd';
		game.load.image('sky', 'assets/sky.png');
	    game.load.image('ground', 'assets/platform.png');
	    game.load.image('circle', 'assets/circle.png');

	    //load evil block
	    game.load.image('block', 'assets/block.png');
	},

	create: function() {
		this.game.state.start('menu');
	}
}
