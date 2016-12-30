const {exec} = require('child_process')
const os = require('os')
function flip(code) {
    if (os.platform() == 'linux' ||
        os.platform() == 'openbsd') {
        exec('./codesend', [code], (err, stdout, stderr) => {
            if (err) {
                throw err
            }
            //TODO: troubleshoot calls to codesend
            if (stderr) {
                //throw new Error(stderr)
            }
        })
    } 
}

module.exports = flip