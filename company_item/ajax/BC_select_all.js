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

config.readfile();

module.exports.run = function(body, pg, mo) {
	body.receive = JSON.parse(body.data);
	var 时间 = moment().format("YYYY-MM-DD HH:mm:ss");
	var 日期 = moment().format("YYYY-MM-DD");
	var f = {};
	var p = {};

	f.data = body.receive[0];
	f.check = body.receive[1];
	f.type = body.receive[2];
	var menu = config.get("menu");
	var table_name = "";
	var table_id = "";
	var insert_arr = "";
	var update_arr = "";
	menu.forEach(function(item) {
		if(item.导航) {
			for(i in item.导航) {
				if(item.导航[i].表格编号 == f.check) {
					table_name = item.导航[i].表格名称;
					f.tb_name = table_name;
				}
			}
		}
	});
	if(f.type == "all") {
		if(f.data == "") {
			f.verify = "审核通过";
		} else {
			f.verify = "审核未通过";

		}
	} else if(f.type == "one") {
		if(f.data[0] != "" && f.data[0] != null && f.data[0] != undefined && f.data[1] != "" && f.data[1] != null && f.data[1] != undefined) {
			f.verify = "审核通过";
		} else {
			f.verify = "审核未通过";
		}
	}
	var sql = "";
	if(f.type == "all" && f.verify == "审核通过") {
		sql = "select * from " + f.tb_name + " where 1 = 1 ";
		var result = pgdb.query(pg, sql);

	} else if(f.type == "one" && f.verify == "审核通过") {
		sql = "select * from " + f.tb_name + " where " + f.data[0] + "=" + "'" + f.data[1] + "'";
		var result = pgdb.query(pg, sql);

	} else {
		f.状态 = "查询条件有误";
	}

	if(result) {
		if(result.数据.length == 0) {
			p.状态 = "获取列表异常";
			f.列表 = result.数据;
			f.条数 = result.数据.length;
		} else {
			p.状态 = "成功";
			f.列表 = result.数据;
			f.条数 = result.数据.length;
		}
	}

	if(result) {
		p.表格名称 = f.tb_name;
		p.列表 = f.列表;
		p.条数 = f.条数;
	} else {
		p.状态 = f.状态;
	}

	return common.removenull(p);
};