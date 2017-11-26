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

    Product.findRelation = function (productCode, top, cb) {
        Product.findOne({
            where: { productCode: productCode }
        }, function (err, product) {
            if (err) {
                cb(err);
            }
            else {
                var param = {
                    limit: top,
                    where: {
                        categoryId: product.categoryId,
                        productCode: { "neq": product.productCode }
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
            } // endIf
        });
    };
    Product.remoteMethod(
        'findRelation', {
            http: {
                path: '/findRelation',
                verb: 'get'
            },
            accepts: [
                { arg: 'code', type: 'string', required: true, description: "CXFS6S" },
                { arg: 'top', type: 'number', required: false, description: "5" }
            ],
            returns: {
                arg: 'result',
                type: 'Product',
                root: true
            },
        }
    );

    Product.findNewest = function (pId, days, top, cb) {
        var response, param;
        var SELECT_DAYS = days * 24 * 60 * 60 * 1000;  // Month in milliseconds
        if (top) {
            param = {
                limit: top,
                where: {
                    parentId: pId,
                    createdDate: { gt: Date.now() - SELECT_DAYS }
                }
            };
        } else {
            param = {
                where: {
                    parentId: pId,
                    createdDate: { gt: Date.now() - SELECT_DAYS }
                }
            };
        }


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
                { arg: 'days', type: 'number', required: true, description: "20" },
                { arg: 'top', type: 'number', required: false, description: "5" }
            ],
            returns: {
                arg: 'result',
                type: 'Product',
                root: true
            },
        }
    );

    Product.findNewestByDays = function (days, cb) {
        var response, param;
        var SELECT_DAYS = days * 24 * 60 * 60 * 1000;  // Month in milliseconds
        var param = {
            where: {
                createdDate: { gt: Date.now() - SELECT_DAYS }
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
        'findNewestByDays', {
            http: {
                path: '/findNewestByDays',
                verb: 'get'
            },
            accepts: [
                { arg: 'days', type: 'number', required: true, description: "7" },
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
        var response, param;
        if (top) {
            param = {
                limit: top,
                where: {
                    parentId: pId,
                    isOnSale: true
                }
            };
        } else {
            param = {
                where: {
                    parentId: pId,
                    isOnSale: true
                }
            };
        }

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
                { arg: 'top', type: 'number', required: false, description: "5" }
            ],
            returns: {
                arg: 'result',
                type: 'Product',
                root: true
            },
        }
    );

    //Find Sales products by parentid/top
    Product.findAllSale = function (cb) {
        var response;
        var param = {
            where: {
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
        'findAllSale', {
            http: {
                path: '/findAllSale',
                verb: 'get'
            },
            accepts: [
            ],
            returns: {
                arg: 'result',
                type: 'Product',
                root: true
            },
        }
    );

    //Find Sales products by parentid/top
    Product.findByPriceRange = function (min, max, cb) {
        var response;
        var param = {
            where: {
                and: [
                    { price: { gte: min } },
                    { price: { lte: max } }
                ]
            },
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
        'findByPriceRange', {
            http: {
                path: '/findByPriceRange',
                verb: 'get'
            },
            accepts: [
                { arg: 'min', type: 'number', required: true, description: "100000" },
                { arg: 'max', type: 'number', required: true, description: "500000" }
            ],
            returns: {
                arg: 'result',
                type: 'Product',
                root: true
            },
        }
    );

    //Find Sales products by parentid/top
    //pid = parent id
    Product.findByPriceRangeInGroup = function (pid, min, max, cb) {
        var response;
        var param = {
            where: {
                and: [
                    { parentId: pid },
                    { price: { gte: min } },
                    { price: { lte: max } }
                ]
            },
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
        'findByPriceRangeInGroup', {
            http: {
                path: '/findByPriceRangeInGroup',
                verb: 'get'
            },
            accepts: [
                { arg: 'pid', type: 'number', required: true, description: "1" },
                { arg: 'min', type: 'number', required: true, description: "100000" },
                { arg: 'max', type: 'number', required: true, description: "500000" }
            ],
            returns: {
                arg: 'result',
                type: 'Product',
                root: true
            },
        }
    );

    //Find Sales products by parentid/top
    //cid = category id
    Product.findByPriceRangeInCategory = function (cid, min, max, cb) {
        var response;
        var param = {
            where: {
                and: [
                    { categoryId: cid },
                    { price: { gte: min } },
                    { price: { lte: max } }
                ]
            },
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
        'findByPriceRangeInCategory', {
            http: {
                path: '/findByPriceRangeInCategory',
                verb: 'get'
            },
            accepts: [
                { arg: 'cid', type: 'string', required: true, description: "1hqwiuh1jad01jsao" },
                { arg: 'min', type: 'number', required: true, description: "100000" },
                { arg: 'max', type: 'number', required: true, description: "500000" }
            ],
            returns: {
                arg: 'result',
                type: 'Product',
                root: true
            },
        }
    );

};
