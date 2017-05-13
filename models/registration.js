var db = require('../db');
var customer = require('./customer');
var providers = require('./providers');

/**
 * @return boolean if username on provider exists
 * @param username
 * @param done
 */
exports.usernameExists = function (username, password, done) {
    var values = [username, password];
    db.get().query("SELECT count(username) as count FROM `registration` WHERE username = ? AND status = 'Pending' AND password = ?", values, function (err, results) {
        if (err) return done(err);
        // if it exists
        done(null, !((results[0]['count']) === 0));
    });
};

exports.getAll = function (done) {
    var q = "SELECT reg_id 'Id', username 'Username' , lname 'Last Name', fname 'First Name', email_address 'Email', status, address 'Address', tel_no 'Contact', gender 'Gender', CONCAT(YEAR(birthday), '/', MONTH(birthday), '/', DAY(birthday)) 'Birthday' FROM registration ORDER BY reg_id DESC;"
    db.get().query(q, function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};


/**
 * Gets a specific id
 * @param id
 * @param done
 */
exports.get = function (id, done) {
    db.get().query('SELECT * FROM registration where reg_id = ?', [id], function (err, rows) {
        if (err) return done(err);
        done(null, rows[0]);
    });
};

exports.remove = function (id, done) {
    db.get().query("DELETE FROM registration WHERE reg_id = ?", [id], function (err, result) {
        if (err) return done(err);
        done(result);
    })
};

/**
 * Set status of registration entry to rejected
 * @param id
 * @param done
 */
exports.reject = function (id, done) {
    db.get().query("UPDATE registration SET status = 'Rejected' WHERE reg_id = ?", [id], function (err, result) {
        if (err) return done(err);
        done(result);
    });
};

exports.approve = function (id, done) {
    exports.get(id, function (err, user) {
        var type = user.type;
        var reg_id = user.reg_id;
        delete user['type'];
        delete user['reg_id'];
        delete user['status'];
        console.log(user);

        if (type === 'Customer') {
            //add to customer
            customer.create(user, function (err, results) {
                if (err) return done(err);
                // Delete from registration
                exports.remove(reg_id, function (err, results) {
                    if (err) return done(err);
                    done(null, results);
                });
            });

        } else if (type === 'Service Provider') {
            //add to providers
            providers.create(user, function (err, results) {
                if (err) return done(err);
                // Delete from registration
                exports.remove(reg_id, function (err, results) {
                    if (err) return done(err);
                    done(null, results);
                });
            });

        } else {
            done("Type invalid!");
        }
        // remove from rergistration


    });

}
