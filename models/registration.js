var db = require('../db');
exports.getAll = function (done) {
    db.get().query('SELECT * FROM registration', function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};

/**
 * @return boolean if username on customer exists
 * @param username
 * @param done
 */
exports.usernameExists = function (username, done) {
    var values = [username];
    db.get().query("SELECT count(username) as count FROM registration WHERE username = ?", values, function (err, results) {
        if (err) return done(err);
        // if it exists
        done(null, !((results[0]['count']) === 0));
    });
};

// Not working
exports.create = function (userId, text, done) {
    var values = [userId, text, new Date().toISOString()]

    db.get().query('INSERT INTO comments (user_id, text, date) VALUES(?, ?, ?)', values, function (err, result) {
        if (err) return done(err)
        done(null, result.insertId)
    })
}