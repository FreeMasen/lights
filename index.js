const express = require('express')
const app = express()

const flip = require('./src/flip.js')

const mockLights = [
    {name: 'Christmas Tree',
    id: 1,
    on: true,
    codes: {
        on: '4543795',
        off: '4543804'
    }},
    {name: 'Not In Use',
    id: 2,
    on: false,
    codes: {
        on: '4543939',
        off: '44543948'
    }},
    {name: 'Not In Use',
    id: 3,
    on: false,
    codes: {
        on: '4544359',
        off: '4544268'
    }},
    {name: 'Breakfast Nook',
    id: 4,
    on: false,
    codes: {
        on: '4545795',
        off: '4545804'
    }},
    {name: 'Craft Room',
    id: 5,
    on: false,
    codes: {
        on: '4551939',
        off: '4551948'
    }}
]

app.use(express.static(`${__dirname}`))
app.get("/dashboard", (req, res) => {
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