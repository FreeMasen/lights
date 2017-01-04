const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const morgan = require('morgan')('dev', {
    skip: function (req, res) { return process.env.travis || res.statusCode < 400}
})
app.use(morgan)
app.use(bodyparser.json({strict: false}))
const flip = require('./src/flip.js')

const LightManager = require('./src/lights.js')
const lightManager = new LightManager()

app.use(express.static(`${__dirname}`))

app.get('/switches', (req, res) => {
    res.send(JSON.stringify(lightManager.lights))
})

app.post('/flip/:id/:newState', (req, res) => {
    let id = Number.parseInt(req.params.id)
    let state = Number.parseInt(req.params.newState)
    if (id == NaN || state == NaN) {
        return res.status(404).send()
    }
    let selectedLight = lightManager.find(id)
    if (selectedLight != undefined)  {
        selectedLight.on = state == 1 
        flip(selectedLight.codes[state])
        lightManager.saveLights()
    }
    res.send(JSON.stringify(lightManager.lights))
})

app.post('/switch/:id', (req, res) => {
    let id = Number.parseInt(req.params.id)
    console.log(`post(/switch/${id})`)
    if (id == NaN) {
        console.log('returning 404')
        return res.status(404).send()
    }
    if (req.body == undefined || req.body.name == undefined) {
        console.log('returning 404 due to body missing or incorrectly formatted')
        return res.status(404).send()
    }
    console.log('finding sw')
    let sw = lightManager.find(id)
    console.log('overwritting sw')
    sw = req.body
    console.log('stringifying sw')
    let bd = JSON.stringify(sw)
    console.log('sending bd')
    res.send(bd)
    console.log('saving lights')
    lightManager.saveLights()
    
})

app.get('*', (req, res) => {
    res.redirect('/')
})

app.listen('9999', (err) => {
    if (err) process.exit()
})