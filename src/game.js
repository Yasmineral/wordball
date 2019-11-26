class Game {

  constructor() {
    this.letters = ['A','B','C','D']
    this.balls = []
    this.letters.forEach(element => this.balls.push(new Ball(250,600,'green',15,element)))
    this.counter = 0;
    this.word = []

    this.lifetime = 100;

    this.bLeftCorner = [100,800]
    this.bRightCorner = [400,800]
    this.tLeftCorner = [100,700]
    this.tRightCorner = [400,700]
  }

  isGameOver() {
    if(this.counter>=this.letters.length) {
      return true
    }
    else {
      return false
    }
  }

  increaseCounter() {
    this.counter+=1
  }

  currentBall() {
    return this.balls[this.counter]
  }

  isBallinHole(ball) {
    let x = ball.xPos
    let y = ball.yPos
    if (x>100&&x<400&&y>700&&y<800) {
      this.word.push(ball.letter)
      ball.done()
      this.increaseCounter()
    }
  }

  resetLife() {
    this.lifetime = 100
  }

  tick(ball) {
    this.isBallDead()
    this.lifetime--
  }

  isBallDead(ball) {
    if (this.lifetime<=0) {
      ball.done()
      this.increaseCounter()
      resetLife()
    }
  }



}
