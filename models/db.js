var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'chen842611165',
    database: 'hotyan'
});


module.exports = pool;  