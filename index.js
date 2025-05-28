 let now_playing = document.querySelector('.now-playing');
 let track_art = document.querySelector('track-art');
 let track_name = document.querySelector('track-name');
 let track_artist = document.querySelector('track-artist');
 let playpause_btn = document.querySelector('.playpause-track');
 let nextbtn = document.querySelector('.next-track');
 let prevbtn = document.querySelector('.prev-track');
 let seek_slider = document.querySelector('.seek_slider');
 let volume_slider = document.querySelector('.volume-slider');
 let curr_time = document.querySelector('.current-time');
 let curr_track = document.querySelector('audio');
 let total_duration = document.querySelector('.total-duration');
 let wave = document.querySelector('.wave');
 let randomIcon = document.querySelector('.fa-random');
 let trackIndex = 0;
 let isPlaying = false;
 let isShuffled = false;
 let updateTimer;

 const music_list = [
    {
     img: 'img/MUSIC.jpg',
     name: 'I AM MUSIC',
     artist: 'Playboi Carti',
     music: 'https://music.apple.com/az/song/radar/1802175532'
    }
]

 loadTrack = trackIndex;

 function loadTrack(trackIndex) {
     clearInterval(updateTimer);
     reset();
     curr_track.src = music_list[trackIndex].music;
     curr_track.load();

     track_art.style.backgroundImage = 'url(' + music_list[trackIndex].img + ')';
     track_name.textContent = music_list[trackIndex].name;
     track_artist.textContent = music_list[trackIndex].artist;
     now_playing.textContent = 'Playing music ' + (trackIndex + 1) + ' of ' + music_list.length;
     updateTimer = setInterval(setUpdate, 1000);

     curr_time.addEventListener('ended', nextTrack);
     random_bg_color();
 }

 function random_bg_color() {
     let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
     let a;

     function populate() {
         for (let i = 0; i < 6; i++) {
             let x = Math.round(Math.random() * 14);
             let y = hex[x];
             a += y;
         }
         return a;
     }
     let Color1 = populate('#');
     let Color2 = populate('#');
     var angle = 'to right';

     let gradient = 'linear-gradient(' + angle + ', ' + Color1 + ', ' + Color2 + ')'
     document.body.style.background = gradient;
 }

 function reset() {
     curr_time.textContent = '00:00';
     total_duration.textContent = '00:00';
     seek_slider.value = 0;
 }

 function isShuffled() {
     isShuffled ? pauseRandom() : playRandom();
 }

 function playRandom() {
     isShuffled = true;
 }

 function pauseRandom() {
     isRandom = false;
     randomIcon.classList.remove('randomActive');
 }

 function repeatTrack() {
     let currentIndex = trackIndex;
     loadTrack(currentIndex);
     playTrack();
 }

 function playpause_btn() {
     isPlaying ? pauseTrack() : playTrack();
 }

 function playTrack() {
     curr_track.play();
     isPlaying = true;
     track_art.classList.add('rotate');
     wave.classList.add('loader');
     playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
 }