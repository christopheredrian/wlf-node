var db = require('../db');

/**
 * Gets all invoice entries
 * @param done callback
 */
exports.getAll = function (done) {
    var q = "SELECT invoice.invoice_id 'Invoice Id', (SELECT service_name from services WHERE service_id = invoice.service_id) as 'Service',  invoice.total_amount 'Amount',\
    CONCAT(`service provider`.`fname`, ' ', `service provider`.`lname`) 'Provider',\
        `service provider`.`tel_no` 'Provider Contact',\
        CONCAT(customer.`fname`, ' ', customer.`lname`) 'Customer',\
        customer.`tel_no` 'Customer Contact'\
    from invoice\
    INNER JOIN `service provider` ON  `service provider`.`sp_id` = invoice.sp_id\
    INNER JOIN customer ON customer.cu_id = invoice.cu_id;";
    db.get().query(q, function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};
