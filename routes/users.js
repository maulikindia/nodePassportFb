var express = require('express');
var router = express.Router();
let user = require('../models/user');
// let passportConfig = require('../config/passport');

var passport = require('passport');


//this endpoint will displays the fb login page
router.get('/auth/facebook', passport.authenticate('facebook'));

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/profile',
  failureRedirect: '/auth/facebook'
}));


//based on successful login 
router.get('/profile', async (req, res) => {
  return res.json({ msg: 'Sucess' });
})

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/d');
});

router.get('/d', async (req, res) => {
  await user.find({}, async (err, respo) => {
    if (err) {
      res.send(err)
    }
    else {
      return res.json(respo)
    }
  });

});

module.exports = router;
