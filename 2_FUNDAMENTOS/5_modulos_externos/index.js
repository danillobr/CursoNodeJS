const minimist = require('minimist')

const args = minimist(process.argv.splice(2))

console.log(args)

const nome = args['nome']
const profissao = args['profissao']
const idade = args['idade']

console.log(nome, profissao, idade)

console.log(`O nome dele é ${nome} e sua Profissão é ${profissao}`)