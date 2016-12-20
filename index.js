const express = require('express')
const app = express()
const {exec} = require('child_process')

const switches = {
    "1":{
        on: 1,
        off: 0
    },
    "2":{
        on: 1,
        off: 0
    },
    "3":{
        on: 1,
        off: 0
    },
    "4":{
        on: 1,
        off: 0
    },
    "5":{
        on: 1,
        off: 0
    }
}

app.use(express.static(`${__dirname}`))
app.use("/dashboard", express.static(`${__dirname}`))


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
    exec(`codesend ${switches[id][state]}`)
    res.send(`{switch: ${id}, state: ${newState}}`)
})

app.listen('9999', () => {
    console.log('listening on 9999')
})