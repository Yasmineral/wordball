import Letter from './letter.js'
import { newLevel } from '../main.js'

$( document ).ready(() => {

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
})
