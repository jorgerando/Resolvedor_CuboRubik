
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

  dibujar(p){

   p.fill( this.color[0] , this.color[1] , this.color[2] );
   p.strokeWeight(3);
   p.stroke(0);
   p.beginShape();
   p.vertex(this.p1.x,this.p1.y,this.p1.z);
   p.vertex(this.p2.x,this.p2.y,this.p2.z);
   p.vertex(this.p3.x,this.p3.y,this.p3.z);
   p.vertex(this.p4.x,this.p4.y,this.p4.z);
   p.vertex(this.p1.x,this.p1.y,this.p1.z);
   p.endShape();

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
    this.centro = (A.add(B)).add(this.origen);
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

  dibujar(p){

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
       tapas[i].dibujar(p) ;
   }


  }

  color(x,y){

    return this.colores[x][y]
  }

  dibujar2D(p,texto){

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
        tapas[i].dibujar(p) ;
    }

    p.textSize(40);
    p.textStyle(p.ITALIC);
    p.noStroke();
    p.fill(0);
    p.textAlign(p.CENTER,p.CENTER);
    p.text(texto,this.centro.x,this.centro.y);
   }

}

class Arista{

  constructor(CA , CB , CoA , CoB , nombre ){

    this.caraA = CA ;
    this.caraB = CB ;

    this.ColorA = CoA ;
    this.ColorB = CoB ;

    this.caras = [ this.caraA , this.caraB ] ;
    this.colores = [ this.ColorA , this.ColorB ] ;

    this.nombre = nombre ;

  }

  asociarOrientacion( coordenadasA , coordenadasB ){

    this.asociacionA = [this.caraA , coordenadasA ] ;
    this.asociacionB = [this.caraB , coordenadasB ] ;


  }

  devolverNombre(){
    return this.nombre ;
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
    return this.tieneElColor(cA) && this.tieneElColor(cB) ;
  }

  estaEnEstaCara(cara){
    return this.caraA == cara || this.caraB == cara ;
  }

  estaEnEstasCara(cA , cB){
    return this.caraA == cA && this.caraB == cB ;
  }

}

class Esquina{

   constructor(CA,CB,CC,colorA,colorB,colorC,nombre){

     this.caraA = CA ;
     this.caraB = CB ;
     this.caraC = CC ;

     this.colorA = colorA ;
     this.colorB = colorB ;
     this.colorC = colorC ;

     this.colores = [ this.colorA , this.colorB , this. colorC ] ;
     this.caras = [this.caraA , this.caraB , this. caraC ] ;

     this.asociacionA = "" ;
     this.asociacionB = "" ;
     this.asociacionC = "" ;

     this.nombre = nombre ;


   }

   asociarOrientacion( coordenadasA , coordenadasB ,coordenadasC ){

     this.asociacionA = [this.caraA , coordenadasA ] ;
     this.asociacionB = [this.caraB , coordenadasB ] ;
     this.asociacionC = [this.caraC , coordenadasC ] ;

   }

   devolverNombre(){
     return this.nombre ;
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
     return this.tieneElColor(A) && this.tieneElColor(B) && this.tieneElColor(C) ;
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

    // cara

    this.Front = [ [this.rojo,this.rojo,this.rojo] , [this.rojo,this.rojo,this.rojo] , [this.rojo,this.rojo,this.rojo] ] ;
    this.Back = [ [this.naranja,this.naranja,this.naranja] , [this.naranja,this.naranja,this.naranja] ,[this.naranja,this.naranja,this.naranja]  ]

    this.Left = [ [this.azul ,this.azul ,this.azul] , [this.azul ,this.azul ,this.azul] ,[this.azul ,this.azul ,this.azul] ] ;
    this.Right = [ [this.verde ,this.verde,this.verde] , [this.verde ,this.verde ,this.verde] ,[this.verde ,this.verde ,this.verde ] ] ;

    this.Down = [ [this.blanco ,this.blanco,this.blanco] ,[this.blanco ,this.blanco,this.blanco] ,[this.blanco ,this.blanco,this.blanco]  ] ;
    this.Top = [ [this.amarillo ,this.amarillo,this.amarillo] , [this.amarillo,this.amarillo,this.amarillo] ,[this.amarillo,this.amarillo,this.amarillo]] ;

    this.nombre_caras = [ this.F , this.B , this.L , this.R , this.D , this.T ] ;
    this.caras = [ this.Front , this.Back , this.Left , this.Right , this.Down , this.Top ] ;

    // Esquinas

    this.EF1 = new Esquina(this.F,this.L,this.T,this.Front[0][0],this.Left[0][0],this.Top[0][0]  ,"E1") ; // check
    this.EF1.asociarOrientacion([0,0],[0,0],[0,0]);
    this.EF2 = new Esquina(this.F,this.R,this.T,this.Front[0][2],this.Right[0][0],this.Top[0][2] ,"E2") ; // chek
    this.EF2.asociarOrientacion([0,2],[0,0],[0,2]);
    this.EF3 = new Esquina(this.F,this.L,this.D,this.Front[2][0],this.Left[2][0],this.Down[0][0] ,"E3") ; //check
    this.EF3.asociarOrientacion([2,0],[2,0],[0,0]);
    this.EF4 = new Esquina(this.F,this.R,this.D,this.Front[2][2],this.Right[2][0],this.Down[0][2] ,"E4") ; // check
    this.EF4.asociarOrientacion([2,2],[2,0],[0,2]);

    this.EB1 = new Esquina(this.B,this.L,this.T,this.Back[0][0],this.Left[0][2],this.Top[2][0] ,"E5") ; // check
    this.EB1.asociarOrientacion([0,0],[0,2],[2,0]);
    this.EB2 = new Esquina(this.B,this.R,this.T,this.Back[0][2],this.Right[0][2],this.Top[2][2] ,"E6") ; // check
    this.EB2.asociarOrientacion([0,2],[0,2],[2,2]);
    this.EB3 = new Esquina(this.B,this.L,this.D,this.Back[2][0],this.Left[2][2],this.Down[2][0] ,"E7") ; //chek
    this.EB3.asociarOrientacion([2,0],[2,2],[2,0]);
    this.EB4 = new Esquina(this.B,this.R,this.D,this.Back[2][2],this.Right[2][2],this.Down[2][2] ,"E8") ; //chek
    this.EB4.asociarOrientacion([2,2],[2,2],[2,2]);

    this.esquinas = [ this.EF1 , this.EF2 , this.EF3 , this.EF4 , this.EB1 , this.EB2 , this.EB3 , this.EB4 ] ;
    this.coloresEsquinas = [ [this.amarillo , this.rojo , this.azul] , [ this.amarillo , this.verde , this.rojo ] , [this.rojo ,this.blanco,this.azul ] , [this.rojo,this.verde,this.blanco] , [ this.amarillo , this.azul , this.naranja ] , [this.amarillo,this.verde,this.naranja] , [this.naranja,this.azul,this.blanco] , [ this.naranja , this.verde , this.blanco ] ] ;

    // Aristas

    this.A1 = new Arista( this.F , this.T , this.Front[0][1] , this.Top[0][1] , "A1"  ) ; //chek
    this.A1.asociarOrientacion([0,1],[0,1]);
    this.A2 = new Arista( this.F , this.R , this.Front[1][2] , this.Right[1][0],"A2" ) ; //chek
    this.A2.asociarOrientacion([1,2],[1,0]);
    this.A3 = new Arista( this.F , this.D , this.Front[2][1] , this.Down[0][1] ,"A3" ) ; //chek
    this.A3.asociarOrientacion([2,1],[0,1]);
    this.A4 = new Arista( this.F , this.L , this.Front[1][0] , this.Left[1][0] ,"A4" ) ; //chek
    this.A4.asociarOrientacion([1,0],[1,0]);

    this.A5 = new Arista( this.T , this.L , this.Top[1][0]  , this.Left[0][1]  ,"A5") ; //chek
    this.A5.asociarOrientacion([1,0],[0,1]);
    this.A6 = new Arista( this.T , this.R , this.Top[2][1]  , this.Right[0][1] ,"A6") ; //chek <------------
    this.A6.asociarOrientacion([2,1],[0,1]);
    this.A7 = new Arista( this.D , this.R , this.Down[1][2] , this.Right[2][1] ,"A7") ; //chek
    this.A7.asociarOrientacion([1,2],[2,1]);
    this.A8 = new Arista( this.D , this.L , this.Down[1][0] , this.Left[2][1]  ,"A8") ; //chek
    this.A8.asociarOrientacion([1,0],[2,1]);

    this.A9  = new Arista( this.B , this.T , this.Back[0][1] , this.Top[2][1]   ,"A9") ; //chek <-------------
    this.A9.asociarOrientacion([0,1],[2,1]);
    this.A10 = new Arista( this.B , this.R , this.Back[1][2] , this.Right[1][2] ,"A10") ; //chek
    this.A10.asociarOrientacion([1,2],[1,2]);
    this.A11 = new Arista( this.B , this.D , this.Back[2][1] , this.Down[2][1]  ,"A11") ; //chek
    this.A11.asociarOrientacion([2,1],[2,1]);
    this.A12 = new Arista( this.B , this.L , this.Back[1][0] , this.Left[1][2]  ,"A12") ; //chek
    this.A12.asociarOrientacion([1,0],[1,2]);

    this.aristas = [this.A1 , this.A2 , this.A3 , this.A4 ,this.A5 , this.A6 , this.A7 ,this.A8 , this.A9 , this.A10 , this.A11 , this.A12 ] ;
    this.coloresAristas = [ [this.rojo , this.amarillo ] , [this.rojo,this.verde] , [this.rojo,this.blanco] , [this.rojo,this.azul] ,[this.amarillo,this.azul] , [this.amarillo,this.verde] , [this.verde,this.blanco] , [this.azul,this.blanco] ,[this.amarillo,this.naranja] , [this.verde,this.naranja] , [this.blanco,this.naranja] , [this.naranja,this.azul] ] ;

  }

  resetear(){
    this.inicializarColores();
    this.inicializarPlanos() ;
    this.inicializarSecuenciaImportatesMovimientos() ;
    this.inicializarNombreCaras();

    // cara

    this.Front = [ [this.rojo,this.rojo,this.rojo] , [this.rojo,this.rojo,this.rojo] , [this.rojo,this.rojo,this.rojo] ] ;
    this.Back = [ [this.naranja,this.naranja,this.naranja] , [this.naranja,this.naranja,this.naranja] ,[this.naranja,this.naranja,this.naranja]  ]

    this.Left = [ [this.azul ,this.azul ,this.azul] , [this.azul ,this.azul ,this.azul] ,[this.azul ,this.azul ,this.azul] ] ;
    this.Right = [ [this.verde ,this.verde,this.verde] , [this.verde ,this.verde ,this.verde] ,[this.verde ,this.verde ,this.verde ] ] ;

    this.Down = [ [this.blanco ,this.blanco,this.blanco] ,[this.blanco ,this.blanco,this.blanco] ,[this.blanco ,this.blanco,this.blanco]  ] ;
    this.Top = [ [this.amarillo ,this.amarillo,this.amarillo] , [this.amarillo,this.amarillo,this.amarillo] ,[this.amarillo,this.amarillo,this.amarillo]] ;

    this.nombre_caras = [ this.F , this.B , this.L , this.R , this.D , this.T ] ;
    this.caras = [ this.Front , this.Back , this.Left , this.Right , this.Down , this.Top ] ;

    // Esquinas

    this.EF1 = new Esquina(this.F,this.L,this.T,this.Front[0][0],this.Left[0][0],this.Top[0][0]  ,"E1") ; // check
    this.EF1.asociarOrientacion([0,0],[0,0],[0,0]);
    this.EF2 = new Esquina(this.F,this.R,this.T,this.Front[0][2],this.Right[0][0],this.Top[0][2] ,"E2") ; // chek
    this.EF2.asociarOrientacion([0,2],[0,0],[0,2]);
    this.EF3 = new Esquina(this.F,this.L,this.D,this.Front[2][0],this.Left[2][0],this.Down[0][0] ,"E3") ; //check
    this.EF3.asociarOrientacion([2,0],[2,0],[0,0]);
    this.EF4 = new Esquina(this.F,this.R,this.D,this.Front[2][2],this.Right[2][0],this.Down[0][2] ,"E4") ; // check
    this.EF4.asociarOrientacion([2,2],[2,0],[0,2]);

    this.EB1 = new Esquina(this.B,this.L,this.T,this.Back[0][0],this.Left[0][2],this.Top[2][0] ,"E5") ; // check
    this.EB1.asociarOrientacion([0,0],[0,2],[2,0]);
    this.EB2 = new Esquina(this.B,this.R,this.T,this.Back[0][2],this.Right[0][2],this.Top[2][2] ,"E6") ; // check
    this.EB2.asociarOrientacion([0,2],[0,2],[2,2]);
    this.EB3 = new Esquina(this.B,this.L,this.D,this.Back[2][0],this.Left[2][2],this.Down[2][0] ,"E7") ; //chek
    this.EB3.asociarOrientacion([2,0],[2,2],[2,0]);
    this.EB4 = new Esquina(this.B,this.R,this.D,this.Back[2][2],this.Right[2][2],this.Down[2][2] ,"E8") ; //chek
    this.EB4.asociarOrientacion([2,2],[2,2],[2,2]);

    this.esquinas = [ this.EF1 , this.EF2 , this.EF3 , this.EF4 , this.EB1 , this.EB2 , this.EB3 , this.EB4 ] ;
    this.coloresEsquinas = [ [this.amarillo , this.rojo , this.azul] , [ this.amarillo , this.verde , this.rojo ] , [this.rojo ,this.blanco,this.azul ] , [this.rojo,this.verde,this.blanco] , [ this.amarillo , this.azul , this.naranja ] , [this.amarillo,this.verde,this.naranja] , [this.naranja,this.azul,this.blanco] , [ this.naranja , this.verde , this.blanco ] ] ;

    // Aristas

    this.A1 = new Arista( this.F , this.T , this.Front[0][1] , this.Top[0][1] , "A1"  ) ; //chek
    this.A1.asociarOrientacion([0,1],[0,1]);
    this.A2 = new Arista( this.F , this.R , this.Front[1][2] , this.Right[1][0],"A2" ) ; //chek
    this.A2.asociarOrientacion([1,2],[1,0]);
    this.A3 = new Arista( this.F , this.D , this.Front[2][1] , this.Down[0][1] ,"A3" ) ; //chek
    this.A3.asociarOrientacion([2,1],[0,1]);
    this.A4 = new Arista( this.F , this.L , this.Front[1][0] , this.Left[1][0] ,"A4" ) ; //chek
    this.A4.asociarOrientacion([1,0],[1,0]);

    this.A5 = new Arista( this.T , this.L , this.Top[1][0]  , this.Left[0][1]  ,"A5") ; //chek
    this.A5.asociarOrientacion([1,0],[0,1]);
    this.A6 = new Arista( this.T , this.R , this.Top[2][1]  , this.Right[0][1] ,"A6") ; //chek <------------
    this.A6.asociarOrientacion([2,1],[0,1]);
    this.A7 = new Arista( this.D , this.R , this.Down[1][2] , this.Right[2][1] ,"A7") ; //chek
    this.A7.asociarOrientacion([1,2],[2,1]);
    this.A8 = new Arista( this.D , this.L , this.Down[1][0] , this.Left[2][1]  ,"A8") ; //chek
    this.A8.asociarOrientacion([1,0],[2,1]);

    this.A9  = new Arista( this.B , this.T , this.Back[0][1] , this.Top[2][1]   ,"A9") ; //chek <-------------
    this.A9.asociarOrientacion([0,1],[2,1]);
    this.A10 = new Arista( this.B , this.R , this.Back[1][2] , this.Right[1][2] ,"A10") ; //chek
    this.A10.asociarOrientacion([1,2],[1,2]);
    this.A11 = new Arista( this.B , this.D , this.Back[2][1] , this.Down[2][1]  ,"A11") ; //chek
    this.A11.asociarOrientacion([2,1],[2,1]);
    this.A12 = new Arista( this.B , this.L , this.Back[1][0] , this.Left[1][2]  ,"A12") ; //chek
    this.A12.asociarOrientacion([1,0],[1,2]);

    this.aristas = [this.A1 , this.A2 , this.A3 , this.A4 ,this.A5 , this.A6 , this.A7 ,this.A8 , this.A9 , this.A10 , this.A11 , this.A12 ] ;
    this.coloresAristas = [ [this.rojo , this.amarillo ] , [this.rojo,this.verde] , [this.rojo,this.blanco] , [this.rojo,this.azul] ,[this.amarillo,this.azul] , [this.amarillo,this.verde] , [this.verde,this.blanco] , [this.azul,this.blanco] ,[this.amarillo,this.naranja] , [this.verde,this.naranja] , [this.blanco,this.naranja] , [this.naranja,this.azul] ] ;


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
    this.coloresEsquinas = [ [this.amarillo , this.rojo , this.azul] , [ this.amarillo , this.verde , this.rojo ] , [this.rojo ,this.blanco,this.azul ] , [this.rojo,this.verde,this.blanco] , [ this.amarillo , this.azul , this.naranja ] , [this.amarillo,this.verde,this.naranja] , [this.naranja,this.azul,this.blanco] , [ this.naranja , this.verde , this.blanco ] ] ;
    this.caras = [ this.Front , this.Back , this.Left , this.Right , this.Down , this.Top ] ;

  }

  actualizarAristas(){

    this.A1.actualizarArista( this.F , this.T , this.Front[0][1] , this.Top[0][1]    ) ;
    this.A2.actualizarArista( this.F , this.R , this.Front[1][2] , this.Right[1][0] ) ;
    this.A3.actualizarArista( this.F , this.D , this.Front[2][1] , this.Down[0][1]  ) ;
    this.A4.actualizarArista( this.F , this.L , this.Front[1][0] , this.Left[1][0] ) ;

    this.A5.actualizarArista( this.T , this.L , this.Top[1][0]  , this.Left[0][1] ) ;
    this.A6.actualizarArista( this.T , this.R , this.Top[1][2]  , this.Right[0][1] ) ;
    this.A7.actualizarArista( this.D , this.R , this.Down[1][2] , this.Right[2][1] ) ;
    this.A8.actualizarArista( this.D , this.L , this.Down[1][0] , this.Left[2][1] ) ;

    this.A9.actualizarArista( this.B , this.T , this.Back[0][1] , this.Top[2][1]   ) ;
    this.A10.actualizarArista( this.B , this.R , this.Back[1][2] , this.Right[1][2]) ;
    this.A11.actualizarArista( this.B , this.D , this.Back[2][1] , this.Down[2][1] ) ;
    this.A12.actualizarArista( this.B , this.L , this.Back[1][0] , this.Left[1][2] ) ;

    this.coloresAristas = [ [this.rojo , this.amarillo ] , [this.rojo,this.verde] , [this.rojo,this.blanco] , [this.rojo,this.azul] ,[this.amarillo,this.azul] , [this.amarillo,this.verde] , [this.verde,this.blanco] , [this.azul,this.blanco] ,[this.amarillo,this.naranja] , [this.verde,this.naranja] , [this.blanco,this.naranja] , [this.naranja,this.azul] ] ;

    this.aristas = [this.A1 , this.A2 , this.A3 , this.A4 ,this.A5 , this.A6 , this.A7 ,this.A8 , this.A9 , this.A10 , this.A11 , this.A12 ] ;

    this.caras = [ this.Front , this.Back , this.Left , this.Right , this.Down , this.Top ] ;

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

   if(secuencia == undefined || secuencia == ""){
    return
   }

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
    console.log(" Arista : "+n+" { Colores : "+s_c+" | Cara : "+s_ca+" | Bien Orienta:"+this.aristaBienOrientada(n)+" }" );

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
     if(secuencia == undefined || secuencia ==  "") {
       return "" ;
     }

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

//
   desordenar(){

    var secuencia = this.secuenciaGirosAleatorios(25) ;
    console.log("Secuencia de desordenado : "+secuencia)
    this.aplicarSecuenciaTransformaciones(secuencia) ;
    return secuencia ;

   }

// ---- Busqueda ---

   buscarArista(colorA,colorB){
     for (var i = 0 ; i< 12 ; i++ ){
          var arista = this.aristas[i]

          if( arista.tieneLosColores(colorA,colorB) ){
            return arista ;
          }
     }
   }

   aristaBienColocada(n_numero){

    var arista = this.aristas[n_numero-1];
    var colores_a = arista.devolverColores()
    var colores_colocado = this.coloresAristas[n_numero-1];
    var bienColocada = arista.tieneLosColores(colores_colocado[0],colores_colocado[1]) ;

   return bienColocada ;

   }

   aristaBienOrientada(n){

     var arista = this.aristas[n-1];
     var asociacionA_a = arista.asociacionA ;
     var asociacionB_a = arista.asociacionB ;

     //if ( ! this.aristaBienColocada(n) ) {
         var t = false ;
     //}else{

         var caraA = this.s_cara(asociacionA_a[0]);
         var caraB = this.s_cara(asociacionB_a[0]);

         var colorCentroA = caraA[1][1] ;
         var colorCentroB = caraB[1][1] ;

         var coorA = asociacionA_a[1] ;
         var coorB =  asociacionB_a[1];

         var colorPiezaA = caraA[coorA[0]][coorA[1]] ;
         var colorPiezaB = caraB[coorB[0]][coorB[1]] ;


         var t = colorPiezaA == colorCentroA && colorCentroB == colorPiezaB ;

     //}

     console.log("colorCentroA : "+this.rgbColor(colorCentroA)+" colorCentroB : "+this.rgbColor(colorCentroB ))
     console.log("colorPiezaA : "+this.rgbColor(colorPiezaA)+" colorPiezaB : "+this.rgbColor(colorPiezaB ))

     return t ;



   }

   s_cara(s_cara){
     for (var i = 0 ;  i < 6 ; i++ ){

          if (s_cara == this.nombre_caras[i]){
              console.log(this.nombre_caras[i]);
              var cara = this.caras[i] ;
              return cara ;
          }
     }
   }

   buscarEsquina(colorA ,colorB,colorC){
     for (var i = 0 ; i < 8 ; i++ ){
          var esquina = this.esquinas[i]

          if( esquina.tieneLosColores(colorA,colorB,colorC) ){
            return esquina ;
          }
     }


   }

   esquinaBienColocada(n_numero){
     var esquina = this.esquinas[n_numero-1];
     var colores_a = esquina.devolverColores() ;
     var colores_colocado = this.coloresEsquinas[n_numero-1];
     var bienColocada = esquina.tieneLosColores(colores_colocado[0],colores_colocado[1],colores_colocado[2]) ;

    return bienColocada ;

   }

   esquinaBienOrientada(n){


     var esquina = this.esquinas[n-1];

     var asociacionA_a = esquina.asociacionA ;
     var asociacionB_a = esquina.asociacionB ;
     var asociacionC_a = esquina.asociacionC ;

     //if ( ! this.esquinaBienColocada(n) ) {
        // var t = false ;
     //}else{

         var caraA = this.s_cara(asociacionA_a[0]);
         var caraB = this.s_cara(asociacionB_a[0]);
         var caraC = this.s_cara(asociacionC_a[0]);

         var colorCentroA = caraA[1][1] ;
         var colorCentroB = caraB[1][1] ;
         var colorCentroC = caraC[1][1] ;

         var coorA = asociacionA_a[1] ;
         var coorB =  asociacionB_a[1];
         var coorC =  asociacionC_a[1];

         var colorPiezaA = caraA[coorA[0]][coorA[1]] ;
         var colorPiezaB = caraB[coorB[0]][coorB[1]] ;
         var colorPiezaC = caraC[coorC[0]][coorC[1]] ;


         var t = colorPiezaA == colorCentroA && colorCentroB == colorPiezaB && colorCentroC == colorPiezaC ;

     //}

     console.log("colorCentroA : "+this.rgbColor(colorCentroA)+" colorCentroB : "+this.rgbColor(colorCentroB ))
     console.log("colorPiezaA : "+this.rgbColor(colorPiezaA)+" colorPiezaB : "+this.rgbColor(colorPiezaB ))
     console.log("colorPiezaC : "+this.rgbColor(colorPiezaC)+" colorPiezaC : "+this.rgbColor(colorPiezaC ))

     return t ;
   }

   verAristas(){
     for( var i = 0 ; i < 12 ; i++ ){
       cubo.verArista(i+1)
     }
   }

   concatenarSecuencia(sec1,sec2){
     if (sec1 == "" | sec1 == undefined){
       return sec2 ;
     }else if (sec2 == "" | sec2 == undefined){
       return sec1 ;
     }else {
       return sec1+","+sec2 ;
     }

   }

// algoritmo

// Paso 1 : Hacer la cruz

 dejarAristaTop(nombre){

   var posiciones = ["A7" , "A8" , "A10" , "A11" , "A12" ] ;
   var algoritmos = ["2r',t,2r" , "2l',t',2l'" , "r',t,r" , "2b',2t,2b" , "l',t',l" ] ;

   for( var i = 0 ; i < posiciones.length ; i++){
       if (nombre == posiciones[i]){
          var al = algoritmos[i] ;
          return al ;
       }
   }
   return "" ;
 }

 dejarAristaFront(nombre){

   var posiciones=["A5","A6","A9"] ;
   var algoritmos=[ "t'" , "t" , "2t" ];

   for( var i = 0 ; i < posiciones.length ; i++){
       if (nombre == posiciones[i]){
          var al = algoritmos[i] ;
          return al ;
       }
   }
   return "" ;

 }

 dejarAristaPosicionCruz(nombre){


     var posiciones = ["A1","A2","A4"];
     var algoritmos = ["2f","f","f'"]

     for( var i = 0 ; i < posiciones.length ; i++){
         if (nombre == posiciones[i]){
            var al = algoritmos[i] ;
            return al ;
         }
     }
     return "" ;

 }

 colocarOrientarArista(colores ){

  var arista = this.buscarArista(colores[0],colores[1]) ;
  var nombre = arista.devolverNombre();
  var algoritmo = "";
  var al1 = this.dejarAristaTop(nombre);

  this.aplicarSecuenciaTransformaciones(al1);


  arista = this.buscarArista(colores[0],colores[1]);
  var al2 = this.dejarAristaFront(arista.nombre);
  algoritmo = this.concatenarSecuencia(al1,al2)

  this.aplicarSecuenciaTransformaciones(al2);

  arista = this.buscarArista(colores[0],colores[1]);
  var al3 = this.dejarAristaPosicionCruz(arista.nombre);
  algoritmo = this.concatenarSecuencia(algoritmo,al3)


  this.aplicarSecuenciaTransformaciones(al3);

  var orientar = "f',r,t,r',2f" ;


  if ( !this.aristaBienOrientada(3) ){

      this.aplicarSecuenciaTransformaciones(orientar);
      algoritmo = this.concatenarSecuencia(algoritmo,orientar)

  }


   console.log(algoritmo);
   return algoritmo ;
 }

 cruz(){
   var aristas_cruz = [[this.rojo,this.blanco],[this.verde,this.blanco],[this.naranja,this.blanco],[this.azul,this.blanco]] ;
   var algoritmo = "" ;
   for (var i = 0 ; i < aristas_cruz.length ;i++){
     var al = this.colocarOrientarArista(aristas_cruz[i]);
     this.aplicarSecuenciaTransformaciones("z")
     algoritmo = this.concatenarSecuencia(algoritmo,al+",z");
   }
   console.log(algoritmo);
   return algoritmo ;

 }

 //Paso 2 : Poner las esquinas de D

 dejarEsquinaEnPosicion(nombre){

   var posiciones = ["E1","E2","E4","E5","E6","E7","E8"];
   var algoritmos = ["f',l',f,l","l,t,l'","r,l,t,l',r'","f,t',f'","f,2t,f'","b,f,t',b',f'","b',f,2t,b,f'"] ;

   for( var i = 0 ; i < posiciones.length ; i++){
       if (nombre == posiciones[i]){
          var al = algoritmos[i] ;
          return al ;
       }
   }
   return "" ;

 }

 colocarOrientarEsquina(colores){

   var esquina = this.buscarEsquina(colores[0],colores[1],colores[2]);
   var nombre = esquina.devolverNombre();
   var algoritmo= "" ;

   var al1 = this.dejarEsquinaEnPosicion(nombre);
   this.aplicarSecuenciaTransformaciones(al1);

   algoritmo = al1 ;

   var sexi_move = "f,t,f',t',f,t,f'";

   while( ! this.esquinaBienOrientada(3) ){

      this.aplicarSecuenciaTransformaciones(sexi_move);
      algoritmo = this.concatenarSecuencia(algoritmo,sexi_move);

   }
   return algoritmo
 }

  colorcarEsquinasD(){

    var esquinas = [[this.azul,this.rojo,this.blanco],[this.rojo,this.verde,this.blanco],[this.verde,this.naranja,this.blanco],[this.naranja,this.azul,this.blanco]] ;
    var algoritmo = "" ;

    for(var i = 0 ; i <  esquinas.length ; i++){

        var  a = this.colocarOrientarEsquina(esquinas[i]);
       this.aplicarSecuenciaTransformaciones("z");
       algoritmo = this.concatenarSecuencia(algoritmo,a+",z") ;

    }
    return algoritmo ;
  }

// Paso 3 : Lados

dejarAristaTopLados(nombre){

  var posiciones = ["A2","A5","A6","A9","A10","A12"];
  var B = "t,r,t',r',f,r',f',r,2t" ;
  var algoritmos = [B,"t'","t","2t","z,"+B+",t,z'","2z,"+B+",2t,2z'"];

  for( var i = 0 ; i < posiciones.length ; i++){
      if (nombre == posiciones[i]){
         var al = algoritmos[i] ;
         return al ;
      }
  }
  return "" ;

}

colocarArista(nombre){

  if( nombre == "A1" ){
    return "t',l,t,l',f',l',f,l" ;
  }
  return "";

}

colocarLado(colores){

    var arista = this.buscarArista(colores[0],colores[1]) ;
    var nombre = arista.devolverNombre();
    var algoritmo = "" ;

    var al1 = this.dejarAristaTopLados(nombre);
    console.log(nombre);
    algoritmo = al1 ;
    this.aplicarSecuenciaTransformaciones(al1);

    arista = this.buscarArista(colores[0],colores[1]) ;
    console.log(arista.devolverNombre());

    var al2 = this.colocarArista(arista.devolverNombre());
    algoritmo = this.concatenarSecuencia(algoritmo,al2);
    this.aplicarSecuenciaTransformaciones(al2);

    var rotar = "f,t',f',t,l,2t,l',2t',l,t,l'"
    if(!this.aristaBienOrientada(4)){
      this.aplicarSecuenciaTransformaciones(rotar);
      algoritmo = this.concatenarSecuencia(algoritmo,rotar);
    }
    return algoritmo ;
}

 hacerLados(){
   var arista = [ [this.azul,this.rojo] ,[this.verde,this.rojo] , [this.verde,this.naranja] , [this.naranja,this.azul] ] ;
   var algoritmo = "";
   for(var i = 0 ; i < arista.length ; i++ ){
     var a = this.colocarLado( arista[i] );
     this.aplicarSecuenciaTransformaciones("z");
     algoritmo=this.concatenarSecuencia(algoritmo,a+",z")
   }
   return algoritmo ;
 }

 // Paso 4 : Cruz cara de arriba

 detectarCruz(){
   var condicion = this.amarillo == this.Top[1][0] && this.amarillo == this.Top[0][1] && this.amarillo == this.Top[2][1] && this.amarillo == this.Top[1][2] ;
   return condicion ;
 }

 detectarLinea(){
   var condicion = this.amarillo == this.Top[2][1] && this.amarillo == this.Top[0][1]   ;
   var condicion2 = this.amarillo == this.Top[1][0] && this.amarillo == this.Top[1][2] ;

  var estado = undefined ;
  if (condicion2 ){
     console.log("horizonta")
     estado = true

  }else if(condicion) {
    console.log("Vertical")
    estado = false ;
  }


   return [ condicion || condicion2 , estado ];
 }

 detectarL(){

   var condicion1 = this.amarillo == this.Top[1][0] && this.amarillo == this.Top[2][1]
   var condicion2 = this.amarillo == this.Top[2][1] && this.amarillo == this.Top[1][2]
   var condicion3 = this.amarillo == this.Top[1][2] && this.amarillo == this.Top[0][1]
   var condicion4 = this.amarillo == this.Top[1][0] && this.amarillo == this.Top[0][1]

   var estado = 0 ;

   if (condicion1){
      estado = 1 ;

   } else if(condicion2){
      estado = 2 ;
   } else if(condicion3){
      estado = 3 ;
   }else if(condicion4){
      estado = 4 ;
   }
     console.log(estado)
   return [condicion1 || condicion2 || condicion3 || condicion4 , estado ] ;
 }

 detectarPunto(){
   var condicion = this.amarillo != this.Top[1][0] && this.amarillo != this.Top[0][1] && this.amarillo != this.Top[2][1] && this.amarillo != this.Top[1][2] ;
   return condicion ;
 }

 hacerCruzTop(){

  var cruz = this.detectarCruz();
  var line = this.detectarLinea();
  var l = this.detectarL();
  var punto = this.detectarPunto();

  var algoritmo = "" ;
  var resolverLinea = "f,r,t,r',t',f'" ;
  var resolverL = "f,t,r,t',r',f'" ;

  if(cruz) {
  console.log("Cruz") ;
  algoritmo = algoritmo ;

  }else if(line[0]){
    console.log("Linea");
    if(line[1]){
       //horizonta
       algoritmo = resolverLinea ;
    }else{
      //vertical
      algoritmo = "t,"+resolverLinea ;

    }

  }else if(l[0]){
     console.log("L");
     var a = ""
     if(l[1] == 2){
        a = "t',";
     }else if(l[1] == 3){
        a = "2t," ;
     }else if(l[1] == 4){
        a = "t," ;
     }else{
       a  = "" ;
     }

     algoritmo=a+resolverL  ;

  }else{
   console.log("Punto");
   algoritmo = resolverL+",t,"+resolverLinea ;

  }
  this.aplicarSecuenciaTransformaciones(algoritmo);
  return algoritmo
 }

// Paso 5 : Colocar Centros

todosCentrosBienColocados(){
  var centros = [1,5,6,9] ;
  for ( var i = 0 ; i < 4 ; i++ ){
     if(!this.aristaBienColocada(centros[i])){
        return false ;
     }
  }
  return true ;
}

moviendoSeColocan(){
  var secuencia = ""
  var bien  = false ;
  for(var i = 0 ; i < 4 ; i++){

     if ( this.todosCentrosBienColocados()) {
       bien = true ;
     }
     this.aplicarSecuenciaTransformaciones("t");
     secuencia = this.concatenarSecuencia(secuencia,"t");
  }

   return bien  ;
}

colocarBien(){
  var secuencia = ""
  var bien  = false ;

  for(var i = 0 ; i < 4 ; i++){

     if ( this.todosCentrosBienColocados()) {
       break ;
     }
     this.aplicarSecuenciaTransformaciones("t");
     secuencia = this.concatenarSecuencia(secuencia,"t");
  }

   return secuencia  ;


}

cuantosCentroHayColocados(){
  var centros = [1,5,6,9] ;
  var contador = 0 ;
  for(var i = 0 ; i < 4 ; i++){
     if(this.aristaBienColocada(centros[i])){
        contador = contador + 1 ;
     }
  }
  return contador ;

}

sePuedeTenerUnCentroColcado(){

  var secuencia = ""
  var secuencia_negada = "" ;

  var bien  = false ;

  for(var i = 0 ; i < 4 ; i++){

     if ( this.cuantosCentroHayColocados() == 1) {
       bien = true ;
       break ;
     }
     this.aplicarSecuenciaTransformaciones("t");
     secuencia = this.concatenarSecuencia(secuencia,"t");
     secuencia_negada = this.concatenarSecuencia(secuencia_negada,"t'");
  }

   this.aplicarSecuenciaTransformaciones(secuencia_negada);
  return bien  ;

}

irAlCentro(){

  var secuencia = ""
  var bien  = false ;

  // muevo hasta colocar el centro

  for(var i = 0 ; i < 4 ; i++){

     if ( this.cuantosCentroHayColocados() == 1) {
       break ;
     }
     this.aplicarSecuenciaTransformaciones("t");
     secuencia = this.concatenarSecuencia(secuencia,"t");
  }


  // cual es el centro colocado
  var a = [1,5,6,9] ;
  var p = ["","z'","z","2z"] ;
  var centro = 0 ;

  for(var i = 0 ; i < 4 ; i++){
    if (this.aristaBienColocada(a[i]) ) {
      centro = a[i] ;
      break ;
    }
  }

  // me muevo ha dicha arista
  for(var i = 0 ; i < 4 ; i++){
    if (a[i] ==  centro) {
      this.aplicarSecuenciaTransformaciones(p[i]);
      secuencia = this.concatenarSecuencia(secuencia,p[i]);
      break ;
    }
  }


  return  secuencia ;

}

colocarCentros(){
  var colocar = "r,t,r',t,r,2t,r'"
  var secuencia = "" ;
  this.aplicarSecuenciaTransformaciones(colocar);
  secuencia = this.concatenarSecuencia(secuencia,colocar);

  if( this.Right[1][1] != this.Right[0][1] && this.Left[1][1] != this.Left[0][1] ){

    this.aplicarSecuenciaTransformaciones(colocar);
    secuencia = this.concatenarSecuencia(secuencia,colocar);
  }

  return secuencia ;

}

irCentroMalColocado(){

  var secuencia = ""
  var bien  = false ;

  // muevo hasta colocar el centro

  for(var i = 0 ; i < 4 ; i++){

     if ( this.cuantosCentroHayColocados() == 2 ) {
       break ;
     }
     this.aplicarSecuenciaTransformaciones("t");
     secuencia = this.concatenarSecuencia(secuencia,"t");
  }


  // cual es el centro alcolocado
  var a = [1,5,6,9] ;
  var p = ["","z'","z","2z"] ;
  var centro = 0 ;

  for(var i = 0 ; i < 4 ; i++){
    if (!this.aristaBienColocada(a[i]) ) {
      centro = a[i] ;
      break ;
    }
  }

  // me muevo ha dicha arista
  for(var i = 0 ; i < 4 ; i++){
    if (a[i] ==  centro) {
      this.aplicarSecuenciaTransformaciones(p[i]);
      secuencia = this.concatenarSecuencia(secuencia,p[i]);
      break ;
    }
  }


  return  secuencia ;


}

irCaraRoja(){
   var ir = ["","z" ,"2z" ,"z'"] ;
   var colores = [this.rojo,this.azul,this.naranja,this.verde];

   for(var i = 0 ; i < 4 ; i++){
     if(this.Front[1][1] == colores[i]){
     this.aplicarSecuenciaTransformaciones(ir[i]);
     return ir[i] ;
    }
   }
   return "" ;
}

hacerCentros(){

  var algoritmo = "" ;

  if(this.moviendoSeColocan()){
    //console.log("Ya hecho");
    var c = this.colocarBien();
    var b = this.irCaraRoja();
    return this.concatenarSecuencia(c,b);
  }
  if (this.sePuedeTenerUnCentroColcado()){
    //console.log("UN CENTRO");
    var a = this.irAlCentro();
    var b = this.colocarCentros();
    algoritmo = this.concatenarSecuencia(a,b);
    var c = this.irCaraRoja();
    algoritmo = this.concatenarSecuencia(algoritmo,c);
    return algoritmo ;

  }else{
    //console.log("NADA");
    var a = this.irCentroMalColocado();
    this.aplicarSecuenciaTransformaciones("r,t,r',t,r,2t,r'");
    var b = "r,t,r',t,r,2t,r'" ;
    algoritmo = this.concatenarSecuencia(a,b);
    var c = this.irCaraRoja();
    algoritmo = this.concatenarSecuencia(algoritmo,c);
    var d = this.irAlCentro();
    algoritmo = this.concatenarSecuencia(algoritmo,d);
    var e = this.colocarCentros();
    algoritmo = this.concatenarSecuencia(algoritmo,e);
    return algoritmo ;
  }


}

// Paso 6 : Colocar esquinas

 esquinasBienColocadas(){
   var esquinas = [1,2,5,6] ;
   for(var i = 0 ; i < 4 ; i++){
      if( ! this.esquinaBienColocada(esquinas[i]) ){
        return  false ;
      }
   }
   return true ;

 }

 hayUnaOMasEsquinasBienColocadas(){
   var esquinas = [1,2,5,6] ;
   for(var i = 0 ; i < 4 ; i++){
      if( this.esquinaBienColocada(esquinas[i]) ){
        return  true ;
      }
   }
   return false ;

 }

 EsquinaBienColocada(){
   var esquinas = [1,2,5,6] ;
   for(var i = 0 ; i < 4 ; i++){
      if( this.esquinaBienColocada(esquinas[i]) ){
        return  esquinas[i] ;
      }
   }


 }

 irEsquinaBienColocada(n){

   var esquinas = [1,2,5,6] ;
   var ir = ["","z","z'","2z"] ;
   for(var i = 0  ; i < 4  ; i++ ){
     if(n == esquinas[i]){
       this.aplicarSecuenciaTransformaciones(ir[i]);
       return ir[i] ;
     }

   }

 }

 colorcarEs(){

   var secuencia = "r,t',l,t,r',t',l',t";
   var algoritmo = secuencia ;

   console.log(" antes entrar primero  Front Color : "+this.Front[1][1]);
   this.aplicarSecuenciaTransformaciones(secuencia) ;
   var roja = this.irCaraRoja() ;
   algoritmo = this.concatenarSecuencia(algoritmo,roja);

   console.log(" antes entrar segundo  Front Color : "+this.Front[1][1]);

   if(!this.esquinasBienColocadas()){
     console.log("segundo");
     this.aplicarSecuenciaTransformaciones(this.secuenciaNegada(roja))
     algoritmo = this.concatenarSecuencia(algoritmo,this.secuenciaNegada(roja));
     this.aplicarSecuenciaTransformaciones(secuencia) ;
     algoritmo = this.concatenarSecuencia(algoritmo,secuencia);

   }




   return algoritmo ;
 }

 colocarEsquinasT(){
   var roja = this.irCaraRoja();
   var algoritmo = roja ;
   if(!this.esquinasBienColocadas()){

     if(this.hayUnaOMasEsquinasBienColocadas()){
       console.log("una bien colocada")
       var esquina = this.EsquinaBienColocada() ;
       var a = this.irEsquinaBienColocada(esquina) ;
       algoritmo = this.concatenarSecuencia(algoritmo,a)
       var b = this.colorcarEs() ;
       algoritmo = this.concatenarSecuencia(algoritmo,b)
       return algoritmo ;

     }else{
       console.log("ninguna bien colocada")

       var secuencia =  "r,t',l,t,r',t',l',t";
       algoritmo = this.concatenarSecuencia(algoritmo,secuencia)
       this.aplicarSecuenciaTransformaciones(secuencia);
       var esquina = this.EsquinaBienColocada() ;

       while(!this.esquinasBienColocadas()){
        var b = this.irEsquinaBienColocada(esquina) ;
        algoritmo = this.concatenarSecuencia(algoritmo,b)
        var c = this.colorcarEs() ;
        algoritmo = this.concatenarSecuencia(algoritmo,c)
        var roja = this.irCaraRoja();
        algoritmo = this.concatenarSecuencia(algoritmo,roja)

       }

       return algoritmo ;


     }

   }
   console.log("Bien colocadas")
   return "" ;
 }

// Paso 7 : Oientar Esquinas

 orientacionEsquina(){

  if( this.Right[0][0] == this.amarillo ){
    return 1 ;
  }else if(this.Front[0][2] ==  this.amarillo ){
    return 2;
  }else{
    return 0;

  }

}

 secuenciaOrientacion(oriencacion){
   var o = "r',d,r,d',r',d,r,d'"
   var orientar = ["",o,o+","+o];

   for (var  i = 0 ; i < 3 ;i++){
        if (oriencacion == i){
           return orientar[i] ;
        }
   }

 }

 orientarEsquinas(){

   var algoritmo = "" ;

   for(var i = 0 ; i < 4 ; i++){

      var orientacion_esquina = this.orientacionEsquina() ;
      var secuencia = this.secuenciaOrientacion(orientacion_esquina) ;
      this.aplicarSecuenciaTransformaciones(secuencia);
      algoritmo = this.concatenarSecuencia(algoritmo,secuencia) ;

      this.aplicarSecuenciaTransformaciones("t");
      algoritmo = this.concatenarSecuencia(algoritmo,"t") ;

      }



   return algoritmo ;

 }

 //
 resolver(){


   var al_cruz = this.cruz();
   var esquinas_d = this.colorcarEsquinasD() ;
   var lados = this.hacerLados();
   var cruz_t = this.hacerCruzTop();
   var centros = this.hacerCentros();
   var esquinas_t = this.colocarEsquinasT();
   var ir = this.irCaraRoja();
   var orientar_esquinas = this.orientarEsquinas();


   return al_cruz+","+esquinas_d+","+lados+","+cruz_t+","+centros+","+esquinas_t+","+ir+","+orientar_esquinas ;

 }


//
  dibujar(p){

    this.plano4.colorear(this.Front,1) ;
    this.plano3.colorear(this.Top,2) ;
    this.plano1.colorear(this.Back,3) ;
    this.plano2.colorear(this.Right,3) ;
    this.plano6.colorear(this.Down,0) ;
    this.plano5.colorear(this.Left,1) ;


    this.plano1.dibujar(p) ;
    this.plano2.dibujar(p) ;
    this.plano3.dibujar(p) ;
    this.plano4.dibujar(p) ;
    this.plano5.dibujar(p) ;
    this.plano6.dibujar(p) ;


  }

}

function dibujarEjes(p){

   p.fill(0,0,0);
   p.stroke(0,0,0);
   p.strokeWeight(3) ;
   p.line(0,0,0,-200,0,0) ;
   p.line(0,0,0,0,-200,0) ;
   p.line(0,0,0,0,0,200) ;
   p.strokeWeight(40) ;
   p.stroke(255,0,0);
   p.point(0,-200,0)
   p.stroke(0,255,0);
   p.point(0,0,200)
   p.stroke(0,0,255);
   p.point(-200,0,0)

}

//---------------------------------------------
var cubo = new Cubo()

var desordenar = cubo.desordenar() ;
var solucion = cubo.resolver() ;
cubo.resetear() ;

console.log("Secuencia Desordenado : "+ desordenar);
console.log("Secuencia Solucion : "+ solucion);

document.write("<p> Secuencia Desordenado : "+desordenar+"</p>")
cubo.aplicarSecuenciaTransformaciones(desordenar);
var s_p = cubo.procesarSecuencia(solucion);

var i = 0 ;
var x = 0 ;
var resolver = false ;

var s1 = function (p){

var easycam ;





p.setup = function(){
  p.createCanvas(800, 800 , p.WEBGL);
  easycam = p.createEasyCam() ;
}

p.draw = function(){
  p.background(255);
  p.rotateZ(p.PI/2+x);
  p.rotateX(-p.PI/4 + x) ;
  p.rotateY(p.PI/4 + x ) ;

  dibujarEjes(p);
  p.translate(-100,-100,-100);

  cubo.dibujar(p) ;

  if( p.frameCount%12 == 0 && p.resolver ){
   cubo.aplicarSecuenciaTransformaciones(s_p[i]);
   i=i+1;
  }


}

p.keyPressed = function(){
  p.resolver = true ;
  return false;
}

}

new p5(s1);
