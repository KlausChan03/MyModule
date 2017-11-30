var cipher = require("../func/cipher.js");
var config = require("../func/config.js");
var share = require("../ajax/public/share.js");
var logs = require("../func/logs.js");
var pgdb = require("../func/pgdb.js");
var common = require("../func/common.js");
var request = require("../func/request.js");
var moment = require("moment");
var fs = require("fs");

// var txsms = require("../func/txsms.js");


config.readfile();

module.exports.run = function(body, pg, mo) {
  var p = {};
  
  body.receive = JSON.parse(body.data);
  var 时间 = moment().format("YYYY-MM-DD HH:mm:ss");
  var 日期 = moment().format("YYYY-MM-DD");
  var f ={};

  f.data = body.receive[0];
  if(f.data.内容){
    f.data.内容 = decodeURIComponent(f.data.内容);    
  }
  f.check = body.receive[1];
  console.log(f.data,"666")
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
  console.log(table_type)
  switch(table_type){
    case "系统":
    sqlite_func();
    
    break;
    default:
    pg_func();
  }
  function pg_func(){
    if (f.data.id == "" ) {
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
      sql = "insert into " + table_name + "(" + insert_str_one + ") values (" + insert_str_two + ")";
    } else {
      sql = "update " + table_name + " set " + update_str + " where id = " + f.data.id;
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
  function sqlite_func(){
    console.log(button_arr,"lk")
    // var db = sqlite.connect();
    // var sql = "select * from 管_权限表 where 1 =1";
  
    // var result = sqlite.query(db, sql);
  }
  return common.removenull(p);
  

};
