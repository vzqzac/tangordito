const router = require('express').Router()
const passport = require('passport')
// const models = require('../models')

module.exports = function (app) {
  router.use(passport.authenticate('local', { successRedirect: '/',
    failureRedirect: '/login'
  }))
  router.get('/login', function (req, res) {
    res.status(200).send()
  })
  app.use(router)
}
