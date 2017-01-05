const fs = require('fs')

describe('Setup', function(){
    it('files', function() {
        try {
            fs.writeFileSync('data/lights.json.temp', fs.readFileSync('data/lights.json'))
            fs.unlinkSync('data/lights.json')
            
        } catch (e) {
            console.log(e.message)
        }
    })
    it('server', function(){
        require('../index.js')
    })
})