'use strict';

module.exports = function(Policy) {
    Policy.changeContent = function (type, content, cb) {
        var response;
        var param = {
            where: {
                type: type
            }
        };
        Policy.findOne(param, function (err, order) {
            if (err) {
                cb(err);
            }
            else {
                console.log(policy);
                console.log((policy instanceof Policy));
                if (policy instanceof Policy) {


                    policy.content = content;
                    policy.save(function (err, res) {
                        if (err) cb(err);
                        else {
                            cb(null, res, 200, "success");
                        }
                    })
                }
            } // endIf
        }); // endFunc
    };

    Policy.remoteMethod(
        'changeContent', {
            http: {
                path: '/changeContent',
                verb: 'post'
            },
            accepts: [
                { arg: 'type', type: 'string', required: true, description: "Refund" },
                { arg: 'content', type: 'string', required: true, description: "ddsadakd da" }
            ],
            returns: {
                arg: 'result',
                type: 'Policy',
                root: true
            },
        }
    );
};
