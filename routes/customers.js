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


module.exports = router;
