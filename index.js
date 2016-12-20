const express = require('express')
const app = express()
const {exec} = require('child_process')
const morgan = require('morgan')
app.use(morgan('dev'))

const mockLights = [
    {name: 'Christmas Tree',
    id: 1,
    on: true},
    {name: 'Not In Use',
    id: 2,
    on: false},
    {name: 'Not In Use',
    id: 3,
    on: false},
    {name: 'Breakfast Nook',
    id: 4,
    on: false},
    {name: 'Craft Room',
    id: 5,
    on: false}
]

app.use(express.static(`${__dirname}`))
app.use("/dashboard", express.static(`${__dirname}`))

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
    mockLights.forEach((light) => {
        if (light.id == id) {
            light.state = state
        }
    })
    res.send(`{switch: ${id}, state: ${state}}`)
})

app.listen('9999', () => {
    console.log('listening on 9999')
})