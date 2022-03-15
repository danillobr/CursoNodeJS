const express = require('express')
const app = express()
const port = 3000 //variável ambiente

const path = require('path')
const basePath = path.join(__dirname, 'templates')

const checkAuth = function(req, res, next) {

    req.authStatus = true // ou false

    if (req.authStatus) {
        console.log('Está logado, pode continuar')
        next()
            //aqui seria uma página/rota
    } else {
        console.log('Não está logado, faça o login para continuar');
        next()
            /*aqui já seria outra página/rota. Aí a depender da autenticação (login por exemplo)
            o sistema deixaria o usuário acessa uma determinada página/rota, ou redirecionaria para
            outra página/rota por o usuário não estar logado ou autenticado*/
    }
}

app.use(checkAuth)

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})