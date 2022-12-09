const DISPLAY = {
    workCounter: document.querySelector('.work-counter'),
    restCounter: document.querySelector('.rest-counter'),
    cycleCounter: document.querySelector('.cycle')
}
const BTN_PLAY = document.querySelector('.btn-play');
const BTN_RESET = document.querySelector('.btn-reset');
const COUNTER = {
    work: 1800,  //1800s = 30minutes
    rest: 300, //300s = 5minutes
    cycle: 0
}
let play = false;
