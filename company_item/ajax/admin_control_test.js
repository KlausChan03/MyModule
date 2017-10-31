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
  var f = {};

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
  // console.log(power,"111");

  f._权限 = JSON.parse(power[0].权限);
  // console.log(f._权限,"222");
  for(var key in f._权限) {
    // if(f._权限[key]['字段'] == f._n) { //列表页
      if(f._权限[key]['查看'] == '1') {
        if(f._权限[key]['按钮'] != null && f._权限[key]['按钮'] != '') {
          f._按钮权限 = f._权限[key]['按钮'];
          // console.log(f._按钮权限,"333");
        }
        isPower = true;
        break;
      }
    // }
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

  //第三步：权限分配

  var menu = config.get("menu");
  // 菜单（一级）
  var listMenu = [];
  // 导航（二级）
  var listNav = [];
  // 展示列表
  var listMenuShow = [];
  // 权限列表
  var listPower = [];


  for (var key in f._权限) {
    if (f._权限[key]["查看"] == "1") {
      listPower[f._权限[key]["字段"]] = "1";
    }
  }
  // console.log(listPower);
  menu.forEach(function(item) {
    if (item.菜单) {
      item.菜单.forEach(function(name) {
        listNav[name.名称] = new Array();
        listMenu.push(name);
      });
    }

    if (item.导航) {
      item.导航.forEach(function(name) {
        if (listNav[name.菜单] && listPower[name.func]) {
          listNav[name.菜单].push(name);
        }
      });
    }
  });

  listMenu.forEach(function(name) {
    if (listNav[name.名称].length > 0) listMenuShow.push(name);
  });

  var list_ = [];
  for (i in listNav){
    for (j in listNav[i]){
        list_.push({[i]:listNav[i][j]})
    }
  }
  p.user = f.session.user_name;
  p.头像=f.session.头像;
  p.verify = f.verify;
  p.listMenu = listMenuShow;
  p.listNav = list_;

  //用户姓名，解锁密码
  sql = "select id,姓名,密码,权限组,权限id,随机码,状态,解锁密码 from 管_管理员表 where 登录名 = '" + f.session.user_name + "' ";
  var result = pgdb.query(pg, sql);
  
  if (result.数据.length == 0) {
    p.状态 = "获取数据异常";
    return p;
  } else {
    f.姓名 = result.数据[0].姓名;
    f.解锁密码 = result.数据[0].解锁密码;
  }
  p.状态 = "成功";
  p.姓名 = f.姓名;
  p.解锁密码 = f.解锁密码;

  return common.removenull(p, body);
};
