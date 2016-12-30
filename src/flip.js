const {exec} = require('child_process')
const os = require('os')
function flip(code) {
    if (os.platform() == 'linux' ||
        os.platform() == 'openbsd') {
        exec('./codesend', [code], (err, stdout, stderr) => {
            if (err) {
                throw err
            }
            if (stderr) {
                throw new Error(stderr)
            }
            console.log(stdout)
        })
    } else {
        console.log(`./ codesend ${code}`)
    }
}

module.exports = flip