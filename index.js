const express = require('express')
const app = express()
const morgan = require('morgan')('dev', {
    skip: function (req, res) { return req.method.toLowerCase() == 'get'
                                        && req.url.includes('node_modules')}
})
app.use(morgan)
const flip = require('./src/flip.js')

const mockLights = = require('./src/lights.js')

app.use(express.static(`${__dirname}`))
app.get("/dashboard", (req, res) => {
    res.redirect('/')
})
app.get('/switch/:id', (req, res) => {
    res.redirect('/')
})

app.get('/switches', (req, res) => {
    res.send(JSON.stringify(mockLights))
})

app.post('/:id/:newState', (req, res) => {
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
    mockLights.forEach((light) => {
        if (light.id == id) {
            light.state = state
            selectedLight = light
        }
    })
    console.log(`id: ${id}, selectedLight: ${selectedLight.id}`)
    flip(selectedLight.codes[state])
    res.send(mockLights)
})

app.listen('9999', () => {
    console.log('listening on 9999')
})