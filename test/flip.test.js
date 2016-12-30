const flip = require('../src/flip.js')
const os = require('os')

describe('flip', function() {
    if (os.platform != 'linux') {
        it.skip('wrong os, skipping flip test', function(){})
    } else {
        it('should fire without throwing', function() {
            try {
                flip(1234567)
            } catch (e) {
                assert(false, `flip threw error: ${e.message}`)
            }
        })
    }
})