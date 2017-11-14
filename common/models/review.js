'use strict';

module.exports = function(Review) {
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
