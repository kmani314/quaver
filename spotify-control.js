const util = require('util');
const execute = util.promisify(require('child_process').exec);
module.exports = {
    playTrack: function(track) {
        return execute(`osascript -e \'tell application \"Spotify\" to play track \"${track}\"\'`);
    },
    playpause: function() {
        return execute('osascript -e \'tell application \"Spotify\" to playpause\'');
    },
    get playerPosition() {
        return (async function wrapper() {
            return await execute('osascript -e \'tell application \"Spotify\" to return player position\'');
        })();
    },
    get currentSongDuration() {
        return (async function wrapper() {
            return await execute('osascript -e \'tell application \"Spotify\" to return duration of current track\'');
        })();
    }
};
