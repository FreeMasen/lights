const fs = require('fs')
describe('teardown',function(){
    it('reset files', function() {
        try {
            fs.writeFileSync('data/lights.json', fs.readFileSync('data/lights.json.temp'))
            fs.unlinkSync('data/lights.json.temp')
        } catch(e) {
            console.log(e.message)
        }
    })
})