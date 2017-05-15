var db = require('../db');

/**
 * @return boolean if username on customer exists
 * @param username
 * @param done
 */
exports.usernameExists = function (username, password, done) {
    var values = [username, password];
    db.get().query("SELECT * FROM customer WHERE username = ? AND password = ?", values, function (err, results) {
        if (err) return done(err);
        // if it exists
        done(null, results);
    });
};
/**
 * Gets all customer entries
 * @param done callback
 */
exports.getAll = function (done) {
    var q = "SELECT cu_id 'Id', username 'Username' , lname 'Last Name', fname 'First Name', email_address 'Email', address 'Address', tel_no 'Contact', gender 'Gender', CONCAT(YEAR(birthday), '/', MONTH(birthday), '/', DAY(birthday)) 'Birthday' FROM customer ORDER BY cu_id DESC;"

    db.get().query(q, function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};

/**
 * @return boolean if username on customer exists
 * @param username
 * @param done
 */
exports.create = function (user, done) {
    db.get().query("INSERT INTO customer SET ?", user, function (err, results) {
        if (err) return done(err);
        // if it exists
        done(null, results);
    });

};


exports.remove = function (id, done) {
    db.get().query("DELETE FROM customer WHERE cu_id = ?", [id], function (err, result) {
        if (err) return done(err);
        done(result);
    })
};