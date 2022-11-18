const PASSWORD = document.querySelector('.password');
const RANGE_DISPLAY = document.querySelector('.range-group label');
const INPUT_RANGE =  document.querySelector('input[type="range"]');
const INPUT_CHECKBOX = [...document.querySelectorAll('input[type="checkbox"')];
const BTN_COPY = document.querySelector('.btn-copy');

RANGE_DISPLAY.textContent = `Taille du mot de passe : ${INPUT_RANGE.value}`;