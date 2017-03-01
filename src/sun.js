const mongo = require('mongojs')
const db = mongo('info', 'weather')

class Sun {
    constructor() {
        this.today = new Date()
        this.today.setUTCHours(0,0,0,0)
        
    }

    rise(location, cb) {
        this._findWeather('sunrise', location, cb)
    }

    set(location, cb) {
        this._findWeather('sunset', location, cb)
    }
    _findWeather(eventString, location, cb) {
        db.weather.findOne({date: this.today, location: Location}, (err, doc) => {
            if (err) return cb(err)
            if (!doc[eventString]) return cb(new Error(`No ${eventString} logged for ${this.today.toDateString}`))
            cb(null, doc[eventString])
        })
    }
}

module.exports = new Sun()