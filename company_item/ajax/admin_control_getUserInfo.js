var cipher = require("../func/cipher.js");
var config = require("../func/config.js");
var share = require("../ajax/public/share.js");
var logs = require("../func/logs.js");
var pgdb = require("../func/pgdb.js");
var common = require("../func/common.js");
var moment = require("moment");
var fs = require("fs");
var control = require("../ajax/admin_control_main");

module.exports.run = function(f, pg, mo) {
  //第一步：获取参数
  //定义对象p和f分别用作接收后台和返回前台
  var p = {};
  f = control.index(f);  
  p.状态 = "成功";

  //前台传参获取表格名称

  p.姓名 = f.session.user_showname;
  p.头像 = f.session.头像;
  p.解锁密码 = f.session.解锁密码;

  return common.removenull(p, body);
};
