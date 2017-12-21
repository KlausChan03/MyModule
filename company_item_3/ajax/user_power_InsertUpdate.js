let cipher = require("../func/cipher.js");
let config = require("../func/config.js");
let share = require("../ajax/public/share.js");
let logs = require("../func/logs.js");
let pgdb = require("../func/pgdb.js");
let common = require("../func/common.js");
let request = require("../func/request.js");
let moment = require("moment");
let fs = require("fs");
let sqlite = require("../func/sqlite.js");

// let txsms = require("../func/txsms.js");

config.readfile();

module.exports.run = function(body, pg, mo) {
  let p = {};

  body.receive = JSON.parse(body.data);
  let 时间 = moment().format("YYYY-MM-DD HH:mm:ss");
  let 日期 = moment().format("YYYY-MM-DD");
  let f = {};

  f.data = body.receive[0];
  if (f.data.内容) {
    f.data.内容 = decodeURIComponent(f.data.内容);
  }
  f.check = body.receive[1];
  console.log(body.receive,"ab")
  let menu = config.get("menu");
  let table_name = "";
  let table_id = "";
  let insert_arr = "";
  let update_arr = "";
  let button_arr_ = "";
  let button_init = [];
  menu.forEach(function(item) {
    if (item.通用按钮){
      button_init = item.通用按钮;
    }
    if (item.导航) {
      for (i in item.导航) {
        if (item.导航[i].表格编号 == f.check) {
          table_type = item.导航[i].菜单;
          table_name = item.导航[i].表格名称;
          insert_arr = item.导航[i].增加语句;
          update_arr = item.导航[i].修改语句;
          button_arr_ = item.导航[i].功能按钮;
        }
      }
    }
  });


    let power_ls = f.data;
    let all_arr = [];
    let check_arr = [];
    let button_arr = [];
    for (let i in power_ls) {
      if (i.indexOf("字段") != -1) {
        all_arr.push(i);
      }
      if (i.indexOf("查看") != -1) {
        check_arr.push(i);
      }
      if (i.indexOf("按钮") != -1) {
        button_arr.push(i);
      }
    }

    let a = {};
    all_arr.forEach(function(item, key) {
      item = item.replace("字段_", "");
      a[key] = {};
      a[key]["字段"] = item;      
      a[key]["查看"] = check_null(f, "查看", item);
      a[key]['按钮'] = button_null(f, '按钮', item);

      if(typeof(a[key]['按钮']) != 'object' && a[key]['按钮'] != '') {
        a[key]['按钮'][0] = a[key]['按钮'];
      }
    });

    function check_null(f, type, name) {
      let r = "0";
      if (eval("f.data." + type + "_" + name) == null) r = "0";
      else r = "1";
      return r;
    }

    function button_null(f, type, name) {
      let r = [];
     
      // if (eval("f.data." + type + "_" + name + "_编辑") == null)  r.push("0");
      // else r.push("编辑");
      // if (eval("f.data." + type + "_" + name + "_删除") == null)  r.push("0");
      // else r.push("删除");
      // if (eval("f.data." + type + "_" + name + "_批量删除") == null)  r.push("0");
      // else r.push("批量删除");
      
      for(let i in button_init){     
        if (eval("f.data." + type + "_" + name + "_" + button_init[i]) == null) r.push("0");
        else r.push(button_init[i]);
      }

      return r;
    }
 
    
    f.data.权限 = JSON.stringify(a);
    let db = sqlite.connect();
    
    if (!f.data.id) {
      //新增
      sql = "insert into 管_权限表 (名称,状态,录入人,录入时间,权限) values ('"+ f.data.名称 +"','"+f.data.状态 +"','"+ f.data.录入人 +"','"
      + f.data.录入时间 +"','"+ f.data.权限 +"')";
    } else {
      sql = "update 管_权限表 set 名称 = '"+ f.data.名称  +"', 状态 = '"+ f.data.状态 + "', 录入人 = '"+ f.data.录入人+"', 录入时间 = '"
      + f.data.录入时间 +"', 备注 = '"+ f.data.备注 + "', 权限 = '"+ f.data.权限 + "' where id = "+ f.data.id;
    }

    let result = sqlite.query(db,sql);
    sqlite.close(db);
    if(result.状态 == "成功"){
      p.状态 = "成功";
      
    }


  return common.removenull(p);
};
