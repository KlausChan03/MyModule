var cipher = require("../func/cipher.js");
var config = require("../func/config.js");
var share = require("../ajax/public/share.js");
var logs = require("../func/logs.js");
var pgdb = require("../func/pgdb.js");
var common = require("../func/common.js");
var request = require("../func/request.js");
var moment = require("moment");
var fs = require("fs");
var mysql = require("../func/mysql.js");

console.log(mysql)

config.readfile();

module.exports.run = function(body, pg, mo, redis, mysql) {

  var f ={};
  var p ={};
  var sql = "";

  f.data = body.data;
  
  // sql = "insert into 全_首页信息表 (备注) values ('"+f.data+"') where id = '3'";
  sql = "select 备注 from 全_首页信息表  where id = '5'"
  var result = mysql.query(mysql,sql,sqlData);
  console.log(result)
  p.数据 = result.数据[0].备注;
  p.状态 = "成功";
  return common.removenull(p);
};
