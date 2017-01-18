const router = require('express').Router()
const passport = require('passport')
const models = require('../models')

module.exports = function (app) {
  router.get('/', function (req, res) {
    req.user ? res.render('index', {user:req.user}) : res.redirect('/login')
  })
  router.post('/', function (req, res) {
    if (!req.user) { return res.redirect('/login') }
    if (!req.body) { return res.render('index', { error: 'An empty form' }) }
    let bmi = +req.body.weight / Math.pow(+req.body.height, 2)

    if (isNaN(bmi)) return res.render('index', {error: 'Wrong values in form'})

    let categoryName = bmi < 15.0 ? 'Very severely underweight'
      : bmi < 16 ? 'Severely underweight'
      : bmi < 18.5 ? 'Underweight'
      : bmi < 25 ? 'Normal'
      : bmi < 30 ? 'Overweight'
      : bmi < 35 ? 'Obese Class I (Moderately obese)'
      : bmi < 40 ? 'Obese Class II (Severely obese)'
      : 'Obese Class III (Very severely obese)'
    res.render('index', {bmi: bmi, user: req.user, categoryName: categoryName})
    // console.log('user', req.user)
    models.User.update({bmi: bmi}, {where: {id:req.user.id}}).then(function (ok) {
    }).catch(error => console.log('error', error))
  })
  router.get('/login', function (req, res) {
    res.render('login')
  })
  router.post('/login', passport.authenticate('local'), function (req, res) {
    res.redirect('/')
  })
  app.use(router)
}
