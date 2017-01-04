const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const debug = require('debug')('server')

app.use(morgan)
app.use(bodyparser.json({strict: false}))
const flip = require('./src/flip.js')

const LightManager = require('./src/lights.js')
const lightManager = new LightManager()

app.use(express.static(`${__dirname}`))

app.get('/switches', (req, res) => {
    debug('get/switches')
    res.send(JSON.stringify(lightManager.lights))
})

app.post('/flip/:id/:newState', (req, res) => {
    debug(`post/flip/${req.params.id}/${req.params.newState}`)
    let id = Number.parseInt(req.params.id)
    let state = Number.parseInt(req.params.newState)
    if (id == NaN || state == NaN) {
        debug('returning 404')
        return res.status(404).send()
    }
    debug('setting selected light')
    let selectedLight = lightManager.find(id)
    if (selectedLight != undefined)  {
        debug('flipping selected light')
        selectedLight.on = state == 1 
        flip(selectedLight.codes[state])
        lightManager.saveLights()
    }
    debug('sending back list of lights')
    res.send(JSON.stringify(lightManager.lights))
})

app.post('/switch/:id', (req, res) => {
    let id = Number.parseInt(req.params.id)
    debug(`post(/switch/${id})`)
    if (id == NaN) {
        debug('returning 404')
        return res.status(404).send()
    }
    if (req.body == undefined || req.body.name == undefined) {
        debug('returning 404 due to body missing or incorrectly formatted')
        debug(req.body)
        return res.status(404).send()
    }
    debug('finding sw')
    let sw = lightManager.find(id)
    debug('overwritting sw')
    sw = req.body
    debug('stringifying sw')
    let bd = JSON.stringify(sw)
    debug('sending bd')
    res.send(bd)
    debug('saving lights')
    lightManager.saveLights()
    
})

app.get('*', (req, res) => {
    res.redirect('/')
})

app.listen('9999', (err) => {
    if (err) process.exit()
})