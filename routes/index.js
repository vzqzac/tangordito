const router = require('express').Router()

module.exports = function (app) {
  router.get('/', function (req, res) {
    res.status(200).send()
  })
  app.use(router)
}
