$( document ).ready(() => {
  console.log('loaded')

  const playerLetters = ['D', 'O', 'N', 'E', 'S']
  const skillPoints = 50
  const letters = new Letters()
  const smartGame = new SmartGame(playerLetters, skillPoints)

  $.get('https://jsonp.afeld.me/?url=http://anagramica.com/all/:dones', function(data) {
      smartGame.possibleWords = data.all.filter((word) => {
        if (word.length > 2) { return word }
      })
      console.log(smartGame)
  });

  generateLetterButtons ()

  let wordInput = ''

  $('#clearbutton').click(() => {
    console.log('clearbutton')
    clearTextInput()
  })

  $('.letterbutton').click(() => {
    console.log(event.target.innerHTML)
    wordInput += event.target.innerHTML.toLowerCase()
    $('#typearea').text(wordInput.toUpperCase())
    if (!smartGame.validWords.includes(wordInput) && smartGame.possibleWords.includes(wordInput)) {
      smartGame.validWords.push(wordInput)
      clearTextInput()
    }
    console.log(smartGame.validWords)
  })

  function generateLetterButtons () {
    const buttonHTML = smartGame.playerLetters.map((letter) => {
      return `<button class="letterbutton">${letter}</button>`
    })
    $('#letterkeys').html(buttonHTML.join('\n'))
  }

  function clearTextInput () {
    wordInput = ''
    $('#typearea').text(wordInput)
  }
})
