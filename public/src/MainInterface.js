import { playSkillGame } from './SkillInterface.js'
import { playSmartGame } from './SmartInterface.js'
import SkillGame from './SkillGame.js'
import SmartGame from './SmartGame.js'
import { newLevel } from '../main.js'

$(document).ready(function () {
  let thisLevel = newLevel(0)
  let skillGame = new SkillGame(thisLevel)
  let smartGame
  let roundNo = 0
  let masterScore = 0
  $('#next').hide()
  $('#score').hide()
  $('#skillapp').hide()
  $('#smartapp').hide()
  $('#gameover').hide()
  $('#nextround').hide()

  $('#start').click(function () {
    $('#basiccanvas').hide()
    $('#start').hide()
    $('#skillapp').show()
    $('#view').hide()
    playSkillGame(skillGame)
  })

  $('#next').click(function () {
    $('#basiccanvas').hide()
    $('#next').hide()
    $('#smartapp').show()
    smartGame = new SmartGame(skillGame.word, skillGame.score)
    playSmartGame(smartGame)
  })

  $('#savescore').click(function () {
    console.log(smartGame)
    document.getElementById("smartscore").value = smartGame.smartPoints
    document.getElementById("skillscore").value = smartGame.skillPoints
  })


  $('#nextround').click(() => {
    masterScore += Number($('#total').text())
    roundNo += 1
    thisLevel = newLevel(roundNo)
    skillGame = new SkillGame(thisLevel)
    $('#view').show()
    $('#nextround').hide()
    $('#gameover').hide()
    $('#start').show()
  })
})
