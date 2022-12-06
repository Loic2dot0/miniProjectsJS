const CAT_API = 'https://api.thecatapi.com/v1/images/search?limit=10';
const FLUX = document.querySelector('.main-flux');
const MESSAGE = document.querySelector('.message');
const BUTTON = document.querySelector('.to-top');

window.addEventListener('load', getAPIResult);
BUTTON.addEventListener('click', scrollToTop);

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
            handleResult(res);
        })
        .catch(err => {
            console.log(err.message);
            MESSAGE.textContent = err.message;
        });
}

function handleResult(results){
    results.forEach(result => {
        let newImg = document.createElement('img');
        newImg.setAttribute('src', result.url);
        newImg.setAttribute('alt', 'Une image de chat');
        FLUX.appendChild(newImg);
    });
}

function scrollToTop(){
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

const TARGET = document.querySelector('.scroll-marker');
const OBSERVER = new IntersectionObserver(handleIntersect, {
    root: null,
    rootMargin: '50%',
    threshold: 0
});

OBSERVER.observe(TARGET);

function handleIntersect(entries){
    if(window.scrollY > window.innerHeight / 2 && entries[0].isIntersecting){
        console.log('déclenchement');
        getAPIResult();
    }
}