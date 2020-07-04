let passport = require('passport');
let twitterStrategy = require('passport-twitter').Strategy;
let user = require('../models/user');


//serialize the user
passport.serializeUser(function (user, done) {
    done(null, user);
    // done(null, user.id)
});

//deserialize the user
passport.deserializeUser(function (obj, done) {
    done(null, obj);
    // user.findById(obj, async (err, user) => {
    //     done(err, user);
    // });
});






passport.use(new twitterStrategy(
    {
        consumerKey: 'replace API key from twitter dev account',
        consumerSecret: 'replace API Secret from twitter dev account',
        callbackURL: 'http://localhost:3000/auth/twitter/callback',  //same URL as set on callback URL on Twitter developer account.

    }, function (accessToken, refreshToken, profile, done) {
        user.findOne({ ' twitter.twitterId': profile.id }, async (err, data) => {
            if (err) {
                return done(err);
            }
            else if (data !== null) {
                return done(null, data);
            }

            else if (data === null) {
                let userObj = {};
                let twitter = {};
                twitter.userName = profile.displayName;
                twitter.token = accessToken;
                twitter.userId = profile.id;

                userObj.twitter = twitter;
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



module.exports = passport;