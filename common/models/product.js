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

    Product.countByCategory = function (categoryId, cb) {
        Product.count({
            categoryId: categoryId
        }, function (err, count) {
            if (err) {
                cb(err);
            }
            else {
                cb(null, count, 200, "success")
            }
        });
    };
    Product.remoteMethod(
        'countByCategory', {
            http: {
                path: '/countByCategory',
                verb: 'get'
            },
            accepts: [
                { arg: 'categoryId', type: 'string', required: true, description: "59d284dcd228f70436c2eb51" },
            ],
            returns: {
                arg: 'count',
                type: 'Number'
            },
        }
    );

    Product.countByParentId = function (parentId, cb) {
        Product.count({
            parentId: parentId
        }, function (err, count) {
            if (err) {
                cb(err);
            }
            else {
                cb(null, count, 200, "success")
            }
        });
    };
    Product.remoteMethod(
        'countByParentId', {
            http: {
                path: '/countByParentId',
                verb: 'get'
            },
            accepts: [
                { arg: 'parentId', type: 'number', required: true, description: "59d284dcd228f70436c2eb51" },
            ],
            returns: {
                arg: 'count',
                type: 'Number'
            },
        }
    );

    Product.countNewestByParentId = function (parentId, cb) {
        var days = parseInt(Product.app.get('NEW_PROD_DAYS_NUM'));
        var SELECT_DAYS = days * 24 * 60 * 60 * 1000;  // Month in milliseconds

        Product.count({
            parentId: parentId,
            createdDate: { gt: Date.now() - SELECT_DAYS }
        }, function (err, count) {
            if (err) {
                cb(err);
            }
            else {
                cb(null, count, 200, "success")
            }
        });
    };
    Product.remoteMethod(
        'countNewestByParentId', {
            http: {
                path: '/countNewestByParentId',
                verb: 'get'
            },
            accepts: [
                { arg: 'parentId', type: 'number', required: true, description: "59d284dcd228f70436c2eb51" },
            ],
            returns: {
                arg: 'count',
                type: 'Number'
            },
        }
    );

    Product.countAllNewest = function (cb) {
        var days = parseInt(Product.app.get('NEW_PROD_DAYS_NUM'));
        var SELECT_DAYS = days * 24 * 60 * 60 * 1000;  // Month in milliseconds

        Product.count({
            createdDate: { gt: Date.now() - SELECT_DAYS }
        }, function (err, count) {
            if (err) {
                cb(err);
            }
            else {
                cb(null, count, 200, "success")
            }
        });
    };
    Product.remoteMethod(
        'countAllNewest', {
            http: {
                path: '/countAllNewest',
                verb: 'get'
            },
            accepts: [
            ],
            returns: {
                arg: 'count',
                type: 'Number'
            },
        }
    );

    Product.countSaleByParentId = function (parentId, cb) {
        Product.count({
            parentId: parentId,
            isOnSale: true
        }, function (err, count) {
            if (err) {
                cb(err);
            }
            else {
                cb(null, count, 200, "success")
            }
        });
    };
    Product.remoteMethod(
        'countSaleByParentId', {
            http: {
                path: '/countSaleByParentId',
                verb: 'get'
            },
            accepts: [
                { arg: 'parentId', type: 'number', required: true, description: "59d284dcd228f70436c2eb51" },
            ],
            returns: {
                arg: 'count',
                type: 'Number'
            },
        }
    );

    Product.countAllSale = function (cb) {
        Product.count({
            isOnSale: true
        }, function (err, count) {
            if (err) {
                cb(err);
            }
            else {
                cb(null, count, 200, "success")
            }
        });
    };
    Product.remoteMethod(
        'countAllSale', {
            http: {
                path: '/countAllSale',
                verb: 'get'
            },
            accepts: [
            ],
            returns: {
                arg: 'count',
                type: 'Number'
            },
        }
    );

    Product.findByCategory = function (categoryId, pagenum, cb) {
        var response, param, skip;
        var limit = parseInt(Product.app.get('PAGESIZE'));

        //If pagenum is not passed in, set pagenum = 1.
        if (!pagenum) { pagenum = 1 };
        skip = (pagenum - 1) * limit;
        param = {
            limit: limit,
            skip: skip,
            where: {
                categoryId: categoryId
            },
            order: 'createdDate DESC'
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
                { arg: 'categoryId', type: 'string', required: true, description: "59d284dcd228f70436c2eb51" },
                { arg: 'pagenum', type: 'number', required: false, description: "5" }
            ],
            returns: {
                arg: 'result',
                type: 'Array',
                root: true
            },
        }
    );

    Product.findByParentId = function (parentId, pagenum, cb) {
        var response, param, skip;
        var limit = parseInt(Product.app.get('PAGESIZE'));
        //If pagenum is not passed in, set pagenum = 1.
        if (!pagenum) { pagenum = 1 };
        skip = (pagenum - 1) * limit;

        param = {
            limit: limit,
            skip: skip,
            where: {
                parentId: parentId
            },
            order: 'createdDate DESC'
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
        'findByParentId', {
            http: {
                path: '/findByParentId',
                verb: 'get'
            },
            accepts: [
                { arg: 'parentId', type: 'string', required: true, description: "1" },
                { arg: 'pagenum', type: 'number', required: false, description: "5" }
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
                    },
                    order: 'createdDate DESC'
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

    Product.findNewestByParentId = function (pId, pagenum, cb) {
        var response, param, skip;
        var days = parseInt(Product.app.get('NEW_PROD_DAYS_NUM'));
        var SELECT_DAYS = days * 24 * 60 * 60 * 1000;  // Month in milliseconds

        var limit = parseInt(Product.app.get('PAGESIZE'));
        //If pagenum is not passed in, set pagenum = 1.
        if (!pagenum) { pagenum = 1 };
        skip = (pagenum - 1) * limit;

        param = {
            limit: limit,
            skip: skip,
            where: {
                parentId: pId,
                createdDate: { gt: Date.now() - SELECT_DAYS }
            },
            order: 'createdDate DESC'
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
        'findNewestByParentId', {
            http: {
                path: '/findNewestByParentId',
                verb: 'get'
            },
            accepts: [
                { arg: 'pid', type: 'number', required: true, description: "1" },
                { arg: 'pagenum', type: 'number', required: false, description: "5" }
            ],
            returns: {
                arg: 'result',
                type: 'Product',
                root: true
            },
        }
    );

    Product.findAllNewest = function (pagenum, cb) {
        var response, param, skip;
        var days = parseInt(Product.app.get('NEW_PROD_DAYS_NUM'));
        var SELECT_DAYS = days * 24 * 60 * 60 * 1000;  // Month in milliseconds

        var limit = parseInt(Product.app.get('PAGESIZE'));
        //If pagenum is not passed in, set pagenum = 1.
        if (!pagenum) { pagenum = 1 };
        skip = (pagenum - 1) * limit;

        var param = {
            limit: limit,
            skip: skip,
            where: {
                createdDate: { gt: Date.now() - SELECT_DAYS }
            },
            order: 'createdDate DESC'
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
        'findAllNewest', {
            http: {
                path: '/findAllNewest',
                verb: 'get'
            },
            accepts: [
                { arg: 'pagenum', type: 'number', required: false, description: "5" }
            ],
            returns: {
                arg: 'result',
                type: 'Product',
                root: true
            },
        }
    );

    //Find Sales products by parentid/top
    Product.findSaleByParentId = function (pId, pagenum, cb) {
        var response, param, skip;
        var limit = parseInt(Product.app.get('PAGESIZE'));
        //If pagenum is not passed in, set pagenum = 1.
        if (!pagenum) { pagenum = 1 };
        skip = (pagenum - 1) * limit;

        param = {
            limit: limit,
            skip: skip,
            where: {
                parentId: pId,
                isOnSale: true
            },
            order: 'createdDate DESC'
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
        'findSaleByParentId', {
            http: {
                path: '/findSaleByParentId',
                verb: 'get'
            },
            accepts: [
                { arg: 'pid', type: 'number', required: true, description: "1" },
                { arg: 'pagenum', type: 'number', required: false, description: "5" }
            ],
            returns: {
                arg: 'result',
                type: 'Product',
                root: true
            },
        }
    );

    //Find Sales products by parentid/top
    Product.findAllSale = function (pagenum, cb) {
        var response, skip;
        var limit = parseInt(Product.app.get('PAGESIZE'));
        //If pagenum is not passed in, set pagenum = 1.
        if (!pagenum) { pagenum = 1 };
        skip = (pagenum - 1) * limit;

        var param = {
            limit: limit,
            skip: skip,
            where: {
                isOnSale: true
            },
            order: 'createdDate DESC'
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
                { arg: 'pagenum', type: 'number', required: false, description: "5" }
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
            order: 'createdDate DESC'
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
