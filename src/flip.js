const {exec} = require('child_process')
const os = require('os')
function flip(code) {
    if (os.platform() == 'linux' ||
        os.platform() == 'openbsd' ||
        process.env.testing == undefined) {
        exec('./codesend', [code], (err, stdout, stderr) => {
            if (err) {
                throw err
            }
            if (stderr) {
                throw new Error(stderr)
            }
            console.log(stdout)
        })
    } 
}

module.exports = flip