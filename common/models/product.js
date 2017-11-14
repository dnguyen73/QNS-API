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

    Product.findByCategory = function (categoryId, cb) {
        var response;
        var param = {
            where: {
                categoryId: categoryId
            }
        };
        Product.find(param, function (err, result) {
            if (err) {
                cb(err);
            }
            else {
                cb(null, result, 200, "success")
            } // endIf
        }); // endFunc
    };
    Product.remoteMethod(
        'findByCategory', {
            http: {
                path: '/findByCategory',
                verb: 'get'
            },
            accepts: [
                { arg: 'categoryId', type: 'string', required: true, description: "59d284dcd228f70436c2eb51" }
            ],
            returns: {
                arg: 'result',
                type: 'Array',
                root: true
            },
        }
    );

    Product.findNewest = function (pId, top, cb) {
        var response;
        var SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;  // Month in milliseconds
        var param = {
            limit: top,
            where: {
                parentId: pId,
                createdDate: {gt: Date.now() - SEVEN_DAYS}
            }
        };
        Product.find(param, function (err, result) {
            if (err) {
                cb(err);
            }
            else {
                cb(null, result, 200, "success")
            } // endIf
        }); // endFunc
    };
    Product.remoteMethod(
        'findNewest', {
            http: {
                path: '/findNewest',
                verb: 'get'
            },
            accepts: [
                { arg: 'pid', type: 'number', required: true, description: "1" },
                { arg: 'top', type: 'number', required: true, description: "5" }
            ],
            returns: {
                arg: 'result',
                type: 'Product',
                root: true
            },
        }
    );

    //Find Sales products by parentid/top
    Product.findSale = function (pId, top, cb) {
        var response;
        var param = {
            limit: top,
            where: {
                parentId: pId,
                isOnSale: true
            }
        };
        Product.find(param, function (err, result) {
            if (err) {
                cb(err);
            }
            else {
                cb(null, result, 200, "success")
            } // endIf
        }); // endFunc
    };
    Product.remoteMethod(
        'findSale', {
            http: {
                path: '/findSale',
                verb: 'get'
            },
            accepts: [
                { arg: 'pid', type: 'number', required: true, description: "1" },
                { arg: 'top', type: 'number', required: true, description: "5" }
            ],
            returns: {
                arg: 'result',
                type: 'Product',
                root: true
            },
        }
    );
    
};
