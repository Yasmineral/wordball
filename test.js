Math.seed = 123253625

Math.seededRandom = function(max, min) {
    max = max || 26
    min = min || 0
    Math.seed = (Math.seed * 9301 + 49297) % 233280
    var rnd = Math.seed / 233280
    return Math.floor(min + rnd * (max - min))
}

console.log(Math.seededRandom())
console.log(Math.seededRandom())
console.log(Math.seededRandom())
console.log(Math.seededRandom())
console.log(Math.seededRandom())
