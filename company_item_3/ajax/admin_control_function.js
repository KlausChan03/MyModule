var cipher = require("../func/cipher.js");
var config = require("../func/config.js");
var share = require("../ajax/public/share.js");
var logs = require("../func/logs.js");
var pgdb = require("../func/pgdb.js");
var common = require("../func/common.js");
var sqlite = require('../func/sqlite.js');
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
  var db = sqlite.connect();
  //前台传参获取表格名称
  body.receive = JSON.parse(body.data);
  f.data = body.receive;
  f.session = body.session;


  //第三步：控制可用按钮
  var isPower = false;
  sql = "select id,权限 from 管_权限表 where id = '" + f.session.user_pid + "'";
  var power = sqlite.query(db, sql).数据;

  f._权限 = JSON.parse(power[0].权限);
  for (var key in f._权限) {
    console.log(f._权限[key]["字段"],"roger1")
    console.log(f.data,"roger2")
    if (f._权限[key]["字段"] == f.data) {
      //列表页
      if (f._权限[key]["查看"] == "1") {
        if (f._权限[key]["按钮"] != null && f._权限[key]["按钮"] != "") {
          f._按钮权限 = f._权限[key]["按钮"];
        }
        isPower = true;
        break;
      }
    } else {
      console.log("该列表你没有权限操作");
    }
  }


  p.keyPower = f._按钮权限;

  return common.removenull(p);
};
