var w = 800;
var h = 300;
var SPEED = 400;
var STONESPEED = 420;
var distance = 10000;

var game = new Phaser.Game(800, 300, Phaser.AUTO, '', null, false, false);

game.state.add('load', load);
game.state.add('menu', menu);
game.state.add('play', play);

game.state.start('load');