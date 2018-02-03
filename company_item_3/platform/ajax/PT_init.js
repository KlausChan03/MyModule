var cipher = require("../func/cipher.js");
var config = require("../func/config.js");
var share = require("../ajax/public/share.js");
var logs = require("../func/logs.js");
var pgdb = require("../func/pgdb.js");
var mysql = require("../func/mysql.js");
var common = require("../func/common.js");
var request = require("../func/request.js");
var fs = require("fs");

module.exports.run = function(body,pg,mysql) {
  var p = {},
    f = {},
    t = {};
  var menu = config.get("menu");
  var update_arr, update_str;
  console.log(mysql)

  body.receive = JSON.parse(body.data);
  console.log(body.receive)
  sql = "select * from 分_分公司表  where 1 = 1"
  var result = mysql.query(mysql, sql);
  console.log(result)
  p.数据 = result.数据;
  p.状态 = "成功";

  console.log(p);
  return p;
};
