const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/post', (req, res) => {

    const post = {
        title: "Aprender Node.js",
        category: "JavaScript",
        body: "Este artigo vai te ajudar a aprender Node.js",
        commments: 4,
    }

    res.render('blogpost', { post: post })
})

app.get('/dashbord', (req, res) => {

    const items = ["item a", "item b", "item c"]

    res.render('dashbord', { items })
})

app.get('/', (req, res) => {

    const user = {
        name: "Danillo",
        surname: "Rodrigues",
        age: "24"
    }
    const palavra = 'teste'

    const auth = true

    const approved = false

    res.render('home', { user: user, palavra, auth, approved })
})

app.listen(3000, () => {
    console.log('App funcionando')
})