const {exec} = require('child_process')
const os = require('os')
function flip(code) {
    /* istanbul ignore next */  
    if (os.platform() == 'linux') {
        //TODO: troubleshoot calls to codesend
        exec(`./codesend ${code}`, [], (err, stdout, stderr) => {
            
        })
    } 
}

module.exports = flip