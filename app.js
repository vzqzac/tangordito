'user strict'
const express = require('express')
const logger = require('morgan')
const path = require('path')

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const session = require('express-session')
const passport = require('passport')
const router = require('./routes/index')
const LocalStrategy = require('passport-local').Strategy
const models = require('./models')

const app = express()

// Views
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Logs
app.use(logger('dev'))

// Manage requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

// Auth
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(
  function (username, password, done) {
    models.User.findOne({where: {username: username}}).then(function (user) {
      if (user.validatePassword(password, user)) {
        return done(null, user)
      }
      return done(null, false)
    }).catch(error => done(error))
  }
))
passport.serializeUser(function (user, done) {
  done(null, user.id)
})
passport.deserializeUser(function (id, done) {
  models.User.findById(id).then(function (user) {
    done(null, user)
  }).catch(e => done(e))
})

// Front
app.use(express.static(path.join(__dirname, 'public')))

// Custom routes
router(app)

// Error middleware
app.use(function (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
