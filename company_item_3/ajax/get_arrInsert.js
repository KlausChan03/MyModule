var cipher = require("../func/cipher.js");
var config = require("../func/config.js");
var share = require("../ajax/public/share.js");
var logs = require("../func/logs.js");
var pgdb = require("../func/pgdb.js");
var common = require("../func/common.js");
var sqlite = require("../func/sqlite.js");
var public = require("../ajax/admin_control");

module.exports.run = function(body, pg, mo) {
  var p = {};
  var f = {};
  body.receive = JSON.parse(body.data);
  f.check = body.receive;
  console.log(f.check)
  var menu = config.get("menu");
  var insert_arr = [];
  menu.forEach(function(item,index) {
    if(item.导航) {
			for(i in item.导航) {
				if(item.导航[i].表格编号 == f.check) {
					insert_arr = item.导航[i].增加语句;
				}
			}
		}
  });
  p.数据 = insert_arr;
  p.状态 = "成功";
  console.log(p.数据)

  return common.removenull(p);
};
