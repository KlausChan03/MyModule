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

config.readfile();

module.exports.run = function(body, pg, mo) {
  var p = {};
  var f = {};
  var menu = config.get("menu");
  var table_name = "";
  var table_id = "";
  var insert_arr = "";
  var update_arr = "";
  var 时间 = moment().format("YYYY-MM-DD HH:mm:ss");
  var 日期 = moment().format("YYYY-MM-DD");
  var sql = "",sql_con = "";
  var rw = RandomWord('123456789');
  

  body.receive = JSON.parse(body.data);

  f.data = body.receive[0];
  console.log(f.data)
  if (f.data.内容) {
    f.data.内容 = decodeURIComponent(f.data.内容);
  }
  f.check = body.receive[1];

  f.data.随机码 = random(4);      
  f.data.密码 = cipher.md5(f.data.密码); 
  f.data.密码 = cipher.md5(f.data.随机码 + f.data.密码); 


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
  
  if (f.data.id == "" || f.data.id == undefined) {
    // 插入
    var insert_str_one = insert_arr.join(",");
    var insert_str_two = "";
    var transition = [];
    for (let i in f.data) {
      transition.push(f.data[i]);
    }
    transition.map(function(name, key) {
      // insert_str_two += "'" + transition[key] + "',";
      insert_str_two += `'${transition[key]}',`;
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
      // update_str += update_str_one[key] + "='" + transition[key] + "',";
      update_str += `${update_str_one[key]} ='${transition[key]}',`;
    });
    update_str = update_str.substring(0, update_str.length - 1);
    // update_str = update_str.replace(/,$/, "");
  }

    var db = sqlite.connect();
    if(f.data.id != "" && f.data.id != undefined)
      sql_con = " and id <> " + f.data.id;
      sql="select id from " + table_name + " where 登录名 = '"+f.data.登录名+"'"+sql_con;
      f.用户信息 = sqlite.query(db,sql).数据;
    if(f.用户信息[0]){
      p.状态 = '登录名已存在';
      return p;      
    }
  
    if (f.data.id == "" || f.data.id == undefined) {
      sql = "insert into " + table_name + "(" + insert_str_one + ") values (" + insert_str_two + ")";
    } else {
      sql = "update " + table_name + " set " + update_str + " where id = " + f.data.id;      
    }

    var result = sqlite.query(db,sql);
    sqlite.close(db);

    if (result.状态 != "成功") {
      p.状态 = "提交失败";
      return p;
    } else {
      p.状态 = "成功";
    }
  return common.removenull(p);
};

function RandomWord(chars){
  if(!(this instanceof RandomWord)){
      return new RandomWord(chars);
  }
  this._chars = "";
  if(chars){
      add(chars);
  }
}

function add(chars){
this._chars += chars;
  return this;
}

function random(size){
var len = this._chars.length;
  if(len === 0){
      throw new Error('no chars,please use add(chars)');
  }
  var word = "";
  for(var i=0;i<size;i++){
      var cpo = parseInt(Math.random()*len);
      word += this._chars.charAt(cpo);
  }
  return word;
}