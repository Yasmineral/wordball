import { DEFAULT_TIMER } from './config.js'
import Game from './SkillGame.js'
import { newLevel } from '../main.js'

$(document).ready(function () {
  const thisLevel = newLevel()
  const game = new Game(thisLevel)
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  const timeInterval = setInterval(countdown, 1000)
  let interval
  let timeLeft = DEFAULT_TIMER
  function countdown() {
    if (timeLeft === 0) {
      game.forceGameOver()
      clearInterval(timeInterval)
    } else {
      $('#timer').text(timeLeft + ' seconds remaining')
      timeLeft--
    }
  };
  function playBall (ball) {
    countdown()
    interval = setInterval(draw, 10)
    let x1
    let x2
    let y1
    let y2
    $('#canvas').mousedown(function (canvas) {
      const offset = $(this).offset()
      x1 = event.clientX - offset.left
      y1 = event.clientY - offset.top
    })
    $('#canvas').mouseup(function (canvas) {
      const offset = $(this).offset()
      x2 = event.clientX - offset.left
      y2 = event.clientY - offset.top
      ball.giveVelocity(x1, y1, x2, y2)
    })
    function draw () {
      $('#score').text('Current Score: ' + game.score)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font = '20px Arial'
      game.isBallinScoreHole(ball)
      game.isBallinWordHole(ball)
      game.isBallInTheAbyss(ball)
      checkGameOver()
      drawRectangle()
      drawHoles(game.holeArray)
      if (ball.isDone === true) {
        ball = game.currentBall()
      } else {
        drawBall(ball)
      }
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
      ctx.fillStyle = 'white'
      ctx.fillText('Throw in here to make a word!', 115, 750)
    }
    function drawBall (ball) {
      ball.position()
      const x = ball.xPos
      const y = ball.yPos
      ctx.fillStyle = ball.colour
      ctx.beginPath()
      ctx.arc(x, y, ball.radius, 0, 2 * Math.PI)
      ctx.fill()
      ctx.stroke()
      ctx.fillStyle = 'white'
      ctx.fillText(ball.letter, x + 5, y + 30)
    }
  }
  function checkGameOver () {
    if (game.isGameOver() === true) {
      clearInterval(interval)
      $('#word').text(game.word)
      $('#canvas').hide()
      $('#timer').hide()
    }
  }
  playBall(game.currentBall())
})
