class Ball {

  constructor(x,y,colour,radius,letter) {
    this.colour = colour;
    this.radius = radius;

    this.xPos = x;
    this.yPos = y;

    this.xVel = 0;
    this.yVel = 0;

    //cooefficent of resitution
    this.cor = 0.5;

    //interval of time
    this.dt = 0.1

    this.letter = letter

    this.isStill = false

    this.canvas = document.getElementById("canvas");
  }

  giveVelocity(x1,y1,x2,y2) {
    this.xVel = x2-x1
    this.yVel = y2-y1
  }

  velocity() {
    this.xVel = this.xVel*0.99
    this.yVel = this.yVel*0.99
  }

  position() {
    this.checkIfStill()
    this.detectCollision();
    this.velocity()
    this.xPos += this.xVel*this.dt;
    this.yPos += this.yVel*this.dt;
  };

  checkIfStill() {
    let speed = Math.sqrt(Math.pow(this.xVel,2)+Math.pow(this.yVel,2))
    if(speed<3) {
      this.isStill = true
    }
  };



  detectCollision() {



    if(this.yPos<this.radius) {
      this.yPos = this.radius;
      this.yVel = -this.yVel*this.cor;
    }

    if(this.xPos+this.radius>this.canvas.width) {
      this.xPos = this.canvas.width - this.radius
      this.xVel = -this.xVel*this.cor
    }

    if(this.xPos<this.radius) {
      this.xPos = this.radius
      this.xVel = -this.xVel*this.cor
    }

    if(this.yPos>this.canvas.height - this.radius) {
      this.yPos = this.canvas.height - this.radius
      this.yVel = -this.yVel*this.cor
    }
  };




}
