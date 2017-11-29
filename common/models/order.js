'use strict';
var loopback = require('loopback');
var path = require('path');
var dateFormat = require('dateformat');
var numFormat = require('format-number');

module.exports = function (Order) {
    //remote method before hook
    Order.observe('after save', function (ctx, next) {
        // create a custom object your want to pass to the email template. You can create as many key-value pairs as you want
        var customerMailData = {
            hostname: Order.app.get('host'),
            userInfo: ctx.instance.userInfo,
            order_code: ctx.instance.orderCode,
            order_date: dateFormat(ctx.instance.orderDate, "dd-mm-yyyy h:MM:ss"),
            orderAmount: numFormat({ integerSeparator: '.', suffix: ' VND' })(ctx.instance.orderAmount),
            shippingFee: numFormat({ integerSeparator: '.', suffix: ' VND' })(ctx.instance.shippingFee),
            totalAmount: numFormat({ integerSeparator: '.', suffix: ' VND' })(ctx.instance.totalAmount),
            items: []
        };
        for (var i = 0, items = ctx.instance.items; i < items.length; i++) {
            customerMailData.items.push({
                imgPath: items[i].colorPath,
                parentFolder: items[i].product.parentId,
                productName: items[i].product.productName,
                productCode: items[i].product.productCode,
                unitPrice: numFormat({ integerSeparator: '.', suffix: ' VND' })(items[i].unitPrice),
                quantity: items[i].quantity,
                amount: numFormat({ integerSeparator: '.', suffix: ' VND' })(items[i].unitPrice * items[i].quantity)
            })
        }

        // prepare a loopback template renderer
        var renderer = loopback.template(path.resolve(__dirname, '../../server/views/customer-order-confirmation.ejs'));
        var html_body = renderer(customerMailData);

        Order.app.models.Email.send({
            to: customerMailData.userInfo.email,
            from: 'Fashion Quỳnh Như <fashionquynhnhu@gmail.com>',
            subject: 'Shop Quỳnh Như đã nhận đơn hàng #' + ctx.instance.orderCode,
            text: 'my text',
            html: html_body
        }, function (err, mail) {
            console.log('email sent to customer!');
            //Send mail to admin
            var rendererAdmin = loopback.template(path.resolve(__dirname, '../../server/views/admin-order-coming.ejs'));
            var html_body_admin = rendererAdmin(customerMailData);

            Order.app.models.Email.send({
                to: 'fashionquynhnhu@gmail.com; duynt2010@gmail.com',
                from: 'Fashion Quỳnh Như <fashionquynhnhu@gmail.com>',
                subject: '[NEW ORDER] Shop Quỳnh Như đã nhận đơn hàng #' + ctx.instance.orderCode,
                html: html_body_admin
            }, function (err, mail) {
                console.log('email sent to admin!');
                //Send mail to admin

            });
        });
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
