const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const viewsPartials = path.join(__dirname, '../templates/partials')

// HBS engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(viewsPartials)

// Setup static directory for public
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Charlie Meaden'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Charlie Meaden'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Charlie Meaden'
    })
})

app.get('/weather', (req, res) => {
    const city = req.query.address
    if (!city) {
        return res.send({
           error: 'No address query found'
       })
   } (city) 

        geocode(city, (error, {latitude, longitude, location } = {} ) => {
            if (error) {
                res.send({error})
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return console.log(error)
                }
                res.send({
                    address: city,
                    location,
                    forecast: forecastData
                })
              })
            
        })
    })



app.get ('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404',
        errorMessage: 'Help article not found!',
        name: 'Charlie Meaden'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        errorMessage: 'Page not found!',
        name: 'Charlie Meaden'
    })
})

app.listen(3000, () => {
    console.log('We up and running!')
})