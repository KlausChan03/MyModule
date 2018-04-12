/**
创建人：秦功科
创建时间：2017年5月9日16:58:39
创建内容：根据编号搜索分公司名称
 */

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
  body.receive = JSON.parse(body.data);
  var f = body.receive;
  var sql = "";
  var 时间 = moment().format("YYYY-MM-DD HH:mm:ss");
  var 日期 = moment().format("YYYY-MM-DD");

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> c331d07d9475ffd1daf316e293fad7e526eae7ca
  sql = "select * from 全_套餐设置表 where 1 =1";
  var result = pgdb.query(pg, sql);
  if (result.数据.length == 0) {
    p.状态 = "获取列表异常";
    return p;
  } else {
    f.列表 = result.数据;
    f.条数 = result.数据.length;
  }
<<<<<<< HEAD
=======
=======
  query(sql, function(err, vals, fields) {
  console.log("ll");
  // res.send(vals)
  });
  //do something
  // console.log(vals)
  // console.log(p.数据);
  // console.log(p.状态);
  // console.log(vals)
  // p.数据 = vals;
>>>>>>> 2607991b77efc056aabed7517552384b71c86a2b
>>>>>>> c331d07d9475ffd1daf316e293fad7e526eae7ca

  p.状态 = "成功";
  p.列表 = f.列表;
  p.条数 = f.条数;
  return common.removenull(p);
};
