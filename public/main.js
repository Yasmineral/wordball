import { MAX_LETTERS, levelList } from './src/config.js'
import Level from './src/level.js'
import Seed from './src/seed.js'

export function newLevel (n) {
  // let nextLevel = 0 // zero indexed
  const seedWord = levelList[n]
  const seed = new Seed(seedWord)
  const thisLevel = new Level(seed, MAX_LETTERS)
  // if (nextLevel >= (levelList.length - 1)) {
  //   nextLevel = 1
  // } else {
  //   nextLevel += 1
  // }
  return thisLevel
}
