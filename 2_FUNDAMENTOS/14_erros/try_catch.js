const x = 10

try {
    x = 2
} catch (err) {
    console.log(`Erro: ${err}`)
}

/*O catch não encerra a execução do programa, assim dando a oportunidade
do usuário corrigir o seu erro e continuar normalmente com a execução do programa*/