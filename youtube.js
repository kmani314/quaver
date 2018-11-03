const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const Speaker = require('audio-speaker');
const wav = require('wav');
const processor = new wav.Reader();
let speaker = new Speaker();

function formatSeconds(seconds) {
	if(seconds < 10) {
		return '0' + seconds;
	}
	return seconds;
}
module.exports = {
	playUrl:async function(url) {
		try {
			if (!ytdl.validateURL(url)) throw new Error(url + ' was not found.');
			const info = await ytdl.getInfo(url);
			
			return await new Promise((resolve, reject) => {
				ffmpeg(ytdl(url))
				.on('progress', (progress) => {
					const regex = /(?<=[0-9]{2}:)[0-9]{2}:[0-9]{2}/gm;
					process.stdout.clearLine();
					process.stdout.cursorTo(0);
					process.stdout.write(regex.exec(progress.timemark) + ' / ' + Math.floor(info.length_seconds/60) + ':' + formatSeconds(info.length_seconds % 60));
				})
				.on('err', (err) => reject(err))
				.on('end', resolve)
				.format('wav')
				.pipe(processor);
				processor.on('format', () => processor.pipe(speaker));		
			});
		}
		catch(err) {
			throw err;
		}
	
	}
}
