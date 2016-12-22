const express = require('express')
const app = express()
const morgan = require('morgan')('dev', {
    skip: function (req, res) { return req.method.toLowerCase() == 'get'
                                        && req.url.includes('node_modules')}
})
app.use(morgan)
const flip = require('./src/flip.js')

const mockLights = [
    {name: 'Christmas Tree',
    id: 1,
    on: true,
    codes: {
        '1': '4543795',
        '0': '4543804'
    }, 
    timers: [
        {isOn: false,
        time: '20:00'}
    ]},
    {name: 'Not In Use',
    id: 2,
    on: false,
    codes: {
        '1': '4543939',
        '0': '44543948'
    },
    timers: [
        {isOn: true,
            time: '6:00'}
    ]},
    {name: 'Not In Use',
    id: 3,
    on: false,
    codes: {
        '1': '4544359',
        '0': '4544268'
    },
    timers: [

    ]},
    {name: 'Breakfast Nook',
    id: 4,
    on: false,
    codes: {
        '1': '4545795',
        '0': '4545804'
    },
    timers: [

    ]},
    {name: 'Craft Room',
    id: 5,
    on: false,
    codes: {
        '1': '4551939',
        '0': '4551948'
    },
    timers: [

    ]}
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