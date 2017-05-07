// Providers Controller
var providers = require('../models/providers');
var express = require('express');
var router = express.Router();

router.get('/list', function (req, res, next) {
    providers.getAll(function (err, results) {
        if (err) next(err);
        res.render('providers/list', {
            results: results
        })
    });
});


module.exports = router;