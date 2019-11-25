class Game {

  constructor() {

    this.letters = ['A','B','C','D']
    this.word = []

    this.bLeftCorner = [100,800]
    this.bRightCorner = [400,800]
    this.tLeftCorner = [100,700]
    this.tRightCorner = [400,700]

    this.counter = 0;
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

  isBallinHole(ball) {
    let x = ball.xPos
    let y = ball.yPos
    if (x>100&&x<400&&y>700&&y<800) {
      ball.makeStill()
      this.word.push(ball.letter)
      this.increaseCounter()
    }
  }



}
