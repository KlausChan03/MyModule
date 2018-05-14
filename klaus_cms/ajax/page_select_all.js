var cipher = require("../func/cipher.js");
var config = require("../func/config.js");
var share = require("../ajax/public/share.js");
var logs = require("../func/logs.js");
var pgdb = require("../func/pgdb.js");
var common = require("../func/common.js");
var request = require("../func/request.js");
var fs = require("fs");

config.readfile();

module.exports.run = function (body, pg, mo) {

	body.receive = JSON.parse(body.data);
	var f = {}, p = {};
	var sql	// 执行语句
		, result // 执行结果
		, order_cond //排序条件		
		, where_cond = " 1 = 1 "; //判断条件
	f.data = body.receive[0];
	f.check = body.receive[1];
	f.type = body.receive[2];

	var menu = config.get("menu");
	var table_name, table_id, insert_arr, update_arr;
	menu.forEach(function (item) {
		if (item.导航) {
			for (i in item.导航) {
				if (item.导航[i].表格编号 == f.check) {
					table_name = item.导航[i].表格名称;
					select_arr = item.导航[i].查询语句;
					f.tb_name = table_name;
				}
			}
		}
	});

	sql = ` select ${select_arr} from ${f.tb_name} limit 1`;	// sql = "select " + select_arr + " from " + f.tb_name + " where 1 = 1 order by " + order_cond + " DESC";		
	result = pgdb.query(pg, sql);

	if (result) {
		if (result.数据) {
			if (result.数据.length == 0) {
				f.状态 = "获取列表异常";
				f.列表 = result.数据;
				f.条数 = result.数据.length;
			} else {
				f.状态 = "成功";
				f.列表 = result.数据;
				f.条数 = result.数据.length;
			}
		}
	}
	p.状态 = f.状态;
	p.表格名称 = f.tb_name;
	p.列表 = f.列表;
	p.条数 = f.条数;
	return p;
};
