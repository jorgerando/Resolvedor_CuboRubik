
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
   vertex(this.p1.x,this.p1.y,this.p1.z);
   vertex(this.p2.x,this.p2.y,this.p2.z);
   vertex(this.p3.x,this.p3.y,this.p3.z);
   vertex(this.p4.x,this.p4.y,this.p4.z);
   vertex(this.p1.x,this.p1.y,this.p1.z);
   endShape();

  }
}

class Plano{

  constructor(colores , posicion ){

   this.colores = colores ;

   this.A = posicion[0] ;
   this.B = posicion[1] ;
   this.C = posicion[2] ;
   this.D = posicion[3] ;

   //   A-----B
   //   |     |
   //   C-----D

  }

  calcularPuntos(){

   var AB = this.B.get().sub( this.A.get() ) ;
   var AC = this.C.get().sub( this.A.get() ) ;
   var CD = this.D.get().sub( this.C.get() ) ;
   var BD = this.D.get().sub( this.B.get() ) ;
   var AD = this.D.get().sub( this.A.get() ) ;
   var BC = this.C.get().sub( this.B.get() ) ;

   //   A----p2---p3---B
   //   |    |    |    |
   //   p5---p6---p7---p8
   //   |    |    |    |
   //   p9--p10--p11--p12
   //   |    |    |    |
   //   C---p14--p15---D

    var A_ = this.A.get() ;
    var p2 = AB.get().mult(1/2) ;
    var p3 = AB.get().mult(2/3) ;
    var B_ = this.B.get() ;
    var p5 =  AC.get().mult(1/3 ) ;
    var p6 =  AD.get().mult(1/3 ) ;
    var p7 =  BC.get().mult(1/3 ) ;
    var p8 =  BD.get().mult(1/3 ) ;
    var p9 =  AC.get().mult(2/3 ) ;
    var C_ = this.C.get() ;
    var p10 = BC.get().mult( 2/3 ) ;
    var p11 = AD.get().mult(2/3 ) ;
    var p12 =  BD.get().mult( 2/3 ) ;
    var p14 =  CD.get().mult( 1/3 ) ;
    var p15 =  CD.get().mult( 2/3 ) ;
    var D_ = this.D ;

    var puntos = [ A_ , p2 , p3 , B_ , p5 , p6 , p7 , p8 , p9 , p10 , p11 , p12 , C_, p14 , p15 , D_ ] ;
    for ( var i = 0; i < 16; i++ ) {
      stroke(0);
      strokeWeight(5) ;
      point(puntos[i]);
      console.log(puntos[i]);
    }


    return puntos ;
  }

   /* dibujar(){

   var color_inicial = [ 255 , 255 , 255 ] ;
   var puntos = this.calcularPuntos() ;

   //   ----------------------
   //   |  T1  |  T2  |  T3  |
   //   ----------------------
   //   |  T4  |  T5  |  T6  |
   //   ----------------------
   //   |  T6  |  T7  |  T8  |
   //   ----------------------

   //   A----p2---p3---B
   //   |    |    |    |
   //   p5---p6---p7---p8
   //   |    |    |    |
   //   p9--p10--p11--p12
   //   |    |    |    |
   //   C---p14--p15---D

    var A_ = puntos[0] ;
    var p2 = puntos[1] ;
    var p3 = puntos[2] ;
    var B_ = puntos[3] ;

    var p5 = puntos[4] ;
    var p6 = puntos[5] ;
    var p7 = puntos[6] ;
    var p8 = puntos[7] ;

    var p9  = puntos[8]  ;
    var p10 = puntos[9]  ;
    var p11 = puntos[10] ;
    var p12 = puntos[11] ;

    var C_ = puntos[12]  ;
    var p14 = puntos[13] ;
    var p15 = puntos[14] ;
    var D_ = puntos[15]  ;

   var T1 = new Tapa(color_inicial , [A_ , p2 , p5 , p6 ] ) ;
   //var T2 = new Tapa(color_inicial , [ p3 , B_ , p7 , p8 ]) ;
   //T3 = new Tapa(color_inicial, ) ;
   //T4 = new Tapa(color_inicial, ) ;
   //T5 = new Tapa(color_inicial, ) ;
   //T6 = new Tapa(color_inicial, ) ;
   //T7 = new Tapa(color_inicial, ) ;
   //T8 = new Tapa(color_inicial, ) ;
   //T9 = new Tapa(color_inicial, ) ;

   T1.dibujar() ;
  // T2.dibujar() ;


  }
 */
}

var easycam ;
var lado = 1000
plano = new Plano("nada", [ new p5.Vector(0,0,0) , new p5.Vector(lado,0,0) , new p5.Vector(lado,lado,0) , new p5.Vector(0,lado,0) ] ) ;

function setup() {
  createCanvas(400, 400 , WEBGL);
  easycam = createEasyCam() ;
}

function draw() {

  rotateX(PI/3);
  rotateY(PI/3);
  background(255);

  plano.calcularPuntos();


}
