/**
创建人：马瑞刚
创建时间：2017年10月30日 11:41:28
创建内容：获取用户姓名及解锁密码
 */

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

module.exports.run = function(body, pg, mo) {
  var server = config.get("server");
  var p = {};
  var f = {};

  //获取参数
  f.session = body.session;
  var sql = "";
  var 时间 = moment().format("YYYY-MM-DD HH:mm:ss");
  var 日期 = moment().format("YYYY-MM-DD");
  
  sql = "select id,姓名,密码,权限组,权限id,随机码,状态,解锁密码 from 管_管理员表 where 登录名 = '" + f.session.user_name + "' ";
  var result = pgdb.query(pg, sql);
  if (result.数据.length == 0) {
    p.状态 = "获取数据异常";
    return p;
  } else {
    f.姓名 = result.数据[0].姓名;
    f.解锁密码 = result.数据[0].解锁密码;
  }

  p.状态 = "成功";
  // p.姓名 = f.姓名;
  // p.解锁密码 = f.解锁密码;

  window.sessionStorage.setItem("name",f.姓名);
  window.sessionStorage.setItem("password",f.解锁密码);
  
  return common.removenull(p,body);
};
