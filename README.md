# Listen with Quaver 
Quaver is a CLI tool that uses [ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg), [node-ytdl-core](https://github.com/fent/node-ytdl-core), and AppleScript to provide seamless Spotify and YouTube playback(No more App Switching!)
## Installation

As of now, Quaver only works on MacOS with the Spotify desktop app installed.

```npm i -g quaver
```

## Playback

### Playlists
Playlists are .txt files of:
- Valid YouTube URLs (https://youtube.com/watch?v=...)
- Valid Spotify URIs (spotify:track:...)
separated by newlines.

The easiest way to get Spotify URIs is to click the ••• symbol > Share > Copy Spotify URI in the desktop app.

Example: 
```
https://www.youtube.com/watch?v=au2n7VVGv_c
spotify:track:6eT7xZZlB2mwyzJ2sUKG6w
spotify:track:5yuShbu70mtHXY0yLzCQLQ
https://www.youtube.com/watch?v=UYwF-jdcVjY
...
```
### Start Quaver
Quaver has one main command: `play`
To play a playlist, ensure spotify is running and run
```quaver play <playlist.txt>
```
### Play, Pause, Fast-Forward
Play/pause/FF is currently being implemented, and 1.1.0 will be released very soon.
