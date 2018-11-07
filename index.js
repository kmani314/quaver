#!/usr/bin/env node
const commander = require('commander');
const player = require('./player.js');

commander
	.version(require('./package.json').version)
	.description('seamless CLI integration of youtube and spotify');
commander 
	.command('play <playlist>')
	.action((playlist) => player.play(playlist));

commander.parse(process.argv);
if(process.argv.length == 2) commander.help();

