const assert = require('assert')
const Nightmare = require('nightmare')

before(function() {
    require('../index.js')
})

describe('Dashboard', function() {
    this.timeout(60000)
    var url = 'http://localhost:9999'

    describe('shoud load the correct form elements', function() {
        it('should find 5 switches', function(done) {
            new Nightmare()
                .goto(url)
                .wait('.switch')
                .evaluate(function() {
                    return document.getElementsByClassName('switch').length
                })
                .end()
                .then(function(result) {
                    assert(result == 5, `Number of switches not 5: ${result}`)
                    done()
                })
        })
        it('clicking on the switch buttons should update class', function(done) {
            new Nightmare()
                .goto(url)
                .wait('.switch')
                .click('.off-button')
                .evaluate(captureState)
                .then(function(result) {
                    assert(result[0] != result[1], `Both buttons should not be enabled`)
                    assert(result[1].includes('enabled'), 'offButton should be enabled after click')
                    done()
                })
                .catch(function(err) {
                    done(err)
                })
        })
    })
})

function captureState() {
    var ret = []
    ret.push(document.querySelector('.on-button').className)
    ret.push(document.querySelector('.off-button').className)
    return ret
}