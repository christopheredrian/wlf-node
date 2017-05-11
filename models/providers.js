var db = require('../db');

/**
 * Gets all provider entries
 * @param done callback
 */
exports.getAll = function (done) {
    db.get().query("SELECT * FROM `service provider`", function (err, rows) {
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