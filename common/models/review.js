'use strict';
var loopback = require('loopback');
var path = require('path');

module.exports = function (Review) {
    Review.observe('after save', function (ctx, next) {
        //Send mail to admin
        var message= {
            productCode: ctx.instance.productCode,
            comment: ctx.instance.comment,
            rating: ctx.instance.rating,
            email: ctx.instance.email
        }
        var renderer = loopback.template(path.resolve(__dirname, '../../server/views/admin-review-coming.ejs'));
        var html_body = renderer(message);

        console.log(html_body);

        Review.app.models.Email.send({
            to: 'fashionquynhnhu@gmail.com; duynt2010@gmail.com',
            from: message.email,
            subject: '[NEW REVIEW] Shop Quỳnh Như đã nhận một đánh giá cho sp #' + ctx.instance.productCode,
            html: html_body
        }, function (err, mail) {
            console.log('email sent to admin!');
        });
        next();
    });

    Review.changeStatus = function (reviewId, newStatus, cb) {
        var response;
        var param = {
            where: {
                id: reviewId
            }
        };
        Review.findOne(param, function (err, review) {
            if (err) {
                cb(err);
            }
            else {
                if (review instanceof Review) {
                    review.status = newStatus;
                    review.save(function (err, res) {
                        if (err) cb(err);
                        else {
                            cb(null, res, 200, "success");
                        }
                    })
                }
            } // endIf
        }); // endFunc
    };

    Review.remoteMethod(
        'changeStatus', {
            http: {
                path: '/changeStatus',
                verb: 'post'
            },
            accepts: [
                { arg: 'reviewId', type: 'string', required: true, description: "aca8e0u01" },
                { arg: 'status', type: 'boolean', required: true, description: "false" }
            ],
            returns: {
                arg: 'result',
                type: 'Review',
                root: true
            },
        }
    );
};
