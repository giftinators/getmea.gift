var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user.js');

module.exports = function(passport) {

// Passport Session setup
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // Local Signup Strategy
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {

      User.findOne({'username': username }, function(err, user) {
        if (err) {
          return done(err);
        }
        // Check to see if there is already a user with provided username
        if (user) {
          return done('user already exists');
        } else {
          var newUser = new User();

          // Set the user's local credentials
          newUser.username = username;
          newUser.password = newUser.generateHash(password);

          // Save the user
          newUser.save(function(err) {
            if (err) {
              throw err;
            } else {
              return done(null, newUser);
            }
          });
        }
      });

  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
    User.findOne({ 'username': username }, function(err, user) {
      if (err) {
        return done(err);
      }
      // If user is not found, return the flash messages
      if (!user) {
        return done('user not found', false);
      }
      // If user is found but the provided password is incorrect:
      if (!user.validPassword(password)) {
        return done('incorrect password', false);
      }
      // If username and password are corret, return successfully
      return done(null, user);
    })
  }));
};
