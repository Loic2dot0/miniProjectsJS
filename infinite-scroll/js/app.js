const CAT_API = 'https://api.thecatapi.com/v1/images/search?limit=10';
const FLUX = document.querySelector('.main-flux');
const MESSAGE = document.querySelector('.message');
const BUTTON = document.querySelector('.to-top');

window.addEventListener('load', getAPIResult);

function getAPIResult(){
    MESSAGE.textContent = '';

    fetch(CAT_API)
        .then(res => {
            if(!res.ok) {
                throw new Error('Oups... une erreur est survenue');
            }        
            return res.json();
        })
        .then(res =>{
            if(res.length == 0) throw new Error('Désolé mais aucun chat n\'est disponible');
            console.log(res);
        })
        .catch(err => {
            console.log(err.message);
            MESSAGE.textContent = err.message;
        });
}