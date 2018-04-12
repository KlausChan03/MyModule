/**
        创建人:朱军
	创建内容:添加油卡
	创建时间:2017年4月13日 09:28:06
 */
var cipher = require('../func/cipher.js');
var config = require('../func/config.js');
var logs = require('../func/logs.js');
var mongo = require('../func/mongo.js');
var pgdb = require('../func/pgdb.js');
var share = require('./public/share.js')
var common = require('../func/common.js');
var request = require('../func/request.js');
var txsms = require('../func/txsms.js');
var rongcloud = require('../func/rongcloud.js');
var sign = require('../func/sign.js');
var moment = require("moment");
var transliteration = require('transliteration');
var fs = require('fs');

module.exports.run = function(body, pg, mo) {
	var server = config.get('server');
	var p = {};
	//p.状态 = "成功";
	body.receive = JSON.parse(body.data);
	var f = body.receive;

	var sql = "";
	var field = "";
	f.时间 = moment().format('YYYY-MM-DD HH:mm:ss');
	f.日期 = moment().format('YYYY-MM-DD');

	var top = share.top(f.onlyID, pg);
	if(top.状态 != "成功") {
		p.状态 = top.状态;
		return p;
	}

	if(f.油卡类型 == null || f.油卡类型 == '') {
		p.状态 = '油卡类型不能为空！';
		return p;
	}

	if(f.加油卡号 == null || f.加油卡号 == '') {

		p.状态 = '加油卡号不能为空！';
		return p;
	}

	if(f.持卡人手机号 == null || f.持卡人手机号 == '' || f.持卡人手机号 == undefined ) {
		p.状态 = '请输入持卡人手机号';
		return p;
	}
	if(f.持卡人姓名 == null || f.持卡人姓名 == '' || f.持卡人姓名 == undefined ) {
		p.状态 = '请输入持卡人姓名';
		return p;
	}
	//		if(f.省 == null || f.省 == '') {
	//			p.状态 = '请选择您的所属省份';
	//			return p;
	//		}
	//		if(f.区域 == null || f.区域 == '') {
	//			p.状态 = '所属区域不能为空';
	//			return p;
	//		}
//	if(f.证件类型 == null || f.证件类型 == '') {
//		p.状态 = '请选择您的证件类型';
//		return p;
//	}
//	if(f.证件号 == null || f.证件号 == '') {
//		p.状态 = '请输入您的证件号';
//		return p;
//	}
	f.省 = '';
	f.区域 = '';
	//自增序列
	sql = "SELECT nextval('三_中油卡表_id_seq') as 油卡_id";
	field = pgdb.query(pg, sql);
	var s = field.数据[0];
	f.油卡_id = s.油卡_id;

//	/**
//	 * 对已绑定的油卡进行限制（同一油卡号）
//	 * @param {Object} f
//	 * @param {Object} callback
//	 */
	sql = "select id from 三_中油卡表  where 中油卡号= '" + f.加油卡号 + "' and 状态 = '正常使用' and 账号 = '"+ top.会.账号 +"'";
	field = pgdb.query(pg, sql);
	if(field.数据.length > 0) {
		p.状态 = '该油卡号已绑定！';
		return p;
	}

	/**
	 * 判断密码是否正确？
	 * 正确则提示添加成功并添加数据，否则提示用户密码错误
	 * @param {Object} f
	 * @param {Object} callback
	 */

	sql = "insert into 三_中油卡表( id,  账号, 姓名, 中油卡号,持卡人账号,持卡人姓名,支付宝账号,是否自动转积分, 状态, 类别, 录入人, 录入时间, 备注 ) values ('" + f.油卡_id + "',  '" + top.会.账号 + "', '" + top.会.昵称 + "','" + f.加油卡号 + "', '" + f.持卡人手机号 + "','" + f.持卡人姓名 + "',  '','否', '正常使用', '" + f.油卡类型 + "', '系统','" + f.时间 + "', '" + f.备注 + "')";
	field = pgdb.query(pg, sql);
	if(field.状态 != '成功') {
		p.状态 = '执行失败！'
		return p;

	}

	p.状态 = '成功';
	return common.removenull(p);

}

function lastdate(sql, result, pg) {
	var 状态 = result.状态;
	result = JSON.stringify(result);
	var reg = new RegExp("{p.状态}", "g");
	var stringObj = sql;
	stringObj = stringObj.replace(reg, 状态);
	reg = new RegExp("{p.内容}", "g");
	sql = stringObj.replace(reg, result);
	pgdb.query(pg, sql);
	return;
}