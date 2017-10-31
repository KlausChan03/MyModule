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
  console.log(body)
  var p = {};
  var f = {};

  // 前台传参获取表格名称
  body.receive = JSON.parse(body.data);
  f.data = body.receive;

  p.状态 = "成功";

   //第一步：获取参数
   f.session = body.session;
   // console.log(body.session)
 
   //第二步：是否存有登陆状态
   if (!f.session.user_name || f.session.user_name == null) {
     f.verify = "当前未登录";
   }else{
     f.verify = "当前已登录"
   }
   if (!f.session.user_pid) {
     p.verify = f.verify;
     return p;
   }



  //第三步：控制可看页面
  var isPower = false;
  sql = "select id,权限 from 管_权限表 where id = '" + f.session.user_pid + "'";
  var power = pgdb.query(pg, sql).数据;
  console.log(power,"111");

  f._权限 = JSON.parse(power[0].权限);
  console.log(f._权限,"222");
  for(var key in f._权限) {
    if(f._权限[key]['字段'] == f.data) { //列表页
      if(f._权限[key]['查看'] == '1') {
        if(f._权限[key]['按钮'] != null && f._权限[key]['按钮'] != '') {
          f._按钮权限 = f._权限[key]['按钮'];
        }
        isPower = true;
        break;
      }
    }else{
      console.log("oh no")
    }
  }

  if (power.length == 0) {
    f._power = "无此权限";
  } else {
    f._权限 = JSON.parse(power[0].权限);
    // console.log(f._权限);
    isPower = true;
    if (!isPower) {
      f._power = "无此权限";
    }
  }

  p.keyPower = f._按钮权限;

  return common.removenull(p, body);
};
