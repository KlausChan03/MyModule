var cipher = require("../func/cipher.js");
var config = require("../func/config.js");
var share = require("../ajax/public/share.js");
var logs = require("../func/logs.js");
var pgdb = require("../func/pgdb.js");
var common = require("../func/common.js");
var sqlite = require("../func/sqlite.js");
var public = require("../ajax/admin_control");

module.exports.run = function(body, pg, mo) {
  var server = config.get("server");
  var p = {};
  body.receive = JSON.parse(body.data);
  var f = body.receive;
  var sql = "";

  var db = sqlite.connect();

  sql = "select * from 管_管理员表 where 1 =1";

  var result = sqlite.query(db, sql);
  console.log(result)
  
  if (result.数据.length == 0) {
    p.状态 = "获取列表异常";
    return p;
  } else {
    f.列表 = result.数据;
    f.条数 = result.数据.length;
  }

  p.状态 = "成功";
  p.表格名称 = "管_管理员表";
  p.列表 = f.列表;
  p.条数 = f.条数;


  sqlite.close(db);

  return common.removenull(p);
};
