var cipher = require("../func/cipher.js");
var config = require("../func/config.js");
var share = require("../ajax/public/share.js");
var logs = require("../func/logs.js");
var pgdb = require("../func/pgdb.js");
var common = require("../func/common.js");
var request = require("../func/request.js");
var moment = require("moment");
var fs = require("fs");

// var txsms = require("../func/txsms.js");


config.readfile();

module.exports.run = function(body, pg, mo) {

  var f ={};
  var p ={};
  var sql = "";
  console.log(body.data)
  // body.receive = JSON.parse(body.data);  
  f.data = body.data;
  
  console.log(f.data)
  
  // sql = "insert into 全_首页信息表 (备注) values ('"+f.data+"') where id = '3'";
  sql = "select 备注 from 全_首页信息表  where id = '5'"
  var result = pgdb.query(pg, sql);
  console.log(result)
  p.数据 = result.数据[0].备注;
  p.状态 = "成功";
  return common.removenull(p);
};
