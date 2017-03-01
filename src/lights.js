const mongo = require('mongojs')
const db = mongo('lights', 'settings')
const ee = require('events').EventEmitter

class LightManager extends ee {
    constructor() {
        this.getLights((err) => {
            if (err) throw new Error('Failed to get lights from mongo');
        })
        this.on('updated', _ => {
            this.saveLights()
        })
    }

    getLights(cb) {
        if (cb == undefined) cb = () => {}
        db.settings.find({}, (err, lights) => {
            if (err) return cb(err)
            if (lights.length == 0) {
                this.lights = this._setupDefaults()
                db.settings.save(this.lights, (err) => {
                    if (err) return cb(err)
                    cb()
                })
            } else {
                this.lights = lights
                cb()
            }
        })
    }

    setupDefaults() {
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

        
        return [switchOne, switchTwo, switchThree, switchFour, switchFive]
    }

    saveLights() {
        db.settings.update(this.light)
    }

    find(id) {
        if (typeof id != 'object') id = mongo.ObjectId(id)
        this.lights.forEach(light => {
            if (light._id == id) {
                return light
            }
        })
    }

    update(light) {
        var update = this.find(light._id || light.id)
        update = light
        this.emit('updated')
    }

    add(light) {
        light._id = undefined
        this.lights.add(light)
        this.emit('updated')
    }

    remove(light, cb) {
        if (cb == undefined) cb = () => {}
        if (light._id != 'object') light._id = mongo.ObjectId(light._id)
        db.settings.deleteOne({_id: light._id}, (err) => {
            if (err) return cb(err)
            this.getLights(cb)
        })
    }
}

module.exports = new LightManager()