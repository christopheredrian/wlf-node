var express = require('express');
var registration = require('../models/registration');
var router = express.Router();

router.get('/list', function (req, res, next) {
    registration.getAll(function (err, rows) {
        if (err) console.log(err);
        console.log(rows);
        res.render('registration/list', {
            'registration': rows
        });
    });

});

module.exports = router;