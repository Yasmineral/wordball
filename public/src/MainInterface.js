import {newLevel} from '../main.js'
import Game from './SkillGame.js'

$(document).ready(function () {

    $("#start").click(function() {
      $('#gamediv').load('../skill_index.html')
      skillGameStart()
    })

    function moveToSmart() {
      console.log('HELLLLOOOOOO')
      $('#score').html('<br>hello')
      smartGameStart()
    }

    function smartGameStart() {
      const playerLetters = ['P', 'A', 'N', 'D', 'A', 'Y', 'S']
      const skillPoints = 50
      const letterGetReq = playerLetters.join('').toLowerCase()
      const letters = new Letter()
      const smartGame = new SmartGame(playerLetters, skillPoints)

      $.get(`https://jsonp.afeld.me/?url=http://anagramica.com/all/:${letterGetReq}`, function(data) {
          smartGame.possibleWords = data.all.filter((w) => { if (w.length > 2) { return true } }).map((w) => {
            return w.toUpperCase()
          })
      });

      generateLetterButtons ()
      let wordInput = ''

      $('#clearbutton').click(() => {
        clearTextInput()
      })

      $('[class*="letterbutton-on"]').click(() => {
        if (event.target.className === "letterbutton-off") { return }
        wordInput += event.target.innerHTML
        event.target.className = "letterbutton-off"
        $('#typearea').text(wordInput)
        if (!smartGame.validWords.includes(wordInput) && smartGame.possibleWords.includes(wordInput)) {
          smartGame.validWords.push(wordInput)
          clearTextInput()
        }
        $('#validwordslist').html(smartGame.validWords.join(' - '))
      })

      function generateLetterButtons () {
        const buttonHTML = smartGame.playerLetters.map((letter) => {
          const score = letters.getScore(letter)
          return `<button class="letterbutton-on${score}" value="${score}">${letter}</button>`
        })
        $('#letterkeys').html(buttonHTML.join('\n'))
      }

      function clearTextInput () {
        wordInput = ''
        $('#typearea').text(wordInput)

        $('.letterbutton-off').each((_index, button) => {
          $(button).attr('class', `letterbutton-on${button.value}`)
        })
      }
    }

    function skillGameStart() {
        const thisLevel = newLevel()
        const game = new Game(thisLevel)
        console.log(document.getElementById('skillapp'))
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
            console.log('draw')
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
          console.log(checkGameOver())
          if (game.isGameOver() === true) {
            clearInterval(interval)
            console.log('game over')
            moveToSmart()
          }
        }
        playBall(game.currentBall())
      }

    })
