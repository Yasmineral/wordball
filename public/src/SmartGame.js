export default class SmartGame {
  constructor (playerLetters, skillPoints) {
    this.playerLetters = ["A", "R", "E", "Y", "J", "M"]
    this.skillPoints = skillPoints
    this.smartPoints = 0
    this.possibleWords = []
    this.validWords = []
  }
}
