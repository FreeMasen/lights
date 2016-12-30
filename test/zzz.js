const fs = require('fs')
describe('teardown env for all tests',function(){})


after(function() {
    try {
        fs.writeFileSync('data/lights.json', fs.readFileSync('data/lights.json.temp'))
        fs.unlinkSync('data/lights.json.temp')
    } catch(e) {
        console.log(e.message)
    }
})