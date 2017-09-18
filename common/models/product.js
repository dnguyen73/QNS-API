'use strict';

module.exports = function (Product) {
    Product.findByCode = function (productCode, cb) {
        var response;
        var param = {
            where: {
                productCode: productCode
            }
        };
        Product.findOne(param, function (err, result) {
            if (err) {
                cb(err);
            }
            else {
                cb(null, result, 200, "success")
            } // endIf
        }); // endFunc
    };
    Product.remoteMethod(
        'findByCode', {
            http: {
                path: '/findByCode',
                verb: 'get'
            },
            accepts: [
                { arg: 'code', type: 'string', required: true, description: "2QH3UF" }
            ],
            returns: {
                arg: 'result',
                type: 'Product',
                root: true
            },
        }
    );

};
