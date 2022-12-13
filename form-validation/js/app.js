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

function showValidation(index, validation){
    if(validation){
        VALIDATION_ICONS[index].setAttribute('src', 'assets/check.svg');
        VALIDATION_ICONS[index].style.display = 'initial';
        ERROR_MESSAGES[index].style.display = 'none';
    } else {
        VALIDATION_ICONS[index].setAttribute('src', 'assets/error.svg');
        VALIDATION_ICONS[index].style.display = 'initial';
        ERROR_MESSAGES[index].style.display = 'initial';
    }
}

INPUTS.forEach((input, indexInput) => {
    input.addEventListener('input', () => {
        switch(indexInput){
            case 0 :
                verifyInputUser(input.value, indexInput);
                break;
            case 1 :
                verifyInputMail(input.value, indexInput);
                break;
            case 2 :
                //verifyInputPassword(input.value, indexInput);
                break;
            case 3 :
                //verifyInputPasswordConfirm(input.value, indexInput);
                break;    
        }
    });
});

function verifyInputUser(userValue, indexInput){
    INPUTS_VALIDITY.user = userValue.length < 3 ? false : true;
    ERROR_MESSAGES[indexInput].textContent = INPUTS_VALIDITY.user ? '' : 'Votre nom doit contenir au moins 3 caractères.';
    showValidation(indexInput, INPUTS_VALIDITY.user);
}

function verifyInputMail(mailValue, indexInput){
    let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    INPUTS_VALIDITY.mail = mailFormat.test(mailValue);
    ERROR_MESSAGES[indexInput].textContent = INPUTS_VALIDITY.mail ? '' : 'Entrez un email valide.'
    showValidation(indexInput, INPUTS_VALIDITY.mail);
}