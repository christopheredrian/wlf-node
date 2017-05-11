var express = require('express');
var customer = require('../models/customer');
var router = express.Router();

/* GET users listing. */
router.get('/list', function (req, res, next) {
    customer.getAll(function (err, results) {
        if (err) console.log(err);
        res.render('customers/list', {
            'results': results
        });
    });
});

router.post('/remove', function (req, res, next) {
    var id = req.body.id;
    customer.remove(id, function (err, result) {
        if (err) console.log(err);
        res.redirect('/admin/customers/list');
    })
});

module.exports = router;
