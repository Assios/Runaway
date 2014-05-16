var W = 1136;
var H = 600;
var SPEED = 400;
var SCORE = 0;

var game = new Phaser.Game(W, H, Phaser.AUTO, 'game', null, false, false);

game.state.add('load', load);
game.state.add('menu', menu);
game.state.add('play', play);

game.state.start('load');
