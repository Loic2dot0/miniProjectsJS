const PASSWORD = document.querySelector('.password');
const RANGE_DISPLAY = document.querySelector('.range-group label');
const MESSAGE = document.querySelector('.message');
const INPUT_RANGE =  document.querySelector('input[type="range"]');
const INPUT_CHECKBOX = [...document.querySelectorAll('input[type="checkbox"')];
const BTN_COPY = document.querySelector('.btn-copy');

RANGE_DISPLAY.textContent = `Taille du mot de passe : ${INPUT_RANGE.value}`;

// charactersSet=[lowercase, uppercase, number. special]
const CHARACTERS_SET = [
    addCharactersSet(97, 122),
    addCharactersSet(65, 90),
    addCharactersSet(48, 57),
    addCharactersSet(33, 47) + addCharactersSet(58, 64) + addCharactersSet(91, 96) + addCharactersSet(123, 126)
];

createPassword();

document.forms[0].addEventListener('submit', handleSubmit);
INPUT_RANGE.addEventListener('input', handleRange);

function handleSubmit(e){
    e.preventDefault();
    createPassword();
}

function handleRange(e){
    RANGE_DISPLAY.textContent = `Taille du mot de passe : ${e.target.value}`;
}

function addCharactersSet(fromCode, toCode){
    let charactersList = '';
    for(let i= fromCode; i <= toCode; i++){
        charactersList += String.fromCharCode(i);
    }
    return charactersList;
}

function createPassword(){
    MESSAGE.textContent = ''
    let concatenatedCharactersSet = checkedCharactersSet();

    if(concatenatedCharactersSet.length == 0) {
        MESSAGE.textContent = 'Vous devez cocher au minimum 1 case.';
        return;
    }

    let passwordBase = [];
    INPUT_CHECKBOX.forEach((input, index) => {
        if(input.checked) passwordBase.push(CHARACTERS_SET[index][getRandomNumber(0, CHARACTERS_SET[index].length - 1)]);
    });

    let password = '';
    let passwordLength = INPUT_RANGE.value;
    
    for(let i = passwordBase.length + 1; i<= passwordLength; i++){
        password += concatenatedCharactersSet[getRandomNumber(0, concatenatedCharactersSet.length - 1)];
    }
    
    passwordBase.forEach((item, index)=>{
        let randomIndex = getRandomNumber(0, password.length - 1);
        password = password.slice(0 , randomIndex) + passwordBase[index] + password.slice(randomIndex);
    });

    PASSWORD.textContent = password;
}

function checkedCharactersSet(){
    let concatenatedCharactersSet = '';
    
    INPUT_CHECKBOX.forEach((input, index) => {
        if(input.checked) concatenatedCharactersSet += CHARACTERS_SET[index];
    })
    
    return concatenatedCharactersSet;
}

function getRandomNumber(min, max){
    let randomNumber = crypto.getRandomValues(new Uint32Array(1))[0];
    randomNumber = randomNumber / 4294967296;
    return Math.floor(randomNumber * (max - min +1)) + min;
};