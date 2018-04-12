var cipher = require("../func/cipher.js");
var config = require("../func/config.js");
var share = require("../ajax/public/share.js");
var logs = require("../func/logs.js");
var pgdb = require("../func/pgdb.js");
var common = require("../func/common.js");

var public = require("../ajax/admin_control");


module.exports.run = function(body, pg, mo) {
  //第一步：获取参数
  //定义对象p和f分别用作接收后台和返回前台
  var p = {};
  var f = {};
  p.状态 = "成功";
  var testing = public.all(body);
  if(testing.verify != "当前已登录"){
    p.状态 = testing.verify;
    return p ;
  }

  //前台传参获取表格名称
  body.receive = JSON.parse(body.data);
  f.data = body.receive;
  f.session = body.session;

  p.姓名 = f.session.user_showname;
  p.头像 = f.session.头像;
  p.解锁密码 = f.session.解锁密码;

  return common.removenull(p, body);
};
