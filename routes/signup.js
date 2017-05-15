var express = require('express');
var signup = require('../models/signup');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.redirect('signup.html');
});
// registration post
// check username uniqueness in database
router.post('/', function (req, res) {
    var user = req.body;
    signup.create(user, function (err, results) {
        if (err) res.send(err);
        res.redirect('/login');
    });
});
module.exports = router;