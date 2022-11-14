const FORM = document.forms[0];
const INPUTS = document.querySelectorAll('input');
const COOKIES_LIST = document.querySelector('.cookies-list');

FORM.addEventListener('submit', handleForm);

function handleForm(e){
    e.preventDefault();

    let validInputs= [];
    let newCookie = {};

    INPUTS.forEach(input => {
        if(input.value == '') {
            validInputs.push(false);
            input.style.backgroundColor = "#f8d7da";
        } else{
            let newAttribut = input.getAttribute('name');
            newCookie[newAttribut] = input.value;
            input.style.backgroundColor = "#fff";
        }
    });

    if(validInputs.includes(false)) return;

    console.log(newCookie);
}

console.log(document.cookie);