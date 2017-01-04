const request = require('request')
const assert = require('assert')

describe('Index', function() {
    it('GET to undefined should redirect', function(done) {
        request({
            method: "GET",
            uri: "http://127.0.0.1:9999/goober",
            followRedirect: false
        }, (err1, res1, body1) => {
            if (err1) return done(err1)
            assert(res1.statusCode == 302, `Response was not 302: ${res1.statusCode}`)
            request({
                method: "GET",
                uri: "http://127.0.0.1:9999/oober/goober",
                followRedirect: false
            }, (err2, res2, body2) => {
                if (err2) return done(err2)
                assert(res2.statusCode == 302, `GET /oober/goober was not 302: ${res2.statusCode}`)
                done()
            })
        })

    })
    it('GET /switches shuold return json of switches', function(done) {
        request.get('http://127.0.0.1:9999/switches', (err, res, body) => {
            if (err) return done(err)
            if (typeof body == string) body = JSON.parse(body)
            assert(Array.isArray(body), `body was not an array: ${typeof body}`)
            assert(body.length > 0, `body length <= 0: ${body.length}`)
            assert(body[0].name == "Switch One", `body[0] was not Switch One: ${body[0]}`)
            done()
        })
    })
})