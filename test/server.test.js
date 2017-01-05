const request = require('request')
const assert = require('assert')
const fs = require('fs')

let sw

before(function(done) {
    fs.readFile('data/lights.json', (err, data) => {
        if (typeof data != 'string') data = data.toString()
        let sws = JSON.parse(data)
        sw = sws[0]
        done()
    })
})

describe('Index', function() {
    describe('GET', function() {
        it('undefined route should redirect', function(done) {
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
        it('/switches shuold return json of switches', function(done) {
            request.get('http://127.0.0.1:9999/switches', (err, res, body) => {
                if (err) return done(err)
                if (typeof body == 'string') body = JSON.parse(body)
                assert(Array.isArray(body), `switches did not return an array: ${typeof body}`)
                assert(body.length > 0, `body length <= 0: ${body.length}`)
                assert(body[0].name == "Switch One", `body[0] was not Switch One: ${body[0]}`)
                done()
            })
        })
        it('/flip/0/0 should return the list of lights', function(done) {
            request.post('http://127.0.0.1:9999/flip/0/0', (err, res, body) => {
                if (err) return done(err)
                if (typeof body == 'string') body = JSON.parse(body)
                assert(Array.isArray(body), `flip did not return an array: ${typeof body}`)
                assert(body.length > 0, `body length <= 0: ${body.length}`)
                assert(body[0].on == false, `updated switch was not turned off: ${body[0]}`)
                done()
            })
        })
    })
    describe('POST', function() {
        it('/flip/a/b should return 404', function(done) {
            request.post('http://127.0.0.1:9999/flip/a/b', (err, res, body) => {
                if (err) return done(err)
                assert(res.statusCode == 404, `/flip/a/b did not return 404: ${res.statusCode}`)
                done()
            })
        })
        it('/switch/0 should return a single JSON switch', function(done) {
            request('http://127.0.0.1:9999/switch/0',{
                body: JSON.stringify(sw),
                json: true,
                method: 'POST'
            }, (err, res, body) => {
                if (err) return done(err)
                assert(res.statusCode == 200, `/switch/1 response was not 200: ${res.statusCode}`)
                if (typeof body == 'string') body = JSON.parse(body)
                
                assert(body.name == sw.name, `body was not equal to sw: ${body.name}`)
                done()
            })
        })
        it('/switch/a should return 404', function(done) {
            request('http://127.0.0.1:9999/switch/a',{
                body: JSON.stringify(sw), 
                json: true,
                method: 'POST'
            } ,(err, res, body) => {
                if (err) return done(err)
                assert(res.statusCode == 404, `/switch/a did not return 404: ${res.statusCode}`)
                done()
            })
        })
        it('/switch/0 with no body should return 404', function(done) {
            request.post('http://127.0.0.1:9999/switch/0', (err, res, body) => {
                if (err) return done(err)
                assert(res.statusCode == 404, `/switch/0 with no body did not return 404: ${res.statusCode}`)
                done()
            })
        })
        it('/switch/0 with incorrect id should return 409', function(done) {
            sw.id = 6
            request('http://127.0.0.1:9999/switch/0',{
                method: 'POST',
                body: JSON.stringify(sw),
                json: true
            }, function(err, res, body) {
                if (err) return done(err)
                assert(res.statusCode == 409, `/switch/0 with bogus body did not return 409 ${res.statusCode}`)
                done()
            })
        })
    it('/switch/0 with non-json should return 409', function(done) {
        request('http://127.0.0.1:9999/switch/0',{
            method: 'POST',
            body: "{id:41}",
            json: true
        }, (err, res, body) => {
            if (err) return done(err)
            assert(res.statusCode == 409. `/switch/0 with non-json did not return 409 4{res.statusCode}`)
            done()
        })
    })
    })
})