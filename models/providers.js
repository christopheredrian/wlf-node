var db = require('../db');
/**
 * @return boolean if username on provider exists
 * @param username
 * @param done
 */
exports.usernameExists = function (username, password, done) {
    var values = [username, password];
    db.get().query("SELECT * FROM `service provider` WHERE username = ? AND password= ?", values, function (err, results) {
        if (err) return done(err);
        // if it exists
        done(null, results);
    });
};
/**
 * Gets all provider entries
 * @param done callback
 */
exports.getAll = function (done) {
    var q = "SELECT sp_id 'Id', username 'Username' , lname 'Last Name', fname 'First Name', email_address 'Email', address 'Address', tel_no 'Contact', gender 'Gender', CONCAT(YEAR(birthday), '/', MONTH(birthday), '/', DAY(birthday)) 'Birthday' FROM `service provider` ORDER BY sp_id DESC;";
    db.get().query(q, function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};

/**
 * Gets a specific provider using username
 */
/**
 * @return boolean if username on customer exists
 * @param username
 * @param done
 */
exports.create = function (user, done) {
    db.get().query("INSERT INTO `service provider` SET ?", user, function (err, results) {
        if (err) return done(err);
        // if it exists
        done(null, results);
    });

};
exports.remove = function (id, done) {
    db.get().query("DELETE FROM provider WHERE sp_id = ?", [id], function (err, result) {
        if (err) return done(err);
        done(result);
    })
};