const Letters = require('../src/LetterScores')

describe('LetterScores', () => {
  const letter = new Letters()

  describe('#getScore', () => {
    it("Passing in 'a' as an argument returns 1", () => {
      expect(letter.getScore()).toEqual(1)
    })
  })
})
