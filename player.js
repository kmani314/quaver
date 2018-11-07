const fs = require('fs');
const readline = require('readline');
const youtube = require('./youtube-control.js');
const spotify = require('./spotify-control.js');
const colors = require('colors');
const path = require('path');

exports.play = async function play(file) {
	try {
		const rl = readline.createInterface({
			input: fs.createReadStream(file)
		});
		let songs = [];
		await new Promise((resolve, reject) => {
			rl.on('line', (data) => songs.push(data));
			rl.on('close', resolve);
		});	
		let ypattern = /youtube.com\/watch\?v=/;
		let spattern = /spotify:track:/
		for(i = 0; i < songs.length; i++) {
			if(ypattern.test(songs[i])) {
				await youtube.playUrl(songs[i]);
			}
			else if(spattern.test(songs[i])) {
				await spotify.playTrack(songs[i]);
			}
		}
		}
		 
	catch(err) {
		console.log(err);	
	}
}
