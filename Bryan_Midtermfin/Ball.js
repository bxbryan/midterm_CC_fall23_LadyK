class Ball{
    constructor(){
      //give each ball a random position, velocity and color
      this.position=createVector(random(width),random(height));
      this.velocity=p5.Vector.random2D().mult(random(20));//limits velocity to 20
      this.color=color(random(255),random(255),random(255),random(255));
      this.topSpeed=20;
    }
  
    //update the ball's position
    update(){
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.bounce();
      this.velocity.limit(this.topSpeed);
    }
  
    //method to show the ball
    spawn(){
      fill(this.color);
      noStroke();
      ellipse(this.position.x, this.position.y, 40, 40);
    }
  
    bounce(){
        if(this.position.x>width-1 || this.position.x<1){//setting bounds to 0 would make b1 stick to edges
            this.velocity.x*=-1;
        }
        if(this.position.y>height-1 || this.position.y<1){
            this.velocity.y*=-1;
            //print(this.velocity.y);
        }
    }

    constrainWithinCanvas() {
        this.position.x=constrain(this.position.x,20,width-20);
        this.position.y=constrain(this.position.y,20,height-20);
    }
  }