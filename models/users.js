
/**
 * 
 */
var pool = require('./db'), // 连接数据库
    book = require('../SQL/bookSql'),
    reader = require('../SQL/readerSql'),
    admin = require('../SQL/adminSql'),
    badmin = require('../SQL/badminSql'),
    borrow = require('../SQL/borrowSql'),
    crypto = require('crypto'); // 对密码进行加密

module.exports = {
    // 对字符串进行sha1加密
    hash: function (str) {
        return crypto.createHmac('sha1', str).update('love').digest('hex');
    },
    date: function (AddDay) {
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDay);//获取AddDayCount天后的日期 
        var y = dd.getFullYear();
        var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
        return y + "-" + m + "-" + d;

    },

    //*************************** */
    //****书籍bookinfo*******/
    //增
    //删
    //模糊查找
    //查
    //

    bookadd: function (BookId, BookName, Author, Translator, Price, ISBNCode, PublishCompany, ComeUpTime, EnteringDate, EnteringMen, State, cb) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;

            connection.query(book.insert, [BookId, BookName, Author, Translator, Price, ISBNCode, PublishCompany, ComeUpTime, EnteringDate, EnteringMen, State], function (err, result) {
                if (err) throw err;

                cb(result);
                connection.release();
            })
        })
    },
    bookdelete: function (BookId, cb) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(book.delete, [BookId], function (err, result) {
                if (err) throw err;

                console.log(result);
                cb(result);
                connection.release();
            })
        })
    },
    bookupdata: function (BookName, Author, Translator, Price, ISBNCode, PublishCompany, ComeUpTime, State, EnteringMen, EnteringDate, BookId, cb) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;

            connection.query(book.update, [BookName, Author, Translator, Price, ISBNCode, PublishCompany, ComeUpTime, State, EnteringMen, EnteringDate, BookId], function (err, result) {
                if (err) throw err;

                cb(result);
                connection.release();
            })
        })
    },
    bookabout: function (BookName, cb) {//书籍模糊查询
        pool.getConnection(function (err, connection) {
            if (err) throw err;

            connection.query('SELECT * FROM `bookinfo` WHERE `BookName` LIKE "%开发实战" or `BookName` LIKE "%编程" or `BookName` LIKE "java%" ', [BookName], function (err, result) {
                if (err) throw err;

                cb(result);
                connection.release();
            })
        })
    },
    bookAll: function (cb) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(book.queryAll, function (err, result) {
                if (err) throw err;

                cb(result);
                connection.release();
            })
        })

    },
    bookId: function (BookId, cb) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(book.queryById, [BookId], function (err, result) {
                if (err) throw err;

                cb(result);
                connection.release();
            })
        })

    },
    bookname: function (BookId, cb) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(book.queryBookName, [BookId], function (err, result) {
                if (err) throw err;

                cb(result);
                connection.release();
            })
        })

    },
    //*************************** */
    //****对userinfo表******* */
    readerlogin: function (userid, password, cb) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;

            connection.query('SELECT `UserName` FROM `userinfo` WHERE `UserId`=? AND `Password`=?', [userid, password], function (err, result) {
                if (err) throw err;

                cb(result);
                connection.release();
                // 接下来connection已经无法使用，它已经被返回到连接池中 
            })
        })
    },
    readeradd: function (UserId, UserName, Password, Departments, Major, Phone, Email, Max, Time, RegTime, LendedNum, cb) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;

            connection.query(reader.insert, [UserId, UserName, Password, Departments, Major, Phone, Email, Max, Time, RegTime, LendedNum], function (err, result) {
                if (err) throw err;

                cb(result);
                connection.release();
            })
        })
    },
    readerdelete: function (UserId, cb) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(reader.delete, [UserId], function (err, result) {
                if (err) throw err;

                console.log(result);
                cb(result);
                connection.release();
            })
        })
    },
    readerupdate: function (UserName, Departments, Major, Phone, Email, Max, Time, UserId, cb) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;

            connection.query(reader.update, [UserName, Departments, Major, Phone, Email, Max, Time, UserId], function (err, result) {
                if (err) throw err;

                cb(result);
                connection.release();
            })
        })
    },
    readerphone: function (Phone, Email, UserId, cb) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;

            connection.query(reader.querydate, [Phone, Email, UserId], function (err, result) {
                if (err) throw err;

                cb(result);
                connection.release();
            })
        })
    },

    readerAll: function (cb) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(reader.queryAll, function (err, result) {
                if (err) throw err;

                cb(result);
                connection.release();
            })
        })

    },
    readerId: function (UserId, cb) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(reader.queryById, [UserId], function (err, result) {
                if (err) throw err;

                cb(result);
                connection.release();
            })
        })

    },
    //******************************** */
    //对bookadmin表
    //*************************** */
    adminlogin: function (BAId, BAPassword, cb) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;

            connection.query('SELECT `BAName` FROM `bookadmin` WHERE `BAId`=? AND `BAPassword`=?', [BAId, BAPassword], function (err, result) {
                if (err) throw err;

                cb(result);
                connection.release();
                // 接下来connection已经无法使用，它已经被返回到连接池中 
            })
        })
    },
    adminadd: function (BAId, BAName, BAPassword, BAPhone, BAEmail, cb) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(admin.insert, [BAId, BAName, BAPassword, BAPhone, BAEmail], function (err, result) {
                if (err) throw err;
                cb(result);
                connection.release();
            })
        })
    },
    admindelete: function (BAId, cb) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(admin.delete, [BAId], function (err, result) {
                if (err) throw err;

                console.log(result);
                cb(result);
                connection.release();
            })
        })
    },
    adminupdate: function (BAName, BAPhone, BAEmail, BAId, cb) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(admin.update, [BAName, BAPhone, BAEmail, BAId], function (err, result) {
                if (err) throw err;

                cb(result);
                connection.release();
            })
        })
    },
    adminAll: function (cb) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(admin.queryAll, function (err, result) {
                if (err) throw err;
                cb(result);
                connection.release();
            })
        })

    },
    adminId: function (BAId, cb) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(admin.queryById, [BAId], function (err, result) {
                if (err) throw err;
                cb(result);
                connection.release();
            })
        })

    },




    /***************************************
     * 对borrow表
     * 
     */
    borrowAll: function (cb) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(borrow.queryAll, function (err, result) {
                if (err) throw err;

                cb(result);
                connection.release();
            })
        })

    },
    borrow: function (UserId, State, cb) {//borrowing  & borrowed//
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(borrow.borrowList, [UserId, State], function (err, result) {
                if (err) throw err;

                cb(result);
                connection.release();
            })
        })

    },
    return: function (State, RetuenTime, BookId, UserId, cb) {//borrowing  & borrowed//
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(borrow.return, [State, RetuenTime, BookId, UserId], function (err, result) {
                if (err) throw err;

                cb(result);
                connection.release();
            })
        })

    },
    borrowadd: function (UserId, BookId, BookName, BorrowTime, ShouldTime, State, cb) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(borrow.insert, [UserId, BookId, BookName, BorrowTime, ShouldTime, State], function (err, result) {
                if (err) throw err;

                cb(result);
                connection.release();
            })
        })
    },

    /**
     * 对badmin
     */
    // 注册
    // 因数据库操作是异步操作，则需要传入回调函数来对结果进行处理，而不能使用return的方式
    badminreg: function (userid, password, regtime, cb) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            // 首先检测用户名是否存在
            connection.query('SELECT `UserName` FROM `badmin` WHERE `UserId`=?', [userid], function (err, sele_res) {
                if (err) throw err;

                // 若用户名已存在，则直接回调
                if (sele_res.length) {
                    cb({ isExisted: true });
                    connection.release();
                } else {
                    // 否则将信息插入到数据库中
                    var params = { UserId: userid, UserName: userid, Password: password, RegTime: regtime };
                    connection.query('INSERT INTO `badmin` SET ?', params, function (err, insert_res) {
                        if (err) throw err;

                        cb(insert_res);
                        connection.release();
                        // 接下来connection已经无法使用，它已经被返回到连接池中 
                    })
                }
            })
        })
    },
    // 登录
    badminlogin: function (UserId, Password, cb) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;

            connection.query('SELECT `UserName` FROM `badmin` WHERE `UserId`=? AND `Password`=?', [UserId, Password], function (err, result) {
                if (err) throw err;

                cb(result);
                connection.release();
                // 接下来connection已经无法使用，它已经被返回到连接池中 
            })
        })
    },
    insertdata: function ( cb) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;

            cb();
            connection.release();
            // 接下来connection已经无法使用，它已经被返回到连接池中
        })
    },


    //load data local infile "F:/Desktop/male.txt" into table male fields terminated by "\t" lines terminated by "\r\n";
    //FIELDS TERMINATED BY \t LINES TERMINATED BY \n 

}

