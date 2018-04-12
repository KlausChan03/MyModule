var mysql = require("mysql");
var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "roger"
});
var query = function(sql, callback) {
  var result = {};
  pool.getConnection(function(err, conn) {
    if (err) {
      callback(err, null, null);
    } else {
      conn.query(sql, function(qerr, vals, fields) {
        //释放连接
        result.数据 = vals.rows;
        console.log(result.数据,"Lll");
        conn.release();
        //事件驱动回调
        callback(qerr, vals, fields);
      });
    }
  });
  return result;
};

module.exports = query;
