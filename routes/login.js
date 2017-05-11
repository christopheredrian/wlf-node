var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    // TODO: with error message
    res.render('login');
});

router.post('/', function (req, res, next) {
    var post = req.body;
    if (post.username === 'admin' && post.password === 'admin') {
        req.session.username = 1;
        res.redirect('/admin/registration/list');
    } else if (false) {
        // Use the registered database here, check type
    } else {
        res.render('login', {
            error: 'Invalid credentials!'
        });
    }
});

module.exports = router;
