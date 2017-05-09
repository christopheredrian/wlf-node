var db = require('../db');

/**
 * @return boolean if username on customer exists
 * @param username
 * @param done
 */
exports.create = function (user, done) {
    var result = Object.keys(user).map(function (e) {
        return ["'" + user[e] + "'"];
    });
    var values = [Object.keys(user).join(','), result.join(',')];
    console.log(`INSERT INTO registration (${values[0]}) VALUES(${values[1]})`)
    db.get().query("INSERT INTO registration SET ?", user, function (err, results) {
        if (err) return done(err);
        // if it exists
        done(null, results);
    });
    // db.get().query("INSERT INTO registration (username, password) VALUES('warrior', 'abc')", values, function (err, results) {
    //     if (err) return done(err);
    //     // if it exists
    //     done(null,  results);
    // });
};
