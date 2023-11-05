class Girl{
    constructor(x,y,v1,v2){
        this.position = new createVector(x,y);
        this.velocity = new createVector(v1,v2);
        this.acceleration = new createVector(0,0);
        this.topSpeed=10;
    }

    update(){
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.velocity.limit(this.topSpeed);

    }

    spawn(){
        //ellipse(this.position.x, this.position.y, 50,50);
        push();
        translate(this.position.x-65,this.position.y-60);
        strokeWeight(2);
        stroke(240,50,100);
        fill(0);
        ellipse(65,60,80,80);
        circle(48,60,20,20);
        circle(82,60,20,20);
        fill(255);
        circle(48,62,5,5);
        circle(82,62,5,5);
        line(65,63,58,75);
        line(58,75,66,78);
        pop();
    }

    bound(){//intended to let girl stay within canvas
        if(this.position.x>width-80){
            this.position.x=(width-80);
        }
        if (this.position.x<0){
            this.position.x=(0);
        }
        if(this.position.y>height-80){
            this.position.y=(height-80);
        }
        if (this.position.y<0){
            this.position.y=(0);
        }
    }
}

