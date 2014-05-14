var load = {
	preload: function() {
		game.stage.backgroundColor = '#ddd';
		game.load.image('sky', 'assets/sky.png');
	    game.load.image('ground', 'assets/platform.png');
	    game.load.image('circle', 'assets/circle.png');

	    //load evil block
	    game.load.image('block', 'assets/block.png');

	    game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);

		game.load.image('level', 'assets/level.png');
	},

	create: function() {
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.minWidth = 480;
        this.scale.minHeight = 260;
        this.scale.maxWidth = 1136;
        this.scale.maxHeight = 600;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize(true);

        this.game.state.start('menu');
	}
}
