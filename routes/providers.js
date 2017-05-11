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

router.post('/remove', function (req, res, next) {
    var id = req.body.id;
    providers.remove(id, function (err, result) {
        if (err) console.log(err);
        res.redirect('/admin/providers/list');
    })
})

module.exports = router;