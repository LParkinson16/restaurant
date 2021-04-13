const express = require('express');
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const {Restaurant, Menu, Item} = require('./models')

const app = express();
const port = 3000;

// setup our templating engine
const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

// serve static assets from the public/ folder
app.use(express.static('public'));

// this route matches any GET request to the top level URL
app.get('/', (req, res) => {
    res.render('restaurants', {date: new Date()})
})

//template for route to about page
app.get('/about', (req, res) => {
    res.render('about', {date: new Date()})
})


//using findAll() to pass data into home file - will match any GET request to the created page
app.get('/home', async (req, res) => {
    const restaurants = await Restaurant.findAll({
        include: [
            Menu
        ]
    })
    res.render('home', {restaurants})
})

//adding route to induvidual restaurant pages

app.get('/restaurants/:id', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    const menus = await restaurant.getMenus({
        include: [Item],
        nest: true
    })    
    res.render('restaurant', {restaurant, menus})
})

//template route for add new restaurants page
app.get('/new', async (req, res) => {
    res.render('new')
})

//Adding delete functionality
app.get('/restaurants/:id/delete', async (req, res) => {
    await Restaurant.findByPk(req.params.id)
        .then(restaurant => {
            restaurant.destroy()
            res.redirect('/')
        })
})

//edit template
app.get('/restaurants/:id/edit', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    res.render('edit', {restaurant})
})


app.post('/restaurants/:id/edit', async (req, res) => {
    console.log(req.body)
    const restaurant = await Restaurant.findByPk(req.params.id)
    await restaurant.update(req.body)
    res.redirect(`/restaurants/${restaurant.id}`)
})


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})