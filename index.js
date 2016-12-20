const express = require('express')
const app = express()

app.use(express.static(`${__dirname}`))
app.use("/dashboard", express.static(`${__dirname}`))


app.post('/:id', (req, res) => {
    
})

app.listen('9999', () => {
    console.log('listening on 9999')
})