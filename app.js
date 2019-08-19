

//*加载依赖库，原来这个类库都封装在connect中，现在需地注单独加载 
var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    cookieSession = require('cookie-session'),
    formidable = require('express-formidable'),
    routes = require('./routes/index'),// 加载路由控制
    app = express();// 创建项目实例
/**
 * 环境变量
 */
// 定义EJS模板引擎和模板文件位置，也可以使用jade或其他模型引擎
//app.engine('.html', ejs.__express);
app.set('view engine', 'ejs');
app.set('view cache', true);
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

// 定义日志和输出级别
app.use(logger('dev'));

// 定义数据解析器
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// 定义cookie解析器
app.use(cookieParser());
app.use(session({
    secret: 'hotyan',  // 用来对session id相关的cookie进行签名
    // store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: true,  // 是否自动保存未初始化的会话，建议false
    resave: false,  // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge:  60*60 * 1000  // 有效期，单位是毫秒
    }
}));

// app.use(formidable({
//     encoding: 'utf-8',//设置编辑  
// 	uploadDir: '/public/avatar/',//设置文件存储路径  
// 	keepExtensions:true,//保留后缀     
// 	maxFieldsSize: 2 * 1024 * 1024//设置单文件大小限制 
//     // multiples: true // req.files to be arrays of files
//     // name:null
//   }));

app.use(function(req, res, next){
    // 如果session中存在，则说明已经登录
    if( req.session.hotyan ){
        res.locals.hotyan = {
            UserId : req.session.hotyan.UserId,
            UserName : req.session.hotyan.UserName
        }
    }else{
        res.locals.hotyan = {};
    }
    next();
})

app.use(express.static(path.join(__dirname, 'public')));// 定义静态文件目录
app.use('/', routes);// 匹配路径和路由

// 404错误处理
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// 开发环境，500错误处理和错误堆栈跟踪
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// 生产环境，500错误处理
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// 输出模型app
module.exports = app;