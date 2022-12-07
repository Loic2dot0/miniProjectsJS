const CANVAS = document.querySelector('canvas');
const CTX = CANVAS.getContext('2d');

CANVAS.width = window.innerWidth;
CANVAS.height = window.innerHeight;

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

function init(){
    particleArray = [];
    let particlesNumber = CANVAS.width * CANVAS.height / 9000;
    let particleColor = '#fff';

    for(let i = 0; i < particlesNumber; i++){
        let x;
        let y;
        let directionX;
        let directionY;
        let size;

        particleArray.push(new Particle(x, y, directionX, directionY, size, particleColor));
    }  
}
