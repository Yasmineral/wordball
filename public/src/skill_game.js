class Game {
  constructor (holeArray) {
    this.score = 0
    this.letters = ['D', 'O', 'G', 'F', 'A', 'R', 'T', 'Z']
    this.balls = []
    this.letters.forEach(element => this.balls.push(new Ball(250, 600, 15, element)))
    this.counter = 0
    this.word = []
    this.holeArray = holeArray
    this.bLeftCorner = [100, 800]
    this.bRightCorner = [400, 800]
    this.tLeftCorner = [100, 700]
    this.tRightCorner = [400, 700]
  }

  forceGameOver () {
    this.counter = this.letters.length
  }

  isGameOver () {
    if (this.counter >= this.letters.length) {
      return true
    } else {
      return false
    }
  }

  increaseCounter () {
    this.counter += 1
  }

  currentBall () {
    return this.balls[this.counter]
  }

  isBallinScoreHole (ball) {
    var self = this
    this.holeArray.forEach(function (item) {
      const x1 = item.xPos - item.radius
      const x2 = item.xPos + item.radius
      const y1 = item.yPos - item.radius
      const y2 = item.yPos + item.radius
      const x = ball.xPos
      const y = ball.yPos
      if (x > x1 && x < x2 && y > y1 && y < y2) {
        ball.done()
        self.increaseCounter()
        self.score += ball.score * item.score
      }
    })
  }

  isBallInTheAbyss (ball) {
    if (ball.yPos <= ball.radius) {
      ball.done()
      this.increaseCounter()
    }
  }

  isBallinWordHole (ball) {
    const x = ball.xPos
    const y = ball.yPos
    if (x > 100 && x < 400 && y > 700 && y < 800) {
      this.word.push(ball.letter)
      ball.done()
      this.increaseCounter()
    }
  }
}
