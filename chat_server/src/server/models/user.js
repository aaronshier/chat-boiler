var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

var userSchema = mongoose.Schema({
  name: String,
  email: {
      type: String,
      unique: true
  },
  password: String,
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String,
    username: String,
  },
  google: {
      id: String,
      token: String,
      email: String,
      name: String,
  }
})

userSchema.pre('save', function (next) {
  var user = this
  if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, function (err, salt) {
          if (err) {
              return next(err)
          }
          bcrypt.hash(user.password, salt, null, function (err, hash) {
              if (err) {
                  return next(err)
              }
              user.password = hash
              next()
          })
      })
  } else {
      return next()
  }
})

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.methods.comparePasswordMobile = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
      if (err) {
          return cb(err);
      }
      cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema)
