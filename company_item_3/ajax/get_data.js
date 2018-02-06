var cipher = require("../func/cipher.js");
var config = require("../func/config.js");
var share = require("../ajax/public/share.js");
var logs = require("../func/logs.js");
var pgdb = require("../func/pgdb.js");
var common = require("../func/common.js");
var sqlite = require("../func/sqlite.js");
var public = require("../ajax/admin_control");
var moment = require("moment");

module.exports.run = function(body, pg, mo) {
  let server = config.get("server");
  body.receive = JSON.parse(body.data);

  let [p, f, arr, sql, result] = [{}, {}, [], "", ""];
  f.data = body.receive;
  let menu = config.get("menu");
  menu.forEach(function(item) {
    for (i in item.导航) {
      if (item.导航[i].菜单 != undefined) {
        arr.push({
          菜单: item.导航[i].菜单,
          编号: item.导航[i].表格编号,
          字段: item.导航[i].表格名称,
          按钮: item.导航[i].功能按钮
        });
      }
    }
  });

  f.today = moment().format("YYYY-MM-DD");
  f.week_begin = moment().day(0).format('YYYY-MM-DD');
  f.week_end = moment().day(7).format('YYYY-MM-DD');  
  f.month_begin = moment().startOf('month').format('YYYY-MM-DD');  
  f.month_end = moment().endOf('month').format('YYYY-MM-DD');  

  // 获取本日的登陆数据
  sql = `select * from ys_设备管理表 where substring(活跃时间,0,11) = '${f.today}'`;
  result = pgdb.query(pg, sql);
  p.login_t = result.数据;

  // 获取本周的登陆数据 
  sql = `select * from ys_设备管理表 where substring(活跃时间,0,11) > '${f.week_begin}' and substring(活跃时间,0,11) < '${f.week_end}'`;
  result = pgdb.query(pg, sql);
  p.login_w = result.数据;  

  // 获取本月的登陆数据
  sql = `select * from ys_设备管理表 where substring(活跃时间,0,11) > '${f.month_begin}' and substring(活跃时间,0,11) < '${f.month_end}'`;
  result = pgdb.query(pg, sql);
  p.login_m = result.数据;


   // 获取本日的注册数据
   sql = `select * from ys_会员表 where substring(录入时间,0,11) = '${f.today}'`;
   result = pgdb.query(pg, sql);
   p.register_t = result.数据;
 
   // 获取本周的注册数据
   sql = `select * from ys_会员表 where substring(录入时间,0,11) > '${f.week_begin}' and substring(录入时间,0,11) < '${f.week_end}'`;
   result = pgdb.query(pg, sql);
   p.register_w = result.数据;  
 
   // 获取本月的注册数据
   sql = `select * from ys_会员表 where substring(录入时间,0,11) > '${f.month_begin}' and substring(录入时间,0,11) < '${f.month_end}'`;
   result = pgdb.query(pg, sql);
   p.register_m = result.数据;


   // 获取本日的发布数据
   sql = `select * from ys_发布信息表 where substring(录入时间,0,11) = '${f.today}'`;
   result = pgdb.query(pg, sql);
   p.publish_t = result.数据;
 
   // 获取本周的发布数据
   sql = `select * from ys_发布信息表 where substring(录入时间,0,11) > '${f.week_begin}' and substring(录入时间,0,11) < '${f.week_end}'`;
   result = pgdb.query(pg, sql);
   p.publish_w = result.数据;  
 
   // 获取本月的发布数据
   sql = `select * from ys_发布信息表 where substring(录入时间,0,11) > '${f.month_begin}' and substring(录入时间,0,11) < '${f.month_end}'`;
   result = pgdb.query(pg, sql);
   p.publish_m = result.数据;


  //  获取发布类型比重
  sql = `select 类别 from ys_发布信息表 where 状态 = '正常'`
  result = pgdb.query(pg, sql);
  p.publish_arr = {};
  [p.publish_arr.图文,p.publish_arr.视频,p.publish_arr.直播,p.publish_arr.其他] = [[],[],[],[]]
  for (let i in result.数据){
    if(result.数据[i].类别 == "图文"){
      p.publish_arr.图文.push(result.数据[i].类别)
    }else if(result.数据[i].类别 == "视频"){
      p.publish_arr.视频.push(result.数据[i].类别)
    }else if(result.数据[i].类别 == "直播"){
      p.publish_arr.直播.push(result.数据[i].类别)
    }else{
      p.publish_arr.其他.push(result.数据[i].类别)      
    }      
  }

  p.data = [p.login_t,p.login_w,p.login_m,p.register_t,p.register_w,p.register_m,p.publish_t,p.publish_w,p.publish_m,p.publish_arr];
  p.状态 = "成功";
  return p;
};
