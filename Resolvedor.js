
class Tapa {

  constructor( color , posicion ){

   this.color = color ;

   this.p1 = posicion[0] ;
   this.p2 = posicion[1] ;
   this.p3 = posicion[2] ;
   this.p4 = posicion[3] ;

  }

  cambiarColor(color_n){
    this.color = color_n
  }

  dibujar(){

   fill( this.color[0] , this.color[1] , this.color[2] );
   stroke(0);
   beginShape();
   vertex(this.p1[0],this.p1[1],this.p1[2]);
   vertex(this.p2[0],this.p2[1],this.p2[2]);
   vertex(this.p3[0],this.p3[1],this.p3[2]);
   vertex(this.p4[0],this.p4[1],this.p4[2]);
   vertex(this.p1[0],this.p1[1],this.p1[2]);
   endShape();

  }
}

var easycam ;
lado = 100 ;
color=[255,0,0];
posicion = [ [0,0,0] ,[lado,0,0], [lado,0,lado], [0,0,lado] ];

tapa1 = new Tapa(color,posicion);

function setup() {
  createCanvas(400, 400 , WEBGL);
  easycam = createEasyCam() ;
}

function draw() {
  translate(-lado,0,-lado)
  rotateX(PI/3);
  rotateY(PI/3);
  background(255);
  tapa1.dibujar();


}
