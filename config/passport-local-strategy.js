const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

// authenticate using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      //find a user and establish the identity
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          req.flash("error", err);
          return done(err);
        }

        if (!user.email || user.password != password) {
          // Authenticate has not been done
          req.flash("error", "Invalid Username/Password");
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

//Serializing the user to decide which key is to be kept in the cookies

passport.serializeUser((user, done) => {
  // sent user id in encrypted format into the browser cookie
  done(null, user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding user --> passport");

      return done(err);
    }
    return done(null, user);
  });
});

// sending current signed in user data to views

//step1 - check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  //if the user is signed in, then pass on the request to the next function(controller's) action
  if (req.isAuthenticated()) {
    return next();
  }

  //if the user is not signed in
  return res.redirect("/users/sign-in");
};

//step-2 set the user for the views
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current signed in user from the session cookie and we are sending this to the locals for the views
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
