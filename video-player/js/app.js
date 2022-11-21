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
BTN.play.addEventListener('click', onClickPlay);

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
                console.log('lecture en cours');
            })
            .catch(err =>{
                console.log(err);
                alert('Une erreur de lecture est survenue');
            });
    } else{
        VIDEO.pause();
        console.log('lecture en pause');
    }
}