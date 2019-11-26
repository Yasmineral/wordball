$( document ).ready(() => {
  console.log('loaded')

  const playerLetters = ['A', 'C', 'P', 'K']

  const letters = new Letters()

  $('#clearbutton').click(() => {
    console.log('clearbutton')
  })

  $('.letterbutton').click(() => {
    console.log(event.target.innerHTML)
  })


})
