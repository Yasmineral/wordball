class Letters {
  constructor () {
    this.scores = { EAIONRTLSU: 1, DGBCMP: 2, FHVWY: 3, KJX: 4, QZ: 5 }
    this.colours = { EAIONRTLSU: '#FF17D1', DGBCMP: '#17D5FF', FHVWY: '#5DFF17', KJX: '#FF2D2D', QZ: '#FFAC2D' }
    this.letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  }

  getScore (letter) {
    for (const key in this.scores) {
      if (key.includes(letter)) {
        return this.scores[key]
      }
    }
  }

  getColour (letter) {
    for (const key in this.colours) {
      if (key.includes(letter)) {
        return this.colours[key]
      }
    }
  }

  seededLetterGenerator (seed, required) {
    return this.seededRand(seed, required).map((n) => {
      return this.letters[n]
    })
  }

  seededRand (seed, required) {
    let i
    const randNums = []
    for (i = 0; i < required; i++) {
      seed = (seed * 9301 + 49297) % 233280
      var rnd = seed / 233280
      randNums.push(Math.floor(0 + rnd * (26 - 0)))
    }
    return randNums
  }
}
