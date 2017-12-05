var cipher = require("../func/cipher.js");
var config = require("../func/config.js");
var share = require("../ajax/public/share.js");
var logs = require("../func/logs.js");
var pgdb = require("../func/pgdb.js");
var common = require("../func/common.js");
var request = require("../func/request.js");
var moment = require("moment");
var fs = require("fs");
var sqlite = require("../func/sqlite.js");

// var txsms = require("../func/txsms.js");

config.readfile();

module.exports.run = function(body, pg, mo) {
  var p = {};

  body.receive = JSON.parse(body.data);
  var 时间 = moment().format("YYYY-MM-DD HH:mm:ss");
  var 日期 = moment().format("YYYY-MM-DD");
  var f = {};

  f.data = body.receive[0];
  if (f.data.内容) {
    f.data.内容 = decodeURIComponent(f.data.内容);
  }
  f.check = body.receive[1];
  console.log(f.data, "666");
  // if(f.data.内容){
  //   f.data.内容 = f.data.内容.replace(/_空格_/g,"&nbsp;")
  // }
  var menu = config.get("menu");
  var table_name = "";
  var table_id = "";
  var insert_arr = "";
  var update_arr = "";
  menu.forEach(function(item) {
    if (item.导航) {
      for (i in item.导航) {
        // console.log(item.导航[i].表格编号);
        if (item.导航[i].表格编号 == f.check) {
          table_type = item.导航[i].菜单;
          table_name = item.导航[i].表格名称;
          insert_arr = item.导航[i].增加语句;
          update_arr = item.导航[i].修改语句;
          button_arr = item.导航[i].功能按钮;
        }
      }
    }
  });
  console.log(table_type);
  switch (table_type) {
    case "系统":
      sqlite_func();
      break;

    default:
      pg_func();
  }
  function pg_func() {
    if (f.data.id == "") {
      // 插入
      var insert_str_one = insert_arr.join(",");
      var insert_str_two = "";
      var test = [];
      for (i in f.data) {
        test.push(f.data[i]);
      }
      test.shift();
      for (i in test) {
        insert_str_two += "'" + test[i] + "',";
      }
      insert_str_two = insert_str_two.substring(0, insert_str_two.length - 1);
    } else {
      // 修改
      var update_str_one = update_arr;
      var update_str = "";
      var test = [];
      for (i in f.data) {
        test.push(f.data[i]);
      }
      test.shift();
      for (i in (update_str_one, test)) {
        update_str += update_str_one[i] + "='" + test[i] + "',";
      }
      update_str = update_str.substring(0, update_str.length - 1);
    }

    var sql = "";
    if (f.data.id == "") {
      sql =
        "insert into " +
        table_name +
        "(" +
        insert_str_one +
        ") values (" +
        insert_str_two +
        ")";
    } else {
      sql =
        "update " +
        table_name +
        " set " +
        update_str +
        " where id = " +
        f.data.id;
    }
    var result = pgdb.query(pg, sql);

    if (result.状态 != "成功") {
      p.状态 = "提交失败";
      return p;
    } else {
      p.状态 = "成功";
      return p;
    }
  }
  function sqlite_func() {
    console.log(f, "i know");
    var power_ls = f.data;
    var all_arr = [];
    var check_arr = [];
    var button_arr = [];
    for (var i in power_ls) {
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

    function button_concat(f,button_arr){
        for (i in button_arr){

        }
    }
    button_concat(f,button_arr)

    var a = {};
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
    console.log(a);

    function check_null(f, type, name) {
      var r = "0";
      if (eval("f.data." + type + "_" + name) == null) r = "0";
      else r = "1";
      return r;
    }
    function button_null(f, type, name) {
      var r = [];
      if (eval("f.data." + type + "_" + name + "_新增") == null) r.push("0");
      else r.push("新增");
      if (eval("f.data." + type + "_" + name + "_编辑") == null)  r.push("0");
      else r.push("编辑");
      if (eval("f.data." + type + "_" + name + "_删除") == null)  r.push("0");
      else r.push("删除");
      if (eval("f.data." + type + "_" + name + "_批量删除") == null)  r.push("0");
      else r.push("批量删除");
      console.log(r)
      return r;
    }
 
    
    f.data.权限 = JSON.stringify(a);
    var db = sqlite.connect();
    
    if (!f.data.id) {//新增
      sql = "insert into 管_权限表 (名称,权限,状态,录入人,录入时间) values ('"+ f.data.名称 +"','"+ f.data.权限 +"','正常','"+ f.data.录入人 +"','"
      + f.data.录入时间 +"')";
    } else {
      sql = "update 管_权限表 set 名称 = '"+ f.data.名称 +"', 权限 = '"+ f.data.权限 +"', 录入人 = '"+ f.data.录入人+"', 录入时间 = '"
      + f.data.录入时间 +"' where id = "+ f.data.id;
    }
    
    //console.log(sql);
    var result = sqlite.query(db,sql);
    sqlite.close(db);
    console.log(result)
    if(result.状态 == "成功"){
      p.状态 = "成功";
      
    }

  }
  return common.removenull(p);
};
