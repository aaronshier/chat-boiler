
import express from 'express'
import passport from 'passport'
require('../config/passport')(passport)
passport.authenticate('jwt', { session: false})
var jwt = require('jsonwebtoken')
const config = require('../config')

import { server, status_codes } from '../../config'

let router = express.Router()

router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }))

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: `${server}/`,
  failureRedirect: `${server}`,
}))

router.post('/facebook/token',
  passport.authenticate('facebook-token'),
<<<<<<< HEAD
  (req, res) => {
    let user
    let token
    if(req.user){
        user = req.user
        // Remove sensitive data
        delete user.password
        delete user.facebook.refresh_token
        // Get json web token
        token = jwt.sign(user.toJSON(), config.secret)
    }

    // return to user with STU
    res.send( user ? { status: status_codes.OK, user, token } : { status: status_codes.RESOURCE_DOESNT_EXISTS } );
=======
  function (req, res) {

    res.send( req.user ? { status: 200, user: req.user } : { status: 401 } );
  }
);
>>>>>>> parent of 7432380... login auth flow

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