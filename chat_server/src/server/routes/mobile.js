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

    if (err) { return next(err) }

    if (!user) { return res.json({status: status_codes.RESOURCE_ALREADY_EXISTS, message: info.message}) }

    let token = jwt.sign(user.toJSON(), secret)

    res.json({status: status_codes.RESOURCE_CREATED, user, token});

  })(req, res, next);

})

router.post('/login', function(req, res) {
    User.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err) throw err
      if (!user) {
        console.log('in the callback')
        res.status(status_codes.RESOURCE_DOESNT_EXISTS).send({status: status_codes.RESOURCE_DOESNT_EXISTS, message: 'Authentication failed. User not found.'})
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
            res.json({status: status_codes.BAD_CREDENTIALS, error: 'Authentication failed, check username and password'})
          }
        })
      }
    })
})

router.post('/auto-login',  passport.authenticate('jwt', { session: false}), async function(req, res) {
  res.json({status: 200, user: req.user})
})

router.post('/check-username', async function(req, res) {
  console.log(req.body)
  const username = req.body.username.toLowerCase().replace((/  |\r\n|\n|\r/gm),"")
  console.log({username})
  
  const nameTaken = await User.findOne({
    username
  })
  console.log(nameTaken)
  res.json({status: 200, username, nameAvailable: nameTaken ? false : true })
})

router.post('/update-user',  passport.authenticate('jwt', { session: false}), async (req, res) => {
  
  const username = req.body.username.toLowerCase().replace((/  |\r\n|\n|\r/gm),"");
  const uid = req.user._id
  
  const nameTaken = await User.findOne({
    username
  })
  
  if(!nameTaken){
    let user = await User.findOne({_id: uid})
    user.username = username
    const userUpdated = await User.update({_id: req.user._id}, user)
    res.json({status: status_codes.OK, username, update: userUpdated })
  } else {
    res.json({status: status_codes.RESOURCE_ALREADY_EXISTS, message: `The username "${username}" is already taken`})
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