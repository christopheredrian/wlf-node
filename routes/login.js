var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    // TODO: with error message
    res.render('login');
});

router.post('/', function (req, res, next) {
    var post = req.body;
    if (post.username === 'admin' && post.password === 'admin') {
        req.session.user_id =1;
        res.redirect('/registration/list');
    } else {
        res.render('login', {
            error: 'Invalid credentials!'
        });
    }
});

module.exports = router;
