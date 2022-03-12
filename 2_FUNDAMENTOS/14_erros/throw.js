const x = 10

//chegar se o valor de x é um número, se não eu considero erro porque eu não quero que passe string
//o throw encerra a execução do código
if (!Number.isInteger(x)) {
    throw new Error('O valor de x tem que ser um número!')
}

console.log('Continuando o código...')