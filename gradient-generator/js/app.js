const COLOR_LABELS = [...document.querySelectorAll('.input-group label')];
const COLOR_INPUTS = [...document.querySelectorAll('.input-group input')];
const ORIENTATION_INPUT = document.getElementById('orientation');

const GRADIENT = {
    orientation: 90,
    colors: ['#00f6fa', '#fdff8f']
}

COLOR_INPUTS.forEach(input => input.addEventListener('input', handleInputColor));
ORIENTATION_INPUT.addEventListener('input', handleOrientationInput);

function handleInputColor(e){
    let colorIndex = COLOR_INPUTS.indexOf(e.target);
    GRADIENT.colors[colorIndex] = e.target.value;
    applyGradient();
}

function applyGradient(){
    modifyLabels();
    document.body.style.background = `linear-gradient(${GRADIENT.orientation}deg, ${GRADIENT.colors[0]}, ${GRADIENT.colors[1]})`;
}

function modifyLabels(){
    COLOR_LABELS.forEach((label, index) => {
        label.style.backgroundColor = GRADIENT.colors[index];
        label.textContent = GRADIENT.colors[index];
        label.style.color = updateTextColorLabel(GRADIENT.colors[index]);
    });
}

function handleOrientationInput(e){
    GRADIENT.orientation = e.target.value;
    document.querySelector('.range-group label').textContent = `Orientation : ${GRADIENT.orientation}°`;
    applyGradient();
}

function updateTextColorLabel(backgroundColor){
    let red = parseInt(backgroundColor.slice(1,3), 16);
    let green = parseInt(backgroundColor.slice(3,5), 16);
    let blue = parseInt(backgroundColor.slice(5,7), 16);
   
    return (red + green + blue) / 3 < 128 ? '#fff' : '#000';
}