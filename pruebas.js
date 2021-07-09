
var colores =  [ "Amarilo" , "Blanco", "Azul", "Naranja", "Rojo" ,"Verde"] ;
class Plano{

    constructor(p1,p2,p3,p4,color){

      this.p1 = p1 ;
      this.p2 = p2 ;
      this.p3 = p3 ;
      this.p4 = p4 ;
      this.color = color ;

    }

    pintarPlano( color_plano ){

      var nombres_colores = [ "Naranja" , "Blanco", "Azul", "Amarillo", "Rojo" ,"Verde"] ;
      var parametros_colores = [[234,128,0],[255,255,255],[0,0,255],[255,255,0],[255,0,0],[0,255,0]] ;

      for (var i = 0 ; i < 6 ; i++ ) {

        if ( nombres_colores[i] == color_plano ) {
            fill(parametros_colores[i][0] , parametros_colores[i][1] , parametros_colores[i][2] ) ;
        }
      }

    }

    dibujar(){

      this.pintarPlano(this.color);
      beginShape();

      vertex(this.p1.x,this.p1.y,this.p1.z);
      vertex(this.p2.x,this.p2.y,this.p2.z);
      vertex(this.p3.x,this.p3.y,this.p3.z);
      vertex(this.p4.x,this.p4.y,this.p4.z);
      vertex(this.p1.x,this.p1.y,this.p1.z) ;

      endShape();

    }


}

class CuboRubick {

  constructor() {

   var Amarilla = [["Amarillo","Amarillo","Amarillo"],["Amarillo","Amarillo","Amarillo"],["Amarillo","Amarillo","Amarillo"]] ;
   var Blanca = [["Blanco","Blanco","Blanco"],["Blanco","Blanco","Blanco"],["Blanco","Blanco","Blanco"]] ;
   var Verde = [["Verde","Verde","Verde"],["Verde","Verde","Verde"],["Verde","Verde","Verde"]] ;
   var Roja = [["Rojo","Rojo","Rojo"],["Rojo","Rojo","Rojo"],["Rojo","Rojo","Rojo"]] ;
   var Azul = [["Azul","Azul","Azul"],["Azul","Azul","Azul"],["Azul","Azul","Azul"]] ;
   var Naranja = [["Naranja","Naranja","Naranja"],["Naranja","Naranja","Naranja"],["Naranja","Naranja","Naranja"]] ;

   this.Delante = Azul ;
   this.Atras = Verde ;

   this.Derecha = Roja ;
   this.Izquierda = Naranja ;

   this.Arriba = Amarilla ;
   this.Abajo = Blanca ;

   this.Cara_miro = Azul ;

 }

  pintarCara( p1 ,p2 , p3 , p4 , colores ){

    var L = p1.copy().sub(p2.copy()).mag() / 3 ;


    var vx = p1.copy().sub(p2.copy()).setMag(L) ;
    var vy = p1.copy().sub(p3.copy()).setMag(L) ;

    var puntos = [[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4]] ;

    for (var x = 0 ; x < 4 ; x++) {
        for(var y = 0 ; y < 4 ; y++ ){

         puntos[x][y] = p1.copy().add(vx.copy().mult(x)).add(vy.copy().mult(y)) ;


      }
    }

    for (var x = 0 ; x < 3 ; x++) {
        for(var y = 0 ; y < 3 ; y++ ){

        var planoi = new Plano(puntos[x][y] ,puntos[x+1][y], puntos[x+1][y+1],puntos[x][y+1] , colores[x][y]) ;
         planoi.dibujar() ;
    }
   }








  }

  transponer(matriz){
    var transpuesta = [[1,2,3],[1,2,3],[1,2,3]];
    for(var x = 0 ; x < 3 ; x++){
      for(var y = 0 ; y < 3 ; y++ ){
         transpuesta[x][y] = matriz[y][x] ;
      }
    }
    return transpuesta ;
  }

  T(){
    this.Arriba = this.transponer(this.Arriba);

    var Dr_f = this.Derecha[0];
    var D_f = this.Delante[0];
    var Iz_f = this.Izquierda[0];
    var Atr_f = this.Atras[2];

    this.Derecha[0] = Atr_f ;
    this.Delante[0] = Dr_f ;
    this.Izquierda[0] = D_f ;
    this.Atras[2] = Iz_f ;

  }

  pintarCubo(){

    push();
    translate(50,50,50);
    // cara  de Abajo y Arriba
    this.pintarCara(new p5.Vector(0,0,-100) ,new p5.Vector(0,100,-100),new p5.Vector(100,0,-100),new p5.Vector(100,100,-100),this.Abajo ) ;
    this.pintarCara(new p5.Vector(0,0,0) ,new p5.Vector(100,0,0),new p5.Vector(0,100,0),new p5.Vector(100,100,0),this.Arriba ) ;
    // cara  de Delante y  Atras
    push();
    translate(-50,0,-50)
    rotateY(3*PI/2);
    translate(50,0,50);
    this.pintarCara(new p5.Vector(0,0,0) ,new p5.Vector(100,0,0),new p5.Vector(0,0,100),new p5.Vector(100,0,100),this.Delante) ;
    pop() ;
    this.pintarCara(new p5.Vector(0,-100,0) ,new p5.Vector(100,-100,0),new p5.Vector(0,-100,100),new p5.Vector(100,-100,100),this.Atras) ;
    // cara derecha Izquierda
    push();
    translate(0,-50,-50)
    rotateX(PI/2);
    translate(0,50,50);
    this.pintarCara(new p5.Vector(0,0,0) ,new p5.Vector(0,100,0),new p5.Vector(0,0,100),new p5.Vector(0,100,100),this.Derecha ) ;
    pop();


    this.pintarCara(new p5.Vector(-100,-100,-100) ,new p5.Vector(-100,-100,-200),new p5.Vector(-100,-200,-100),new p5.Vector(0,100,100),this.Izquierda) ;


  }

}

var easycam ;
var angulo = 0 ;
var c = new CuboRubick();

function setup() {
  createCanvas(1000, 1000 , WEBGL);
  easycam = createEasyCam() ;
}

function draw() {
  background(255);

  c.pintarCubo();
  c.T();
 frameRate(5);
  angulo += 0.01 ;

}
