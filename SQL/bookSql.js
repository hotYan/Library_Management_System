//对bookinfo进行增删改查
var book = {
	insert :'INSERT INTO `bookinfo` SET `BookId`=?, `BookName`=? ,`Author`=?,`Translator`=?,`Price`=?,`ISBNCode`=?,`PublishCompany`=?,`ComeUpTime`=?,`EnteringDate`=?,`EnteringMen`=?,`State`=? ',
	update : 'UPDATE `bookinfo` SET `BookName`=? ,`Author`=?,`Translator`=?,`Price`=?,`ISBNCode`=?,`PublishCompany`=?,`ComeUpTime`=?,`State`=? ,`EnteringMen`=?,`EnteringDate`=? WHERE `BookId`=?',
	delete: 'DELETE FROM `bookinfo` WHERE `BookId`=?',
	queryById : 'SELECT * FROM `bookinfo` WHERE `BookId`=?',
	queryBookName : 'SELECT `BookName` FROM `bookinfo` WHERE `BookId`=?',
	queryAll : 'SELECT * FROM `bookinfo` ',
	file:'LOAD DATA LOCAL INFILE ? INTO TABLE bookinfo',
	files:'load data local infile ? into TABLE bookinfo '
};
 
module.exports = book;