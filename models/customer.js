var db = require('../db');

/**
 * @return boolean if username on customer exists
 * @param username
 * @param done
 */
exports.usernameExists = function (username, done) {
    var values = [username];
    db.get().query("SELECT count(username) as count FROM customer WHERE username = ?", values, function (err, results) {
        if (err) return done(err);
        // if it exists
        done(null, !((results[0]['count']) === 0));
    });
};
