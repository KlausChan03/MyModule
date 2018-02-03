var cipher = require("../func/cipher.js");
var config = require("../func/config.js");
var share = require("../ajax/public/share.js");
var logs = require("../func/logs.js");
var pgdb = require("../func/pgdb.js");
var common = require("../func/common.js");
var sqlite = require("../func/sqlite.js");
var public = require("../ajax/admin_control");
var moment = require("moment");

module.exports.run = function(body, pg, mo) {
  let server = config.get("server");
  body.receive = JSON.parse(body.data);

  let [p, f, arr, sql, result] = [{}, {}, [], "", ""];
  f.data = body.receive;
  let menu = config.get("menu");
  menu.forEach(function(item) {
    for (i in item.导航) {
      if (item.导航[i].菜单 != undefined) {
        arr.push({
          菜单: item.导航[i].菜单,
          编号: item.导航[i].表格编号,
          字段: item.导航[i].表格名称,
          按钮: item.导航[i].功能按钮
        });
      }
    }
  });
  f.日期 = moment().format("YYYY-MM-DD");
  f.今天起点 = moment().format("YYYY-MM-DD 00:00:00");
  f.今天终点 = moment().format("YYYY-MM-DD 23:59:59");

  //   sql = `SELECT 活跃时间 FROM ys_设备管理表 WHERE 活跃时间 < '${f.今天终点}' && 活跃时间 > '${f.今天起点}'`;
  sql = `select * from ys_设备管理表 where substring(活跃时间,0,11) = '${f.日期}'`;
  result = pgdb.query(pg, sql);
  p.data = result.数据;
  p.状态 = "成功";
  return p;
};
