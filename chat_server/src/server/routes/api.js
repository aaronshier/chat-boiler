'use strict'

import express from 'express'
import passport from 'passport'

import { server } from '../../config'

var router = express.Router()

router.get('/user', isLoggedIn, (req, res) => {
  res.json({
    signin: true,
    info: req.user
  })
})

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

router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }))

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: `${server}/dashboard?loggedin=true`,
  failureRedirect: `${server}`,
}))

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }) )

router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/'
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
