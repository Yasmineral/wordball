import Level from '../src/level.js'

describe('Level', () => {
  it('should behave...', () => {
    const level = new Level()
    const holeArray = [
      new Hole(200, 200, 1, 30),
      new Hole(300, 200, 1, 30),
      new Hole(100, 100, 2, 25),
      new Hole(400, 100, 2, 25),
      new Hole(250, 50, 5, 25)
    ]
    expect(level.holes).toEqual(holeArray)
  })
})
