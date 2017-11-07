'use strict';

module.exports = function (Order) {
    //remote method before hook
    Order.observe('after save', function (ctx, next) {
        console.log('save0');
        Order.app.models.Email.send({
            to: 'duynt2010@gmail.com',
            from: 'duynt2010@gmail.com',
            subject: 'my subject',
            text: 'my text',
            html: 'my <em>html</em>'
        }, function (err, mail) {
            console.log('email sent!');
        });
        console.log('save');
        next();
    });

    Order.findByCode = function (orderCode, cb) {
        var response;
        var param = {
            where: {
                orderCode: orderCode
            }
        };
        Order.findOne(param, function (err, result) {
            if (err) {
                cb(err);
            }
            else {
                cb(null, result, 200, "success")
            } // endIf
        }); // endFunc
    };
    Order.updateStock = function (productCode, size, filename, quantity, cb) {
        var param = {
            where: {
                productCode: productCode
            }
        };
        Order.app.models.Product.findOne(param, function (err, product) {
            if (err) {
                cb(err);
            }
            else {
                if (product instanceof Order.app.models.Product) {
                    console.log(product)
                    for (var i = 0; i < product.stocks.length; i++) {
                        var stockTobeChanged = product.stocks[i];
                        console.log(stockTobeChanged);
                        if (stockTobeChanged.size === size && stockTobeChanged.filename === filename) {
                            stockTobeChanged.quantity = stockTobeChanged.quantity - quantity;
                            console.log(stockTobeChanged);
                            break;
                        }
                    }
                    //save product
                    product.save(function (err, res) {
                        if (err) cb(err);
                    })
                }
            } // endIf
        });
    }
    Order.changeStatus = function (orderCode, newStatus, cb) {
        var response;
        var param = {
            where: {
                orderCode: orderCode
            }
        };
        Order.findOne(param, function (err, order) {
            if (err) {
                cb(err);
            }
            else {
                console.log(order);
                console.log((order instanceof Order));
                if (order instanceof Order) {


                    order.paymentStatus = newStatus;
                    order.save(function (err, res) {
                        if (err) cb(err);
                        else {
                            //Must check purchased product is available in stock
                            for (var i = 0; i < order.items.length; i++) {
                                var itm = order.items[i];
                                console.log(itm);
                                Order.updateStock(itm.product.productCode, itm.size, itm.colorPath, itm.quantity);
                            }
                            cb(null, res, 200, "success");
                        }
                    })
                }
            } // endIf
        }); // endFunc
    };

    Order.remoteMethod(
        'changeStatus', {
            http: {
                path: '/changeStatus',
                verb: 'post'
            },
            accepts: [
                { arg: 'orderCode', type: 'string', required: true, description: "aca8e0u01" },
                { arg: 'status', type: 'boolean', required: true, description: "false" }
            ],
            returns: {
                arg: 'result',
                type: 'Order',
                root: true
            },
        }
    );

    Order.remoteMethod(
        'findByCode', {
            http: {
                path: '/findByCode',
                verb: 'get'
            },
            accepts: [
                { arg: 'code', type: 'string', required: true, description: "3618463917" }
            ],
            returns: {
                arg: 'result',
                type: 'Order',
                root: true
            },
        }
    );
};
