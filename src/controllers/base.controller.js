const connection = require('../models/DBConnection');

class BaseController{
    querySQL(sql) {
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}
module.exports = BaseController;