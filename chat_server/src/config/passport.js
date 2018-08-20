var LocalStrategy = require('passport-local').Strategy
var FacebookStrategy = require('passport-facebook').Strategy
var TwitterStrategy = require('passport-twitter').Strategy
var GoogleStrategy = require('passport-google-oauth20').Strategy
var User = require('../server/models/user')
var configAuth = require('./index')
var FacebookTokenStrategy = require('passport-facebook-token')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user)
    })
  })

  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt")
  opts.secretOrKey = configAuth.secret
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({_id: jwt_payload._id}, (err, user) => {
      if(err){
        return done(err, false)
      }

      if(user){
        return done(null, user)
      } else {
        return done(null, false)
      }
    })
  }))

  passport.use('local-mobile-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  }, (req, email, password, done) => {
    process.nextTick( function() {
      User.findOne({ 'email':  email.toLowerCase() }, function(err, user) {
        if (err)
            return done(err)
        if (user) {
          console.log({'signupMessage': 'That email is already taken.'})
          return done(null, false, {'signupMessage': 'That email is already taken.'})
        } else {
          const localClear = true
          User.findOne({ 'facebook.email':  email }, function(err, user) {
            if (err)
                return done(err)
            if (user) {
              console.log({'signupMessage': 'That email is already taken with a facebook login.'})
              return done(null, false, {'signupMessage': 'That email is already taken with a facebook login.'})
            } else {
              const facebookClear = true
              if(localClear && facebookClear){
                var newUser = new User()
                newUser.email = email.toLowerCase()
                newUser.password = password
                newUser.save(function(err) {
                  if (err)
                    throw err
                  return done(null, newUser)
                })
              } else {
                
              }
            }
          })
        }
      })
    })
  }))

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  function(req, email, password, done) {
    process.nextTick( function() {
      User.findOne({ 'email':  email }, function(err, user) {
        if (err)
            return done(err)
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'))
        } else {
          const localClear = true
          User.findOne({ 'facebook.email':  email }, function(err, user) {
            if (err)
                return done(err)
            if (user) {
              return done(null, false, req.flash('signupMessage', 'That email is already taken with a facebook login.'))
            } else {
              const facebookClear = true
              if(localClear && facebookClear){
                var newUser = new User()
                newUser.email = email
                newUser.password = password
                newUser.save(function(err) {
                  if (err)
                    throw err
                  return done(null, newUser)
                })
              } else {
                
              }
            }
          })
        }
      })
      

    })
  }))

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  function(req, email, password, done) {
    User.findOne({ 'local.email':  email }, function(err, user) {
      if (err)
        return done(err)
      if (!user)
        return done(null, false)
      if (!user.validPassword(password))
        return done(null, false)
      return done(null, user)
    })
  }))

  passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: ['id', 'email', 'first_name', 'last_name'],
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      User.findOne({ 'facebook.id': profile.id }, function(err, user) {
        if (err)
          return done(err)
        if (user) {
          return done(null, user)
        } else {
          var newUser = new User()
          newUser.facebook.id = profile.id
          newUser.facebook.access_token = accessToken
          newUser.facebook.refresh_token = refreshToken
          newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName
          newUser.facebook.email = (profile.emails[0].value || '').toLowerCase()
          newUser.facebook.avatar = `http://graph.facebook.com/${profile.id}/picture?height=600&width=600`

          newUser.save(function(err) {
            if (err)
              throw err
            return done(null, newUser)
          })
        }
      })
    })
  }))

  passport.use(new FacebookTokenStrategy({
      clientID: configAuth.facebookAuth.clientID,
      clientSecret: configAuth.facebookAuth.clientSecret
    }, function(accessToken, refreshToken, profile, done) {
      User.findOne({ 'facebook.id': profile.id }, function(err, user) {
        if (err)
          return done(err)
        if (user) {
          return done(null, user)
        } else {
          var newUser = new User()
          newUser.facebook.id = profile.id
          newUser.facebook.access_token = accessToken
          newUser.facebook.refresh_token = refreshToken
          newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName
          newUser.facebook.email = (profile.emails[0].value || '').toLowerCase()
          newUser.facebook.avatar = `http://graph.facebook.com/${profile.id}/picture?height=600&width=600`

          newUser.save(function(err) {
            if (err)
              throw err
            return done(null, newUser)
          })
        }
      })
    }
  ))

  passport.use(new GoogleStrategy({
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL,
  },
    function(token, refreshToken, profile, done) {
      process.nextTick(function() {
        User.findOne({ 'google.id': profile.id }, function(err, user) {
          if (err)
            return done(err)
          if (user) {
            return done(null, user)
          } else {
            var newUser = new User()
            console.log('user profile ====>>>> ', profile)
            newUser.google.id = profile.id
            newUser.google.token = token
            newUser.google.name = profile.displayName
            newUser.google.email = profile.emails[0].value
            newUser.save(function(err) {
              if (err)
                throw err
              return done(null, newUser)
            })
          }
        })
      })
    }))

}
