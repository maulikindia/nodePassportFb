let passport = require('passport');
let fbStrategy = require('passport-facebook').Strategy;
let user = require('../models/user');


//serialize the user
passport.serializeUser(function (user, done) {
    done(null, user);
});

//deserialize the user
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});






// async function passportAuth() {
passport.use(new fbStrategy(
    {
        clientID: 'your app id from fb developer account',
        clientSecret: 'your app secret from fb developer account',
        callbackURL: 'http://localhost:3000/auth/facebook/callback',  //same URL as set on website URL on fb developer account.
        profileFields: ['displayName', 'name', 'id', 'emails']
    }, function (accessToken, refreshToken, profile, done) {
        user.findOne({ 'fb.userId': profile.id }, async (err, data) => {

            if (err) {
                return done(err);
            }
            else if (data !== null) {
                return done(null, data);
            }

            else if (data === null) {
                let userObj = {};
                userObj.fb.userName = profile.displayName;
                userObj.fb.token = accessToken;
                userObj.fb.userId = profile.id;

                await user.create(userObj, async (err, respo) => {

                    if (err) {
                        return err;
                    }
                    else {
                        return done(null, respo);
                    }

                });

            }
        });
    }));
// };



// module.exports = { passportAuth };
module.exports = passport;