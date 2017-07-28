//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
module.exports.run = function(f, pg, mo) {
	f = control.index(f);
	f._json = this.json();
	var p = {};
	var where = " 1=1 ";

	if(f.data != null) {
		if(f.data.姓名 != null && f.data.姓名 != '') {
			where += " and 姓名 like '%" + f.data.姓名 + "%'";
		}
	}
	p.sql = "select id,姓名,状态,录入人,录入时间  from 测试二表  where" + where;
	console.log(p)
	//做一个判断引用哪个数据库，放到f里面
	f.dbpath = 'sqlite'; //去掉注释则进入sqlite表
	f = share.lists(p, f, pg);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "测试",
		"模块": "adminfunc",
		"func": "test",
		"页数": "10",
		"表名": "测试",
		"编辑": "hf",
		"运行模式": "同步",
		"页面模式": "普通"
	};
	return json;
}