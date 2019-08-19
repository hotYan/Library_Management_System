//对后台管理员对自己信息的修改
var badmin = {
	update : 'update systemadmin set BAPassword=?,BAPhone=?,BAEmail=? where BAId=?'
};
 
module.exports = badmin;