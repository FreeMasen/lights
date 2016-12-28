const fs = require('fs')



function LightManager() {
    this._readInLights()
}

LightManager.prototype._readInLights = function(retry) {
    console.log('_readInLights')
    try {
        this.lights = fs.readFileSync('data/lights.json', 'utf8')
    } catch (e) {
        if (retry) throw e
        this._createDir()
        this._createDefaultFile()
        this._readInLights(1)
    }
}

LightManager.prototype._createDir = function() {
    console.log('_createDir')
    try {
        fs.mkdirSync('data')
    } catch (e) {
        console.log(e)
    }
}

LightManager.prototype._createDefaultFile = function() {
    console.log('_createDefaultFile')
    const defaultDays = {
        m: false,
        t: false,
        w: false,
        r: false,
        f: false,
        s: false,
        u: false
    }
    const morningOn = {
        isOn: true,
        time: {
            hour: 5,
            minute: 30,
            am: true
        },
        days: defaultDays
    }

    const morningOff = {
        isOn: false,
        time: {
            hour: 7,
            minute: 3,
            am: true
            },
        days: defaultDays
    }

    const eveningOn = {
        isOn: true,
        time: {
        hour: 5,
        minute: 0,
        am: false
        },
        days: defaultDays
    }

    const eveningOff = {
        isOn: false,
        time: {
            hour: 11,
            minute: 0,
            am: false
        },
        days: defaultDays
    }

    const switchOne = {
        name: 'Switch One',
        id: 1,
        on: true,
        codes: {
            '1': '4543795',
            '0': '4543804'
        }, 
        timers: [
            morningOn,
            morningOff,
            eveningOn,
            eveningOff
    ]}

    const switchTwo = {
        name: 'Switch Two',
        id: 2,
        codes: {
            '1': '4543939',
            '0': '44543948'
        },
        timers: []
    }

    const switchThree = {
            name: 'Switch Three',
        id: 2,
        codes: {
            '1': '4544359',
            '0': '4544268'
        },
        timers: []
    }

    const switchFour = {
        name: 'Switch Four',
        id: 4,
        on: false,
        codes: {
            '1': '4545795',
            '0': '4545804'
        },
        timers: []
    }

    const switchFive = {
        name: 'Switch Five',
        id: 5,
        on: false,
        codes: {
            '1': '4551939',
            '0': '4551948'
        },
        timers: [

        ]}

    this.saveLights([switchOne, switchTwo, switchThree, switchFour, switchFive])
}

LightManager.prototype.saveLights = function(newLights) {
    console.log('saveLights')
    try {
        fs.writeFileSync('data/lights.json', JSON.stringify(newLights || this.lights))
        this._readInLights()
    } catch (e) {
        conosle.log(e)
    }
}

LightManager.prototype.find = function(id) {
    console.log('find')
    this.lights.forEach(light => {
        if (light.id === id) {
            return light
        }
    })
}

module.exports = new LightManager()