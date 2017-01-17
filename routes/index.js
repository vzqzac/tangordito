const router = require('express').Router()
const passport = require('passport')
const models = require('../models')

module.exports = function (app) {
  router.get('/', function (req, res) {
    req.user ? res.render('index') : res.redirect('/login')
  })
  router.post('/', function (req, res) {
    if (!req.user) {return res.redirect('/login')}
    if (!req.body) {return res.render('index', {error: 'empty form'})}
    
  })
  router.get('/login', function (req, res) {
    res.render('login')
  })
  router.post('/login', passport.authenticate('local'), function (req, res) {
    res.redirect('/')
  })
  app.use(router)
}
