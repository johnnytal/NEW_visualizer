largestValue = 0;
largestFreq = 0;
averageValue = 0;
dominance = 0;

array = [];

rndFactor = 0.5;
rndShape = 0.1;

function setup() {
  p5.disableFriendlyErrors = true;
	
  createCanvas(1420, 800, WEBGL);
  
  setTimeout(function(){
	webaudio_tooling_obj ();
  }, 500);
  
  setInterval(function(){
  	rndFactor = Math.random();
  	rndShape = Math.random();
  }, 8000);
}

function draw() {
  background(255 - 125 * rndFactor, 255 - Math.round(averageValue / 4), 255 - Math.round(largestFreq * 1.5));
  
  rotateY(frameCount * (rndFactor * 0.075));
  rotateX(frameCount * (rndFactor * 0.025));

  for (let j = 0; j < 6; j++) {
    push();
    for (let i = 0; i < averageValue * 5 * rndFactor; i++) {
      translate(
        cos(frameCount * 0.1 + j) * (300 * rndFactor),
        sin(frameCount * 0.001 + j + rndFactor) * (450 * rndFactor),
        i * 0.1 + rndFactor
      );
      rotateZ(frameCount * 0.002);
      push();
      
      let c = color(array[i], averageValue, largestFreq);
      fill(c);
      
      if (averageValue > 100){
      	sphere(2 + array[i] / 9, 6, 6);
      }
      if (dominance > 15){
      	torus(2 + array[i] / 6, 8, 6, 8);
      }
      if (largestFreq < 15){
      	ellipsoid(2 + array[i] / 4, 1 + array[i] / 4, 30 * rndFactor, 4, 7);
      }
      if (array[i] > largestFreq){
      	cone(array[i] / 10, largestFreq * 2, 8, 5, dominance);
      }
      if (largestFreq < dominance){
      	cylinder(array[i], 100, 4, 6, 15, 20 * rndFactor);
      }
      else if (averageValue < largestFreq * 2){
      	box(largestFreq * 2, rndFactor * 200, 21, 4 * rndFactor, 2 * rndFactor);
      }
      else if (largestFreq < 10){
      	plane(75, largestFreq * 1.5, 1, 1);
	  }
      pop();
    }
    pop();
  }
}
