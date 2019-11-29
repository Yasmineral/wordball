export default class Ball {
  constructor (y, radius, letter) {
    // letter details
    this.letter = letter.character
    this.colour = letter.colour
    this.score = letter.score
    // ball starting conditions
    this.radius = radius
    this.xPos = 100 + Math.floor(Math.random() * 300)
    this.yPos = y
    this.xVel = 0
    this.yVel = 0
    // cooefficent of resitution
    this.cor = 0.5
    // interval of time
    this.dt = 0.1
    // can the ball still be interacted with?
    this.isDone = false
    // has the ball been clicked by the player once?
    this.isClicked = false
    this.canvas = document.getElementById('canvas')
  }

  // give the ball velocity once after clicking
  giveVelocity (x1, y1, x2, y2) {
    if (this.isClicked === false) {
      var dy = y2 - y1
      var dx = x2 - x1
      if (dy < -100) {
        dy = -100
      }
      this.xVel = dx
      this.yVel = dy
      this.isClicked = true
    }
  }

  // check if the ball has slowed down to a half after being fired off
  checkStill () {
    if (this.isClicked && this.speed() < 5) {
      this.isDone = true
    }
  }

  // calc the speed from the velocity
  speed () {
    return Math.sqrt((Math.pow(this.xVel, 2) + Math.pow(this.yVel, 2)))
  }

  // update velocity
  velocity () {
    this.xVel = this.xVel * 0.99
    this.yVel = this.yVel * 0.99
  }

  // update position
  position () {
    this.checkStill()
    this.detectCollision()
    this.velocity()
    this.xPos += this.xVel * this.dt
    this.yPos += this.yVel * this.dt
  };

  // this.done indicates the ball cannot be interacted with by anything anymore
  done () {
    this.isDone = true
  }

  // detect bounces with the wall
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
