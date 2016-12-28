const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const morgan = require('morgan')('dev', {
    skip: function (req, res) { return req.method.toLowerCase() == 'get'
                                        && req.url.includes('node_modules')}
})
app.use(morgan)
app.use(bodyparser.json())
const flip = require('./src/flip.js')

const lightManager = require('./src/lights.js')

app.use(express.static(`${__dirname}`))
app.get("/dashboard", (req, res) => {
    res.redirect('/')
})
app.get('/switch/:id', (req, res) => {
    res.redirect('/')
})

app.get('/switches', (req, res) => {
    console.log(lightManager.lights)
    res.send(JSON.stringify(lightManager.lights))
})

app.post('/flip/:id/:newState', (req, res) => {
    let id
    let state
    if (req && req.params ) {
        if (req.params.id && req.params.newState) {
            id = req.params.id
            state = req.params.newState
        } else {
            res.status(404).send()
        }
    } else {
        res.status(404).send()
    }
    let selectedLight
    lightManager.lights.forEach((light) => {
        if (light.id == id) {
            light.state = state
            selectedLight = light
        }
    })
    flip(selectedLight.codes[state])
    lightManager.saveLights()
    res.send(JSON.stringify(lightManager.lights))
})

app.post('/switch/:id', (req, res) => {
    let id
    if (req && req.params) {
        if (req.params.id) {
            id = req.params.id
        } else {
            res.status(404).send()
        }
    } else {
        res.status(404).send()
    }
    let sw = lightManager.find(id)
    sw = req.body
    lightManager.saveLights()
}) 

app.listen('9999', () => {
    console.log('listening on 9999')
})