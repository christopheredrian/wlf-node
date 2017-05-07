var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('customers/index', {
        customers: [
            {
                id: 1,
                name: 'Cee',
                status: 'approve'
            },
            {
                id: 2,
                name: 'Naruto',
                status: 'approve'
            },
            {
                id: 3,
                name: 'Bogary',
                status: 'rejected'
            }
        ]
    });
});

router.get('/cabildo', function(req, res, next){
    res.send('This is cabildos page');
});

module.exports = router;
