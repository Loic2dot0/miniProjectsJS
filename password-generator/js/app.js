const PASSWORD = document.querySelector('.password');
const RANGE_DISPLAY = document.querySelector('.range-group label');
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

function addCharactersSet(fromCode, toCode){
    let charactersList = '';
    for(let i= fromCode; i <= toCode; i++){
        charactersList += String.fromCharCode(i);
    }
    return charactersList;
}