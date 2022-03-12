function a() {
    console.log('Executando a()')
}

function b() {
    console.log('Executando b()')
}

function c() {
    console.log('Executando c()')
    b()
    a()
}

c()

//Event Loop garante que a execução seja sequencial