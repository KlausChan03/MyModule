var cipher = require("../func/cipher.js");
var config = require("../func/config.js");
var share = require("../ajax/public/share.js");
var logs = require("../func/logs.js");
var mongo = require("../func/mongo.js");
var pgdb = require("../func/pgdb.js");
var common = require("../func/common.js");
var request = require("../func/request.js");
var txsms = require("../func/txsms.js");
// var rongcloud = require('../func/rongcloud.js');
var moment = require("moment");
var transliteration = require("transliteration");
var sign = require("../func/sign.js");
var fs = require("fs");

config.readfile();

module.exports.run = function(body, pg, mo) {
  var p = {};
  body.receive = JSON.parse(body.data);
  var 时间 = moment().format("YYYY-MM-DD HH:mm:ss");
  var 日期 = moment().format("YYYY-MM-DD");
  
  var f ={};
  f.data = body.receive;
   f.session = body.session;
   console.log(f.session.id+"===================")
  var sql="";
  sql="update 管_管理员表 set 头像 ='"+f.data.头像+"' where id = '"+f.session.user_id+"' ";
  var result_power = pgdb.query(pg, sql);
  p.状态="成功";
  p.头像=f.data.头像;
  return common.removenull(p);
};
