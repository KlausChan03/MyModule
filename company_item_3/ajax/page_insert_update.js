var cipher = require("../func/cipher.js");
var config = require("../func/config.js");
var share = require("../ajax/public/share.js");
var logs = require("../func/logs.js");
var pgdb = require("../func/pgdb.js");
var common = require("../func/common.js");
var request = require("../func/request.js");
var fs = require("fs");

config.readfile();

module.exports.run = function(body, pg, mo) {
  console.log(body)
  body.receive = JSON.parse(body.data);
  var p = {},f = {};
  var sql, result;
  f.data = body.receive[0];
  if (f.data.内容) {
    f.data.内容 = decodeURIComponent(f.data.内容);
  }
  f.check = body.receive[1];

  var menu = config.get("menu");
  var table_name, table_id, insert_arr, update_arr;
  menu.forEach(function(item) {
    if (item.导航) {
      for (let i in item.导航) {
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
  if (f.data.id == "" || f.data.id == undefined) {
    // 插入
    var insert_str_one = insert_arr.join(",");
    var insert_str_two = "";
    var transition = [];
    for (let i in f.data) {
      transition.push(f.data[i]);
    }
    transition.map(function(name, key) {
      insert_str_two += `'${transition[key]}',`; // insert_str_two += "'" + transition[key] + "',";
    });
    insert_str_two = insert_str_two.substring(0, insert_str_two.length - 1);
  } else {
    // 修改
    var update_str_one = update_arr;
    var update_str = "";
    var transition = [];
    for (let i in f.data) {
      transition.push(f.data[i]);
    }
    transition.map(function(name, key) {
      update_str += `${update_str_one[key]} ='${transition[key]}',`; // update_str += update_str_one[key] + "='" + transition[key] + "',";
    });
    update_str = update_str.substring(0, update_str.length - 1); // update_str = update_str.replace(/,$/, "");
  }

  if (f.data.id == "" || f.data.id == undefined) {
    sql = `insert into ${table_name} (${insert_str_one}) values (${insert_str_two})`; // sql = "insert into " + table_name + "(" + insert_str_one + ") values (" + insert_str_two + ")";
    // console.log(sql)    
  } else {
    sql = `update ${table_name} set ${update_str} where id = ${f.data.id}`; // sql = "update " + table_name + " set " + update_str + " where id = " + f.data.id;
    // console.log(sql)
  }
  result = pgdb.query(pg, sql);
  // console.log(result)

  if (result.状态 != "成功") {
    p.状态 = "提交失败";
    return p;
  } else {
    p.状态 = "成功";
    return p;
  }

  return common.removenull(p);
};
