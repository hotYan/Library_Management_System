# 图书管理系统
## Express+EJS+MySQL
### Introduction
1. [图书管理系统一](https://hotkang.cn/2018/06/11/%E5%9B%BE%E4%B9%A6%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%E4%B8%80/)
2. [图书管理系统二](https://hotkang.cn/2018/06/11/%E5%9B%BE%E4%B9%A6%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%E4%BA%8C/)
3. [图书管理系统三](https://hotkang.cn/2018/06/11/%E5%9B%BE%E4%B9%A6%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%E4%B8%89/)
4. [图书管理系统四](https://hotkang.cn/2018/06/19/%E5%9B%BE%E4%B9%A6%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%E5%9B%9B/)


### How to use

1. node运行环境

2. clone后进入项目根目录

3. 安装项目依赖

        $ npm install 

4. 启动项目

        $ npm run start

5. 连接数据库，创建数据库

        //连接
        $ mysql.server start
        $ mysql -u root -p
        //创建数据库
        >SHOW DATABASES;  //查看
        >CREATE DATABASE database_name; //新建
        >USE database_name;     //切换数据库
        ----补充----
        //重启
        $ mysql.server restart
        //退出
        mysql> exit
        $ mysql.server stop




6. 配置models/db.js文件

        var pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'XXXXXX',//链接数据库密码
            database: 'teries'
        });

7. 将model/db.sql导入新建数据库

        >source  db.sql的路径       //Mac可直接拖文件
        >SHOW TABLES;   //查看表


8. 访问localhost://3000

<br/>
<br/>

## Vue+Express+MySQL

<br/>
<br/>


## Vue+Laravel+MySQL

