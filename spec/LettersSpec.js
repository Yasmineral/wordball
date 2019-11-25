const Letters = require('../src/Letters')

describe('LetterScores', () => {
  const letter = new Letters()

  describe('#getScore', () => {
    it("Passing in 'a' as an argument returns 1", () => {
      expect(letter.getScore('a')).toEqual(1)
    })

    it("Passing in 'e' as an argument returns 1", () => {
      expect(letter.getScore('e')).toEqual(1)
    })

    it("Passing in 'b' as an argument returns 2", () => {
      expect(letter.getScore('b')).toEqual(2)
    })

    it("Passing in 'f' as an argument returns 3", () => {
      expect(letter.getScore('f')).toEqual(3)
    })

    it("Passing in 'j' as an argument returns 4", () => {
      expect(letter.getScore('j')).toEqual(4)
    })

    it("Passing in 'q' as an argument returns 5", () => {
      expect(letter.getScore('q')).toEqual(5)
    })
  })
})
