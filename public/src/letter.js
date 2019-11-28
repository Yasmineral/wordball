import { letterGroups, LetterColours } from './config.js'

export default class Letter {
  constructor (character) {
    this.character = character
    this.score = this.getScore(character)
    this.colour = this.getColour(character)
  }

  getScore (letter) {
    for (const key in letterGroups) {
      if (key.includes(letter)) {
        return letterGroups[key]
      }
    }
  }

  getColour (letter) {
    for (const key in LetterColours) {
      if (key.includes(letter)) {
        return LetterColours[key]
      }
    }
  }
}
