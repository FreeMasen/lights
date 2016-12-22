const {exec} = require('child_process')
const os = require('os')
function flip(code) {
    if (os.platform() == 'linux') {
        exec('./codesend', [code], (err, stdout, stderr) => {
            console.log(err)
            console.log(stdout)
            console.log(stderr)
        })
    } else {
        console.log(`./ codesend ${code}`)
    }
}

module.exports = flip