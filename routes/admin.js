var express = require('express');
var registration = require('../models/registration');
var customer = require('../models/customer');
var provider = require('../models/providers');
var invoice = require('../models/invoice');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    registration.getAll(function (err, results) {
        var pendingRegistration = results.filter(function (obj) {
            return obj.status === 'Pending';
        });
        customer.getAll(function (err, customerResults) {
            provider.getAll(function (err, providerResults) {
                invoice.getAll(function (err, invoiceResults) {
                    var results = {
                        pendingRegistrationCount: pendingRegistration.length,
                        customerCount: customerResults.length,
                        providerCount: providerResults.length,
                        invoiceCount: invoiceResults.length
                    };
                    res.render('dashboard', results);
                });
            });
        });

    });

});


module.exports = router;
