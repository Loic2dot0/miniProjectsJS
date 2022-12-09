const DISPLAY = {
    workCounter: document.querySelector('.work-counter'),
    restCounter: document.querySelector('.rest-counter'),
    cycleCounter: document.querySelector('.cycle')
}
const BTN_PLAY = document.querySelector('.btn-play');
const BTN_RESET = document.querySelector('.btn-reset');
const TIMER_INIT = {
    work: 1800, //1800s = 30minutes
    rest: 300 //300s = 5minutes
}
const COUNTER = {
    work: 0,  
    rest: 0, 
    cycle: 0
}
let play = false;

init();

function init(){
    COUNTER.work = TIMER_INIT.work;
    COUNTER.rest = TIMER_INIT.rest;
    COUNTER.cycle = 0;
    play = false;

    DISPLAY.workCounter.textContent = COUNTER.work;
    DISPLAY.restCounter.textContent = COUNTER.rest;
    DISPLAY.cycle.textContent = COUNTER.cycle;
}