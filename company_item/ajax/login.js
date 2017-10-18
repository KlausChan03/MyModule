/**
创建人：秦功科
创建时间：2017年5月9日16:58:39
创建内容：根据编号搜索分公司名称
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
  body.receive = JSON.parse(body.data);
  console.log(body.receive);
  var f = body.receive;
  var sql = "";
  var 时间 = moment().format("YYYY-MM-DD HH:mm:ss");
  var 日期 = moment().format("YYYY-MM-DD");

  sql = "select id,密码,权限组,权限id,随机码,状态 from 管_管理员表 where 登录名 = '" + f.用户名 + "' ";
  var result = pgdb.query(pg, sql);
  console.log(result);
  // console.log("111",cipher.md5(result.数据[0].随机码 + f.密码));

  if (result.数据.length == 0) {
    f._状态 = "账号不存在";
  } else if (result.数据[0].状态 != "正常") {
    f._状态 = "账号已停用";
  } else if (result.数据[0].密码 != cipher.md5(result.数据[0].随机码 + f.密码)) {
    f._状态 = "密码错误";
  } else {
    f._状态 = "成功";
  }
  //  else if (s.数据[0].权限id == "0") {
  //    f._状态 ="无设置权限";
  // }
  p.状态 = f._状态;
  return common.removenull(p);
};
