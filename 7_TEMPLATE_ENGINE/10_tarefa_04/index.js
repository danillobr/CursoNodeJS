const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

const products = [{
    id: "1",
    title: "Sofá",
    price: "499.99",
}, {
    id: "2",
    title: "Cama",
    price: "1000.99",
}, {
    id: "3",
    title: "Estante",
    price: "770.99",
}]

app.get('/product/:id', (req, res) => {
    const product = products[parseInt(req.params.id) - 1]
    res.render('product', { product })
})

app.get('/', (req, res) => {
    res.render('products', { products })
})

app.listen(3000)