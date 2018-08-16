'use strict'

import express from 'express'
import passport from 'passport'

let router = express.Router()

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect(`/`)
})

router.post('/api/signup', passport.authenticate('local-signup', 
  {   successRedirect: '/',
    failureRedirect: '/signup?error=true&message=That+email+is+already+taken.++Try again' 
}))

router.post('/api/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login?error=true&message=Your+email/password+was+incorrect!'
}))

module.exports = router

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next()
  else
    res.json({signin: false})
}

function userStatus(req, res, next) {
  if (req.isAuthenticated())
      return true
  else 
      return false
}
