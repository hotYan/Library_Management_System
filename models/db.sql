-- MySQL dump 10.13  Distrib 5.7.22, for osx10.13 (x86_64)
--
-- Host: localhost    Database: hotyan
-- ------------------------------------------------------
-- Server version	5.7.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `UserId` varchar(20) NOT NULL COMMENT '用户ID(学号)',
  `UserName` varchar(100) NOT NULL COMMENT '用户名',
  `Password` varchar(100) NOT NULL COMMENT '密码',
  `RegTime` varchar(20) NOT NULL COMMENT '注册时间',
  PRIMARY KEY (`UserId`) USING BTREE,
  UNIQUE KEY `UserId` (`UserId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('11503090105','邹燕','123456','2018-06-07');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `badmin`
--

DROP TABLE IF EXISTS `badmin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `badmin` (
  `UserId` varchar(20) NOT NULL COMMENT '用户ID(学号)',
  `UserName` varchar(100) NOT NULL COMMENT '用户名',
  `Password` varchar(100) NOT NULL COMMENT '密码',
  `RegTime` varchar(20) NOT NULL COMMENT '注册时间',
  PRIMARY KEY (`UserId`) USING BTREE,
  UNIQUE KEY `UserId` (`UserId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `badmin`
--

LOCK TABLES `badmin` WRITE;
/*!40000 ALTER TABLE `badmin` DISABLE KEYS */;
INSERT INTO `badmin` VALUES ('11','11','164faae15f5a4433518bc899f7d911177dc986c1','2018-06-18'),('11503090105','邹燕','123456','2018-06-07'),('22','22','164faae15f5a4433518bc899f7d911177dc986c1','2018-06-18'),('33','33','164faae15f5a4433518bc899f7d911177dc986c1','2018-06-18'),('99','99','164faae15f5a4433518bc899f7d911177dc986c1','2018-06-18');
/*!40000 ALTER TABLE `badmin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookadmin`
--

DROP TABLE IF EXISTS `bookadmin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookadmin` (
  `BAId` varchar(20) NOT NULL COMMENT '图书管理员ID',
  `BAName` varchar(20) NOT NULL COMMENT '图书管理员名',
  `BAPassword` varchar(100) NOT NULL COMMENT '用户密码',
  `BAPhone` varchar(20) NOT NULL COMMENT '联系电话',
  `BAEmail` varchar(100) DEFAULT NULL COMMENT '邮箱',
  PRIMARY KEY (`BAId`) USING BTREE,
  UNIQUE KEY `BAId` (`BAId`) USING BTREE,
  UNIQUE KEY `BAPhone` (`BAPhone`) USING BTREE,
  UNIQUE KEY `BAEmail` (`BAEmail`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookadmin`
--

LOCK TABLES `bookadmin` WRITE;
/*!40000 ALTER TABLE `bookadmin` DISABLE KEYS */;
INSERT INTO `bookadmin` VALUES ('11','zouyan','164faae15f5a4433518bc899f7d911177dc986c1','17347993725','353223003@qq.com'),('22','hotyan','164faae15f5a4433518bc899f7d911177dc986c1','17347993726','353223006@qq.com'),('33','55','164faae15f5a4433518bc899f7d911177dc986c1','55','55'),('44','44','164faae15f5a4433518bc899f7d911177dc986c1','44','44');
/*!40000 ALTER TABLE `bookadmin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookinfo`
--

DROP TABLE IF EXISTS `bookinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookinfo` (
  `BookId` varchar(20) NOT NULL COMMENT '图书ID',
  `BookName` varchar(100) NOT NULL COMMENT '图书名称',
  `Author` varchar(100) NOT NULL COMMENT '作者',
  `Translator` varchar(100) DEFAULT NULL COMMENT '译者',
  `Price` varchar(20) NOT NULL COMMENT '价格',
  `ISBNCode` varchar(20) NOT NULL COMMENT 'ISBN编码',
  `ComeUpTime` varchar(20) NOT NULL COMMENT '出版日期',
  `PublishCompany` varchar(100) NOT NULL COMMENT '出版社',
  `State` int(11) NOT NULL DEFAULT '1' COMMENT '图书状态\r\n（0借出;1在库）\r\n',
  `EnteringMen` varchar(20) NOT NULL COMMENT '入库者',
  `EnteringDate` varchar(20) NOT NULL COMMENT '入库日期',
  PRIMARY KEY (`BookId`) USING BTREE,
  UNIQUE KEY `BookId` (`BookId`) USING BTREE,
  UNIQUE KEY `ISBNCode` (`ISBNCode`) USING BTREE,
  KEY `State` (`State`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookinfo`
--

LOCK TABLES `bookinfo` WRITE;
/*!40000 ALTER TABLE `bookinfo` DISABLE KEYS */;
INSERT INTO `bookinfo` VALUES ('10','javaEE开发实战','java编写组','somenone','64','201806035','2014-06-03','高级出版社',1,'LvWen','2018-06-03'),('11','eclipse for javaEE','java编写组','somenone','56','201806036','2018-03-03','高级出版社',1,'LvWen','2018-06-03'),('12','java经验总结','MEking','刀三份','45','201806041','2014-06-04','java大航出版社',1,'Zhang','2018-06-04'),('13','论论语','Svinlling gill','风中水','39','201806042','2018-03-04','论语出版社',1,'LvWen','2018-06-04'),('2','eclipse详解','本书编写组','eclipsing','55','201806012','2011-10-01','超级出版社',1,'LvWen','2018-06-01'),('3','java网络编程','ERH','梁饭饭','45.25','201806013','2016-06-01','中国电力出版社',1,'LvWen','2018-06-01'),('4','基于java的开发实战','LINKING BESER','兰卡威','67','201806021','2015-06-02','高等教育出版社',1,'LvWen','2018-06-02'),('44','44','44','44','44','44','2016-1-2','清华大学',1,'44','2018-06-18'),('5','java+jsp+mysql','FULER WILING','卡咔','50','201806022','2013-06-02','高等教育出版社',0,'Zhang','2018-06-02'),('6','与java有关的程序设计','JLSDJFLSF','LASD','45','201806031','2015-06-03','人民出版社',1,'LvWen','2018-06-03'),('7','eleBINGing','司思明',NULL,'25','201806032','2016-06-03','自己家出版社',0,'Zhang','2018-06-03'),('8','alingbING编程','FIling Well','lisy','98.65','201803033','2015-06-03','本书出版社',1,'Zhang','2018-06-03'),('9','java高级编程','Dell FAKE','付四成','65','201806034','2010-05-03','火星出版社',1,'Zhang','2018-06-03');
/*!40000 ALTER TABLE `bookinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `borrow`
--

DROP TABLE IF EXISTS `borrow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `borrow` (
  `UserId` varchar(20) NOT NULL COMMENT '用户ID',
  `BookId` varchar(20) NOT NULL COMMENT '图书ID',
  `BookName` varchar(100) NOT NULL COMMENT '书名',
  `BorrowTime` varchar(20) NOT NULL COMMENT '借书时间',
  `ShouldTime` varchar(20) NOT NULL COMMENT '预还书时间',
  `ReturnTime` varchar(20) DEFAULT NULL COMMENT '实际还书时间',
  `State` int(11) NOT NULL COMMENT '图书状态（0未还;1已还）\r\n'
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrow`
--

LOCK TABLES `borrow` WRITE;
/*!40000 ALTER TABLE `borrow` DISABLE KEYS */;
INSERT INTO `borrow` VALUES ('33','4','基于java的开发实战','2018-06-07','2018-06-27','2018-06-07',1),('33','5','java+jsp+mysql','2018-06-07','2018-06-27','',0),('33','7','eleBINGing','2018-06-07','2018-06-27','',0),('11','1','java基础','2018-06-17','2018-07-17','2018-06-20',1),('11','4','基于java的开发实战','2018-06-17','2018-07-17','2018-06-19',1),('11','5','java+jsp+mysql','2018-06-17','2018-07-17',NULL,0),('11','6','与java有关的程序设计','2018-06-17','2018-07-17',NULL,0),('11','8','alingbING编程','2018-06-17','2018-07-17',NULL,0),('11','7','eleBINGing','2018-06-17','2018-07-17','2018-06-20',1),('11','2','eclipse详解','2018-06-17','2018-07-17',NULL,1),('11','3','java网络编程','2018-06-17','2018-07-17',NULL,1),('11','9','java高级编程','2018-06-17','2018-07-17','2018-06-20',1),('11','1','java基础','2018-06-17','2018-07-17','2018-06-20',1),('11','7','eleBINGing','2018-06-17','2018-07-17','2018-06-20',1),('11','10','javaEE开发实战','2018-06-18','2018-07-18',NULL,0),('11','7','eleBINGing','2018-06-18','2018-07-18','2018-06-20',1),('11','9','java高级编程','2018-06-18','2018-07-18','2018-06-20',1),('11','9','java高级编程','2018-06-18','2018-07-18','2018-06-20',1);
/*!40000 ALTER TABLE `borrow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reader`
--

DROP TABLE IF EXISTS `reader`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reader` (
  `UserId` varchar(20) NOT NULL COMMENT '用户ID(学号)',
  `UserName` varchar(100) NOT NULL COMMENT '用户名',
  `Password` varchar(100) NOT NULL COMMENT '密码',
  `RegTime` varchar(20) NOT NULL COMMENT '注册时间',
  PRIMARY KEY (`UserId`) USING BTREE,
  UNIQUE KEY `UserId` (`UserId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reader`
--

LOCK TABLES `reader` WRITE;
/*!40000 ALTER TABLE `reader` DISABLE KEYS */;
INSERT INTO `reader` VALUES ('11','11','51392d8a54415a90e9484f612101b37a6f99dc33','2018-06-17 18:45'),('11503090105','邹燕','123456','2018-06-07');
/*!40000 ALTER TABLE `reader` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `systemadmin`
--

DROP TABLE IF EXISTS `systemadmin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `systemadmin` (
  `AdId` varchar(20) NOT NULL COMMENT '系统管理员ID',
  `AdName` varchar(20) NOT NULL COMMENT '系统管理员名',
  `AdPassword` varchar(100) NOT NULL COMMENT '密码',
  `AdPhone` varchar(20) NOT NULL COMMENT '电话',
  `AdEmail` varchar(100) DEFAULT NULL COMMENT '邮箱',
  PRIMARY KEY (`AdId`) USING BTREE,
  UNIQUE KEY `AdId` (`AdId`) USING BTREE,
  UNIQUE KEY `AdName` (`AdName`) USING BTREE,
  UNIQUE KEY `AdPhone` (`AdPhone`) USING BTREE,
  UNIQUE KEY `AdEmail` (`AdEmail`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `systemadmin`
--

LOCK TABLES `systemadmin` WRITE;
/*!40000 ALTER TABLE `systemadmin` DISABLE KEYS */;
INSERT INTO `systemadmin` VALUES ('11503090105','邹燕','123456','15823566422','15823566422@qq.com');
/*!40000 ALTER TABLE `systemadmin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userinfo`
--

DROP TABLE IF EXISTS `userinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userinfo` (
  `UserId` varchar(20) NOT NULL COMMENT '用户ID(学号)',
  `UserName` varchar(100) NOT NULL COMMENT '用户名',
  `Password` varchar(100) NOT NULL COMMENT '密码',
  `Departments` varchar(100) NOT NULL COMMENT '院系',
  `Major` varchar(100) NOT NULL COMMENT '专业',
  `Phone` varchar(20) NOT NULL COMMENT '电话',
  `Email` varchar(100) DEFAULT NULL COMMENT '邮箱',
  `Max` int(11) NOT NULL DEFAULT '10' COMMENT '可借最大数量',
  `Time` int(11) NOT NULL DEFAULT '30' COMMENT '可借期限',
  `LendedNum` int(11) NOT NULL DEFAULT '0' COMMENT '在借数量',
  `RegTime` varchar(20) NOT NULL COMMENT '注册时间',
  PRIMARY KEY (`UserId`) USING BTREE,
  UNIQUE KEY `UserId` (`UserId`) USING BTREE,
  UNIQUE KEY `Phone` (`Phone`) USING BTREE,
  UNIQUE KEY `Email` (`Email`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userinfo`
--

LOCK TABLES `userinfo` WRITE;
/*!40000 ALTER TABLE `userinfo` DISABLE KEYS */;
INSERT INTO `userinfo` VALUES ('11','邹燕','164faae15f5a4433518bc899f7d911177dc986c1','chongqing','网络工程','11','11',10,30,0,'2018-06-18'),('11503090105','邹燕','123456','计算机科学与工程学院','网络工程','15823566422','2312002833@qq.com',10,30,0,'2018-06-07'),('2','Zhang','zhang','计算机学院','计算机科学与技术','18996315804','1312002832@qq.com',20,30,0,'2018-06-07'),('22','hotYan','164faae15f5a4433518bc899f7d911177dc986c1','计算机','网络工程','15823466423','15823566423@163.com',10,30,0,'2018-06-18'),('3','Test3','test','计算机学院','网工','15823566423','1312002831@qq.com',10,30,0,'2018-06-07');
/*!40000 ALTER TABLE `userinfo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-24 15:08:59
