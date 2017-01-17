/* eslint-env jasmine */
const http = require('http')
const baseURL = 'http://localhost:3000'

describe('Endpoints', function () {
  describe('GET /', function () {
    it('should redirect to login', function (done) {
      http.get(baseURL, function (response) {
        expect(response.statusCode).toBe(302)
        done()
      })
    })
  })
})
