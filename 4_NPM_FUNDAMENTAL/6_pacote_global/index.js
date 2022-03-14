const _ = require('lodash')

/*lodash é especial, ele é executado com os seus arquivos e não com comando,
mesmo instalando o módulo de forma global é necessário usar o comando npm link lodash
para ele funcionar*/

const arr = [1, 2, 2, 4, 4, 5]

console.log(_.sortedUniq(arr))