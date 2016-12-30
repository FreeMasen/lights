const fs = require('fs')
before(function() {
    try {
        fs.writeFileSync('data/lights.json.temp', fs.readFileSync('data/lights.json'))
        fs.unlinkSync('data/lights.json')
    } catch (e) {
        throw e
    }
})
describe('setup env for all tests', function(){})