const flip = require('./flip.js')
const cron = require('croner')


function setupCurrentTimers(switches) {
    for (i=0;i<switches.length;i++) {
        let sw = switches[i]
        for (j=0;j<sw.timers.length;j++) {
            let timer = sw.timers[j]
            let hour
            if (!timer.time.am) {
                timer.time.hour += 12
            }
            var daysString = ''
        if (timer.days.m === true) daysString += '1,'
        if (timer.days.t === true) daysString += '2,'
        if (timer.days.w === true) daysString += '3,'
        if (timer.days.r === true) daysString += '4,'
        if (timer.days.f === true) daysString += '5,'
        if (timer.days.s === true) daysString += '6,'
        if (timer.days.u === true) daysString += '7'
        if (daysString[daysString.length -1] == ',') {
            daysString = daysString.substr(daysString.length - 2)
        }
        cron(`${timer.time.minute} ${hour || timer.time.hour} * * ${daysString} ${daysString}` , function() {
            if (timer.isOn === true) {
                flip(timer.codes[1])
            } else {
                flip(timer.codes[0])
            }
        })
        }
    }
}

setupCurrentTimers()