const FORM = document.forms[0];
const INPUTS = [...document.querySelectorAll('input')];
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
        INPUTS.forEach((input, index) => {
            identifyInput(index);
        });
    } else {
        FORM.reset();
        alert('Formulaire validé !');
    }
}

function showValidation(index, validation, message){
    let icon = validation ? 'assets/check.svg' : 'assets/error.svg';
    VALIDATION_ICONS[index].setAttribute('src', icon);
    VALIDATION_ICONS[index].style.display = 'initial';
    ERROR_MESSAGES[index].textContent = message;
}

INPUTS.forEach(input => {
    input.addEventListener('input', identifyInput);
    input.addEventListener('blur', identifyInput);
});

function identifyInput(e){
    let indexInput = e.target ? INPUTS.indexOf(e.target) : e;
    switch(indexInput){
        case 0 :
            verifyInputUser(indexInput);
            break;
        case 1 :
            verifyInputMail(indexInput);
            break;
        case 2 :
            verifyInputPassword(indexInput);
            break;
        case 3 :
            verifyInputPasswordConfirm(indexInput);
            break;    
    }
}

function verifyInputUser(indexInput){
    let userValue = INPUTS[indexInput].value;
    INPUTS_VALIDITY.user = userValue.length < 3 ? false : true;
    let message = INPUTS_VALIDITY.user ? '' : 'Votre nom doit contenir au moins 3 caractères.';
    showValidation(indexInput, INPUTS_VALIDITY.user, message);
}

function verifyInputMail(indexInput){
    let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    INPUTS_VALIDITY.mail = mailFormat.test(INPUTS[indexInput].value);
    let message = INPUTS_VALIDITY.mail ? '' : 'Entrez un email valide.'
    showValidation(indexInput, INPUTS_VALIDITY.mail, message);
}

function verifyInputPassword(indexInput){
    let passwordValue = INPUTS[indexInput].value;
    let passwordCondition = [];
    passwordCondition.push(new RegExp("[a-z]").test(passwordValue));
    passwordCondition.push(new RegExp("[A-Z]").test(passwordValue));
    passwordCondition.push(new RegExp("[0-9]").test(passwordValue));
    passwordCondition.push(new RegExp("[^a-zA-Z0-9]").test(passwordValue));
    passwordCondition.push(passwordValue.length >= 6 ? true : false);

    let failedCondition = passwordCondition.filter(condition => !condition);
    let message = '';

    if(failedCondition.length){
        INPUTS_VALIDITY.password = false;
        message = showRequiredElements(passwordCondition);
        showPasswordStrength(0);
    } else {
        INPUTS_VALIDITY.password = true;
        showPasswordStrength(passwordValue.length);
    }
    showValidation(indexInput, INPUTS_VALIDITY.password, message);
    if(INPUTS[indexInput + 1].value != '') verifyInputPasswordConfirm(indexInput + 1);
}

function showPasswordStrength(passwordLength){
    let passwordStatut = document.querySelectorAll('.password-statut span');
    
    if(passwordLength == 0) {
        passwordStatut.forEach(statut => statut.style.display = 'none');
        return;
    }
    // <= 8 faible,  <= 12 moyen, > 12 fort
    passwordStatut[0].style.display = 'initial';
    if(passwordLength > 8) passwordStatut[1].style.display = 'initial';
    if(passwordLength > 12) passwordStatut[2].style.display = 'initial';
}

function showRequiredElements(passwordCondition){
    let require = [];
    if(!passwordCondition[0]) require.push('minuscule');
    if(!passwordCondition[1]) require.push('majuscule');
    if(!passwordCondition[2]) require.push('chiffre');
    if(!passwordCondition[3]) require.push('symbole');
    if(!passwordCondition[4]) require.push('6 caractères minimum');

    let requireMessage = 'Manque : ';

    for(let i = 0; i < require.length; i++){
        requireMessage += require[i];
        requireMessage += i != require.length - 1 ? ', ' : '.';
    }
    return requireMessage;
}

function verifyInputPasswordConfirm(indexInput){
    let passwordConfirmValue = INPUTS[indexInput].value;
    let passwordValue = INPUTS[indexInput -1].value;
    let message = '';
    if(passwordConfirmValue != '' && passwordConfirmValue == passwordValue){
        INPUTS_VALIDITY.passwordConfirm = true;
    } else {
        INPUTS_VALIDITY.passwordConfirm = false;
        message = 'Confirmation du mot de passe incorrecte.';
    }
    showValidation(indexInput, INPUTS_VALIDITY.passwordConfirm, message);
}