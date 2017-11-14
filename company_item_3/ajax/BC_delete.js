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
  var p = {};
  var f = {};

  body.receive = JSON.parse(body.data);
  var 时间 = moment().format("YYYY-MM-DD HH:mm:ss");
  var 日期 = moment().format("YYYY-MM-DD");
  f.data = body.receive[0];
  f.check = body.receive[1];

  if (f.data.id.length > 1) {
    f.type = "more";
  } else {
    f.type = "one";
  }
  var menu = config.get("menu");
  var table_name = "";
  var table_id = "";
  var sql = "";

  menu.forEach(function(item) {
    if (item.导航) {
      for (i in item.导航) {
        if (item.导航[i].表格编号 == f.check) {
          table_name = item.导航[i].表格名称;
        }
      }
    }
  });

  if (f.type == "one") {
    sql = "delete from " + table_name + " where id =" + f.data.id;
  } else {
    sql = "delete from " + table_name + " where id in (" + f.data.id + ")";
  }
  var result = pgdb.query(pg, sql);

  p.状态 = "成功";
  return common.removenull(p);
};
