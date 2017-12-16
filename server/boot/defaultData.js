module.exports = function (app) {

    var Role = app.models.Role;

    //app.dataSources.mydb.automigrate('Manager', function (err) {
    app.models.Admin.destroyAll({}, function () {
        var Admin = app.models.Admin;
        Admin.create([{
            username: 'admin',
            email: 'duynt2010@gmail.com',
            password: 'gauchuotga',
        }], function (err, users) {
            if (err) throw err;
            console.log('Admin Users created: \n', users);
            console.log(app.get('host'));
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
    // app.dataSources.mydb.automigrate('Policy', function (err) {
    //     //if (err) throw err;
    //     console.log(err);
    //     app.models.Policy.destroyAll({}, function (err, cb) { });
    //     app.models.Policy.create([
    //         {
    //         type: 'placeholder',
    //         content: 'placeholder'
    //     },
    //     {
    //         type: 'refund',
    //         content: '<p>- Thời hạn đổi c&aacute;c mặt h&agrave;ng đ&atilde; mua tại shopquynhnhu.com&nbsp;l&agrave; 2&nbsp;ng&agrave;y kể từ ng&agrave;y mua. H&agrave;ng được đổi phải đảm bảo c&ograve;n mới 100% chưa được sử dụng v&agrave; c&ograve;n nguy&ecirc;n nh&atilde;n m&aacute;c. Shopquynhnhu.com&nbsp;kh&ocirc;ng đổi h&agrave;ng đ&atilde; sử dụng.</p><p>- Tổng gi&aacute; trị c&aacute;c mặt h&agrave;ng muốn đổi phải c&oacute; gi&aacute; trị tương đương với mặt h&agrave;ng trả lại. Shopquynhnhu.com kh&ocirc;ng ho&agrave;n lại tiền thừa trong trường hợp sản phẩm mới c&oacute; gi&aacute; trị thấp hơn sản phẩm đ&atilde; mua.</p><p>- Nếu sản phẩm c&oacute; lỗi, qu&yacute; kh&aacute;ch cần th&ocirc;ng b&aacute;o cho shop được biết qua số hotline&nbsp;trong v&ograve;ng 2&nbsp;ng&agrave;y kể từ ng&agrave;y mua. Shopquynhnhu.com cam kết sẽ nhanh ch&oacute;ng thay thế sản phẩm ngay tức th&igrave; cho kh&aacute;ch h&agrave;ng. Nếu như sản phẩm đ&oacute; kh&ocirc;ng c&ograve;n h&agrave;ng Shopquynhnhu.com sẽ ho&agrave;n lại tiền m&agrave; kh&ocirc;ng c&oacute; đ&ograve;i hỏi n&agrave;o trong trường hợp n&agrave;y.</p><p>- Ph&iacute; chuyển ph&aacute;t sẽ được ho&agrave;n trả trong trường hợp h&agrave;ng h&oacute;a b&aacute;n ra kh&ocirc;ng đ&uacute;ng, lỗi hoặc hỏng h&oacute;c.</p>'
    //     }, 
    //     {
    //         type: 'shipping',
    //         content: '<p>1. TP HCM:</p><p>-&nbsp;Quận 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, T&acirc;n B&igrave;nh, T&acirc;n Ph&uacute;, Ph&uacute; Nhuận, B&igrave;nh Thạnh, G&ograve; Vấp: 20.000đ (thanh to&aacute;n khi nhận h&agrave;ng, giao trong 1 ng&agrave;y).</p><p>- Quận 9, 12, Thủ Đức, B&igrave;nh T&acirc;n: 25.000đ (thanh to&aacute;n khi nhận h&agrave;ng, giao trong 1 ng&agrave;y, đ&acirc;y l&agrave; ph&iacute; ship mặc định), 20.000đ (nếu bạn chuyển khoản trước, shop gửi bằng đường bưu điện trong 3-5 ng&agrave;y, vui l&ograve;ng b&aacute;o trước cho shop).</p><p>- Quận H&oacute;c M&ocirc;n, B&igrave;nh Ch&aacute;nh, Nh&agrave; B&egrave;, Huyện Củ Chi, Huyện Cần Giờ: 35.000đ (thanh to&aacute;n khi nhận h&agrave;ng, giao trong 1-2 ng&agrave;y, đ&acirc;y l&agrave; ph&iacute; ship mặc định), 20.000đ&nbsp; (bạn chuyển khoản trước, shop gửi bằng đường bưu điện trong 3-5 ng&agrave;y,vui l&ograve;ng b&aacute;o trước cho shop).</p><p>&nbsp;</p><p>2. C&aacute;c tỉnh th&agrave;nh kh&aacute;c:</p><p>a. Nếu bạn chuyển khoản trước:&nbsp;</p><p>- Khối lượng &lt;0.5kg: 25.000đ.</p><p>- Khối lượng lớn hơn, k&iacute;ch thước lớn:&nbsp;Th&ecirc;m phụ ph&iacute; 5.000đ.</p><p>b. Nếu bạn muốn thanh to&aacute;n khi nhận h&agrave;ng (COD): vui l&ograve;ng cộng th&ecirc;m 15.000đ - 20.000đ ph&iacute; COD.</p><p><strong>(free ship to&agrave;n quốc cho đơn h&agrave;ng tr&ecirc;n 1.200.000đ)</strong></p>'
    //     }
    //     ], function (err, policies) {
    //         if (err) throw err;

    //         console.log('Models created: \n', policies);
    //     });

    // });

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