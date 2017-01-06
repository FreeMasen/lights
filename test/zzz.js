const fs = require('fs')
describe('teardown',function(){
    it('reset files', function() {
        try {
            fs.chmodSync('data/lights.json', 777)
            fs.writeFileSync('data/lights.json', fs.readFileSync('data/lights.json.temp'))
            fs.unlinkSync('data/lights.json.temp')
        } catch(e) {
            console.log(e.message)
        }
    })
})