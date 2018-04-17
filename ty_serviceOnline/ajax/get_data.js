var cipher = require('../func/cipher.js');
var config = require('../func/config.js');
var share = require('../ajax/public/share.js');
var logs = require('../func/logs.js');
var pgdb = require('../func/pgdb.js');
var common = require('../func/common.js');
var moment = require('moment');

module.exports.run = function(body, pg, mo) {
  let [p, f, arr, sql, result] = [{}, {}, [], '', ''];
  let [page, limit] = [body.page, body.limit];
  sql = ` select * from  ys_收藏表 limit ${limit} offset ${(page - 1) * limit + 1}`;
  result = pgdb.query(pg, sql);
  p.status = '200';
  p.hint = '';
  p.total = 1000;
  p.rows = result.数据;
  return p;
};
