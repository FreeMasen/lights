const {exec} = require('child_process')
const os = require('os')
function flip(code) {
    if (os.platform() == 'linux' ||
        os.platform() == 'openbsd') {
        //TODO: troubleshoot calls to codesend
        exec(`./codesend ${code}`, [], (err, stdout, stderr) => {
            
        })
    } 
}

module.exports = flip