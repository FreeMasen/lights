const assert = require('assert')
const Nightmare = require('nightmare')

before(function() {
    require('../index.js')
})

describe('Dashboard', function() {
    this.timeout(15000)
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
        it.skip('clicking on the switch buttons should update class', function(done) {
            new Nightmare()
                .goto(url)
                .wait('.switch')
                .evaluate(function(){
                    var ret = []
                    var firstSwitch = document.querySelector('.switch')
                    var onButton = document.querySelector('.on-button')
                    var offButton = document.querySelector('.off-button')
                    function clickNonEnabled() {
                        if (onButton.className.includes('enabled')) {
                            offButton.click()
                        } else {
                            onButton.click()
                        }
                    }
                    function captureResult() {
                        ret.push(onButton.className)
                        ret.push(offButton.className)
                    }
                    clickNonEnabled()
                    captureResult()
                    clickNonEnabled()
                    captureResult()
                    return ret
                })
                .end()
                .then(function(result) {
                    assert(results[0] != results[2], `onButton classes were the same after click`)
                    assert(result[1] != result[3], 'offButton classes were the same after click')
                    done()
                })
        })
    })
})