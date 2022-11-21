const VIDEO = document.querySelector('video');
const BTN = {
    play: document.querySelector('.btn-play'),
    mute: document.querySelector('.btn-mute'),
    fullscren: document.querySelector('.btn-fullscreen'),
    volume: document.querySelector('input[type="range"]')
};
const TIME = {
    current: document.querySelector('.current-time'),
    duration: document.querySelector('.duration-time')
};
const CONTROLS = {
    isPlay: false,
    isMute: false,
    isFullscreen: false
};