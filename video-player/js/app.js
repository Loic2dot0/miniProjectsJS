const VIDEO = document.querySelector('video');
const BTN = {
    play: document.querySelector('.btn-play'),
    mute: document.querySelector('.btn-mute'),
    fullscreen: document.querySelector('.btn-fullscreen'),
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

VIDEO.addEventListener('loadeddata', displayDurationTime);
VIDEO.addEventListener('click', onClickPlay);
BTN.play.addEventListener('click', onClickPlay);
BTN.mute.addEventListener('click', onClickMute);

function displayDurationTime(){
    TIME.duration.textContent = convertSecondesToHHMMSS(VIDEO.duration);
}

function convertSecondesToHHMMSS(timeInSecondes){
    let hours = Math.floor(timeInSecondes / 3600);
    let minutes = Math.floor((timeInSecondes - hours * 3600)/ 60);
    let secondes = Math.floor(timeInSecondes - hours * 3600 - minutes * 60);
    
    if(minutes < 10) minutes = `0${minutes}`;
    if(secondes < 10) secondes = `0${secondes}`;
    return hours == 0 ? `${minutes}:${secondes}` : `${hours}:${minutes}:${secondes}`;
}

function onClickPlay(){
    CONTROLS.isPlay = !CONTROLS.isPlay;

    if(CONTROLS.isPlay){
        VIDEO.play()
            .then(()=>{
                togglePlayIcon();
            })
            .catch(err =>{
                console.log(err);
                alert('Une erreur de lecture est survenue');
            });
    } else{
        VIDEO.pause();
        togglePlayIcon();
    }
}

function togglePlayIcon(){
    if(CONTROLS.isPlay){
        document.querySelector('.btn-play img').setAttribute('src', 'assets/pause.svg');
    } else{
        document.querySelector('.btn-play img').setAttribute('src', 'assets/play.svg');
    }
}

function onClickMute(){
    CONTROLS.isMute = !CONTROLS.isMute;
    VIDEO.muted = CONTROLS.isMute;
    toggleMuteIcon();
}

function toggleMuteIcon(){
    if(CONTROLS.isMute){
        document.querySelector('.btn-mute img').setAttribute('src', 'assets/mute.svg');
    } else{
        document.querySelector('.btn-mute img').setAttribute('src', 'assets/unmute.svg');
    }
}