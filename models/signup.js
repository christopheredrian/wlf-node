var db = require('../db');

/**
 * @return boolean if username on customer exists
 * @param username
 * @param done
 */
exports.create = function (user, done) {
    user.status = 'Pending';
    delete user.confirm_password;
    db.get().query("INSERT INTO registration SET ?", user, function (err, results) {
        if (err) return done(err);
        // if it exists
        done(null, results);
    });

};
