var cipher = require("../func/cipher.js");
var config = require("../func/config.js");
var share = require("../ajax/public/share.js");
var logs = require("../func/logs.js");
var pgdb = require("../func/pgdb.js");
var common = require("../func/common.js");
var sqlite = require("../func/sqlite.js");
var public = require("../ajax/admin_control");

module.exports.run = function(body, pg, mo) {
  var p = {};
  var f = {};
  body.receive = JSON.parse(body.data);
  f.check = body.receive[0];
  f.id = body.receive[1];
  console.log(f.check)
  var menu = config.get("menu");
  var update_arr = [];
  menu.forEach(function(item,index) {
    if(item.导航) {
			for(i in item.导航) {
				if(item.导航[i].表格编号 == f.check) {
          update_arr = item.导航[i].修改语句;
          table_name = item.导航[i].表格名称;
          table_check = item.导航[i].菜单;
          f.tb_name = table_name;
				}
			}
		}
  });
  if(table_check == "系统"){
    var db = sqlite.connect();
    sql = "select * from " + f.tb_name + " where id =" + f.id  ;
    var result = sqlite.query(db, sql);
    p.字段 = update_arr;
    p.数据 = result.数据;
    p.状态 = "成功";
    console.log(p)
    sqlite.close(db);
  }else{
    sql = "select * from " + f.tb_name + " where id =" + f.id  ;
    var result = pgdb.query(pg, sql);
    p.字段 = update_arr;
    p.数据 = result.数据;
    p.状态 = "成功";
  }
  

  return common.removenull(p);
};
