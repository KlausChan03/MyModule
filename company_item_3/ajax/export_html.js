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

  var f ={};
  var p ={};
  var sql = "";
  
  body.receive = JSON.parse(body.data);  
  f.data = body.receive;

  // console.log("准备写入文件");
  // fs.writeFile('test.html', f.data,  function(err) {
  //    if (err) {
  //        return console.error(err);
  //    }
  //    console.log("数据写入成功！");
  //    console.log("--------我是分割线-------------")
  //    console.log("读取写入的数据！");
  //    fs.readFile('test.html', function (err, data) {
  //       if (err) {
  //          return console.error(err);
  //       }
  //       console.log("异步读取文件数据: " + data.toString());
  //    });
  // });


 


  // sql = "insert into 全_首页信息表 (备注) values ('"+f.data+"') where id = '3'";
  sql = "update 全_首页信息表 set 备注 = '"+f.data+"' where id = '5'"
  var result = pgdb.query(pg, sql);

  p.状态 = "成功";
  return common.removenull(p);
};
