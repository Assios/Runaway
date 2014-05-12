var w = 1024;
var h = 768;
var SPEED = 400;
var STONESPEED = 420;
var distance = 1000;

var game = new Phaser.Game(w, h, Phaser.AUTO, '', null, false, false);

game.state.add('load', load);
game.state.add('menu', menu);
game.state.add('play', play);

game.state.start('load');
