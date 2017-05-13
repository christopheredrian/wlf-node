var express = require('express');
var customer = require('../models/customer');
var provider = require('../models/providers');
var registration = require('../models/registration');
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
    } else {
        registration.usernameExists(post.username, function (err, registrationExists) {
            if (registrationExists) {
                res.redirect('/pending.html');
            } else {
                // Check on customers and providers
                customer.usernameExists(post.username, function (err, customerExists) {
                    console.log('was here' + customerExists + ',' + post.username);
                    if (customerExists) {
                        console.log('a customer');
                        // send post request to php
                        // TODO
                        // redirect to php
                        res.send('Redirec to php')
                    } else {
                        // check if provider
                        provider.usernameExists(post.username, function (err, providerExists) {
                            if (providerExists) {
                                console.log('a provider');
                                // send post request to Java
                                // TODO
                                // redirect to java
                                res.send('Redirec to java')
                            } else {
                                console.log('invalid');
                                res.render('login', {
                                    error: 'Invalid credentials!'
                                });
                            }
                        });

                    }
                });
            }

        })

    }
});

module.exports = router;
