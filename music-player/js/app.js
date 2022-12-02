const jsmediatags = window.jsmediatags;
const HOST_URL = 'http://127.0.0.1:5500/music-player/';
const MUSICS_DATA = [
    {title: '', artist: '', track: '', path: 'media/music-01.mp3'},
    {title: '', artist: '', track: '', path: 'media/music-02.mp3'},
    {title: '', artist: '', track: '', path: 'media/music-03.mp3'},
    {title: '', artist: '', track: '', path: 'media/music-04.mp3'},
    {title: '', artist: '', track: '', path: 'media/music-05.mp3'},
    {title: '', artist: '', track: '', path: 'media/music-06.mp3'},
];
const AUDIO = document.querySelector('audio');
const BUTTONS = [...document.querySelectorAll('button')];
const TIME = {
    current : document.querySelector('.current-time'),
    duration : document.querySelector('.duration-time')
};
const PROGRESS_BAR = document.querySelector('.progress-bar');
const DISPLAY = {
    thumbs: document.querySelector('.music-cover img'),
    title: document.querySelector('.title'),
    artist: document.querySelector('.artist'),
    playlistCurrent: document.querySelector('.playlist-current'),
    playlistTotal: document.querySelector('.playlist-total')
};
const CONTROLS = {
    isPlay: false,
    isShuffle: false
};
const PLAYLIST = {
    current: 0,
    total: MUSICS_DATA.length
}

window.addEventListener('load', initPlaylist);
AUDIO.addEventListener('loadeddata', updateDurationTime);
AUDIO.addEventListener('timeupdate', updateCurrentTime);
PROGRESS_BAR.addEventListener('click', audioNavigation);
BUTTONS.forEach(button => button.addEventListener('click', handleButton));

function initPlaylist(){
    DISPLAY.playlistTotal.textContent = PLAYLIST.total;
    openMusicFile(PLAYLIST.current);
}

function handleButton(e){
    let btn = e.target.dataset.control;
    switch(btn){
        case 'shuffle':
            console.log('shuffle');
            break;
        case 'prev':
            changeTrack('prev');
            break;
        case 'play':
            handleButtonPlay();
            break;
        case 'next':
            changeTrack('next');
            break;
        case 'sound-down':
            changeVolume(btn);
            break;
        case 'sound-mute':
            changeVolume(btn);
            break;
        case 'sound-up':
            changeVolume(btn);
            break;
    }
}

function handleButtonPlay(){
    if(!CONTROLS.isPlay){
        AUDIO.play()
            .then(()=>{
                CONTROLS.isPlay = true;
                updateIconButtonPlay();
            })
            .catch(err=>{
                console.log(err);
                alert('Une erreur de lecture est survenue.')
            });
    } else {
        AUDIO.pause();
        CONTROLS.isPlay = false;
        updateIconButtonPlay();
    }
}

function updateIconButtonPlay(){
    let btnIcon = document.querySelector('button[data-control="play"] img');
    if(CONTROLS.isPlay){
        btnIcon.setAttribute('src', 'assets/pause-icon.svg');
    } else {
        btnIcon.setAttribute('src', 'assets/play-icon.svg');
    }
}

function openMusicFile(track){
    DISPLAY.playlistCurrent.textContent = track + 1;
    AUDIO.setAttribute('src', MUSICS_DATA[track].path);
    updateMusicInfo(HOST_URL + MUSICS_DATA[track].path);
}

function updateMusicInfo(filePath){
    jsmediatags.read(filePath, {
        onSuccess: function(result){
            const { data, format } = result.tags.picture;
            let base64String = '';
            for (let i = 0; i < data.length; i++) {
                base64String += String.fromCharCode(data[i]);
            }

            DISPLAY.thumbs.setAttribute('src', `data:${data.format};base64,${window.btoa(base64String)}`);
            DISPLAY.title.textContent = result.tags.title;
            DISPLAY.artist.textContent = result.tags.artist;
        },
        onError: function(error){
            console.log(error);
            DISPLAY.thumbs.setAttribute('src', 'assets/cover-default.png');
            DISPLAY.title.textContent = 'No title';
            DISPLAY.artist.textContent = 'No artist';
        }
    });
}

function updateDurationTime(){
    TIME.duration.textContent = convertSecondesToHHMMSS(AUDIO.duration);
}

function updateCurrentTime(){
    TIME.current.textContent = convertSecondesToHHMMSS(AUDIO.currentTime);
    document.querySelector('.progress').style.width = `${AUDIO.currentTime * 100 / AUDIO.duration}%`;
}

function convertSecondesToHHMMSS(timeInSecondes){
    let hours = Math.floor(timeInSecondes / 3600);
    let minutes = Math.floor((timeInSecondes - hours * 3600)/ 60);
    let secondes = Math.floor(timeInSecondes - hours * 3600 - minutes * 60);
    
    if(minutes < 10) minutes = `0${minutes}`;
    if(secondes < 10) secondes = `0${secondes}`;
    return hours == 0 ? `${minutes}:${secondes}` : `${hours}:${minutes}:${secondes}`;
}

function audioNavigation(e){
    let rect = PROGRESS_BAR.getBoundingClientRect();
    let progress = (e.clientX - rect.left) / rect.width;
    AUDIO.currentTime = AUDIO.duration * progress;
    updateCurrentTime();
}

function changeVolume(action){
    if(action == 'sound-mute'){
        AUDIO.muted = ! AUDIO.muted;
    }

    if(action == 'sound-down'){
        (AUDIO.volume - 0.1).toFixed(1) < 0 ? AUDIO.volume = 0 : AUDIO.volume = (AUDIO.volume - 0.1).toFixed(1);
        document.querySelector('.sound-bar').style.height = `${AUDIO.volume * 100}%`;
        AUDIO.volume == 0 ? AUDIO.muted = true : AUDIO.muted = false;
    }

    if(action == 'sound-up'){
        (AUDIO.volume + 0.1).toFixed(1) > 1 ? AUDIO.volume = 1 : AUDIO.volume = (AUDIO.volume + 0.1).toFixed(1);
        document.querySelector('.sound-bar').style.height = `${AUDIO.volume * 100}%`;
        AUDIO.muted = false;
    }

    updateIconButtonMute();
}

function updateIconButtonMute(){
    let btnIcon = document.querySelector('button[data-control="sound-mute"] img');
    if(AUDIO.muted){
        btnIcon.setAttribute('src', 'assets/mute.svg');
    } else {
        btnIcon.setAttribute('src', 'assets/unmute.svg');
    }
}

function changeTrack(action){
    if(action == 'prev'){
        PLAYLIST.current--;
        if(PLAYLIST.current < 0) PLAYLIST.current = PLAYLIST.total - 1; 
        console.log(PLAYLIST);
    }

    if(action == 'next'){
        PLAYLIST.current++;
        if(PLAYLIST.current >= PLAYLIST.total) PLAYLIST.current = 0;
        console.log(PLAYLIST);
    }

    openMusicFile(PLAYLIST.current);
    CONTROLS.isPlay = false;
    handleButtonPlay();
}