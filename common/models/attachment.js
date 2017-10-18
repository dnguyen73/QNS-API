'use strict';
var app = require('./../../server/server');

module.exports = function (Attachment) {
    var qt = require('quickthumb');
    
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
        // var uploadedFile = res.result.files.file[0];
        // newPic.filename = uploadedFile.container + "/" + uploadedFile.name;
        // newPic.size = uploadedFile.size;
        // newPic.isForColor = false;

        // newPic.save(function (err, response) {
        //     //handle hook error
        //     if (err) {
        //         next(err);
        //     }
        //     else next();
        // });
        var file = res.result.files.file[0];
        var file_path = "files/" + file.container + "/" + file.name;
        var file_thumb_path = "files/" + file.container + "/thumb/" + file.name;
        console.log(file_path);
        console.log(file_thumb_path);
        qt.convert({
            src: file_path,
            dst: file_thumb_path,
            width: 300
        }, function (err, path) {
           
        });
        
        next();
    });


};
