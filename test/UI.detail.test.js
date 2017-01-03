const Nightmare = require('nightmare')
const assert = require('assert')
const url = 'http://localhost:9999'


describe('UI.Switch Detail', function() {
    this.timeout(30000)
    it('should render after clicking on the fab', function(done) {
        new Nightmare()
            .goto(url)
            .wait('.switch')
            .click('.set-button')
            .wait('#title')
            .evaluate(function() {
                return document.getElementById('title').value
            })
            .then(function(result) {
                assert(result != undefined, 'Title innerHTML was undfined')
                assert(result == 'Switch One', `Title was not Switch One: ${result}`)
                done()
            }).catch(function(err) {
                done(err)
            })
    })
    it('+ should increase the number of timers', function(done) {
        new Nightmare()
            .click('#add-button')
            .evaluate(function() {
                return document.getElementsByClassName('timer').length
            })
            .then(function(result) {
                assert(result != undefined, 'result was undefined')
                assert(result == 5, `timers.length was not equal 5: ${result}`)
                done()
            })
            .catch(function(err) {
                done(err)
            })
    })
})