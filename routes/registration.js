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
// Approve a user
router.post('/approve', function (req, res, next) {
    var id = req.body.id;
    registration.approve(id, function (err, user) {
        if (err) console.log(err);
        res.redirect('/admin/registration/list');
    });
});

router.post('/remove', function (req, res, next) {
    var id = req.body.id;
    registration.remove(id, function (err, result) {
        console.log(id);
        if (err) console.log(err);
        res.redirect('/admin/registration/list');
    })
});

router.post('/reject', function (req, res, next) {
    var id = req.body.id;
    registration.reject(id, function (err, result) {
        if (err) console.log(err);
        res.redirect('/admin/registration/list');
    })
});

module.exports = router;