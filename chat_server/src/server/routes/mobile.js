'use strict'

import express from 'express'

var mongoose = require('mongoose')
import passport from 'passport'
require('../../config/passport')(passport)
passport.authenticate('jwt', { session: false})
var jwt = require('jsonwebtoken')
const { status_codes } = require('../../config')
import { secret } from '../../config/server-config'
const User = require('../models/user')
const router = express.Router()

const busboyBodyParser = require('busboy-body-parser')

const Jimp = require("jimp");

let Grid = require("gridfs-stream")
	  Grid.mongo = mongoose.mongo

let conn = mongoose.connection
let gfs

router.post('/signup', (req, res, next) => { 

  passport.authenticate('local-mobile-signup', (err, user, info) => {

    if (err) { return next(err) }

    if (!user) { return res.json({status: status_codes.RESOURCE_ALREADY_EXISTS, message: info.message}) }

    let token = jwt.sign(user.toJSON(), secret)

    res.json({status: status_codes.RESOURCE_CREATED, user, token});

  })(req, res, next);

})

router.post('/login', function(req, res) {
  let query = { $or: [ { 'email':  req.body.email.toLowerCase() }, { 'username':  req.body.email.toLowerCase() } ] }
  console.log({query})
    User.findOne(query, (err, user) => {
      if (err) throw err
      if (!user) {
        res.status(status_codes.RESOURCE_DOESNT_EXIST).send({status: status_codes.RESOURCE_DOESNT_EXIST, message: 'Authentication failed. User not found.'})
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