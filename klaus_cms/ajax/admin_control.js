var cipher = require("../func/cipher.js");
var config = require("../func/config.js");
var share = require("../ajax/public/share.js");
var logs = require("../func/logs.js");
// var pgdb = require("../func/pgdb.js");

var sqlite = require("../func/sqlite.js");
var public = {};

public.all = function(body) {
  //第一步：获取参数
  var f = {};
  f.session = body.session;

  //第二步：是否存有登陆状态
  if (!f.session.user_name || f.session.user_name == null) {
    f.verify = "当前未登录";
  } else {
    f.verify = "当前已登录";
  }

  return f;
};

module.exports = public;
