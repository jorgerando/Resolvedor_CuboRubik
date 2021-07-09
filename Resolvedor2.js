
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
   strokeWeight(3);
   stroke(0);
   beginShape();
   vertex(this.p1.x,this.p1.y,this.p1.z);
   vertex(this.p2.x,this.p2.y,this.p2.z);
   vertex(this.p3.x,this.p3.y,this.p3.z);
   vertex(this.p4.x,this.p4.y,this.p4.z);
   vertex(this.p1.x,this.p1.y,this.p1.z);
   endShape();

  }
}

class Plano{

  constructor(colores , lado , punto , vectorUnitarioA , vectorUnitarioB ){

   this.colores = [ [[ 255,255,255],[ 255,255,255],[ 255,255,255]], [[ 255,255,255],[ 255,255,255],[ 255,255,255]] , [[ 255,255,255],[ 255,255,255],[ 255,255,255] ] ] ;;
   this.lado = lado ;
   this.incremento = lado/3 ;
   this.origen = punto ;
   this.uniA = vectorUnitarioA ;
   this.uniB = vectorUnitarioB ;
   this.calcularCentro() ;

  }

  calcularCentro(){

    var A = this.uniA.copy().mult(this.lado/2) ;
    var B = this.uniB.copy().mult(this.lado/2) ;
    this.centro = A.add(B);
  }

  colorear(colores , n_rotaciones ){

    for(var i = 0 ; i < n_rotaciones ; i++ ){
      colores = this.rotarMatriz(colores);
    }
    this.colores = colores ;
  }

  rotarMatriz(matriz){

  var nuevamatriz =  [ ["0","0","0"] , ["0","0","0"] ,[ "0" , "0" , "0" ] ] ;
  for (var x=0 ; x<matriz.length ;x++) {
   for (var y=0 ; y<matriz.length ;y++) {
    nuevamatriz[y][matriz.length-1-x] = matriz[x][y];
    }
   }

   return nuevamatriz ;

  }

  calcularPuntos(){
    var puntos = []

    for (var y = 0 ; y < 4 ; y++) {
      var fila = []
      for (var x = 0 ; x < 4 ; x++) {
          var punto_a = this.origen.copy().add(this.uniA.copy().mult(x*this.incremento)).add(this.uniB.copy().mult(y*this.incremento));
          fila.push(punto_a) ;
          //point(punto_a)
      }
      puntos.push(fila) ;
    }

   return puntos ;
  }

  dibujar(){

   var puntos = this.calcularPuntos() ;
   var tapas = [] ;
   var color = [255,0,0];

   for ( var y = 0 ; y < 3 ; y++){
      for( var x = 0 ; x < 3 ; x++ ){

          var A = puntos[x][y] ;
          var B = puntos[x+1][y] ;
          var C = puntos[x][y+1] ;
          var D = puntos[x+1][y+1] ;

          var posicion = [A,B,D,C] ;
          var tapa_a = new Tapa(this.colores[x][y] ,posicion) ;
          tapas.push(tapa_a);
      }
   }


   for ( var i = 0 ; i < tapas.length; i++ ){
       tapas[i].dibujar() ;
   }


  }


}

var easycam ;
var lado = 200
var rojo = [255,0,0];
var azul = [0,255,0];
var verde = [0,0,255];
colores =[ [rojo,rojo,rojo ], [azul,azul,azul] , [verde,verde,verde ] ] ;

var plano1 = new Plano(colores,lado , new p5.Vector(0,0,0) ,new p5.Vector(1,0,0) , new p5.Vector(0,1,0) ) ;
var plano2 = new Plano(colores,lado , new p5.Vector(0,0,0) ,new p5.Vector(1,0,0) , new p5.Vector(0,0,1) ) ;
var plano3 = new Plano(colores,lado , new p5.Vector(0,0,0) ,new p5.Vector(0,1,0) , new p5.Vector(0,0,1) ) ;

var plano4 = new Plano(colores,lado , new p5.Vector(lado,lado,lado) ,new p5.Vector(-1,0,0) , new p5.Vector(0,-1,0) ) ;
plano4.colorear(colores,4);
var plano5 = new Plano(colores,lado , new p5.Vector(lado,lado,lado) ,new p5.Vector(-1,0,0) , new p5.Vector(0,0,-1) ) ;
var plano6 = new Plano(colores,lado , new p5.Vector(lado,lado,lado) ,new p5.Vector(0,-1,0) , new p5.Vector(0,0,-1) ) ;

var angulo = 0;
function setup() {
  createCanvas(800, 800 , WEBGL);
  easycam = createEasyCam() ;
}

function draw() {

  rotateX(PI/3);
  rotateY(PI/3);
  background(255);
  stroke(0);
  line(0,0,0,300,0,0) ;
  line(0,0,0,0,300,0) ;
  line(0,0,0,0,0,300) ;

  plano1.dibujar() ;
  plano2.dibujar() ;
  plano3.dibujar() ;

  plano4.dibujar() ;
  plano5.dibujar() ;
  plano6.dibujar() ;



}
