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
}