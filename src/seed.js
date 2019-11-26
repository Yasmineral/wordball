export default class Seed {
  constructor(word) {
    this.word = word
    this.value = 0
    this.getValue()
  }

  getValue() {
    const array = []
    const wordArray = this.word.split('')
    wordArray.forEach(letter => {
      array.push(letter.charCodeAt(0))
    })
    this.value = parseInt(array.join(''))
  }
}

