const Seed = require('../src/Seed')

describe('Seed', () => {
  it('returns 100111103 when passed dog', () => {
    const seed = new Seed('dog')
    expect(seed.value).toEqual(100111103)
  })

  it('returns 98117116116111100 when passed button', () => {
    const seed = new Seed('button')
    expect(seed.value).toEqual(98117116116111100)
  })
})
