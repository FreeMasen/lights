const fs = require('fs')

describe('Setup', function(){
    it('files', function() {
        try {
            fs.writeFileSync('data/lights.json.temp', fs.readFileSync('data/lights.json'))
            fs.unlinkSync('data/lights.json')
            
        } catch (e) {
            throw e
        }
    })
    it('server', function(){
        require('../index.js')
    })
})