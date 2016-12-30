const LightManager = require('../src/lights.js')
const assert = require('assert')
const fs = require('fs')

before(function() {
    try {
        fs.writeFileSync('data/lights.json.temp', fs.readFileSync('data/lights.json'))
        fs.unlinkSync('data/lights.json')
    } catch (e) {
        throw e
    }
})

describe('LightManager', function() {
    it('Should default when no data/lights.json exists', function() {
        try {
            fs.accessSync('data/lights.json')
            assert(false, 'lights.json exists when it should not')
        } catch(e) {
            let lm = new LightManager()
            try {
                fs.accessSync('data/lights.json')
            } catch(e) {
                assert(false, 'LightManager did not create default lights')
            }
        }
    })
    it('.lights should be the defaults',  function() {
        let lm = new LightManager()
        assert(lm.lights != undefined, 'Lights was undefined')
        assert(lm.lights[0] != undefined, 'Lights[0] was undefined')
        assert(lm.lights[0].name == 'Switch One', `Wrong name for switch one: ${lm.lights[0]}`)
        assert(lm.lights[4] != undefined, 'lights[4] was undefined')
        assert(lm.lights[4].name == 'Switch Five', `Wrong name for lights[4]: ${lm.lights[4].name}`)
    })
    it('.find should find items', function() {
        let lm = new LightManager()
        let light = lm.find(1)
        assert(light != undefined, 'light was undefined')
        assert(light.id === 1, `light.id != 1 ${light.id}`)
        assert(light.name == 'Switch One', `light.name != Switch One: ${light.name}`)
    })
    it('.saveLights should persist any changes', function() {
        let lm = new LightManager() 
        let light = lm.find(1)
        let newName = 'Updated Switch One'
        light.name = newName
        lm.saveLights()
        let lm2 = new LightManager()
        let light2 = lm2.find(1)
        assert(light2 != undefined, 'light2 was undefined')
        assert(light2.name == newName, `light2.name != newName: ${light2.name}`)
    })
})

after(function() {
    try {
        fs.writeFileSync('data/lights.json', fs.readFileSync('data/lights.json.temp'))
        fs.unlinkSync('data/lights.json.temp')
    } catch(e) {
        console.log(e.message)
    }
})