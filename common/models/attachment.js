'use strict';
var app = require('./../../server/server');

module.exports = function (Attachment) {
    //remote method before hook
    Attachment.beforeRemote("upload", function (ctx, unused, next) {
        console.log("Before upload");
        next();
    });

    //remote method after hook
    //After upload file successfully, create a record and save to Picture model
    Attachment.afterRemote("upload", function (ctx, res, next) {
        var newPic = app.models.Picture();
        console.log("testt-------------" + JSON.stringify(res));
        var uploadedFile = res.result.files.file[0];
        newPic.filename = uploadedFile.container + "/" + uploadedFile.name;
        newPic.size = uploadedFile.size;
        newPic.isForColor = false;

        newPic.save(function (err, response) {
            //handle hook error
            if (err) {
                next(err);
            }
            else next();
        });
    });
};
