const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/dashbord', (req, res) => {
    res.render('dashbord')
})

app.get('/', (req, res) => {

    const user = {
        name: "Danillo",
        surname: "Rodrigues",
        age: "24"
    }
    const palavra = 'teste'

    const auth = true

    res.render('home', { user: user, palavra, auth })
})

app.listen(3000, () => {
    console.log('App funcionando')
})