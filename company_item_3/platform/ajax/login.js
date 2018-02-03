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

var sqlite = require('../func/sqlite.js');

module.exports.run = function(body, pg, mo) {
  var server = config.get("server");
  body.receive = JSON.parse(body.data);

  var p = {};
  var f = {};

  // 初始化部分参数
  f.data = body.receive;
  f._状态 = "成功";

  var db = sqlite.connect();

  var sql = "";
  var 时间 = moment().format("YYYY-MM-DD HH:mm:ss");
  var 日期 = moment().format("YYYY-MM-DD");

  // 验证前台参数
  if (f.data.用户名 == "" || f.data.用户名 == null) {
    f._状态 = "请填写登录名";
  } else if (f.data.密码 == "" || f.data.密码 == null) {
    f._状态 = "请填写密码";
  }
  
  sql ="select id,姓名,密码,权限组,权限id,随机码,状态,头像,解锁密码  from 管_管理员表 where 登录名 = '" +f.data.用户名 +"' ";
  var result_login = sqlite.query(db, sql);

  // 验证登陆信息
  if (result_login.数据.length == 0) {
    f._状态 = "账号不存在";
  } else if (result_login.数据[0].状态 != "正常") {
    f._状态 = "账号已停用";
  } else if ( result_login.数据[0].密码 != cipher.md5(result_login.数据[0].随机码 + f.data.密码)) {
    f._状态 = "密码错误";
  }
  if (f._状态 != "成功") {
    p.状态 = f._状态;
    return common.removenull(p);
  }

  // 权限查询
  sql = "select id from 管_权限表 where id = '" + result_login.数据[0].权限id + "' ";
  var result_power = sqlite.query(db, sql);
  if (result_power.数据.length == 0) {
    f._状态 = "权限异常";
  }
  if (f._状态 != "成功") {
    p.状态 = f._状态;
    return common.removenull(p);
  } else {
    p.状态 = f._状态;
    body.session.user_name = f.data.用户名;
    body.session.user_showname = result_login.数据[0].姓名;
    body.session.头像 = result_login.数据[0].头像;
    body.session.解锁密码 = result_login.数据[0].解锁密码;
    body.session.user_id = result_login.数据[0].id;
    body.session.user_pid = result_power.数据[0].id;
  }
  return common.removenull(p, body);
};


