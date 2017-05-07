var db = require('../db');
exports.getAll = function (done) {
    db.get().query('SELECT * FROM registration', function (err, rows) {
        if (err) return done(err);
        done(null, rows);
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