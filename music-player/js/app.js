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
    isShuffle: false,
    isMute: false
};
const PLAYLIST = {
    current: 0,
    total: MUSICS_DATA.length
}

window.addEventListener('load', initPlaylist);
AUDIO.addEventListener('loadeddata', updateDurationTime);
AUDIO.addEventListener('timeupdate', updateCurrentTime);
BUTTONS.forEach(button => button.addEventListener('click', handleButton));

function initPlaylist(){
    DISPLAY.playlistTotal.textContent = PLAYLIST.total;
    openMusicFile(PLAYLIST.current);
}

function handleButton(e){
    switch(e.target.dataset.control){
        case 'shuffle':
            console.log('shuffle');
            break;
        case 'prev':
            console.log('prev');
            break;
        case 'play':
            handleButtonPlay();
            break;
        case 'next':
            console.log('next');
            break;
        case 'sound-down':
            console.log('sound-down');
            break;
        case 'sound-mute':
            console.log('sound-mute');
            break;
        case 'sound-up':
            console.log('sound-up');
            break;
    }
}

function handleButtonPlay(){
    if(!CONTROLS.isPlay){
        AUDIO.play()
            .then(()=>{
                CONTROLS.isPlay = true;
            })
            .catch(err=>{
                console.log(err);
                alert('Une erreur de lecture est survenue.')
            });
    } else {
        AUDIO.pause();
        CONTROLS.isPlay = false;
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