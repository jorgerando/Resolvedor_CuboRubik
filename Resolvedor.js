var easycam ;

function setup() {
  createCanvas(400, 400 , WEBGL);
  easycam = createEasyCam() ;
}

function draw() {
  rotateX(PI/3);
  rotateY(PI/3);
  background(0);
  box() ;

}
