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

BUTTONS.forEach(button => button.addEventListener('click', handleButton));

function handleButton(e){
    switch(e.target.dataset.control){
        case 'shuffle':
            console.log('shuffle');
            break;
        case 'prev':
            console.log('prev');
            break;
        case 'play':
            console.log('play');
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