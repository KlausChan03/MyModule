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

var sqlite = require("../func/sqlite.js");
var public = require("../ajax/admin_control");

module.exports.run = function(body, pg, mo) {
  var server = config.get("server");
  body.receive = JSON.parse(body.data);

  var p = {};
  var f = {};
  var sql = "";
  var result = "";
  f.状态 = "成功";

  // 初始化部分参数
  f.data = body.receive;
  f.session = body.session;

  console.log(body.data);
  var 时间 = moment().format("YYYY-MM-DD HH:mm:ss");
  var 日期 = moment().format("YYYY-MM-DD");

  

  var db = sqlite.connect();
  

  // 验证前台参数
  if (f.data.旧密码== "" || f.data.旧密码 == null) {
    f.状态 = "请填写旧密码";
    return p;
  } else if (f.data.新密码 == "" || f.data.新密码 == null) {
    f.状态 = "请填写新密码";
    p.状态 = f.状态;
    return p;
  }

  sql = "select id,密码,随机码 from 管_管理员表 where 登录名 = '" +f.session.user_name +"' ";
  result = sqlite.query(db, sql);


  if(result.数据[0].密码 != cipher.md5(result.数据[0].随机码 + f.data.旧密码)){
    console.log(result.数据[0].密码)
    console.log(cipher.md5(result.数据[0].随机码 + f.data.旧密码))
    f.状态 = "旧密码错误";
  }else{
    f.新密码 = cipher.md5(result.数据[0].随机码 + f.data.新密码);
    sql = "update 管_管理员表 set 密码=  '" + f.新密码 + "'  where 登录名 = '" +f.session.user_name +"' ";
    result = sqlite.query(db, sql);
  }

  sqlite.close(db);

  p.状态 = f.状态;

  return common.removenull(p);
};
