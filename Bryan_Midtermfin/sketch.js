let balls=[];
let b1;//"boy"
let magnet;//"magnet"
let xgap;//x-axis distance between boy and girl
let ygap;
let b1Spd;//speed of boy
let spdFac;//speed factor
let spacePressed=false;
let magDir;//direction of magnet
let dist;//distance between magnet and boy
let trigger8s=false;//8s trigger to reveal magnet
let circles=[];//array of circles
const interval=50;//interval of field circles
let lastCreationTime=0;


function setup(){
  createCanvas(800,800);
  b1=new Boy(10,10,10,8);
  magnet=new Magnet(mouseX,mouseY,magDir,dist);
  for(let i=0;i<16;i++){
    balls[i]=new Ball();
  }
}



function draw(){
  let currentTime=millis();

  if (magnet.repel && !spacePressed) {
    background(255); //white background
    stroke(0); //black stroke for circles
  } else if(!spacePressed){
    background(0); //otherwise, use a black background
    stroke(255); //white stroke for circles
  }

  if (currentTime>8000 && !trigger8s) {
    magnet.show=true;
    trigger8s=true; //set the flag so it doesn't trigger again
  }

  if (!spacePressed){
    //if space is not pressed create instance of Boy
    b1.update();
    b1.constrainWithinCanvas();
    b1.spawn(255,255,255);
    b1.bounce();


    if (mouseIsPressed === true){
      magnet.position.set(mouseX,mouseY);
      magnet.bound();
      magnet.update();
      xgap=b1.position.x - magnet.position.x;//distance on x axis
      ygap=b1.position.y - magnet.position.y;//y dist
      magDir=atan2(ygap,xgap);//magnet's direction

      let attraction=createVector(-xgap,-ygap);//distance vector
      dist=attraction.mag();//magnitude of attraction
      attraction.normalize();//normalize to 1 length

      magnet.angle=degrees(magDir);

      
      magnet.spawn(240,50,magDir,dist);
      
      

      if (magnet.repel){
        attraction.mult(-1);//repel
        
      }

      let power=(500000/(dist*dist));
      //limits power
      if(power>20){
        power=20;
      }
      attraction.mult(power);

      b1.acceleration=attraction;

      //drawing circles here
      if (mouseIsPressed && currentTime - lastCreationTime >= interval){
        circles.push({ x: mouseX, y: mouseY, radius: dist*.6, createdTime: currentTime });
        lastCreationTime = currentTime; //reset the timer
      } else{
        b1.acceleration.set(0,0);//if mouse not clicked b1 has no acceleration
      }

      b1.velocity.limit(40);
    

      for (let i = circles.length - 1; i >= 0; i--) {
        let circle = circles[i];
    
        //draw the circle
        noFill();
        ellipse(circle.x, circle.y, circle.radius * 2, circle.radius * 2); //*2 because ellipse() expects diameter
        
        //splice circle if it has lasted more than half a second
        if (currentTime - circle.createdTime > 500) { //500ms=0.5 seconds
          circles.splice(i, 1); //remove the circle after .5sec
        }
      }
    }
  }//another scene of multiple balls
  else{//if space is pressed
    background(255);

    for (i=0;i<16;i++){
      balls[i].update();
      balls[i].constrainWithinCanvas();
      balls[i].spawn();

      if (mouseIsPressed){
        let mousePos=createVector(mouseX,mouseY);
        let attraction2=p5.Vector.sub(mousePos, balls[i].position);
        let dist2=attraction2.mag();
        attraction2.normalize();
        let pwr2=(100000/(dist2*dist2));
        if(pwr2>20){
          pwr2=20;
          }
        attraction2.mult(pwr2);
        
        balls[i].acceleration=(attraction2);
      }
      else{
        //balls[i].acceleration.set(0,0);
        //cannot debug this in time
      }
    }
  }
}
  
  


//key listener
function keyPressed(){
  if(key === 'c' || key === "C"){
    magnet.show = !magnet.show;
  }
  if(key === 'r' || key === "R"){
    magnet.repel = !magnet.repel;
  }
  if(key === ' '){
    spacePressed=!spacePressed;
    if(spacePressed){
      balls = [];//clear the array
      for (let i = 0; i < 16; i++) {
        balls[i] = new Ball(); //create 16 new balls
      }
    }
  }
}