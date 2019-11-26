// import Seed from './src/seed.js'
import Hole from './hole.js'
import Letter from './letter.js'

export default class Level {
  constructor(seed, totalLetters) {
    this.seed = seed
    this.totalLetters = totalLetters
    this.letters = this.generateLetterArray()
    this.holes = this.generateHolesArray()
  }

  generateHolesArray() {
    const placeholder = [
      new Hole(200, 200, 1, 30),
      new Hole(300, 200, 1, 30),
      new Hole(100, 100, 2, 25),
      new Hole(400, 100, 2, 25),
      new Hole(250, 50, 5, 25)
    ]
    return placeholder
  }

  generateLetterArray() {
    const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let lettersArray = []
    lettersArray = this.seedValuesArray().map((n) => {
      return ALPHABET[n]
    })

    return lettersArray.map((character) => {
      return new Letter(character)
    })
  }

  seedValuesArray() {
    let i
    const seedValues = []
    for (i = 0; i < this.totalLetters; i++) {
      const seedValue = (this.seed.value * 9301 + 49297) % 233280
      var rnd = seedValue / 233280
      seedValues.push(Math.floor(0 + rnd * (26 - 0)))
    }
    return seedValues
  }
}
