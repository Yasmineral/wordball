import { playSkillGame } from './SkillInterface.js'
import { playSmartGame } from './SmartInterface.js'
import SkillGame from './SkillGame.js'
import SmartGame from './SmartGame.js'
import { newLevel } from '../main.js'

$(document).ready(function () {
  let thisLevel = newLevel(0)
  let skillGame = new SkillGame(thisLevel)
  let roundNo = 0
  let masterScore = 0
  $("#next").hide()
  $("#score").hide()
  $("#skillapp").hide()
  $("#smartapp").hide()
  $("#gameover").hide()
  $("#nextround").hide()

  $("#start").click(function() {
    $("#start").hide()
    $("#skillapp").show()
    playSkillGame(skillGame)
  })

  $("#next").click(function() {
    $("#next").hide()
    $("#smartapp").show()
    $("#score").show()
    $("#timer").show()
    const smartGame = new SmartGame(skillGame.word,skillGame.score)
    playSmartGame(smartGame)
  })

  $("#nextround").click(() => {
    masterScore += Number($("#total").text())
    roundNo += 1
    console.log(masterScore)
    thisLevel = newLevel(roundNo)
    skillGame = new SkillGame(thisLevel)
    $("#nextround").hide()
    $("#gameover").hide()
    $("#start").show()
  })

})
