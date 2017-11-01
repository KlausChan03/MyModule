var cipher = require("../func/cipher.js");
var config = require("../func/config.js");
var share = require("../ajax/public/share.js");
var logs = require("../func/logs.js");
var pgdb = require("../func/pgdb.js");
var fs = require("fs");

exports.index = function(f) {
  //第一步：获取参数
  //定义对象p和f分别用作接收后台和返回前台
  var p = {};
  var f = {};
  p.状态 = "成功";

  //前台传参获取表格名称
  // body.receive = JSON.parse(body.data);
  // f.data = body.receive;
  // f.session = body.session;

  //第二步：是否存有登陆状态
  if (!f.session.user_name || f.session.user_name == null) {
    f.verify = "当前未登录";
  } else {
    f.verify = "当前已登录";
  }
  if (!f.session.user_pid) {
    f.verify = f.verify;
    return f;
  }

  return f;
};
