var express = require('express'),
    router = express.Router(),
    time = require('silly-datetime'),
    user_m = require('../models/users'),// 引入model
    Parser = require('parse-xlsx'),
    formidable = require('formidable');


/*******************
 * 登录
 * 注册
 * 加密
 * 使用session来保存用户的登录状态:30*1000
 * 
 */
/**/
//渲染首页
router.get('/', function (req, res, next) {
	res.render('index', {
		title: 'index'
	}); 
});

// get方式渲染注册界面

router.get('/badminreg', function (req, res, next) {
    res.render('badminreg', {
        errmsg: ''
    });
});
router.post('/badminreg', function (req, res, next) {
    var UserId = req.body.UserId || '',
        Password = req.body.Password || '',
        Password2 = req.body.Password2 || '';

    if (Password != Password2) {
        res.render('badminreg', { errmsg: '密码不一致' });
        return;
    }
    var password_hash = user_m.hash(Password), // 对密码进行加密
        RegTime = time.format(new Date(), 'YYYY-MM-DD');
    // 数据库处理
    user_m.badminreg(UserId, password_hash, RegTime, function (result) {
        if (result.isExisted) {
            res.render('badminreg', { errmsg: '用户名已存在' }); // 重新加载注册模板，并提示用户名已存在
        } else if (result.affectedRows) {
            // 注册成功
            res.redirect('/badminlogin');//注册成功后登录
        } else {
            // console.log('登录失败');
            res.render('badminreg', { errmsg: '注册失败，请重新尝试' });
        }
    })
});
// 进入到登录页面/渲染登录页面
router.get('/easylogin', function (req, res, next) {
    res.render('easylogin', { errmsg: '' });
});
router.post('/easylogin', function (req, res, next) {
    var UserId = req.body.UserId || '',
        Password = req.body.Password || '';
    var password_hash = user_m.hash(Password);
    user_m.readerlogin(UserId, password_hash, function (result) {
        if (result.length) {
            // console.log( result );
            req.session.hotyan = {
                UserId: UserId,
                UserName: result[0].UserName
            }
            res.redirect('/');
        } else {
            // console.log('登录失败');
            res.render('easylogin', { errmsg: '用户名或密码错误' });
        }
    })
})
router.get('/adminlogin', function (req, res, next) {
    res.render('adminlogin', { errmsg: '' });
});
router.post('/adminlogin', function (req, res, next) {
    var UserId = req.body.UserId || '',
        Password = req.body.Password || '';

    var password_hash = user_m.hash(Password);

    user_m.adminlogin(UserId, password_hash, function (result) {
        if (result.length) {
            // console.log( result );
            req.session.hotyan = {
                UserId: UserId,
                UserName: result[0].UserName
            }
            res.redirect('/adAddBook');
        } else {
            // console.log('登录失败');
            res.render('adminlogin', { errmsg: '用户名或密码错误' });
        }
    })
})
router.get('/badminlogin', function (req, res, next) {
    res.render('badminlogin', { errmsg: '' });
});
router.post('/badminlogin', function (req, res, next) {
    var UserId = req.body.UserId || '',
        Password = req.body.Password || '';
    var password_hash = user_m.hash(Password);
    user_m.badminlogin(UserId, password_hash, function (result) {
        if (result.length) {
            // console.log( result );
            req.session.hotyan = {
                UserId: UserId,
                UserName: result[0].UserName
            }
            res.redirect('/badAddReader');
            // res.send('登录成功');
        } else {
            // console.log('登录失败');
            res.render('badminlogin', { errmsg: '用户名或密码错误' });
        }
    })
})
/**************************************
 * 查询结果
 * mysql模糊查询
 */
//渲染查询界面
router.get('/search', function (req, res, next) {
    res.render('search', {
        title: '首页查询结果'
    });
});
//模糊查询post
router.post('/search', function (req, res, next) {
    var BookName = req.body.BookName || '';

    user_m.bookabout(BookName, function (result) {
        if (result.length) {
            res.render('search', {
                title: '首页查询结果',
                datas: result
            })
        } else {
            res.redirect('/search');
        }
    })
})



/************************************ 
 * 个人中心
 * 改
 * 查
 * 连表查询
 *****************************************************/
//基本资料待完善
router.get('/BasicInformation', function (req, res, next) {
    var UserId = req.session.hotyan.UserId;
    user_m.readerId(UserId, function (result) {
        res.render('BasicInformation', {
            title: '查看资料',
            datas: result
        })
        console.log(result)
    })
});
router.get('/ModifyInformation', function (req, res, next) {
    res.render('ModifyInformation', {
        title: '修改资料'
    });
});
router.post('/ModifyInformation', function (req, res, next) {
    var UserId = req.session.hotyan.UserId,
        Phone = req.body.Phone || '',
        Email = req.body.Email || '';
    user_m.readerphone(Phone, Email, UserId, function (result) {
        res.render('ModifyInformation', {
            title: '修改电话/邮箱'
        })
    })
});
router.get('/Borrow', function (req, res, next) {
    var UserId = req.session.hotyan.UserId;
    console.log(UserId);
    user_m.borrow(UserId, 0, function (result) {
        res.render('Borrow', {
            title: '正在借阅',
            datas: result
        })
    })
});
router.post('/Borrow', function (req, res, next) {
    var BookId = req.body.BookId || '';
    user_m.bookname(BookId, function (result) {
        // console.log(result)
        var BookName = result[0].BookName,
            UserId = req.session.hotyan.UserId,
            BorrowTime = time.format(new Date(), 'YYYY-MM-DD'),
            ShouldTime = user_m.date(30),
            State = 0;//默认未归还
        console.log(BookId);
        console.log(BookName);
        console.log(UserId);
        console.log(BorrowTime);
        console.log(ShouldTime);

        user_m.borrowadd(UserId, BookId, BookName, BorrowTime, ShouldTime, State, function (result) {
            console.log("添加成功");
            res.redirect('/Borrow');
        })
    })
});
router.get('/Return', function (req, res, next) {
    res.render('Return', {
        title: '还书'
    });
});
router.post('/Return', function (req, res, next) {
    var UserId = req.session.hotyan.UserId,
        ReturnTime = user_m.date(2),//设置的两天后还
        BookId = req.body.BookId || '';
    user_m.return('1', ReturnTime, BookId, UserId, function (result) {
        console.log("成功还书");
        res.redirect('/Return');
    })


});
router.get('/Borrowed', function (req, res, next) {
    var UserId = req.session.hotyan.UserId;
    console.log(UserId);
    user_m.borrow(UserId, 1, function (result) {
        res.render('Borrowed', {
            title: '借阅记录',
            datas: result
        })
    })
});
/****************************************************
 *********** 图书管理员界面
 ****************************************************/
router.get('/adAddBook', function (req, res, next) {
    res.render('adAddBook', {
        title: '图书管理员录入新书信息'
    });
});
router.post('/adAddBook', function (req, res, next) {
    console.log(req.body);
    var BookId = req.body.BookId || '',
        BookName = req.body.BookName || '',
        Author = req.body.Author || '',
        Translator = req.body.Translator || '',
        Price = req.body.Price || '',
        ISBNCode = req.body.ISBNCode || '',
        PublishCompany = req.body.PublishCompany || '',
        ComeUpTime = req.body.ComeUpTime || '',
        EnteringDate = time.format(new Date(), 'YYYY-MM-DD'),
        State = 1,
        EnteringMen = req.body.EnteringMen || '';

    console.log(BookId);
    user_m.bookadd(BookId, BookName, Author, Translator, Price, ISBNCode, PublishCompany, ComeUpTime, EnteringDate, EnteringMen, State, function (result) {

        console.log("添加成功");
        res.redirect('/adAddBook');

    })
});
router.get('/adAddFile', function (req, res, next) {
    res.render('adAddFile', {
        title: '图书管理员录入新书信息'
    });
});
router.post('/adAddFile', function (req, res, next) {
    // console.log(req.body);
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';//设置编辑  
    form.uploadDir = "public/avatar/";//设置文件存储路径  
    form.keepExtensions = true;//保留后缀 
    form.multiples = true;
    form.maxFieldsSize = 2 * 1024 * 1024;//设置单文件大小限制 

    form.parse(req, function (err, fields, files) {
        if (err) throw err;
        // res.writeHead(200, { 'content-type': 'text/plain' });
        // res.end("Success");
        // res.end(util.inspect({ Fields: fields, Files: files }));
        var name = files.xlsxfile.path;

        // sheet = new Parser(name, 'Sheet1');
        // sheet.recordStream.pipe(process.stdout);

        // user_m.insertdata(name,function(result){
        console.log("上传成功！")
        res.redirect('/adAddFile');
        // })
    })

});
router.get('/adDeleteBook', function (req, res, next) {
    res.render('adDeleteBook', {
        title: '图书管理员删除旧书信息'
    });
});
router.post('/adDeleteBook', function (req, res, next) {
    // console.log(req.body);
    var BookId = req.body.BookId || '';
    // console.log(BookId);
    user_m.bookdelete(BookId, function (result) {
        console.log("删除成功");
        res.redirect('/adDeleteBook');
    })
});
router.get('/adModifyBook', function (req, res, next) {
    res.render('adModifyBook', {
        title: '图书管理员修改图书信息'
    });
});
router.post('/adModifyBook', function (req, res, next) {
    console.log(req.body);
    var BookId = req.body.BookId || '',
        BookName = req.body.BookName || '',
        Author = req.body.Author || '',
        Translator = req.body.Translator || '',
        Price = req.body.Price || '',
        ISBNCode = req.body.ISBNCode || '',
        PublishCompany = req.body.PublishCompany || '',
        ComeUpTime = req.body.ComeUpTime || '',
        EnteringDate = time.format(new Date(), 'YYYY-MM-DD'),
        State = req.body.State,
        EnteringMen = req.body.EnteringMen || '';

    console.log(BookId);
    user_m.bookupdata(BookName, Author, Translator, Price, ISBNCode, PublishCompany, ComeUpTime, State, EnteringMen, EnteringDate, BookId, function (result) {
        console.log("修改成功");
        res.redirect('/adModifyBook');
    })
});
router.get('/adCheckBook', function (req, res, next) {
    console.log(req.body);
    user_m.bookAll(function (result) {
        console.log("查看成功");
        res.render('adCheckBook', {
            title: '查看书籍信息',
            datas: result
        })
    })
});
router.post('/adCheckBook', function (req, res, next) {
    console.log(req.body);
    var BookId = req.body.BookId;
    user_m.bookId(BookId, function (result) {
        console.log("精确查看成功");
        res.render('adCheckBook', {
            title: '查看书籍信息',
            datas: result
        })
    })
});
router.get('/adBasicInformation', function (req, res, next) {
    res.render('adBasicInformation', {
        title: '图书管理员个人中心'
    });
});

/***************************
 * 后台管理员界面
 * 
 */

router.get('/badAddReader', function (req, res, next) {
    res.render('badAddReader', {
        title: '录入读者信息'
    })
})
router.post('/badAddReader', function (req, res, next) {
    // console.log(req.body);
    var UserId = req.body.UserId || '',
        UserName = req.body.UserName || '',
        Password = req.body.Password || '',
        Departments = req.body.Departments || '',
        Major = req.body.Major || '',
        Phone = req.body.Phone || '',
        Email = req.body.Email || '',
        Max = req.body.Max || '',
        LendedNum = 0,
        RegTime = time.format(new Date(), 'YYYY-MM-DD'),
        Time = req.body.Time || '';
    var password_hash = user_m.hash(Password);
    user_m.readeradd(UserId, UserName, password_hash, Departments, Major, Phone, Email, Max, Time, RegTime, LendedNum, function (result) {
        console.log("添加成功");
        // console.log(result);

        res.redirect('/badAddReader');

    })
});
router.get('/badDeleteReader', function (req, res, next) {
    res.render('badDeleteReader', {
        title: '删除读者信息'
    })
})
router.post('/badDeleteReader', function (req, res, next) {
    // console.log(req.body);
    var UserId = req.body.UserId || '';
    user_m.readerdelete(UserId, function (result) {
        console.log("删除成功");
        res.redirect('/badDeleteReader');
    })
});
router.get('/badModifyReader', function (req, res, next) {
    res.render('badModifyReader', {
        title: '修改读者信息'
    })
})
router.post('/badModifyReader', function (req, res, next) {
    console.log(req.body);
    var UserId = req.body.UserId || '',
        UserName = req.body.UserName || '',
        Departments = req.body.Departments || '',
        Major = req.body.Major || '',
        Phone = req.body.Phone || '',
        Email = req.body.Email || '',
        Max = req.body.Max || '',
        Time = req.body.Time || '';

    user_m.readerupdate(UserName, Departments, Major, Phone, Email, Max, Time, UserId, function (result) {
        console.log("修改成功");
        console.log(result);

        res.redirect('/badModifyReader');
    })
})
router.get('/badCheckReader', function (req, res, next) {
    user_m.readerAll(function (result) {
        res.render('badCheckReader', {
            title: '查看读者信息',
            datas: result
        })
    })
})
router.post('/badCheckReader', function (req, res, next) {
    console.log(req.body);
    var UserId = req.body.UserId;
    user_m.readerId(UserId, function (result) {
        console.log("精确查看成功");
        res.render('badCheckReader', {
            title: '查看读者信息',
            datas: result
        })
    })
});



router.get('/badAddAdmin', function (req, res, next) {
    res.render('badAddAdmin', {
        title: '录入管理员信息'
    });
});
router.post('/badAddAdmin', function (req, res, next) {
    // console.log(req.body);
    var BAId = req.body.BAId || '',
        BAName = req.body.BAName || '',
        BAPassword = req.body.BAPassword || '',
        BAPhone = req.body.BAPhone || '',
        BAEmail = req.body.BAEmail || '';
    var password_hash = user_m.hash(BAPassword);
    user_m.adminadd(BAId, BAName, password_hash, BAPhone, BAEmail, function (result) {
        console.log("添加成功");
        // console.log(result);
        res.redirect('/badAddAdmin');

    })
});
router.get('/badDeleteAdmin', function (req, res, next) {
    res.render('badDeleteAdmin', {
        title: '删除管理员信息'
    });
});
router.post('/badDeleteAdmin', function (req, res, next) {
    // console.log(req.body);
    var BAId = req.body.BAId || '';
    user_m.admindelete(BAId, function (result) {
        console.log("删除成功");
        console.log(result);
        res.redirect('/badDeleteAdmin');
    })
});
router.get('/badModifyAdmin', function (req, res, next) {
    res.render('badModifyAdmin', {
        title: '修改管理员信息'
    });
});
router.post('/badModifyAdmin', function (req, res, next) {
    console.log(req.body);
    var BAId = req.body.BAId || '',
        BAName = req.body.BAName || '',
        BAPhone = req.body.BAPhone || '',
        BAEmail = req.body.BAEmail || '';
    user_m.adminupdate(BAName, BAPhone, BAEmail, BAId, function (result) {
        console.log("修改成功");
        console.log(result);
        res.redirect('/badModifyAdmin');
    })
})
//查看管理员信息
router.get('/badCheckAdmin', function (req, res, next) {
    user_m.adminAll(function (result) {
        console.log("查看成功");
        res.render('badCheckAdmin', {
            title: '查看图书管理员信息',
            datas: result
        })
    })
})
router.post('/badCheckAdmin', function (req, res, next) {
    console.log(req.body);
    var BAId = req.body.BAId;
    user_m.adminId(BAId, function (result) {
        console.log("精确查看成功");
        res.render('badCheckAdmin', {
            title: '查看图书管理员信息',
            datas: result
        })
    })
});

router.get('/badBasicInformation', function (req, res, next) {
    res.render('badBasicInformation', {
        title: '后台管理员个人中心'
    });
});






module.exports = router;
