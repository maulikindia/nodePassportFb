var express = require('express');
var router = express.Router();
let user = require('../models/user');


router.get('/', async (req, res) => {
  await user.find({}, async (err, respo) => {
    if (err) {
      return res.json({ status: false, msg: err, data: respo })
    }
    else {
      return res.json({ status: true, msg: '', data: respo })
    }
  });
});

module.exports = router;