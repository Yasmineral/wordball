import Letter from '../public/src/level.js'


describe('LetterScores', () => {
  const letter = new Letter()

  describe('#getScore', () => {
    it("Passing in 'A' as an argument returns 1", () => {
      expect(letter.getScore('A')).toEqual(1)
    })

    it("Passing in 'E' as an argument returns 1", () => {
      expect(letter.getScore('E')).toEqual(1)
    })

    it("Passing in 'B' as an argument returns 2", () => {
      expect(letter.getScore('B')).toEqual(2)
    })

    it("Passing in 'F' as an argument returns 3", () => {
      expect(letter.getScore('F')).toEqual(3)
    })

    it("Passing in 'J' as an argument returns 4", () => {
      expect(letter.getScore('J')).toEqual(4)
    })

    it("Passing in 'Q' as an argument returns 5", () => {
      expect(letter.getScore('Q')).toEqual(5)
    })
  })

  describe('#seededLetterGenerator', () => {
    it('A seed of 245 and requirement of 10 will return a array of 10 fixed letters', () => {
      const expectedArray = ['Z', 'N', 'L', 'K', 'Q', 'O', 'Z', 'B', 'T', 'D']
      const result = letter.seededLetterGenerator(245, 10)
      expect(result).toEqual(expectedArray)
    })

    it('A seed of 123253625 and requirement of 5 will return a array of 5 fixed letters', () => {
      const expectedArray = ['A', 'P', 'W', 'O', 'U']
      const result = letter.seededLetterGenerator(123253625, 5)
      expect(result).toEqual(expectedArray)
    })
  })
})
