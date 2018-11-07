const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const Speaker = require('audio-speaker');
const wav = require('wav');
const colors = require('colors');

function formatTime(duration) {
	let minutes = '0' + Math.floor(duration/60);
	if(minutes > 9) {
		minutes = Math.floor(duration/60);
	}
	let seconds = Math.floor(duration%60);
	if(seconds < 10) {
		seconds = '0' + seconds;
	}
	return minutes + ':' + seconds;
 
 }

exports.playUrl = async function(url) {
	try {	
		let speaker = new Speaker();
		let processor = new wav.Reader();
		processor.on('pipe', () => playing = true);
		processor.on('unpipe', () => playing = false);

		let playing = false;
		if (!ytdl.validateURL(url)) throw new Error(url + ' was not found.');
		const info = await ytdl.getInfo(url);	
		
			
		return await new Promise((resolve, reject) => {
			ffmpeg(ytdl(url))
			.on('progress', (progress) => {
				const regex = /(?<=[0-9]{2}:)[0-9]{2}:[0-9]{2}/gm;
				process.stdout.clearLine();
				process.stdout.cursorTo(0);
				process.stdout.write('>> '.red + info.title + ' -- ' + regex.exec(progress.timemark).toString().magenta + ' / ' + formatTime(info.length_seconds).magenta);
			})
			.on('err', (err) => reject(err))
			.on('end', () => {
				processor.end();
				setTimeout(resolve, 500);
			})
			.format('wav')
			.pipe(processor);
			processor.on('format', () => processor.pipe(speaker))
		});
	} 
		
	catch(err) {
		throw err;
	}	
}
