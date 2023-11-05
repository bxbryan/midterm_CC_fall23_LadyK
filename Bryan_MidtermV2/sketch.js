
let b1;//"boy"
let magnet;//"magnet"
let xgap;//x-axis distance between boy and girl
let ygap;
let b1Spd;//speed of boy
let spdFac;//speed factor
let spacePressed=false;
let magDir;
let trigger20s=false;

function setup(){
  createCanvas(800,800);
  b1=new Boy(10,10,10,8);
  magnet=new Magnet(mouseX,mouseY,magDir);
}



function draw(){
  if (millis()>8000 && !trigger20s) {
    magnet.show=true;
    trigger20s=true; // Set the flag so it doesn't trigger again
  }

  if (!spacePressed){
    background(0);
    b1.update();
    b1.constrainWithinCanvas();
    b1.spawn(255,255,255);
    b1.bounce();


    if (mouseIsPressed === true){
      magnet.position.set(mouseX,mouseY);
      magnet.bound();
      magnet.update();
      xgap=b1.position.x - magnet.position.x;
      ygap=b1.position.y - magnet.position.y;
      magDir=atan2(ygap,xgap);

      magnet.angle=degrees(magDir);

      
      magnet.spawn(240,50,magDir);
      
      
      
      let attraction=createVector(-xgap,-ygap);
      let dist=attraction.mag();
      attraction.normalize();

      if (magnet.repel){
        attraction.mult(-1);
      }

      let power=(10/dist*dist);
      attraction.mult(power);

      b1.acceleration=attraction;

      //drawing circles here
      stroke(255);
      noFill();
      for(let i=0; i<6; i++){
      ellipse(mouseX,mouseY,dist-45*i,dist-45*i);
      }
      /*next step is to figure out how to let it only draw one circle each time
      and have each circle shrink
      */
    }
    else{
      b1.acceleration.set(0,0);
    }

    b1.velocity.limit(40);
  }
  
  
  //another scene

  
  



  /*
  b1Spd=b1.velocity.mag();
  spdFac=40/b1Spd;

  if (b1Spd<40){
    b1.velocity.mult(speFac);
  }
  */


  /*next step would be to figure out how to let the pink "girl" be solid
  so that we can actually not have the two faces stack up
  this will make everything look more like real magnets

  then maybe there'll be another scene to demonstrate some other aspects
  */
}

function keyPressed(){
  if (key === 'c' || key === "C"){
    magnet.show = !magnet.show;
  }
  if (key === 'r' || key === "R"){
    magnet.repel = !magnet.repel;
  }
  if (key === ' '){
    spacePressed=!spacePressed;
    if (spacePressed){
      background(0);
    }
  }
}