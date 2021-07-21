
var l = 170 ;

var front = new Plano(l,new p5.Vector(250,30 + 200) ,new p5.Vector(1,0),new p5.Vector(0,1) ) ;
var top_ = new Plano(l,new p5.Vector(250,30) ,new p5.Vector(1,0),new p5.Vector(0,1) ) ;

var down = new Plano(l,new p5.Vector(250,30 + 2* 200) ,new p5.Vector(1,0),new p5.Vector(0,1) ) ;
var back = new Plano(l,new p5.Vector(250,30 + 3* 200) ,new p5.Vector(1,0),new p5.Vector(0,1) ) ;

var right = new Plano(l,new p5.Vector(250 + 200 ,30 + 200) ,new p5.Vector(1,0),new p5.Vector(0,1) ) ;
var left = new Plano(l,new p5.Vector(250 - 200,30 + 200) ,new p5.Vector(1,0),new p5.Vector(0,1) ) ;


front.colorear(cubo.Front,0) ;
top_.colorear(cubo.Top,2) ;
back.colorear(cubo.Back,2) ;
right.colorear(cubo.Right,0) ;
down.colorear(cubo.Down,0) ;
left.colorear(cubo.Left,0) ;

function actuazarPlanos(){
  front.colorear(cubo.Front,0) ;
  top_.colorear(cubo.Top,2) ;
  back.colorear(cubo.Back,2) ;
  right.colorear(cubo.Right,0) ;
  down.colorear(cubo.Down,0) ;
  left.colorear(cubo.Left,0) ;
}

var s2 = function( sketch ) {

   sketch.setup = function() {

    let canvas2 = sketch.createCanvas(800, 820);
    canvas2.position(900,0);
  }

  sketch.draw = function() {

    sketch.background(255);
    actuazarPlanos();

    front.dibujar2D(sketch,"F");
    top_.dibujar2D(sketch,"T");
    down.dibujar2D(sketch,"D");
    back.dibujar2D(sketch,"B");
    left.dibujar2D(sketch,"L");
    right.dibujar2D(sketch,"R");

    sketch.textSize(70);
    sketch.textStyle(sketch.ITALIC);
    sketch.noStroke();
    sketch.fill(0);
    sketch.textAlign(sketch.CENTER,sketch.CENTER);
    sketch.text(s_p[i],600,600);
    sketch.textSize(25);
    sketch.text("Transformacion Actual :",600,600-60);


  }

}


new p5(s2);
