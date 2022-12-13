const FORM = document.forms[0];
const INPUTS = document.querySelectorAll('input');
const VALIDATION_ICONS = document.querySelectorAll('.validation-icon');
const ERROR_MESSAGES = document.querySelectorAll('.error-message');
const INPUTS_VALIDITY = {
    user: false,
    mail: false,
    password: false,
    passwordConfirm: false
};

FORM.addEventListener('submit', handleForm);

function handleForm(e){
    e.preventDefault();
    
    let keysInputValididy = Object.keys(INPUTS_VALIDITY);
    let failedInputs = keysInputValididy.filter(key => !INPUTS_VALIDITY[key]);
    
    if(failedInputs.length){
        //traitement des inputs incorrects
    } else {
        FORM.reset();
        alert('Formulaire validé !');
    }
}