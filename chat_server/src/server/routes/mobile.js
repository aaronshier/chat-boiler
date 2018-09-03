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

  passport.authenticate('local-mobile-signup', (err, user, info) => {

    if (err) { return next(err); }

    if (!user) { return res.json({status: status_codes.RESOURCE_ALREADY_EXISTS, message: info}) }

    let token = jwt.sign(user.toJSON(), secret)
    console.log({status: status_codes.RESOURCE_CREATED, user, token})
    res.json({status: status_codes.RESOURCE_CREATED, user, token});

  })(req, res, next);

})

router.post('/login', function(req, res) {
    User.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err) throw err
      if (!user) {
        res.status(status_codes.RESOURCE_DOESNT_EXISTS).send({status: status_codes.RESOURCE_DOESNT_EXISTS, error: 'Authentication failed. User not found.'})
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
            res.json({status: status_codes.OK, token, user: userInfo})
          } else {
            res.json({status: status_codes.BAD_CREDENTIALS, error: 'Authorization failed, check username and password'})
          }
        })
      }
    })
})

router.post('/auto-login',  passport.authenticate('jwt', { session: false}), async function(req, res) {
  res.json({status: 200, user: req.user})
})

router.post('/check-username',  passport.authenticate('jwt', { session: false}), async function(req, res) {
  console.log(req.body)
  const username = req.body.username
  console.log({username})
  
  const nameTaken = await User.findOne({
    username
  })
  console.log(nameTaken)
  res.json({status: 200, username, nameAvailable: nameTaken ? false : true })
})

router.post('/update-username',  passport.authenticate('jwt', { session: false}), async (req, res) => {
  
  const username = req.body.username
  
  console.log('update username', {username})
  
  const nameTaken = await User.findOne({
    username
  })
  
  console.log({nameTaken})
  
  if(!nameTaken){
    let user = await User.findOne({_id: req.user._id})
    user.username = username
    const userUpdated = await User.update({_id: req.user._id}, user)
    res.json({status: 200, username, update: userUpdated })
  } else {

  }

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