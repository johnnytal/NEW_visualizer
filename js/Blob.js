// Basile Pesin
// http://vertmo.github.io

// MetaBalls : p5.js implementation

class Blob {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.xspeed = random(-5, 5) * Math.cos(0.5);
        this.yspeed = random(-5, 5) * Math.sin(0.5);
        this.r = random(100, 200);
    }

    update() {
        this.x += this.xspeed * rndFactor;
        this.y += this.yspeed * rndFactor;
        if (this.x > width || this.x < 0) this.xspeed *= -1;
        if (this.y > height || this.y < 0) this.yspeed *= -1;
    }
}