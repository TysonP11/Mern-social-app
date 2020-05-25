const passport = require('passport');
const configAuth = require('./auth');
const FacebookStrategy = require('passport-facebook');
const FacebookTokenStrategy = require('passport-facebook-token');
const GoogleStrategy = require('passport-google-oauth20');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const User = require('../models/Users');
const bcrypt = require('bcryptjs');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: configAuth.facebookAuth.clientID,
//       clientSecret: configAuth.facebookAuth.clientSecret,
//       callbackURL: configAuth.facebookAuth.callbackURL,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       //passport call back function
//       //console.log(profile);
//       console.log(profile);
//       try {
//         let user = await User.findOne({ facebookID: profile.id });
//         if (user) {
//           console.log('there is already an user: ' + user);
//           done(null, user);
//         } else {
//           console.log(profile);
//           done(null, profile);
//           //return jsonwebtoken
//         }
//       } catch (err) {
//         console.error(err.message);
//         console.log('Server Error');
//       }
//     }
//   )
// );

passport.use(
  'facebookToken',
  new FacebookTokenStrategy(
    {
      clientID: configAuth.facebookAuth.clientID,
      clientSecret: configAuth.facebookAuth.clientSecret,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ facebookID: profile.id });
        if (user) {
          return done(null, user);
        }
        user = new User({
          name: profile.displayName,
          email: profile._json.email,
          password: '12345678',
          facebookID: profile.id,
          avatar: profile.photos[0].value,
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(user.password, salt);

        await user.save();
        console.log('New User created: ' + user);
        done(null, user);
      } catch (err) {
        done(err, false, err.message);
      }
    }
  )
);

passport.use(
  'googleToken',
  new GooglePlusTokenStrategy(
    {
      clientID: configAuth.google.clientID,
      clientSecret: configAuth.google.clientSecret,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('accessToken', accessToken);
      console.log('refreshToken', refreshToken);
      console.log(profile);
      try {
        // Check if user already existed
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          console.log('there is already an user: ' + user);
          done(null, user);
        } else {
          user = new User({
            name: profile.displayName,
            googleID: profile.id,
            password: '12345678',
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
          });

          //ENcrypt password
          const salt = await bcrypt.genSalt(10);

          user.password = await bcrypt.hash(user.password, salt);

          await user.save();
          console.log('New User created: ' + user);
          done(null, user);
          //return jsonwebtoken
        }
      } catch (err) {
        console.error(err.message);
        console.log('Server Error');
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      //options for the google strat
      callbackURL: '/api/oAuth/google/redirect',
      clientID: configAuth.google.clientID,
      clientSecret: configAuth.google.clientSecret,
    },
    async (accessToken, refreshToken, profile, done) => {
      //passport call back function
      console.log(profile);
      try {
        // Check if user already existed
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          console.log('there is already an user: ' + user);
          done(null, user);
        } else {
          user = new User({
            name: profile.displayName,
            googleID: profile.id,
            password: '12345678',
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
          });

          //ENcrypt password
          const salt = await bcrypt.genSalt(10);

          user.password = await bcrypt.hash(user.password, salt);

          await user.save();
          console.log('New User created: ' + user);
          done(null, user);
          //return jsonwebtoken
        }
      } catch (err) {
        console.error(err.message);
        console.log('Server Error');
      }
    }
  )
);
