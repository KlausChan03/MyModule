var Fiber = require("fibers");
var mysql_ = require("mysql");
var config = require("./config.js");
var logs = require("./logs.js");
var poolModule = require("generic-pool");
console.log(require("mysql"));

var mydb = {};

// 创建一个 mysql 连接池
mydb.pool = poolModule.Pool({
  name: "mysql",
  //将建 一个 连接的 handler
  create: function(callback) {
    var conf = config.get("app");

    var Client = require("mysql").createPool();
    var c = new Client();
    c.user = "root";
    c.password = "123456";
    c.database = "roger";
    c.connect();
    callback(null, c);
  },
  // 释放一个连接的 handler
  destroy: function(client) {
    client.end();
  },
  // 连接池中最大连接数量
  max: 10,
  // 连接池中最少连接数量
  min: 2,
  // 如果一个线程3秒钟内没有被使用过的话。那么就释放
  idleTimeoutMillis: 30000,
  // 如果 设置为 true 的话，就是使用 console.log 打印入职，当然你可以传递一个 function 最为作为日志记录handler
  log: true
});

mydb.open = function(cb) {
  mydb.pool.acquire(function(err, db) {
    cb(err, db);
  });
};

mydb.close = function(client) {
  mydb.pool.release(client);
};

mydb.start = function(client) {
  client.query("BEGIN;");
};

mydb.end = function(client) {
  client.query("COMMIT;");
};

mydb.query = function(client, sql) {
  var result = {};
  var fiber = Fiber.current;
  client.query(sql, function(err, resultdata) {
    // console.log(err);
    // console.log(result);
    if (err) {
      result.状态 = "失败";
      result.信息 = err.stack;
      result.执行语句 = sql;
      console.log(":" + sql + "执行错误:" + err.stack);
      logs.write("sql", "错误语句:" + sql + "错误信息:" + err.stack);
      fiber.run();
    } else {
      result.状态 = "成功";
      if (resultdata.command == "SELECT") {
        result.数据 = resultdata.rows;
      } else if (resultdata.command == "INSERT") {
        result.影响行数 = resultdata.rowCount;
      } else if (resultdata.command == "DELETE") {
        result.影响行数 = resultdata.rowCount;
      } else if (resultdata.command == "UPDATE") {
        result.影响行数 = resultdata.rowCount;
      }
      result.执行语句 = sql;
      fiber.run();
    }
  });

  Fiber.yield();

  return result;
};

module.exports = mydb;
