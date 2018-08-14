
import express from 'express'
import passport from 'passport'

import { server } from '../../config'

let router = express.Router()

router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }))

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: `${server}/`,
  failureRedirect: `${server}`,
}))

router.post('/auth/facebook/token',
  passport.authenticate('facebook-token'),
  (req, res) => {
    console.log({user: req.user})
    res.send( req.user ? { status: 200, user: req.user } : { status: 401 } );
  }
);

router.post('/auth/test', (req, res) => {
  console.log({req_body: req.body})
})

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }) )

router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/'
}))

module.exports = router