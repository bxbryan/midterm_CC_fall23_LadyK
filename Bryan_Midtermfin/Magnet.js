let alpha;
class Magnet{
    constructor(x,y,dir,dist){
        this.position = new createVector(x,y);
        //this.velocity = new createVector(v1,v2);
        this.acceleration = new createVector(0,0);
        this.topSpeed=10;
        this.angle=dir;
        this.repel=false;
        this.show=false;
        this.range=dist;

    }

    update(){
        //this.velocity.add(this.acceleration);
        this.position;
        //this.velocity.limit(this.topSpeed);

    }

    spawn(){//showing a magnet here
        //alpha = constrain(this.range/1000*135+120, 120, 255);
        //print(alpha);
        //ellipse(this.position.x, this.position.y, 50, 50);
        push();
        translate(this.position.x,this.position.y);
        rotate(radians(this.angle)+PI/2);
        //print(this.angle);
        //drawing the magnet shape below
        strokeWeight(5);
        if (this.show === false){
            noStroke();//magnet invisible when show is false
        }
        else{
            if (this.repel === false){
                stroke(240,50,100);//red for attraction
            }
            else{
                stroke(20,60,240,140);//blue for repulsion
            }
        }
        
        
        noFill();
        arc(0,0,80,80,0,PI);
        arc(0,0,40,40,0,PI);
        line(-20,0,-20,-60);
        line(-40,0,-40,-60);
        line(40,0,40,-60);
        line(20,0,20,-60);
        line(-40,-60,-20,-60);
        line(20,-60,40,-60);
        pop();
        
        /*the reason for adding PI/2 to rotation is because 
        I drew the shape facing up
        so the directon to b1 calculated in draw() is actually
        assuming a positive x-axis to be 0 rad
        I had to rotate the canvas by a further PI/2 to match
        the horseshoe magnet
        */
    }

    bound(){//intended to let magnet stay within canvas
        if(mouseX>width-10){
            this.position.x=(width-10);
        }
        if (mouseX<10){
            this.position.x=(10);
        }
        if(mouseY>height-10){
            this.position.y=(height-10);
        }
        if (mouseY<10){
            this.position.y=(10);
        }
    }
}

