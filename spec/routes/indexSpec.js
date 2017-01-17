/* eslint-env jasmine */
const http = require('http')
const baseURL = 'http://localhost:3000'

describe('Endpoints', function () {
  describe('GET /', function () {
    it('should response with a 200 status code', function (done) {
      http.get(baseURL, function (response) {
        expect(response.statusCode).toBe(200)
        done()
      })
    })
    it('should response with an empty body', function (done) {
      http.get(baseURL, function (response) {
        console.log(Object.keys(response))
        expect(response.body).not.toBeDefined()
        done()
      })
    })
  })
})
