const request = require('request')
const assert = require('assert')

describe('Index', function() {
    it('GET to undefined should redirect', function(done) {
        request({
            method: "GET",
            uri: "http://localhost",
            proxy: "http://proxy-al.wellsfargo.com:8080",
            port: 9999,
            path: "/goober",
            strictSSL: false,
            tunnel: false,
            followRedirect: false
        }, function(err, res, body) {
            console.log(res)
            console.log(body)
            console.log(err)
            done()
        })

    })
    it.skip('GET /switches shuold return json of switches', function(done) {
        request.get('http://0.0.0.0:9999/switches', (err, res) => {
            console.log('/switches response')
            console.log(body)
            done(err)
        })
    })
})