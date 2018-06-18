//对borrowrecords增删改查
var borrow = {
    /**借书 */
	insert :'INSERT INTO `borrow` SET `UserId`=?,`BookId`=?, `BookName`=? ,`BorrowTime`=?,`ShouldTime`=?,`State`=?',
	borrowList: 'SELECT * FROM `borrow` WHERE `UserId`=? AND `State`=?',
    queryAll : 'SELECT * FROM `borrow` ',
    queryById : 'SELECT * FROM `borrow` WHERE `UserId`=?',
    /**还书 */
    delete: 'DELETE FROM `borrow` WHERE `BookId`=?',//归还图书的同时，删除该书籍的被借记录
    return: 'UPDATE `borrow` SET `State`=? ,`ReturnTime`=? WHERE `BookId`=? AND `UserId`=? ',
};
 
module.exports = borrow;