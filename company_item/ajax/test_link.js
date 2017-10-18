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

  sql = "select a.账号,a.头像,a.性别,a.年龄,a.职业,a.地区,b.全球币,b.手机号,b.身份认证 from 全_会员资料表 a,全_会员表 b where a.账号=b.账号";
  var result = pgdb.query(pg, sql);
  if (result.数据.length == 0) {
    p.状态 = "获取列表异常";
    return p;
  } else {
    f.列表 = result.数据;
    f.条数 = result.数据.length;
  }

  p.状态 = "成功";
  p.列表 = f.列表;
  p.条数 = f.条数;
  return common.removenull(p);
};
