import { DEFAULT_TIMER } from './config.js'
import Letter from './letter.js'

export function playSkillGame (game) {
  // constants needed for the skillgame
  const letter = new Letter()
  const radius = game.balls[0].radius
  const canvas = document.getElementById('canvas')
  const canvas2 = document.getElementById('canvas2')
  const ctx = canvas.getContext('2d')
  const ctx2 = canvas2.getContext('2d')
  ctx2.strokeStyle = 'white'
  const timeInterval = setInterval(countdown, 1000)
  const interval = setInterval(draw, 10)
  let ball = game.balls[0]
  $('#score').show()
  let timeLeft = DEFAULT_TIMER
  function countdown () {
    if (timeLeft === 0) {
      game.forceGameOver()
      clearInterval(timeInterval)
    } else {
      $('#timer').text(timeLeft + ' seconds remaining')
      timeLeft--
    }
  }
  countdown()
  let x2 = 0
  let y2 = 0
  $('#canvas').bind('mousemove', function (e) {
    const offset = $(canvas).offset()
    x2 = e.pageX - offset.left
    y2 = e.pageY - offset.top
  })
  function inBounds (y) {
    if (y < 600) {
      return false
    }
    return true
  }
  $('#canvas').mousedown(function (canvas) {
    $('#canvas').mouseup(function (canvas) {
      if (inBounds(y2)) { ball.giveVelocity(ball.xPos, ball.yPos, x2, y2) }
    })
  })
  function draw () {
    checkGameOver()
    if (game.isGameOver() === false) {
      ctx.strokeStyle = 'black'
      fillBalls()
      $('#score').text('Current Score: ' + game.score)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font = '20px Arial'
      game.checkBallDone(ball)
      game.isBallinScoreHole(ball)
      game.isBallinWordHole(ball)
      game.isBallInTheAbyss(ball)
      drawRectangle()
      drawHoles(game.holeArray)
      if (ball.isDone === true) {
        ball = game.currentBall()
      } else {
        drawBall(ball)
      }
      ctx.fillStyle = 'white'
      ctx.fillText('Foul Line!', 200, 620)
      drawPath(ctx, 'white', 0, 600, 500, 600)
    }
  }

  function fillBalls () {
    ctx2.font = '20px Arial'
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height)
    var y = 920
    game.balls.forEach(function (item) {
      if (item.isClicked === false) {
        ctx2.beginPath()
        ctx2.fillStyle = item.colour
        ctx2.lineWidth = 0
        ctx2.arc(canvas2.width / 2, y, radius, 0, 2 * Math.PI)
        ctx2.fill()
        ctx2.stroke()
        y -= 40
      }
    })
  }
  function drawPath (ctx, colour, x1, y1, x2, y2) {
    var grd = ctx.createLinearGradient(x1, y1, x2, y2)
    grd.addColorStop(0, 'white')
    grd.addColorStop(1, colour)
    ctx.strokeStyle = grd
    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
  }
  function drawHoles (array) {
    array.forEach(function drawHole (item) {
      ctx.fillStyle = 'black'
      ctx.beginPath()
      ctx.arc(item.xPos, item.yPos, item.radius, 0, 2 * Math.PI)
      ctx.fill()
      ctx.stroke()
      ctx.fillStyle = 'white'
      ctx.fillText('x' + item.score, item.xPos - 8, item.yPos)
    })
  }
  function drawRectangle () {
    ctx.beginPath()
    ctx.rect(game.tLeftCorner[0], game.tRightCorner[1], game.tRightCorner[0] - game.tLeftCorner[0], game.bRightCorner[1] - game.tLeftCorner[1])
    ctx.stroke()
    ctx.fillStyle = 'black'
    ctx.fill()
    var x = game.tLeftCorner[0] + radius
    game.word.forEach(function (item) {
      ctx.fillStyle = letter.getColour(item)
      ctx.beginPath()
      ctx.lineWidth = 1
      ctx.arc(x, game.tRightCorner[1] + 35, radius, 0, 2 * Math.PI)
      ctx.fill()
      ctx.stroke()
      ctx.fillStyle = 'white'
      ctx.fillText(item, x - 10, game.tRightCorner[1] + 41)
      x += radius * 2
    })
  }
  function drawBall (ball) {
    ball.position()
    const x = ball.xPos
    const y = ball.yPos
    if (inBounds(y2) && ball.isClicked === false) {
      drawPath(ctx, ball.colour, ball.xPos, ball.yPos, x2, y2)
    }
    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.fillStyle = ball.colour
    ctx.fill()
    ctx.strokeStyle = 'white'
    ctx.stroke()
    ctx.fillStyle = 'white'
    ctx.fillText(ball.letter, x - 10, y + 6)
  }
  function checkGameOver () {
    if (game.isGameOver() === true) {
      clearInterval(interval)
      $('#skillapp').hide()
      $('#next').show()
      $('#score').hide()
      $('#timer').hide()
    }
  }
}
