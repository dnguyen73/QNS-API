// // in my-project/server/boot/hook.js
// module.exports = function (server) {
//     var remotes = server.remotes();
//     // modify all returned values
//     remotes.after('**', function (ctx, next) {
//         console.log('KKKKKKKKKK' + ctx.result);
//         if (ctx.result.error) {
//             ctx.result = {
//                 success: false,
//                 error: {
//                     statusCode: ctx.result.error.statusCode,
//                     errorCode: ctx.result.error.code,
//                     message: ctx.result.error.message
//                 }
//             }
//         } else {
//             ctx.result = {
//                 success: true,
//                 data: ctx.result
//             }
//         }

//         next();
//     });
// };