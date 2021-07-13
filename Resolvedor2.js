
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
    this.Right = [ [this.verde ,this.verde,this.verde] , [this.verde ,this.verde ,this.verde] ,[this.verde ,this.verde ,this.verde] ] ;

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

  rotarMatriz(matriz){

  var nuevamatriz =  [ ["0","0","0"] , ["0","0","0"] ,[ "0" , "0" , "0" ] ] ;
  for (var x=0 ; x<matriz.length ;x++) {
   for (var y=0 ; y<matriz.length ;y++) {
    nuevamatriz[y][matriz.length-1-x] = matriz[x][y];
    }
   }

   return nuevamatriz ;

  }

  rotarMatrizN(matriz,n){

    for(var i = 0 ; i < n ; i++ ){
      matriz = this.rotarMatriz(matriz);
    }
    return matriz ;
  }

// transfomaciones

  procesarTransfomacion( movimientos){

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

  aplicarSecuenciaTransformaciones( secuencia ){

   var trans = this.procesarSecuencia(secuencia) ;
   console.log(trans);

   for (var i = 0 ; i < trans.length  ; i++ ) {

       var trans_a = trans[i].trim();

       if( this.esUnMovimiento(trans_a) ){



        this.aplicarMovimiento(trans_a);
       }else{



        this.aplicarGiro(trans_a);
       }
   }

}

  esUnMovimiento( transformacion ){

    var partes = this.procesarTransfomacion(transformacion );
    var Tr = partes[1].trim();
    var condicion = Tr=="x" || Tr=="y" || Tr=="z"
    return  condicion;

  }

// Movimientos

   z(prima){

     var F = this.Front ;
     var B = this.Back ;

     var R = this.Right ;
     var L = this.Left ;

     var T = this.Top ;
     var D = this.Down ;

     if(!prima){
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

   x(prima){

     var F = this.Front ;
     var B = this.Back ;

     var R = this.Right ;
     var L = this.Left ;

     var T = this.Top ;
     var D = this.Down ;

     if(!prima){
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

   y(prima){

     var F = this.Front ;
     var B = this.Back ;

     var R = this.Right ;
     var L = this.Left ;

     var T = this.Top ;
     var D = this.Down ;

     if(!prima){
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

   aplicarMovimiento( movimientos ){

   var partes = this.procesarTransfomacion(movimientos) ;

   var repeticiones = partes[0] ;
   var movimiento = partes[1] ;
   var primo = partes[2] ;

   for (var i = 0 ;  i < repeticiones ; i++ ){

     if ( movimiento == "x"  ){

       this.x(primo) ;

     } else if (movimiento == "y" ){

       this.y(primo);

     }else if (movimiento == "z"){

       this.z(primo) ;
     }

   }
 }

   negadoMovimiento( movimiento ){

     var partes = this.procesarTransfomacion(movimiento) ;

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
     for( var i =  movimientos.length ; i > 1 ; i--){
        secuencia_negada = secuencia_negada+this.negadoMovimiento(movimientos[i-1])+" ,";
     }
     secuencia_negada = secuencia_negada+this.negadoMovimiento(movimientos[0])
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

  t(prima){

    if( prima ){
     this.Top = this.rotarMatrizN(this.Top , 1 ) ;
    }else{
      this.Top = this.rotarMatrizN(this.Top , 3 ) ;
    }

    var F = this.Front[0] ;
    var B = this.Back[0] ;
    var R = this.Right[0] ;
    var L = this.Left[0] ;

    if( prima ) {
      //t'
      this.Front[0] = L.reverse();
      this.Left[0] = B;
      this.Right[0] = F ;
      this.Back[0] = R.reverse() ;

    }else {
      // t
      this.Front[0] = R ;
      this.Left[0] = F.reverse() ;
      this.Right[0] = B.reverse()  ;
      this.Back[0] = L ;

    }



  }

  d(prima){

    if( prima ){
     this.Down = this.rotarMatrizN(this.Down , 1 ) ;
    }else{
      this.Down = this.rotarMatrizN(this.Down , 3) ;
    }

    var F = this.Front[2] ;
    var B = this.Back[2] ;
    var R = this.Right[2] ;
    var L = this.Left[2] ;

    if( prima ) {
      //d'
      this.Front[2] = L.reverse() ;
      this.Left[2] = B ;
      this.Right[2] = F ;
      this.Back[2] = R .reverse();

    }else {
      // d
      this.Front[2] = R ;
      this.Left[2] = F.reverse() ;
      this.Right[2] = B.reverse() ;
      this.Back[2] = L ;

    }


  }

  f(prima){

    if( prima ){
     this.Front = this.rotarMatrizN(this.Front , 3 ) ;
    }else{
      this.Front = this.rotarMatrizN(this.Front , 1 ) ;
    }

    var T = this.Top[0] ;
    var D = this.Down[0] ;

    var R0 = this.Right[0][0] ;
    var R1 = this.Right[1][0] ;
    var R2 = this.Right[2][0] ;

    var L0 = this.Left[0][0] ;
    var L1 = this.Left[1][0] ;
    var L2 = this.Left[2][0] ;

    if(prima){
      //f'
      this.Top[0] = [  R0 , R1 , R2 ] ;
      this.Down[0] = [  L0 , L1 , L2 ]  ;

      this.Right[0][0] = D[2] ;
      this.Right[1][0] = D[1] ;
      this.Right[2][0] = D[0] ;

      this.Left[0][0] = T[2] ;
      this.Left[1][0] = T[1] ;
      this.Left[2][0] = T[0] ;

    }else{
      //f
      this.Top[0] = [ L2 , L1 , L0 ] ;
      this.Down[0] = [ R2 , R1 , R0 ] ;

      this.Right[0][0] = T[0] ;
      this.Right[1][0] = T[1] ;
      this.Right[2][0] = T[2] ;

      this.Left[0][0] = D[0] ;
      this.Left[1][0] = D[1] ;
      this.Left[2][0] = D[2] ;

    }


  }

  b(prima){

    if( prima ){
      this.Back = this.rotarMatrizN(this.Back , 3 ) ;
    }else{
      this.Back = this.rotarMatrizN(this.Back , 1 ) ;
    }

    var T = this.Top[2] ;
    var D = this.Down[2] ;

    var R0 = this.Right[0][2] ;
    var R1 = this.Right[1][2] ;
    var R2 = this.Right[2][2] ;

    var L0 = this.Left[0][2] ;
    var L1 = this.Left[1][2] ;
    var L2 = this.Left[2][2] ;

    if(prima){
      //f'
      this.Top[2] = [  R0 , R1 , R2 ] ;
      this.Down[2] = [  L0 , L1 , L2 ]  ;

      this.Right[0][2] = D[2] ;
      this.Right[1][2] = D[1] ;
      this.Right[2][2] = D[0] ;

      this.Left[0][2] = T[2] ;
      this.Left[1][2] = T[1] ;
      this.Left[2][2] = T[0] ;

    }else{
      //f
      this.Top[2] = [ L2 , L1 , L0 ] ;
      this.Down[2] = [ R2 , R1 , R0 ] ;

      this.Right[0][2] = T[0] ;
      this.Right[1][2] = T[1] ;
      this.Right[2][2] = T[2] ;

      this.Left[0][2] = D[0] ;
      this.Left[1][2] = D[1] ;
      this.Left[2][2] = D[2] ;

    }


  }

  r(prima){

    if( prima ){
     this.Right = this.rotarMatrizN(this.Right , 3 ) ;
    }else{
      this.Right = this.rotarMatrizN(this.Right , 1 ) ;
    }

    var F = [] ;
    var T = [] ;
    var D = [];
    var B = [] ;

    for (var i = 0 ; i < 3  ; i++ ){

        F.push(this.Front[i][2]) ;
        T.push(this.Top[i][2] );
        D.push(this.Down[i][2] ) ;
        B.push(this.Back[i][2] );

        }

    for (var i = 0 ; i < 3 ; i++ ) {
        if (prima){

          this.Top[i][2] = B[i] ;
          this.Front[i][2] = T[2-i] ;
          this.Down[i][2] = F[i] ;
          this.Back[i][2] = D[2-i] ;

        }else {

          this.Top[i][2] = F[2-i] ;

          this.Front[i][2] = D[i] ;

          this.Down[i][2] = B[2-i] ;

          this.Back[i][2] = T[i] ;





    }
  }

  }

  l(prima){

    if( prima ){
     this.Left = this.rotarMatrizN(this.Left , 3 ) ;
    }else{
      this.Left = this.rotarMatrizN(this.Left , 1 ) ;
    }

    var F = [] ;
    var T = [] ;
    var D = [];
    var B = [] ;

    for (var i = 0 ; i < 3  ; i++ ){

        F.push(this.Front[i][0]) ;
        T.push(this.Top[i][0] );
        D.push(this.Down[i][0] ) ;
        B.push(this.Back[i][0] );

        }

    for (var i = 0 ; i < 3 ; i++ ) {
        if (prima){

          this.Top[i][0] = B[i] ;
          this.Front[i][0] = T[2-i] ;
          this.Down[i][0] = F[i] ;
          this.Back[i][0] = D[2-i] ;

        }else {

          this.Top[i][0] = F[2-i] ;

          this.Front[i][0] = D[i] ;

          this.Down[i][0] = B[2-i] ;

          this.Back[i][0] = T[i] ;

        }

      }




  }

  aplicarGiro(giro){

    var partes = this.procesarTransfomacion(giro) ;

    var repeticiones = partes[0] ;
    var giro = partes[1] ;
    var primo = partes[2] ;

    for (var i = 0 ;  i < repeticiones ; i++ ){

      if ( giro == "t" ){
        //t
        this.t(primo) ;
      } else if (giro == "d"  ){
        //t'
        this.d(primo) ;
      } else if (giro == "f" ){
        //y
        this.f(primo);
      }else if (giro == "b"  ){
        //y'
        this.b(primo);
      }else if (giro == "r" ){
        //z
        this.r(primo);
      }else if (giro == "l" ){
        //z'
        this.l(primo) ;
      }

    }

  }

  giroAleatorio(){

        var R1 = Math.random() ;
        var R2 = Math.random() ;
        var R3 = Math.random() ;

        var movimiento = "" ;
        var repeticiones = "" ;
        var primo = "" ;

        if ( R1 < 1/6 ){
           movimiento = "t" ;
        }else if( R1 < 2/6 ){
           movimiento = "d" ;
        }
        else if( R1 < 3/6 ){
           movimiento = "f" ;
        }   else if( R1 < 4/6 ){
             movimiento = "b" ;
        }  else if( R1 < 5/6 ){
             movimiento = "r" ;
        }  else {
             movimiento = "l" ;
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

  secuenciaGirosAleatorios(n){

    var secuencia = "" ;
    for( var i = 0 ; i < n - 1 ; i++){
       secuencia = secuencia+this.giroAleatorio()+" ,";
    }
    secuencia = secuencia+this.giroAleatorio() ;
    return secuencia ;
  }

  negadoGiro(giro){

    var partes = this.procesarTransfomacion(giro) ;
    var giro = partes[1].trim() ;
    var prima = partes[2] ;
    if (prima){
      giro=giro+"'";
    }

    var giros =   ["t" ,"d" ,"f" ,"b" ,"r" ,"l" ] ;
    var negados = ["t'","d'","f'","b'","r'","l'"] ;

    var negado = "" ;
    for ( var i = 0 ; i < giros.length ; i++ ){

         if( giro == giros[i] ){
            negado = negados[i];
            break ;

         }else if(giro == negados[i]){
             negado = giros[i] ;
             break ;

         }else {

           negado=negado;
         }
    }

    return partes[0]+negado ;

  }

  secuenciaNegadaGiros(secuencia){
    var movimientos = this.procesarSecuencia(secuencia);
    var secuencia_negada = "" ;
    for( var i =  movimientos.length ; i > 1 ; i--){
       secuencia_negada = secuencia_negada+this.negadoGiro(movimientos[i-1])+" ,";
    }
    secuencia_negada = secuencia_negada+this.negadoGiro(movimientos[0])
    return secuencia_negada ;

  }

// Algoritmo

  dibujar(){

    this.plano4.colorear(this.Front,1) ;
    this.plano3.colorear(this.Top,2) ;
    this.plano1.colorear(this.Back,3) ;
    this.plano2.colorear(this.Right,3) ;
    this.plano6.colorear(this.Down,0) ;
    this.plano5.colorear(this.Left,1) ;


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

var secuencia = cubo.secuenciaGirosAleatorios(3);
var negada = cubo.secuenciaNegadaGiros(secuencia) ;

cubo.aplicarSecuenciaTransformaciones(secuencia);
//cubo.aplicarSecuenciaTransformaciones(negada);

console.log(negada);

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
