const COLOR_LABELS = [...document.querySelectorAll('.input-group label')];
const COLOR_INPUTS = [...document.querySelectorAll('.input-group input')];

const GRADIENT = {
    orientation: 90,
    colors: ['#00f6fa', '#fdff8f']
}

COLOR_INPUTS.forEach(input => input.addEventListener('input', handleInputColor));

function handleInputColor(e){
    console.log(e.target.value);
    console.log(e.target);
    let colorIndex = COLOR_INPUTS.indexOf(e.target);
    GRADIENT.colors[colorIndex] = e.target.value;
    
    applyGradient();
}

function applyGradient(){
    document.body.style.background = `linear-gradient(${GRADIENT.orientation}deg, ${GRADIENT.colors[0]}, ${GRADIENT.colors[1]})`;
}