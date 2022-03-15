const express = require('express')
const app = express()
port = 5000

const projectsRoutes = require('./projects')

app.use(express.static('public'))

app.use('/projects', projectsRoutes)

app.listen(port, () => {
    console.log(`O servidor está rodadno na porta ${port}`)
})