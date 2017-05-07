var express = require('express');
var router = express.Router();

router.get('/list', function (req, res, next) {
    res.render('registration/list');
});

module.exports = router;