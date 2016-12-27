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
    name: 'Christmas Tree',
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
    name: 'Not In Use',
    id: 2,
    codes: {
        '1': '4543939',
        '0': '44543948'
    },
    timers: []
}

const switchThree = {
        name: 'Not In Use',
    id: 2,
    codes: {
        '1': '4544359',
        '0': '4544268'
    },
    timers: []
}

const switchFour = {
    name: 'Breakfast Nook',
    id: 4,
    on: false,
    codes: {
        '1': '4545795',
        '0': '4545804'
    },
    timers: []
}

const switchFive = {
    name: 'Craft Room',
    id: 5,
    on: false,
    codes: {
        '1': '4551939',
        '0': '4551948'
    },
    timers: [

    ]}

module.exports = [switchOne, switchTwo, switchThree, switchFour, switchFive]