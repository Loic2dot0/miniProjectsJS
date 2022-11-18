const COLOR_LABELS = [...document.querySelectorAll('.input-group label')];
const COLOR_INPUTS = [...document.querySelectorAll('.input-group input')];
const ORIENTATION_INPUT = document.getElementById('orientation');
const BTN_COPY = document.querySelector('.btn-copy');
const BTN_RANDOM = document.querySelector('.btn-random');

const GRADIENT = {
    orientation: 90,
    colors: ['#00f6fa', '#fdff8f']
}

getRandomGradient();

COLOR_INPUTS.forEach(input => input.addEventListener('input', handleInputColor));
ORIENTATION_INPUT.addEventListener('input', handleOrientationInput);
BTN_RANDOM.addEventListener('click', getRandomGradient);
BTN_COPY.addEventListener('click', copyToClipboard);

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
    document.querySelector('.range-group label').textContent = `Orientation : ${GRADIENT.orientation}°`;
}

function handleOrientationInput(e){
    GRADIENT.orientation = e.target.value;
    applyGradient();
}

function updateTextColorLabel(backgroundColor){
    let red = parseInt(backgroundColor.slice(1,3), 16);
    let green = parseInt(backgroundColor.slice(3,5), 16);
    let blue = parseInt(backgroundColor.slice(5,7), 16);
   
    return (red + green + blue) / 3 < 128 ? '#fff' : '#000';
}

function getRandomGradient(){
    GRADIENT.colors.forEach((color, index) => {
        GRADIENT.colors[index] = getRandomColor();
        COLOR_INPUTS[index].value = GRADIENT.colors[index];
    });

    GRADIENT.orientation = getRandomNumber(0, 360);
    ORIENTATION_INPUT.value = GRADIENT.orientation;
    applyGradient();
}

function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor(){
    let color = getRandomNumber(0, 16777215).toString(16);
    while(color.length < 6){
        color = '0' + color;
    }
    return '#' + color;
}

let lockCopy = false;

function copyToClipboard(){
    if(!navigator.clipboard){
        alert('Désolé mais votre navigateur ne supporte pas l\'API clipboard');
        return;
    }

    if(lockCopy) return;

    lockCopy = true;
    let gradient = `linear-gradient(${GRADIENT.orientation}deg, ${GRADIENT.colors[0]}, ${GRADIENT.colors[1]})`;

    navigator.clipboard.writeText(gradient).then(
        () =>{
            BTN_COPY.classList.add('active');
            setTimeout(()=>{
                BTN_COPY.classList.remove('active');
                lockCopy = false;
            }, 1000);
        },
        ()=>{
            alert('Le texte n\'a pas pu être copié dans le presse-papiers');
        }
    );
}