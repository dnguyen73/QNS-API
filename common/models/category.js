'use strict';

module.exports = function (Category) {
    //remote method before hook
    Category.observe('before save', function (ctx, next) {
        if (ctx.isNewInstance) {
            console.log(ctx.isNewInstance);
        }
        next();
    });
};
