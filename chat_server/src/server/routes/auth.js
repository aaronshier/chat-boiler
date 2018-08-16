
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
<<<<<<< HEAD
  (req, res) => {
<<<<<<< HEAD
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

=======
    console.log({user: req.user})
    res.send( req.user ? { status: 200, user: req.user } : { status: 401 } );
>>>>>>> parent of 0cca5eb... fb auth setup and splash screen integration
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