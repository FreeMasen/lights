const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const debug = require('debug')('server')

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

app.post('/switch/:id', (req, res) => {
    let id = Number.parseInt(req.params.id)
    debug(`post(/switch/${id})`)
    if (Number.isNaN(id)) {
        debug('returning 404')
        return res.status(404).send()
    }
    if (req.body == undefined) {
        debug('returning 404 due to missing body')
        debug(req.body)
        return res.status(404).send()
    }
    let body = req.body
    if (typeof body == 'string') {
        try {
            body = JSON.parse(body) 
        } catch(e){
            debug('failed to parse body returning 409')
            return res.status(409).send()
        }
    }
    if (id != body.id) {
        debug('returning 409 due to conflicting ids')
        return res.status(409).send()
    }
    debug('finding sw')
    let sw = lightManager.find(id)
    debug('overwritting sw')
    sw = body
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