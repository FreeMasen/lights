const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const morgan = require('morgan')('dev', {
    skip: function (req, res) { return res.statusCode < 400}
})
app.use(morgan)
app.use(bodyparser.json())
const flip = require('./src/flip.js')

const LightManager = require('./src/lights.js')
const lightManager = new LightManager()

app.use(express.static(`${__dirname}`))
app.get("/dashboard", (req, res) => {
    res.redirect('/')
})
app.get('/switch/:id', (req, res) => {
    res.redirect('/')
})

app.get('/switches', (req, res) => {
    res.send(JSON.stringify(lightManager.lights))
})

app.post('/flip/:id/:newState', (req, res) => {
    let id = req.params.id
    let state = req.params.newState
    if (!Number.isInteger(id) ||
        !Number.isInteger(state)) {
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

app.listen('9999', (err) => {
    if (err) process.exit()
})