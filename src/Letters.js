class Letters {
  constructor () {
    this.scores = { eaionrtlsu: 1, dgbcmp: 2, fhvwy: 3, kjx: 4, qz: 5 }
  }

  getScore (letter) {
    for (const key in this.scores) {
      if (key.includes(letter)) {
        return this.scores[key]
      }
    }
  }
}

module.exports = Letters
