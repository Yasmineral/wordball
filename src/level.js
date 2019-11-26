import { defaultHoleAttributes } from './config.js'
import Hole from './hole.js'
import Letter from './letter.js'

export default class Level {
  constructor (seed, totalLetters) {
    this.seed = seed
    this.totalLetters = totalLetters
    this.letters = this.generateLetterArray()
    this.holes = this.generateHolesArray(defaultHoleAttributes)
  }

  generateHolesArray (holeValues) {
    const array = []
    holeValues.forEach(holeValue => {
      const x = holeValue[0]
      const y = holeValue[1]
      const score = holeValue[2]
      const size = holeValue[3]
      const hole = new Hole(x, y, score, size)
      array.push(hole)
    })
    return array
  }

  generateLetterArray () {
    const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let lettersArray = []
    const seedNumber = this.seed.value
    lettersArray = this.getRandomLetterCodes(seedNumber).map((n) => {
      return ALPHABET[n]
    })

    return lettersArray.map((character) => {
      const letter = new Letter(character)
      return letter
    })
  }

  getRandomLetterCodes (seedNumber) {
    let i
    const randomNumbers = []
    for (i = 0; i < this.totalLetters; i++) {
      randomNumbers.push(this.createRandomNumber(seedNumber))
    }
    return randomNumbers
  }

  createRandomNumber (seedNumber) {
    seedNumber = (seedNumber * 9301 + 49297) % 233280
    var rnd = seedNumber / 233280
    return Math.floor(0 + rnd * (26 - 0))
  }
}
