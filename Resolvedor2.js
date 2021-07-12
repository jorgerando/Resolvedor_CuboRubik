
class Tapa{

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

  constructor( lado , punto , vectorUnitarioA , vectorUnitarioB ){

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

  color(x,y){

    return this.colores[x][y]
  }

}

class Cubo{

  constructor(){

    this.inicializarColores();
    this.inicializarPlanos() ;
    this.inicializarSecuenciaImportatesMovimientos() ;

    //inicializo la posiciones de relativas de las cara

    this.Front = [ [this.rojo,this.rojo,this.rojo] , [this.rojo,this.rojo,this.rojo] , [this.rojo,this.rojo,this.rojo] ] ;
    this.Back = [ [this.naranja,this.naranja,this.naranja] , [this.naranja,this.naranja,this.naranja] ,[this.naranja,this.naranja,this.naranja]  ]

    this.Left = [ [this.azul ,this.azul ,this.azul] , [this.azul ,this.azul ,this.azul] ,[this.azul ,this.azul ,this.azul] ] ;
    this.Right = [ [this.verde ,this.verde ,this.verde] , [this.verde ,this.verde ,this.verde] ,[this.verde ,this.verde ,this.verde] ] ;

    this.Down = [ [this.blanco ,this.blanco,this.blanco] ,[this.blanco ,this.blanco,this.blanco] ,[this.blanco ,this.blanco,this.blanco]  ] ;
    this.Top = [ [this.amarillo,this.amarillo,this.amarillo] , [this.amarillo,this.amarillo,this.amarillo] ,[this.amarillo,this.amarillo,this.amarillo]] ;

  }

  inicializarColores(){

    this.blanco = [255,255,255] ;
    this.amarillo = [	255, 233, 0] ;
    this.rojo = [255,0,0] ;
    this.naranja = [255,128,0] ;
    this.azul = [0,0,255] ;
    this.verde = [0,255,0] ;

  }

  inicializarPlanos(){

    var lado = 200 ;

    this.plano1 = new Plano(lado , new p5.Vector(0,0,0) ,new p5.Vector(1,0,0) , new p5.Vector(0,1,0) ) ;
    this.plano2 = new Plano(lado , new p5.Vector(0,0,0) ,new p5.Vector(1,0,0) , new p5.Vector(0,0,1) ) ;
    this.plano3 = new Plano(lado , new p5.Vector(0,0,0) ,new p5.Vector(0,1,0) , new p5.Vector(0,0,1) ) ;
    this.plano4 = new Plano(lado , new p5.Vector(lado,lado,lado) ,new p5.Vector(-1,0,0) , new p5.Vector(0,-1,0) ) ;
    this.plano5 = new Plano(lado , new p5.Vector(lado,lado,lado) ,new p5.Vector(-1,0,0) , new p5.Vector(0,0,-1) ) ;
    this.plano6 = new Plano(lado , new p5.Vector(lado,lado,lado) ,new p5.Vector(0,-1,0) , new p5.Vector(0,0,-1) ) ;

  }

// Movimientos

   z(modo){

     var F = this.Front ;
     var B = this.Back ;

     var R = this.Right ;
     var L = this.Left ;

     var T = this.Top ;
     var D = this.Down ;

     if(modo){
      // z
      this.Front = R ;
      this.Right = B ;
      this.Back = L ;
      this.Left = F ;

     }else {
      // z'
      this.Front = L ;
      this.Right = F ;
      this.Back = R ;
      this.Left = B ;

     }

   }

   x(modo){

     var F = this.Front ;
     var B = this.Back ;

     var R = this.Right ;
     var L = this.Left ;

     var T = this.Top ;
     var D = this.Down ;

     if(modo){
      // x
      this.Top = F ;
      this.Front = D ;
      this.Down = B ;
      this.Back = T ;

     }else {
      // x'
      this.Top = B ;
      this.Front = T ;
      this.Down = F ;
      this.Back = D ;

     }


   }

   y(modo){

     var F = this.Front ;
     var B = this.Back ;

     var R = this.Right ;
     var L = this.Left ;

     var T = this.Top ;
     var D = this.Down ;

     if(modo){
      // y
      this.Top =  L ;
      this.Right = T ;
      this.Down = R ;
      this.Left = D ;

     }else {
      // y'
      this.Top =  R ;
      this.Right = D ;
      this.Down = L ;
      this.Left = T ;


     }

   }

   procesarMovimiento( movimientos ){

     movimientos = movimientos.trim() ;
     var repeticiones = 1
     var movimiento = "-" ;
     var primo = false ;

     if (  movimientos.length == 1 ) {
       // M -- un movimiento no orario
        movimiento = movimientos[0] ;

     } else if  ( movimientos.length == 2 && movimientos[1] == "'" ){
       // M' --> movimiento antihorario
         movimiento = movimientos[0] ;
         primo = true ;

     } else if ( movimientos.length == 2 && movimientos[1] != "'" ){
       // nM --> n movimientos no primos
        repeticiones = parseInt(movimientos[0],10) ;
        movimiento = movimientos[1] ;

     }else {
        // nM' n movimientos primos
        repeticiones = movimientos[0] ;
        movimiento = movimientos[1] ;
        primo = true ;
     }

     return [ repeticiones ,movimiento , primo ] ;






   }

   procesarSecuencia(secuencia){
     secuencia = secuencia.trim();
     var movimientos = secuencia.split(',') ;

     var partes_secuncia = [];

     for (var i = 0 ; i < movimientos.length  ; i++ ) {

         var movimiento_a = movimientos[i].trim();
         partes_secuncia.push(movimiento_a) ;
     }

     return partes_secuncia ;
   }

   movimiento( movimientos ){

   var partes = this.procesarMovimiento(movimientos) ;

   var repeticiones = partes[0] ;
   var movimiento = partes[1] ;
   var primo = partes[2] ;

   for (var i = 0 ;  i < repeticiones ; i++ ){

     if ( movimiento == "x" && !primo ){
       //x
       this.x(true) ;
     } else if (movimiento == "x" && primo  ){
       //x'
       this.x(false) ;
     } else if (movimiento == "y" && !primo ){
       //y
       this.y(true);
     }else if (movimiento == "y" && primo  ){
       //y'
       this.y(false);
     }else if (movimiento == "z" && !primo){
       //z
       this.z(true);
     }else if (movimiento == "z" && primo){
       //z'
       this.z(false) ;
     }

   }
 }

   secuenciaMovimientos( secuencia ){

      var movimientos = this.procesarSecuencia(secuencia) ;

      for (var i = 0 ; i < movimientos.length  ; i++ ) {

          var movimiento_a = movimientos[i].trim();
          this.movimiento(movimiento_a);
      }

   }

   negadoMovimiento( movimiento ){

     var partes = this.procesarMovimiento(movimiento) ;

     var repeticiones = partes[0] ;
     var movimiento = partes[1] ;
     var primo = partes[2] ;

     var negado = "-";

     if ( movimiento == "x" && !primo ){
       //x negado x'
       negado="x'" ;
     } else if (movimiento == "x" && primo  ){
       //x' negado x
       negado="x" ;
     } else if (movimiento == "y" && !primo ){
       //y negado y'
       negado="y'" ;
     }else if (movimiento == "y" && primo  ){
       //y' negado y
       negado="y" ;
     }else if (movimiento == "z" && !primo){
       //z negado z
       negado="z'"
     }else if (movimiento == "z" && primo){
       //z' negado z
       negado="z"
     }

     var movimiento_negado =  repeticiones.toString()+negado;
     return movimiento_negado ;





   }

   secuenciaNegada(secuencia){

     var movimientos = this.procesarSecuencia(secuencia);
     var secuencia_negada = "" ;
     for( var i =  movimientos.length ; i > 0 ; i--){
        secuencia_negada = secuencia_negada+this.negadoMovimiento(movimientos[i-1])+" ,";
     }

     return secuencia_negada ;

   }

   movimientoAleatorio(){

         var R1 = Math.random() ;
         var R2 = Math.random() ;
         var R3 = Math.random() ;

         var movimiento = "" ;
         var repeticiones = "" ;
         var primo = "" ;

         if ( R1 < 1/3 ){
            movimiento = "x" ;
         }else if( R1 < 2/3 ){
            movimiento = "y" ;
         }else {
            movimiento = "z"
         }

         if ( R2 < 1/3 ){
            repeticiones = "1" ;
         }else if( R2 < 2/3 ){
            repeticiones = "2" ;
         }else {
            repeticiones = "3" ;
         }

         if (R3 < 1/2) {
            primo="'" ;
         }else{
            primo="" ;
         }

         var movimiento_r = repeticiones+movimiento+primo ;
         return movimiento_r ;


   }

   secuenciaMovimientosAletorios(n){
     var secuencia = "" ;
     for( var i = 0 ; i < n - 1 ; i++){
        secuencia = secuencia+this.movimientoAleatorio()+" ,";
     }
     secuencia = secuencia+this.movimientoAleatorio() ;
     return secuencia ;
   }

   inicializarSecuenciaImportatesMovimientos(){

     this.to_Right = " z " ;
     this.to_Back = " 2z " ;
     this.to_Left = " z' " ;

     this.top_Right = "  x' " ;
     this.top_Back = " x' , y " ;
     this.top_Left = " x' , 2y " ;
     this.top_Front = " x' , y' " ;
   }

// Giros

  dibujar(){

    this.plano4.colorear(this.Front,0) ;
    this.plano5.colorear(this.Left,0) ;
    this.plano3.colorear(this.Top,0) ;
    this.plano1.colorear(this.Back,0) ;
    this.plano2.colorear(this.Right,0) ;
    this.plano6.colorear(this.Down,0) ;


    this.plano1.dibujar() ;
    this.plano2.dibujar() ;
    this.plano3.dibujar() ;
    this.plano4.dibujar() ;
    this.plano5.dibujar() ;
    this.plano6.dibujar() ;


  }

}


function dibujarEjes(){

   fill(0,0,0);
   stroke(0,0,0);
   strokeWeight(3) ;
   line(0,0,0,-200,0,0) ;
   line(0,0,0,0,-200,0) ;
   line(0,0,0,0,0,200) ;
   strokeWeight(40) ;
   stroke(255,0,0);
   point(0,-200,0)
   stroke(0,255,0);
   point(0,0,200)
   stroke(0,0,255);
   point(-200,0,0)

}

var easycam ;
var cubo = new Cubo() ;

secuencia = cubo.secuenciaMovimientosAletorios(5);
negada = cubo.secuenciaNegada(secuencia);

console.log(secuencia);
console.log(negada);

cubo.secuenciaMovimientos(secuencia);
cubo.secuenciaMovimientos(negada);

function setup() {
  createCanvas(800, 800 , WEBGL);
  easycam = createEasyCam() ;
}

function draw() {
  background(255);
  rotateZ(PI/2);
  rotateX(-PI/4) ;
  rotateY(PI/4) ;
  dibujarEjes();

  translate(-100,-100,-100);
  cubo.dibujar() ;





}
