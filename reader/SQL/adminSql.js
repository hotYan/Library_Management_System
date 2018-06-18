
//对bookadmin进行增删改查
var admin = {
	/**添加 */
	insert :'INSERT INTO `bookadmin` SET `BAId`=?, `BAName`=? ,`BAPassword`=?,`BAPhone`=?,`BAEmail`=?',
	
	/**修改信息 */
	update : 'UPDATE `bookadmin` SET `BAName`=? ,`BAPhone`=?,`BAEmail`=? WHERE `BAId`=?',
	/**删除 */
	delete: 'DELETE FROM `bookadmin` WHERE `BAId`=?',
	/**精确查看信息 */
	queryById : 'SELECT * FROM `bookadmin` WHERE `BAId`=?',
	/**查看全部信息 */
	queryAll : 'SELECT * FROM `bookadmin` '
};
 
module.exports = admin;