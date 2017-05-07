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
