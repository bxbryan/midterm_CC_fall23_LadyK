let currentTime;
let lastTime;
let interval;
let b1;//"boy"
let g1;//"girl"
let xgap;//x-axis distance between boy and girl
let ygap;
let b1Spd;//speed of boy
let spdFac;//speed factor

function setup(){
  createCanvas(800,800);
  b1=new Boy(0,0,10,8);
  
}



function draw(){
  
  background(0);
  b1.update();
  b1.spawn();
  b1.checkEdges();


  if (mouseIsPressed === true){
    g1=new Girl(mouseX,mouseY,0,0);
    g1.update();
    g1.spawn();
    g1.checkEdges();
    
    xgap=mouseX-b1.position.x;
    ygap=mouseY-b1.position.y;


    b1.acceleration.x=xgap/20;
    b1.acceleration.y=ygap/20;
  }
  else{
    b1.acceleration.x=0;
    b1.acceleration.y=0;
  }
  
  b1Spd=sqrt(b1.velocity.x*b1.velocity.x+b1.velocity.y*b1.velocity.y);
  spdFac=10/b1Spd;

  if (b1Spd<10){
    b1.velocity.x*=spdFac;
    b1.velocity.y*=spdFac;
  }
  

  /*next step would be to figure out how to let the pink "girl" be solid
  so that we can actually not have the two faces stack up
  this will make everything look more like real magnets

  then maybe there'll be another scene to demonstrate some other aspects
  */
}