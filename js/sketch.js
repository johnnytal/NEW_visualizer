// Basile Pesin
// http://vertmo.github.io

// MetaBalls : p5.js implementation

var blobs = [];
  
largestValue = 0;
largestFreq = 0;
averageValue = 0;
dominance = 0;

array = [];

rndFactor = 0;
    
function setup() {
    createCanvas(600, 400);
    colorMode(HSB);
    
    for(n=0; n<1; n++){
    	blobs.push(new Blob(300, 200));
    }
    
    setTimeout(function(){
    	webaudio_tooling_obj ();
    }, 500);
    
    setInterval(function(){
    	
    	rndFactor = Math.random() * 100;
    	
    	if (rndFactor > 85 && blobs.length > 8){
		    for(n=0; n < 100 - rndFactor; n++){
		    	blobs.pop();
		    }
    	}
    	else{
    		for(n=0; n< averageValue/20; n++){
    			blobs.push(new Blob(largestFreq * 15, 600 / dominance));
    		}
    	}

    }, 1000);
}

function draw() {


    loadPixels();
    for (x = 0; x < width; x++) {
        for (y = 0; y < height; y++) {
            let sum = 0;
            for (i = 0; i < blobs.length; i++) {
                let xdif = x - blobs[i].x;
                let ydif = y - blobs[i].y;
                let d = sqrt((xdif * xdif) + (ydif * ydif));
                sum += 6 * blobs[i].r / d;
            }
            set(x, y, color(sum - rndFactor + largestFreq, 255 - sum / largestFreq, sum - largestFreq));
        }
    }
    updatePixels();

    for (i = 0; i < blobs.length; i++) {
        blobs[i].update();
    }
}