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
