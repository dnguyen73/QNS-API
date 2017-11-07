'use strict';

module.exports = function (Category) {
    //remote method before hook
    Category.findByParentId = function (parentId, cb) {
        var response;
        var param = {
            where: {
                parentId: parentId
            }
        };
        Category.findOne(param, function (err, result) {
            if (err) {
                cb(err);
            }
            else {
                cb(null, result, 200, "success")
            } // endIf
        }); // endFunc
    };
    Category.remoteMethod(
        'findByParentId', {
            http: {
                path: '/findByParentId',
                verb: 'get'
            },
            accepts: [
                { arg: 'parentId', type: 'string', required: true, description: "1" }
            ],
            returns: {
                arg: 'result',
                type: 'Category',
                root: true
            },
        }
    );

};
