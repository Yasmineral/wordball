import { letterGroups, LetterColours } from './config.js'

export default class Letter {
  constructor (value) {
    this.value = value
    this.score = this.getScore(value)
    this.colour = this.getColour(value)
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
