var db = require('../db');

/**
 * Gets all invoice entries
 * @param done callback
 */
exports.getAll = function (limit, done) {
    var q = "SELECT date as 'Date', price 'Price', tel_no as 'Contact #',  CONCAT(fname, ' ', lname) 'Provider Name',  service_name as 'Service' FROM `webtek-database-finals`.requests NATURAL JOIN `service provider` NATURAL JOIN services ORDER BY DATE LIMIT ?;";
    db.get().query(q, [limit],
        function (err, rows) {
            if (err) return done(err);
            done(null, rows);
        }
    )
    ;
};
