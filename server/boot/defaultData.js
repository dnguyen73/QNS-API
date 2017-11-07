module.exports = function (app) {

    var Role = app.models.Role;

    //app.dataSources.mydb.automigrate('Manager', function (err) {
    app.models.Admin.destroyAll({}, function () {
        var Admin = app.models.Admin;
        Admin.create([{
            username: 'admin',
            email: 'duynt2010@gmail.com',
            password: 'admin',
        }], function (err, users) {
            if (err) throw err;
            console.log('Admin Users created: \n', users);
            // Role.create({
            //     name: 'admin'
            // }, function (err, role) {
            //     if (err) return;

            //     // Make Bob an admin
            //     role.principals.create({
            //         principalType: RoleMapping.USER,
            //         principalId: users[0].id
            //     }, function (err, principal) {
            //         if (err) return;
            //     });
            // });
        });
    });

    //});
    app.dataSources.mydb.automigrate('Size', function (err) {
        //if (err) throw err;
        console.log(err);
        app.models.Size.destroyAll({}, function (err, cb) { });
        app.models.Size.create([{
            label: '01',
            code: 'KC'
        }, {
            label: '02',
            code: 'KC'
        }, {
            label: '03',
            code: 'KC'
        }, {
            label: '04',
            code: 'KC'
        }, {
            label: '05',
            code: 'KC'
        }, {
            label: '06',
            code: 'KC'
        }, {
            label: '07',
            code: 'KC'
        }, {
            label: '08',
            code: 'KC'
        }, {
            label: '09',
            code: 'KC'
        }, {
            label: '10',
            code: 'KC'
        }, {
            label: '11',
            code: 'KC'
        }, {
            label: '12',
            code: 'KC'
        }, {
            label: 'XS',
            code: 'AC'
        }, {
            label: 'S',
            code: 'AC'
        }, {
            label: 'M',
            code: 'AC'
        }, {
            label: 'L',
            code: 'AC'
        }, {
            label: 'XL',
            code: 'AC'
        }, {
            label: 'XXL',
            code: 'AC'
        }, {
            label: 'Free',
            code: 'AC'
        }], function (err, sizes) {
            if (err) throw err;

            console.log('Models created: \n', sizes);
        });

    });


};