const {exec} = require('child_process')

function flip(code) {
    exec('./codesend', [code], (err, stdout, stderr) => {
        console.log(err)
        console.log(stdout)
        console.log(stderr)
    })
}

module.exports = flip