const _ = require('lodash')

const a = [1, 4, 5, 0]
const b = [0, 2, 4, 8, 10]

const diff = _.difference(a, b)

console.log(diff)