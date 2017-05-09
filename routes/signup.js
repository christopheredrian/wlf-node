var express = require('express');
var signup = require('../models/signup');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.redirect('signup.html');
});
// registration post
// check username uniqueness in database
// INSERT INTO comments (user_id, text, date) VALUES(?, ?, ?)
router.post('/', function (req, res) {
    var user = req.body;
    signup.create(user, function (err, results) {
        if (err) res.send(err);
        res.send(results);
    });
});
module.exports = router;