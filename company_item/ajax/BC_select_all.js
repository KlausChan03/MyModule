var cipher = require("../func/cipher.js");
var config = require("../func/config.js");
var share = require("../ajax/public/share.js");
var logs = require("../func/logs.js");
var pgdb = require("../func/pgdb.js");
var common = require("../func/common.js");
var request = require("../func/request.js");
var txsms = require("../func/txsms.js");
var moment = require("moment");
var sign = require("../func/sign.js");
var transliteration = require("transliteration");
var fs = require("fs");

config.readfile();

module.exports.run = function(body, pg, mo) {
  var p = {};
  body.receive = JSON.parse(body.data);
  // console.log(body.receive)
  var 时间 = moment().format("YYYY-MM-DD HH:mm:ss");
  var 日期 = moment().format("YYYY-MM-DD");
  // var f = body.receive[0];
  var f = {};
  f.data = body.receive[0];
  var b = body.receive[1];
  var menu = config.get("menu");
  var table_name = "";
  var table_id = "";
  var insert_arr = "";
  var update_arr = "";
  menu.forEach(function(item) {
    if (item.导航) {
      for (i in item.导航) {
        // console.log(item.导航[i].表格编号);
        if (item.导航[i].表格编号 == b) {
          table_name = item.导航[i].表格名称;
        }
      }
    }
  });
  console.log(table_name);
  console.log(f);

  var sql = "";

  sql = "select * from " + table_name + " where 1 =1";
  var result = pgdb.query(pg, sql);
  if (result.数据.length == 0) {
    p.状态 = "获取列表异常";
    return p;
  } else {
    f.列表 = result.数据;
    f.条数 = result.数据.length;
  }

  p.状态 = "成功";
  p.列表 = f.列表;
  p.条数 = f.条数;
  return common.removenull(p);
};
