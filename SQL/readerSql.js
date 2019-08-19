
//对userinfo进行增删改查
var reader = {
	/**添加读者 */
	insert :'INSERT INTO `userinfo` SET `UserId`=?, `UserName`=? ,`Password`=?,`Departments`=?,`Major`=?,`Phone`=?,`Email`=?,`Max`=?,`Time`=?, `RegTime`=?',
	
	/**修改读者信息 */
	update : 'UPDATE `userinfo` SET `UserName`=? ,`Departments`=?,`Major`=?,`Phone`=?,`Email`=?,`Max`=?,`Time`=? WHERE `UserId`=?',
	/**删除读者 */
	delete: 'DELETE FROM `userinfo` WHERE `UserId`=?',
	/**精确查看读者信息 */
	queryById : 'SELECT * FROM `userinfo` WHERE `UserId`=?',
	/**查看全部读者信息 */
	queryAll : 'SELECT * FROM `userinfo` ',
	/**精确查看读者信息 */
	querydate: 'UPDATE `userinfo` SET `Phone`=?, `Email`=? WHERE `UserId`=?',
	// querydate:'SELECT `userinfo`.*,  FROM `userinfo`, `borrow` WHERE `userinfo`.`UserId`=`borrow`.`id`'
};
 
module.exports = reader;