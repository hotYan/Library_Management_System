//用户自己个人中心的改查
var user = {
    update : 'update userinfo set Phone=?,Email=? where UserId=?',//修改电话邮箱
    updatePassword : 'update userinfo set Password=? where UserId=?',//修改密码
	queryDatas: 'select * from userinfo where UserId=?',//查看个人资料
    // queryBookNum: 'select * from userinfo',//查看在借图书
    // queryBorrowNum: 'select * from userinfo'//查看图书借阅记录
};
 
module.exports = user;