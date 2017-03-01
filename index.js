const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const debug = require('debug')('server')

const sun = require('./src/sun.js')

app.use(bodyparser.json({strict: false}))
const flip = require('./src/flip.js')

const LightManager = require('./src/lights.js')

app.use(express.static(`${__dirname}`))

app.get('/switches', (req, res) => {
    debug('get/switches')
    res.send(JSON.stringify(lightManager.lights))
})

app.post('/flip/:id/:newState', (req, res) => {
    debug(`post/flip/${req.params.id}/${req.params.newState}`)
    let id = Number.parseInt(req.params.id)
    debug(`parsed id to ${id}`)
    let state = Number.parseInt(req.params.newState)
    debug(`parsed state to ${state}`)
    if (Number.isNaN(id) || Number.isNaN(state)) {
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

app.post('/new/switch/', (req, res) => {
    LightManager.add(req.body)
})

app.put('/switch/:id', (req, res) => {
    LightManager.update(req.body)
})

app.get('*', (req, res) => {
    res.redirect('/')
})

app.listen('9999', (err) => {
    if (err) process.exit()
})