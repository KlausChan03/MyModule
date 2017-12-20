/*
内容:启动页（初始化数据）
开发人:谢敏 
开发时间：2017年12月2日 14:09:58
*/

var cipher = require("../func/cipher.js");
var config = require("../func/config.js");
var logs = require("../func/logs.js");
var mongo = require("../func/mongo.js");
var pgdb = require("../func/pgdb.js");
var mysql = require("../func/mysql.js");
var common = require("../func/common.js");
var request = require("../func/request.js");
var moment = require("moment");
var fs = require("fs");
var uuid = require("uuid");
var redisdb = require("../func/redisdb.js");

module.exports.run = function(body,pg,mysql) {
  var p = {},
    f = {},
    t = {};
  var menu = config.get("menu");
  var update_arr, update_str;
  console.log(body);
  console.log(body.arg, "lll");
  body.receive = body.arg;

  console.log(mysql)

  sql = "select * from 全_首页信息表  where 1 = 1"
  var result = mysql.query(mysql, sql);
  console.log(result)
  p.数据 = result.数据;
  p.状态 = "成功";
  t._isRander = p;
  console.log(t);
  return t;
};
