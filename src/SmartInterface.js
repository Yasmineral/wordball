$( document ).ready(() => {
  console.log('loaded')

  const playerLetters = ['D', 'O', 'N', 'E', 'S']
  const skillPoints = 50
  const letters = new Letters()
  const smartGame = new SmartGame(playerLetters, skillPoints)

  $.get('https://jsonp.afeld.me/?url=http://anagramica.com/all/:dones', function(data) {
      smartGame.possibleWords = data.all.filter((word) => {
        if (word.length >= 2) { return word }
      })
      console.log(smartGame)
  });

  generateLetterButtons ()

  $('#clearbutton').click(() => {
    console.log('clearbutton')
  })

  $('.letterbutton').click(() => {
    console.log(event.target.innerHTML)
  })

  function generateLetterButtons () {
    const buttonHTML = smartGame.playerLetters.map((letter) => {
      return `<button class="letterbutton">${letter}</button>`
    })
    $('#letterkeys').html(buttonHTML.join('\n'))
  }

})
