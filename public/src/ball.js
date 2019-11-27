export default class Ball {
  constructor (x, y, radius, letter) {
    // letter details
    this.letter = letter.character
    this.colour = letter.colour
    this.score = letter.score
    //
    this.radius = radius
    this.xPos = x
    this.yPos = y
    this.xVel = 0
    this.yVel = 0
    // cooefficent of resitution
    this.cor = 0.5
    // interval of time
    this.dt = 0.1
    this.isDone = false
    this.isClicked = false
    this.canvas = document.getElementById('canvas')
  }

  giveVelocity (x1, y1, x2, y2) {
    if(this.isClicked === false) {
      var dy = y2-y1
      var dx = x2-x1
      if(dy<-100) {
        dy = -100
      }
      this.xVel = dx
      this.yVel = dy
      console.log(this.yVel)
      this.isClicked = true
    }
  }

  checkStill() {
    if(this.isClicked&&this.speed()<5) {
      this.isDone = true
    }
  }

  speed() {
    return Math.sqrt((Math.pow(this.xVel,2)+Math.pow(this.yVel,2)))
  }

  velocity () {
    this.xVel = this.xVel * 0.99
    this.yVel = this.yVel * 0.99
  }

  position () {
    this.detectCollision()
    this.velocity()
    this.checkStill()
    this.xPos += this.xVel * this.dt
    this.yPos += this.yVel * this.dt
  };

  done () {
    this.isDone = true
  }

  detectCollision () {
    if (this.xPos + this.radius > this.canvas.width) {
      this.xPos = this.canvas.width - this.radius
      this.xVel = -this.xVel * this.cor
    }
    if (this.xPos < this.radius) {
      this.xPos = this.radius
      this.xVel = -this.xVel * this.cor
    }
    if (this.yPos > this.canvas.height - this.radius) {
      this.yPos = this.canvas.height - this.radius
      this.yVel = -this.yVel * this.cor
    }
  }
}
