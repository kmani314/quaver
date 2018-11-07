const util = require('util');
const execute = util.promisify(require('child_process').exec);
const sleep = util.promisify(setTimeout);
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
function log(title, position, duration) {
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	process.stdout.write('>> '.red + title + ' -- ' + formatTime(position).magenta + ' / '.magenta + formatTime(duration).magenta);
}
async function isFinished(title, duration) {
	return new Promise((resolve, reject) => {
		let timer = setInterval(() => {
			execute('osascript -e \'tell application \"Spotify\" to return player position\'').then((position) => {
				log(title, position.stdout.replace(/\n/, ''), duration);		
				if(position.stdout.replace(/\n/, '') >  duration - 2.5) {
					clearInterval(timer);
					execute('osascript -e \'tell application \"Spotify\" to pause\'');
					resolve();
				}
			});
		}, 500);
	});
}
exports.playTrack = async function(track) {
	try {
		await execute(`osascript -e \'tell application \"Spotify\" to play track \"${track}\"\'`).then(() => sleep(500)); //sync because everything depends on this	
		let durationPromise = execute('osascript -e \'tell application \"Spotify\" to return duration of current track\''); //FIX: these lines fail sometimes for no apparent reason
		let titlePromise = execute('osascript -e \'tell application \"Spotify\" to return name of current track\''); 
		
		let [duration, title] = await Promise.all([durationPromise, titlePromise]);
		
		duration = duration.stdout.slice(0, -4).replace(/\n/, '');
		title = title.stdout.replace(/\n/, '');			
		
		return await isFinished(title, duration);
	}
	
	catch(err) {
		console.log(err);
	}
}
