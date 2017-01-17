const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const models = require('../models')

passport.use(new LocalStrategy(
  function (username, password, done) {
    models.User.findOne(username).then(user) {
      if (models.User.validatePassword(password)) {
        return done(null, user)
      }
      return done(null, false)
    }).catch(error => done(error))
  }
))
