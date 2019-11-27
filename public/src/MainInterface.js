import { playSkillGame } from './SkillInterface.js'
import { playSmartGame } from './SmartInterface.js'
import SkillGame from './SkillGame.js'
import SmartGame from './SmartGame.js'
import { newLevel } from '../main.js'

$(document).ready(function () {
  const thisLevel = newLevel()
  const skillGame = new SkillGame(thisLevel)
  $("#next").hide()
  $("#score").hide()
  $("#skillapp").hide()
  $("#smartapp").hide()

  $("#start").click(function() {
    $("#start").hide()
    $("#skillapp").show()
    playSkillGame(skillGame)
  })

  $("#next").click(function() {
    $("#next").hide()
    $("#smartapp").show()
    const smartGame = new SmartGame(skillGame.word,skillGame.score)
    playSmartGame(smartGame)
  })

})
