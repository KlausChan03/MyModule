// 创建一个 mysql 连接池
var poolModule = require("generic-pool");
var pool = poolModule.Pool({
  name: "mysql",
  //将建 一个 连接的 handler
  create: function(callback) {
    var Client = require("mysql").Client;
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

// 默认无任务优先级， 但是与高优先级一样，在竞争队列的前列
pool.acquire(function(err, client) {
  pool.release(client);
});

// 高优先级获得链接， 在竞争队列的前列
pool.acquire(function(err, client) {
  pool.release(client);
}, 0);

// 中等优先级获得链接
pool.acquire(function(err, client) {
  pool.release(client);
}, 1);

// pool.acquire(handler, priority) 方法接受连个参数
// handler: 获取连接的回掉函数
// priority: 获取到链接的竞争优先级
// pool.release(client) 方法会将链接放回到连接池当中，当获得的链接没有release的话。将会导致该链接被一直占用
