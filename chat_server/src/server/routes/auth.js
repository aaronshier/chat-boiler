
import express from 'express'
import passport from 'passport'
require('../../config/passport')(passport)
passport.authenticate('jwt', { session: false})
var jwt = require('jsonwebtoken')

import { server, secret, status_codes } from '../../config'

let router = express.Router()

router.get('/facebook', passport.authenticate('facebook', { scope: ['email', 'user_friends', 'user_location']}));

router.get('/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: `${server}`,
}), (req, res) => {
  res.redirect('/');
})

router.post('/facebook/token',
  passport.authenticate('facebook-token'),
  (req, res) => {
    let user
    let token
    if(req.user){
        user = req.user
        // Remove sensitive data
        delete user.password
        user.password = 'xxx'

        delete user.facebook.refresh_token
        user.facebook.refresh_token = 'xxx'
        
        // Get json web token
        token = jwt.sign(user.toJSON(), secret)
    }

    // return to user with STU
    res.send( user ? { status: status_codes.OK, user, token } : { status: status_codes.RESOURCE_DOESNT_EXIST } );

  }
)

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }) )

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/'
}))

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect(`/`)
})

module.exports = router