var cipher = require("../func/cipher.js");
var config = require("../func/config.js");
var share = require("../ajax/public/share.js");
var logs = require("../func/logs.js");
var pgdb = require("../func/pgdb.js");
var common = require("../func/common.js");
var moment = require("moment");
var fs = require("fs");
var server = config.get("server");
var control = require("../ajax/admin_control_main");


module.exports.run = function(f, pg, mo) {
  // 定义对象p和f分别用作接收后台和返回前台
  f = control.index(f);  
  var p = {};
  p.状态 = "成功";


  //第三步：控制可用按钮
  var isPower = false;
  sql = "select id,权限 from 管_权限表 where id = '" + f.session.user_pid + "'";
  var power = pgdb.query(pg, sql).数据;

  f._权限 = JSON.parse(power[0].权限);
  for (var key in f._权限) {
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
      console.log("oh no");
    }
  }


  p.keyPower = f._按钮权限;

  return common.removenull(p, body);
};
