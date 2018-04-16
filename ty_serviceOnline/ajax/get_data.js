var cipher = require("../func/cipher.js");
var config = require("../func/config.js");
var share = require("../ajax/public/share.js");
var logs = require("../func/logs.js");
var pgdb = require("../func/pgdb.js");
var common = require("../func/common.js");
var sqlite = require("../func/sqlite.js");
var moment = require("moment");

module.exports.run = function(body, pg, mo) {
  console.log(body)
  // body.receive = JSON.parse(body);

  let [p, f, arr, sql, result] = [{}, {}, [], "", ""];
  // f.data = body.receive;
  sql = ` select * from  ys_收藏表 where 1 = 1`;						
  result = pgdb.query(pg, sql);
  console.log(result)
  p.status = "200";
  p.hint="";
  p.total=1000;
  p.rows=result.数据;
  return p;
};
