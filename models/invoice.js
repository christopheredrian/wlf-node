var db = require('../db');

/**
 * Gets all invoice entries
 * @param done callback
 */
exports.getAll = function (done) {
    var q = "SELECT \r\n    serviceAvailed \'Service Type\',\r\n    customer.fname \'Customer First Name\',\r\n    customer.lname \'Customer Last Name\',\r\n    customer.username \'Customer Username\',\r\n    customer.email_address \'Customer Email\',\r\n    `service provider`.fname \'Provider First Name\',\r\n    `service provider`.lname \'Provider Last Name\',\r\n    `service provider`.username \'Provider username\',\r\n    `service provider`.email_address \'Provider Email\',\r\n    invoice.total_amount \'Amount\'\r\nFROM\r\n    invoice\r\n        INNER JOIN\r\n    customer ON invoice.cu_id = customer.cu_id\r\n        INNER JOIN\r\n    `service provider` ON invoice.sp_id = `service provider`.sp_id;";
    db.get().query(q, function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};
