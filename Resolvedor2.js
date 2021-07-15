
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

class Arista{

  constructor(CA , CB , CoA , CoB ){

    this.caraA = CA ;
    this.caraB = CB ;

    this.ColorA = CoA ;
    this.ColorB = CoB ;

    this.caras = [ this.caraA , this.caraB ] ;
    this.colores = [ this.ColorA , this.ColorB ] ;

  }

  devolverCaras(){
    var caras = this.caras ;
    return caras ;
  }

  devolverColores(){
    var colores = this.colores ;
    return colores ;

  }

  actualizarArista(CA , CB , CoA , CoB){

    this.caraA = CA ;
    this.caraB = CB ;

    this.ColorA = CoA ;
    this.ColorB = CoB ;

    this.caras = [ this.caraA , this.caraB ] ;
    this.colores = [ this.ColorA , this.ColorB ] ;


  }

  tieneElColor(color){
    return this.ColorA == color || this.ColorB == color ;

  }

  tieneLosColores(cA,cB){
    return this.ColorA == cA && this.ColorB == cB ;
  }

  estaEnEstaCara(cara){
    return this.caraA == cara || this.caraB == cara ;
  }

  estaEnEstasCara(cA , cB){
    return this.caraA == cA && this.caraB == cB ;
  }

}

class Esquina{

   constructor(CA,CB,CC,colorA,colorB,colorC){

     this.caraA = CA ;
     this.caraB = CB ;
     this.caraC = CC ;

     this.colorA = colorA ;
     this.colorB = colorB ;
     this.colorC = colorC ;

     this.colores = [ this.colorA , this.colorB , this. colorC ] ;
     this.caras = [this.caraA , this.caraB , this. caraC ] ;

   }

   devolverCaras(){
     var c = this.caras ;
     return c ;
   }

   actualizarEsquina(CA,CB,CC,colorA,colorB,colorC){
     this.caraA = CA ;
     this.caraB = CB ;
     this.caraC = CC ;

     this.colorA = colorA ;
     this.colorB = colorB ;
     this.colorC = colorC ;

     this.colores = [ this.colorA , this.colorB , this. colorC ] ;
     this.caras = [this.caraA , this.caraB , this. caraC ] ;

   }

   devolverColores(){
     var c = this.colores ;
     return c ;

   }

   tieneElColor(color){

     return this.colorA == color || this.colorB == color || this.colorC == color ;

   }

   tieneLos2Colores(A,B){

     return this.tieneElColor(A) && this.tieneElColor(B) ;

   }

   tieneLosColores(A,B,C){
     return tieneElColor(A) && tieneElColor(B) && tieneElColor(C) ;
   }

   estaEnLaCara(cara){

     return this.caraA == cara || this.caraB == cara || this.caraC == cara ;

   }

   estaEnLas2Caras(A,B){

     return this.estaEnLaCara(A) && this.estaEnLaCara(B) ;
   }

   estaEnLasCaras(A,B,C){
     return this.estaEnLaCara(A) && this.estaEnLaCara(B) && this.estaEnLaCara(C) ;
   }

}

class Cubo{

  constructor(){

    this.inicializarColores();
    this.inicializarPlanos() ;
    this.inicializarSecuenciaImportatesMovimientos() ;
    this.inicializarNombreCaras();

    //inicializo la posiciones de relativas de las cara

    this.Front = [ [this.rojo,this.rojo,this.rojo] , [this.rojo,this.rojo,this.rojo] , [this.rojo,this.rojo,this.rojo] ] ;
    this.Back = [ [this.naranja,this.naranja,this.naranja] , [this.naranja,this.naranja,this.naranja] ,[this.naranja,this.naranja,this.naranja]  ]

    this.Left = [ [this.azul ,this.azul ,this.azul] , [this.azul ,this.azul ,this.azul] ,[this.azul ,this.azul ,this.azul] ] ;
    this.Right = [ [this.verde ,this.verde,this.verde] , [this.verde ,this.verde ,this.verde] ,[this.verde ,this.verde ,this.verde ] ] ;

    this.Down = [ [this.blanco ,this.blanco,this.blanco] ,[this.blanco ,this.blanco,this.blanco] ,[this.blanco ,this.blanco,this.blanco]  ] ;
    this.Top = [ [this.amarillo ,this.amarillo,this.amarillo] , [this.amarillo,this.amarillo,this.amarillo] ,[this.amarillo,this.amarillo,this.amarillo]] ;

    // Esquinas

    this.EF1 = new Esquina(this.F,this.L,this.T,this.Front[0][0],this.Left[0][0],this.Top[0][0]) ; // check
    this.EF2 = new Esquina(this.F,this.R,this.T,this.Front[0][2],this.Right[0][0],this.Top[0][2]) ; // chek
    this.EF3 = new Esquina(this.F,this.L,this.D,this.Front[2][0],this.Left[2][0],this.Down[0][0]) ; //check
    this.EF4 = new Esquina(this.F,this.R,this.D,this.Front[2][2],this.Right[2][0],this.Down[0][2]) ; // check

    this.EB1 = new Esquina(this.B,this.L,this.T,this.Back[0][0],this.Left[0][2],this.Top[2][0] ) ; // check
    this.EB2 = new Esquina(this.B,this.R,this.T,this.Back[0][2],this.Right[0][2],this.Top[2][2] ) ; // check
    this.EB3 = new Esquina(this.B,this.L,this.D,this.Back[2][0],this.Left[2][2],this.Down[2][0] ) ; //chek
    this.EB4 = new Esquina(this.B,this.R,this.D,this.Back[2][2],this.Right[2][2],this.Down[2][2] ) ; //chek

    this.esquinas = [ this.EF1 , this.EF2 , this.EF3 , this.EF4 , this.EB1 , this.EB2 , this.EB3 , this.EB4 ] ;

    // Aristas

    this.A1 = new Arista( this.F , this.T , this.Front[0][1] , this.Top[0][1]   ) ; //chek
    this.A2 = new Arista( this.F , this.R , this.Front[1][2] , this.Right[1][0] ) ; //chek
    this.A3 = new Arista( this.F , this.D , this.Front[2][1] , this.Down[0][1]  ) ; //chek
    this.A4 = new Arista( this.F , this.L , this.Front[1][0] , this.Left[1][0]  ) ; //chek

    this.A5 = new Arista( this.T , this.L , this.Top[1][0]  , this.Left[0][1]  ) ; //chek
    this.A6 = new Arista( this.T , this.R , this.Top[2][1]  , this.Right[0][1] ) ; //chek
    this.A7 = new Arista( this.D , this.R , this.Down[1][2] , this.Right[2][1] ) ; //chek
    this.A8 = new Arista( this.D , this.L , this.Down[1][0] , this.Left[2][1]  ) ; //chek

    this.A9  = new Arista( this.B , this.T , this.Back[0][1] , this.Top[2][1]   ) ; //chek
    this.A10 = new Arista( this.B , this.R , this.Back[1][2] , this.Right[1][2] ) ; //chek
    this.A11 = new Arista( this.B , this.D , this.Back[2][1] , this.Down[2][1]  ) ; //chek
    this.A12 = new Arista( this.B , this.L , this.Back[1][0] , this.Left[1][2]  ) ;

    this.aristas = [this.A1 , this.A2 , this.A3 , this.A4 ,this.A5 , this.A6 , this.A7 ,this.A8 , this.A9 , this.A10 , this.A11 , this.A12 ] ;

  }

  actualizarEsquinas(){

    this.EF1.actualizarEsquina(this.F,this.L,this.T,this.Front[0][0],this.Left[0][0],this.Top[0][0]) ; // check
    this.EF2.actualizarEsquina(this.F,this.R,this.T,this.Front[0][2],this.Right[0][0],this.Top[0][2]) ; // chek
    this.EF3.actualizarEsquina(this.F,this.L,this.D,this.Front[2][0],this.Left[2][0],this.Down[0][0]) ; //check
    this.EF4.actualizarEsquina(this.F,this.R,this.D,this.Front[2][2],this.Right[2][0],this.Down[0][2]) ;

    this.EB1.actualizarEsquina(this.B,this.L,this.T,this.Back[0][0],this.Left[0][2],this.Top[2][0] ) ; // check
    this.EB2.actualizarEsquina(this.B,this.R,this.T,this.Back[0][2],this.Right[0][2],this.Top[2][2] ) ; // check
    this.EB3.actualizarEsquina(this.B,this.L,this.D,this.Back[2][0],this.Left[2][2],this.Down[2][0] ) ; //chek
    this.EB4.actualizarEsquina(this.B,this.R,this.D,this.Back[2][2],this.Right[2][2],this.Down[2][2] ) ;

    this.esquinas = [ this.EF1 , this.EF2 , this.EF3 , this.EF4 , this.EB1 , this.EB2 , this.EB3 , this.EB4 ] ;

  }

  actualizarAristas(){

    this.A1.actualizarArista( this.F , this.T , this.Front[0][1] , this.Top[0][1]   ) ;
    this.A2.actualizarArista( this.F , this.R , this.Front[1][2] , this.Right[1][0] ) ;
    this.A3.actualizarArista( this.F , this.D , this.Front[2][1] , this.Down[0][1]  ) ;
    this.A4.actualizarArista( this.F , this.L , this.Front[1][0] , this.Left[1][0]  ) ;

    this.A5.actualizarArista( this.T , this.L , this.Top[1][0]  , this.Left[0][1]  ) ;
    this.A6.actualizarArista( this.T , this.R , this.Top[1][2]  , this.Right[0][1] ) ;
    this.A7.actualizarArista( this.D , this.R , this.Down[1][2] , this.Right[2][1] ) ;
    this.A8.actualizarArista( this.D , this.L , this.Down[1][0] , this.Left[2][1]  ) ;

    this.A9.actualizarArista( this.B , this.T , this.Back[0][1] , this.Top[2][1]   ) ;
    this.A10.actualizarArista( this.B , this.R , this.Back[1][2] , this.Right[1][2] ) ;
    this.A11.actualizarArista( this.B , this.D , this.Back[2][1] , this.Down[2][1]  ) ;
    this.A12.actualizarArista( this.B , this.L , this.Back[1][0] , this.Left[1][2]  ) ;

  }


  inicializarColores(){

    this.blanco = [255,255,255] ;
    this.amarillo = [	255, 233, 0] ;
    this.rojo = [255,0,0] ;
    this.naranja = [255,128,0] ;
    this.azul = [0,0,255] ;
    this.verde = [0,255,0] ;

  }

  rgbColor(color){
     var c = "" ;
     if ( this.rojo == color ){
        c = "rojo"
     } else if ( this.azul == color){
        c = "azul"
     } else if ( this.blanco == color ){
        c = "blanco"
     } else if( this.amarillo == color ){
        c = "amarillo"
     }else if (this.naranja == color){
        c = "naranja"
     }else if(this.verde == color){
        c = "verde"
     }
     return c ;
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

  inicializarNombreCaras(){

    this.F = "Front" ;
    this.D = "Down" ;

    this.L = "Left" ;
    this.R = "Right" ;

    this.B = "Back" ;
    this.T = "Top" ;


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

  reflexionXMatriz(matriz){

   var g_matriz = matriz ;

   var A = g_matriz[2];
   var B = g_matriz[0];

   var n_matriz = matriz ;

   n_matriz[0] = A ;
   n_matriz[2] = B;

   return n_matriz ;

  }

  reflexionYMatriz(matriz){
     var A = this.rotarMatrizN(matriz,2);
     var B = this.reflexionXMatriz(A) ;
     return B ;
  }

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


   for (var i = 0 ; i < trans.length  ; i++ ) {

       var trans_a = trans[i].trim();

       if( this.esUnMovimiento(trans_a) ){



        this.aplicarMovimiento(trans_a);
       }else{



        this.aplicarGiro(trans_a);
       }

       this.actualizarEsquinas();
       this.actualizarAristas();
   }

}

  esUnMovimiento( transformacion ){

    var partes = this.procesarTransfomacion(transformacion );
    var Tr = partes[1].trim();
    var condicion = Tr=="x" || Tr=="y" || Tr=="z"
    return  condicion;

  }

  secuenciaAleatoria(n){
    var secuencia = "" ;
    for (var i = 0 ; i < n - 1; i++ ){
      var R  = Math.random()
      if( R*100 < 50){
           secuencia= secuencia + this.giroAleatorio()+",";
      }else{
           secuencia= secuencia +this.movimientoAleatorio()+",";
      }
    }
    var R  = Math.random()
    if( R*100 < 75){
         secuencia= secuencia + this.giroAleatorio();
    }else{
         secuencia= secuencia +this.movimientoAleatorio();
    }
    return secuencia
  }

// Busqueda

  coloresEsquina(n){
   var esquina  = this.esquinas[n-1] ;
   return esquina.devolverColores() ;

  }

  verEsquina(n){

    var esquina  = this.esquinas[n-1] ;
    var colores = esquina.devolverColores() ;
    var caras = esquina.devolverCaras() ;

    var s_c = "" ;
    var s_ca = "" ;

    for ( var i = 0 ; i < colores.length ; i++ ){
        s_c= s_c +" "+this.rgbColor(colores[i])
        s_ca=s_ca+" "+caras[i];
    }
    console.log(" Esquina : "+n+" { Colores : "+s_c+" | Cara : "+s_ca+" }" );

  }

  verArista(n){

    var arista = this.aristas[n-1]
    var colores = arista.devolverColores() ;
    var caras = arista.devolverCaras();

    var s_c = "" ;
    var s_ca = "" ;

    for ( var i = 0 ; i < colores.length ; i++ ){
        s_c= s_c +" "+this.rgbColor(colores[i])
        s_ca=s_ca+" "+caras[i];
    }
    console.log(" Arista : "+n+" { Colores : "+s_c+" | Cara : "+s_ca+" }" );

  }

  carasEsquina(n){
     var caras = this.esquinas[n-1].caras() ;
     return caras

  }

//----- Transfomaciones -------

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

      this.Top =this.rotarMatrizN(this.Top ,3);
      this.Down = this.rotarMatrizN(this.Down,3);

      this.Front = R ;
      this.Right = this.reflexionYMatriz(B);
      this.Back = L ;
      this.Left =  this.reflexionYMatriz(F);

     }else {
      // z'

      this.Top = this.rotarMatrizN(this.Top,1);
      this.Down = this.rotarMatrizN(this.Down,1);

      this.Front = this.reflexionYMatriz(L) ;
      this.Right = F ;
      this.Back = this.reflexionYMatriz(R) ;
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
      this.Right = this.rotarMatrizN(this.Right,1)
      this.Left = this.rotarMatrizN(this.Left,1);

      this.Top = this.reflexionXMatriz(F) ;
      this.Front = D ;
      this.Down = this.reflexionXMatriz(B) ;
      this.Back = T ;

     }else {
      // x'
      this.Right = this.rotarMatrizN(this.Right,3)
      this.Left = this.rotarMatrizN(this.Left,3);

      this.Top = B ;
      this.Front = this.reflexionXMatriz(T) ;
      this.Down = F ;
      this.Back = this.reflexionXMatriz(D) ;

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

      this.Front = this.rotarMatrizN(this.Front,1)
      this.Back = this.rotarMatrizN(this.Back,1)

      this.Top =  this.rotarMatrizN(L,1) ;
      this.Right = this.reflexionYMatriz(this.rotarMatrizN(T,1)) ;
      this.Down = this.rotarMatrizN(R,1) ;
      this.Left = this.reflexionYMatriz(this.rotarMatrizN(D,1)) ;

     }else {
      // y'

      this.Front = this.rotarMatrizN(this.Front,3)
        this.Back = this.rotarMatrizN(this.Back,3)

      this.Top =  this.reflexionYMatriz(this.rotarMatrizN(R,1))  ;
      this.Right = this.rotarMatrizN(D,3) ;
      this.Down = this.reflexionYMatriz(this.rotarMatrizN(L,1)) ;
      this.Left = this.rotarMatrizN(T,3) ;


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

// ---- Algoritmo ---

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

var secuencia = cubo.secuenciaAleatoria(20);
console.log(secuencia)

cubo.aplicarSecuenciaTransformaciones(secuencia);

for( var i = 0 ; i < 12 ; i++ ){
  cubo.verArista(i+1)
}

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
