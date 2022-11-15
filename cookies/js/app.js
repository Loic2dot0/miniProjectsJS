const FORM = document.forms[0];
const BTN_DISPLAY = document.getElementById('btn-display');
const INPUTS = document.querySelectorAll('input');
const COOKIES_LIST = document.querySelector('.cookies-list');
const TOAST_CONTAINER = document.querySelector('.toast-container');
let isCookiesDisplay = false;

FORM.addEventListener('submit', handleForm);
BTN_DISPLAY.addEventListener('click', toggleDisplay);

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

    newCookie.expires = new Date(Date.now() + 24*60*60*1000);  //expire dans 24h

    createCookie(newCookie);
    displayCookiesList();
    FORM.reset();
}

function createCookie(cookie){
    if(doesCookieExist(cookie.name)){
        createToast({cookieName : cookie.name, state : 'modify'});
    } else{
        createToast({cookieName : cookie.name, state : 'create'});
    }
    document.cookie = `${encodeURIComponent(cookie.name)}=${encodeURIComponent(cookie.value)};expires=${cookie.expires}`;
}

function doesCookieExist(cookieName){
    if(document.cookie == '') return false;

    let cookies = document.cookie.split('; ');
    let cookiesNames = cookies.map(cookie => cookie.split('=')[0]);
    return cookiesNames.includes(encodeURIComponent(cookieName));
}

function createToast({cookieName, state}){ //state : 'create', 'modify', 'delete'
    let toast = document.createElement('p');
    const TOAST_STATES = {
        create: {
            value: 'créé',
            backgroundColor: '#d1e7dd',
            color: '#0f5132'
        },
        modify: {
            value: 'modifié',
            backgroundColor: '#fff3cd',
            color: '#664d03'
        },
        delete: {
            value: 'supprimé',
            backgroundColor: '#f8d7da',
            color: '#842029'
        }
    }

    toast.textContent = `Cookie ${cookieName} ${TOAST_STATES[state].value}.`;
    toast.style.backgroundColor = TOAST_STATES[state].backgroundColor;
    toast.style.color = TOAST_STATES[state].color;
    TOAST_CONTAINER.appendChild(toast);
    setTimeout(()=>{
        TOAST_CONTAINER.removeChild(toast);
    }, 2000);
}

function displayCookiesList(){
    COOKIES_LIST.textContent = '';

    if(!isCookiesDisplay) return;

    if(document.cookie == '') {
        COOKIES_LIST.textContent = "Il n'y a aucun cookie à afficher.";
    }
    else {
        let cookiesList = document.cookie.split('; ').reverse();
        createCookieCard(cookiesList);
    };
}

function createCookieCard(cookiesList){
    cookiesList.forEach(cookie => {
        let cookieCard = document.createElement('div');
        cookieCard.classList.add('cookie-card');
        cookieCard.innerHTML = `
            <p><span>Nom :</span> ${decodeURIComponent(cookie.split('=')[0])}</p>
            <p><span>Valeur :</span> ${decodeURIComponent(cookie.split('=')[1])}</p>
            <button>X</button>`;
        
        cookieCard.querySelector('button').addEventListener('click', e =>{
            document.cookie = `${cookie.split('=')[0]}=;expires=${new Date(0)}`;
            e.target.parentElement.remove();
            createToast({cookieName : decodeURIComponent(cookie.split('=')[0]), state : 'delete'});
            displayCookiesList();
        });

        COOKIES_LIST.appendChild(cookieCard);
    });
}

function toggleDisplay(e){
    isCookiesDisplay = !isCookiesDisplay;
    isCookiesDisplay ? e.target.textContent = 'Masquer' : e.target.textContent = 'Afficher';
    displayCookiesList();
}