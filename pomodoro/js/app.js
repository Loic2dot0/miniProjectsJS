const DISPLAY = {
    workCounter: document.querySelector('.work-counter'),
    restCounter: document.querySelector('.rest-counter'),
    cycleCounter: document.querySelector('.cycle')
}
const BTN_PLAY = document.querySelector('.btn-play');
const BTN_RESET = document.querySelector('.btn-reset');
const TIMER_INIT = {
    work: 10, //1800s = 30minutes
    rest: 10, //300s = 5minutes
    timerID: null,
}
const COUNTER = {
    work: 0,  
    rest: 0, 
    cycle: 0
}
let play = false;
let startedTimer = false;

init();

function init(){
    COUNTER.work = TIMER_INIT.work;
    COUNTER.rest = TIMER_INIT.rest;
    COUNTER.cycle = 0;
    play = false;
    startedTimer = false;
    clearInterval(TIMER_INIT.timerID);
    toggleIconPlayBTN();
    DISPLAY.workCounter.textContent = convertSecondesToHHMMSS(COUNTER.work);
    DISPLAY.restCounter.textContent = convertSecondesToHHMMSS(COUNTER.rest);
    DISPLAY.cycleCounter.textContent = `Cycle(s): ${COUNTER.cycle}`;
}

function convertSecondesToHHMMSS(timeInSecondes){
    let hours = Math.floor(timeInSecondes / 3600);
    let minutes = Math.floor((timeInSecondes - hours * 3600)/ 60);
    let secondes = Math.floor(timeInSecondes - hours * 3600 - minutes * 60);
    
    if(minutes < 10 && hours > 0) minutes = `0${minutes}`;
    if(secondes < 10) secondes = `0${secondes}`;
    return hours == 0 ? `${minutes}:${secondes}` : `${hours}:${minutes}:${secondes}`;
}

BTN_PLAY.addEventListener('click', handlePlayBTN);
BTN_RESET.addEventListener('click', init);

function handlePlayBTN(){
    play = !play;
    toggleIconPlayBTN();

    if(startedTimer) return;
    startedTimer = true;
    TIMER_INIT.timerID = setInterval(handlePomodoro, 1000);
}

function toggleIconPlayBTN(){
    let icon = play ? 'assets/pause.svg' : 'assets/play.svg';
    document.querySelector('.btn-play img').setAttribute('src', icon);
}

function handlePomodoro(){
    if(!play) return;

    if(COUNTER.work > 0){
        COUNTER.work--;
        DISPLAY.workCounter.textContent = convertSecondesToHHMMSS(COUNTER.work);
    } else if(COUNTER.rest > 0){
        COUNTER.rest--;
        DISPLAY.restCounter.textContent = convertSecondesToHHMMSS(COUNTER.rest);
    } else {
        COUNTER.work = TIMER_INIT.work - 1;
        COUNTER.rest = TIMER_INIT.rest;
        DISPLAY.workCounter.textContent = convertSecondesToHHMMSS(COUNTER.work);
        DISPLAY.restCounter.textContent = convertSecondesToHHMMSS(COUNTER.rest);
        COUNTER.cycle++;
        DISPLAY.cycleCounter.textContent = `Cycle(s): ${COUNTER.cycle}`;
    }
}