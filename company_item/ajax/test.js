var cipher = require("../func/cipher.js");
var config = require("../func/config.js");
var share = require("./public/share.js");
var common = require("../func/common.js");
var request = require("../func/request.js");
var txsms = require("../func/txsms.js");
var moment = require("moment");
var sign = require("../func/sign.js");
var transliteration = require("transliteration");
var fs = require("fs");
var mysql = require("mysql");
var query = require("../func/mysql.js");

module.exports.run = function(body, pg, mo) {
  var server = config.get("server");
  var p = {};
  var data = {};
  p.状态 = "成功";
  p.数据 = "";
  body.receive = JSON.parse(body.data);
  var f = body.receive;
  var sql = "select id,账号,股数 from 分_分公司表  where 1=1";
  var result = {};

  query(sql, function(err, vals, fields) {
  console.log(vals);
  res.send(vals)
  });
  //do something
  // console.log(vals)
  // console.log(p.数据);
  // console.log(p.状态);
  // console.log(vals)
  // p.数据 = vals;

};
