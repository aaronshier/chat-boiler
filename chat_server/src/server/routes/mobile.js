'use strict'

import express from 'express'

import passport from 'passport'
require('../../config/passport')(passport)
passport.authenticate('jwt', { session: false})
var jwt = require('jsonwebtoken')
const { secret, status_codes } = require('../../config')
const User = require('../models/user')
let router = express.Router()

router.post('/signup', (req, res, next) => { 

  passport.authenticate('local-mobile-signup', function(err, user, info) {

    if (err) { return next(err); }

    if (!user) { return res.json({status: status_codes.RESOURCE_ALREADY_EXISTS, message: info}) }

    let token = jwt.sign(user.toJSON(), secret)

    res.json({status: status_codes.RESOURCE_CREATED, user: info, token});

  })(req, res, next);

})

router.post('/login', function(req, res) {
    User.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err) throw err

      if (!user) {
        res.status(401).send({success: false, msg: 'Authentication failed. User not found.'})
      } else {
        // check if password matches
        user.comparePasswordMobile(req.body.password, (err, authorized) => {
          if (authorized && !err) {
            let token = jwt.sign(user.toJSON(), secret)
            // convert user to json object
            let userInfo = user.toJSON()
            // remove sensitive data
            delete userInfo.password
            if(userInfo.facebook){
              delete userInfo.facebook.refresh_token
            }
            // return to user with STU ({status, token, user})
            res.json({status: 200, token, user: userInfo})
          }
        })
      }
    })
})

router.post('/auto-login',  passport.authenticate('jwt', { session: false}), async function(req, res) {
  res.json({status: 200, user: req.user})
})

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