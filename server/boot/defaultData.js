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
        app.models.Size.create([
        {
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

    app.dataSources.mydb.automigrate('Province', function (err) {
        app.models.Province.destroyAll({}, function (err, cb) { });
        app.models.Province.create([
        {
            name: 'An Giang',
            code: '296',
            charge: 30000
        }, 
        {
            name: 'Bà Rịa - Vũng Tàu',
            code: '254',
            charge: 30000
        }, {
            name: 'Bạc Liêu',
            code: '291',
            charge: 30000
        }, {
            name: 'Bắc Kạn',
            code: '209',
            charge: 40000
        }, {
            name: 'Bắc Giang',
            code: '204',
            charge: 40000
        },{
            name: 'Bắc Ninh',
            code: '222',
            charge: 40000
        },{
            name: 'Bến Tre',
            code: '275',
            charge: 30000
        },{
            name: 'Bình Dương',
            code: '274',
            charge: 30000
        },{
            name: 'Bình Định',
            code: '256',
            charge: 40000
        },{
            name: 'Bình Phước',
            code: '271',
            charge: 30000
        },{
            name: 'Bình Thuận',
            code: '252',
            charge: 30000
        },{
            name: 'Cà Mau',
            code: '290',
            charge: 40000
        },{
            name: 'Cao Bằng',
            code: '206',
            charge: 40000
        },{
            name: 'Cần Thơ',
            code: '292',
            charge: 40000
        },{
            name: 'Đà Nẵng',
            code: '236',
            charge: 40000
        },{
            name: 'Đắk Lắk',
            code: '262',
            charge: 40000
        },{
            name: 'Đắk Nông',
            code: '261',
            charge: 40000
        },{
            name: 'Đồng Nai',
            code: '251',
            charge: 30000
        },{
            name: 'Đồng Tháp',
            code: '277',
            charge: 30000
        },{
            name: 'Điện Biên',
            code: '215',
            charge: 40000
        },{
            name: 'Gia Lai',
            code: '269',
            charge: 40000
        },{
            name: 'Hà Giang',
            code: '219',
            charge: 40000
        },{
            name: 'Hà Nam',
            code: '226',
            charge: 40000
        },{
            name: 'Hà Nội',
            code: '24',
            charge: 40000
        },{
            name: 'Hà Tĩnh',
            code: '239',
            charge: 40000
        },{
            name: 'Hải Dương',
            code: '220',
            charge: 40000
        },{
            name: 'Hải Phòng',
            code: '225',
            charge: 40000
        },{
            name: 'Hòa Bình',
            code: '218',
            charge: 40000
        },{
            name: 'Hậu Giang',
            code: '293',
            charge: 30000
        },{
            name: 'Hưng Yên',
            code: '221',
            charge: 40000
        },{
            name: 'Hồ Chí Minh',
            code: '28',
            charge: 20000
        },{
            name: 'Khánh Hòa',
            code: '258',
            charge: 40000
        },{
            name: 'Kiên Giang',
            code: '297',
            charge: 30000
        },{
            name: 'Kon Tum',
            code: '260',
            charge: 30000
        },{
            name: 'Lai Châu',
            code: '213',
            charge: 40000
        },{
            name: 'Lào Cai',
            code: '214',
            charge: 40000
        },{
            name: 'Lạng Sơn',
            code: '205',
            charge: 40000
        },{
            name: 'Lâm Đồng',
            code: '263',
            charge: 40000
        },{
            name: 'Long An',
            code: '272',
            charge: 30000
        },{
            name: 'Nam Định',
            code: '228',
            charge: 40000
        },{
            name: 'Nghệ An',
            code: '238',
            charge: 40000
        },{
            name: 'Ninh Bình',
            code: '229',
            charge: 40000
        },{
            name: 'Ninh Thuận',
            code: '259',
            charge: 40000
        },{
            name: 'Phú Thọ',
            code: '210',
            charge: 40000
        },{
            name: 'Phú Yên',
            code: '257',
            charge: 40000
        },{
            name: 'Quảng Bình',
            code: '232',
            charge: 40000
        },{
            name: 'Quảng Nam',
            code: '235',
            charge: 40000
        },{
            name: 'Quảng Ngãi',
            code: '255',
            charge: 40000
        },{
            name: 'Quảng Ninh',
            code: '203',
            charge: 40000
        },{
            name: 'Quảng Trị',
            code: '233',
            charge: 40000
        },
        {
            name: 'Sóc Trăng',
            code: '299',
            charge: 40000
        },
        {
            name: 'Sơn La',
            code: '212',
            charge: 40000
        },
        {
            name: 'Tây Ninh',
            code: '276',
            charge: 40000
        },
        {
            name: 'Thái Bình',
            code: '227',
            charge: 40000
        },
        {
            name: 'Thái Nguyên',
            code: '208',
            charge: 40000
        },
        {
            name: 'Thanh Hóa',
            code: '237',
            charge: 40000
        }, {
            name: 'Thanh Hóa',
            code: '237',
            charge: 40000
        },
        {
            name: 'Thừa Thiên - Huế',
            code: '234',
            charge: 40000
        },
        {
            name: 'Tiền Giang',
            code: '273',
            charge: 30000
        },
        {
            name: 'Trà Vinh',
            code: '294',
            charge: 40000
        },
        {
            name: 'Tuyên Quang',
            code: '207',
            charge: 40000
        },{
            name: 'Vĩnh Long',
            code: '270',
            charge: 40000
        },{
            name: 'Vĩnh Phúc',
            code: '211',
            charge: 40000
        },
        {
            name: 'Yên Bái',
            code: '216',
            charge: 40000
        }], function (err, provinces) {
            if (err) throw err;

            console.log('Models created: \n', provinces);
        });

    });


};