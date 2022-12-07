const CANVAS = document.querySelector('canvas');
const CTX = CANVAS.getContext('2d');

class Particle {
    constructor(x, y, directionX, directionY, size, color){
        this.x = x,
        this.y = y,
        this.directionX = directionX,
        this.directionY = directionY,
        this.size = size,
        this.color = color
    }
    draw(){
        CTX.beginPath();
        CTX.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
        CTX.fillStyle = this.color;
        CTX.fill();
    }
    update(){
        if(this.x < 0 || this.x > CANVAS.width){
            this.directionX = -this.directionX;
        }
        if(this.y < 0 || this.y > CANVAS.height){
            this.directionY = -this.directionY;
        }
        
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

let particleArray;

init();
animateParticles();

window.addEventListener('resize', init);

function init(){
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;
    particleArray = [];
    let particlesNumber = CANVAS.width * CANVAS.height / 9000;
    let particleColor = '#fff';

    for(let i = 0; i < particlesNumber; i++){
        let x = getRandomNumber(10, CANVAS.width - 10);
        let y = getRandomNumber(10, CANVAS.height - 10);
        let directionX = getRandomDirection();
        let directionY = getRandomDirection();
        let size = getRandomNumber(1, 3);

        particleArray.push(new Particle(x, y, directionX, directionY, size, particleColor));
    }
}

function getRandomNumber(min, max){
    return Math.random() * (max - min) + min;
}

function getRandomDirection(){
    if(Math.floor(Math.random() * 2)){
        return getRandomNumber(0.5, 1.5);
    } else {
        return -getRandomNumber(0.5, 1.5);
    }
}

function animateParticles(){
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

    particleArray.forEach(particle => particle.update());

    requestAnimationFrame(animateParticles);
}