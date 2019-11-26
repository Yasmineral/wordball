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
    const seedNumber = this.seed.value
    let lettersArray = this.getRandomLetterCodes(seedNumber).map((n) => {
      return ALPHABET[n]
    })

    lettersArray = lettersArray.map((character) => {
      const letter = new Letter(character)
      return letter
    })
    console.log(lettersArray)
    return lettersArray
  }

  getRandomLetterCodes (seedNumber) {
    let i
    const randomNumbers = []
    for (i = 0; i < this.totalLetters; i++) {
      // DO NOT REFACTOR - Must be done in sequence within same function
      seedNumber = (seedNumber * 9301 + 49297) % 233280
      var rnd = seedNumber / 233280
      randomNumbers.push(Math.floor(0 + rnd * (26 - 0)))
    }
    return randomNumbers
  }
}
