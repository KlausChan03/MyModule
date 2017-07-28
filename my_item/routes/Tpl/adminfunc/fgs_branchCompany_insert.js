/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var account = require('./fgs_branchCompany.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	var p = {};
	f = control.index(f);
	f._json = account.json();
	p.表名 = '分_分公司表';
	//f.dbpath = 'sqlite'
	f = share.update(p, f, pg);
	return f;
}
//更改接口
/*
 * 更新：有id值
 * 新增：无id值
 */

var pgdb = require('../../../func/pgdb.js');

module.exports.form = function(f, pg, mo) {
	f._json = account.json();
	var sql_con = '';
	var sql = '';

	if(f.data.股数 == "") {
		f.data.股数 = 0;
	} else if(f.data.总账户 == "") {
		f.data.总账户 = 0;
	} else if(f.data.分红账户 == "") {
		f.data.分红账户 = 0;
	} else if(f.data.回流账户 == "") {
		f.data.回流账户 = 0;
	} else {
		sql = "insert into 分_分公司表 (账号,姓名,名称,地址,排序,股数,层1分公司名称,层1分公司id,层2分公司名称,层2分公司id,层3分公司名称,层3分公司id,编号,定时时间,省,市,区,分公司密码,总账户,分红账户,回流账户,分公司设置id,状态,类别,录入人,录入时间,备注,类型切换,切换时间) values ('" +
			f.data.账号 + "','" +
			f.data.姓名 + "','" +
			f.data.名称 + "','" +
			f.data.地址 + "','" +
			f.data.排序 + "','" +
			f.data.股数 + "','" +
			f.data.层1分公司名称 + "','" +
			f.data.层1分公司id + "','" +
			f.data.层2分公司名称 + "','" +
			f.data.层2分公司id + "','" +
			f.data.层3分公司名称 + "','" +
			f.data.层3分公司id + "','" +
			f.data.编号 + "','" +
			f.data.定时时间 + "','" +
			f.data.省 + "','" +
			f.data.市 + "','" +
			f.data.区 + "','" +
			f.data.分公司密码 + "','" +
			f.data.总账户 + "','" +
			f.data.分红账户 + "','" +
			f.data.回流账户 + "','" +
			f.data.分公司设置id + "','" +
			f.data.状态 + "','" +
			f.data.类别 + "','" +
			f.data.录入人 + "','" +
			f.data.录入时间 + "','" +
			f.data.备注 + "','" +
			f.data.类型切换 + "','" +
			f.data.切换时间 + "')";
	}

	s = pgdb.query(pg, sql);
	if(s.状态 != '成功') {
		f._状态 = '提交失败';
		return f;
	}

	//sqlite.close(db);
	return f;
}