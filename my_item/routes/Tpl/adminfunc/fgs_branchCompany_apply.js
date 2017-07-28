//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
module.exports.run = function(f, pg, mo) {
	f = control.index(f);
	f._json = this.json();
	var p = {};
	var wh = " 1=1 ";
	if(f.data != null) {
		//		if(f.data.账号 != null && f.data.账号 != '') {
		//			//			wh += " and 账号 = '" + f.data.账号 + "'";
		//			wh = " 账号 LIKE '%" + f.data.账号 + "%'";
		//		}
		//		if(f.data.名称 != null && f.data.名称 != '') {
		//			//			wh += " and 名称 = '" + f.data.名称 + "'";
		//			wh = " 名称 LIKE '%" + f.data.名称 + "%'";
		//		}
		//		if(f.data.姓名 != null && f.data.姓名 != '') {
		//			//			wh += " and 姓名  = '" + f.data.姓名 + "'";
		//			wh = " 姓名 LIKE '%" + f.data.姓名 + "%'";
		//		}
		//		if(f.data.编号 != null && f.data.编号 != '') {
		//			//			wh += " and 编号  = '" + f.data.编号 + "'";
		//			wh = " 编号 LIKE '%" + f.data.编号 + "%'";
		//		}
		//
		//		if(f.data.状态 != null && f.data.状态 != '') {
		//			wh = " 状态 LIKE '%" + f.data.状态 + "%'";
		//		}
		//		if(f.data.类别 != null && f.data.类别 != '') {
		//			wh = " 类别 LIKE '%" + f.data.类别 + "%'";
		//		}
				if(f.data.开始日期 != null && f.data.开始日期 != '') {
					wh += "and 录入时间 >= '" + f.data.开始日期 + " 00:00:00'";
				}
				if(f.data.结束日期 != null && f.data.结束日期 != '') {
					wh += "and 录入时间 <= '" + f.data.结束日期 + " 23:59:59'";
				}

		if(f.data.查询 != null && f.data.查询 != '') {
			wh = "(账号 like'%" + f.data.查询 + "%')" +
				"or (姓名 like'%" + f.data.查询 + "%')" +
				"or (名称 like'%" + f.data.查询 + "%')" +
				"or (编号 like'%" + f.data.查询 + "%')" +
				"or (省 like'%" + f.data.查询 + "%')" +
				"or (市 like'%" + f.data.查询 + "%')" +
				"or (区 like'%" + f.data.查询 + "%')" +
				"or (分公司设置id like'%" + f.data.查询 + "%')" +
				"or (分公司设置名称 like'%" + f.data.查询 + "%')" +
				"or (层1分公司名称 like'%" + f.data.查询 + "%')" +
				"or (层1分公司id like'%" + f.data.查询 + "%')" +
				"or (层2分公司名称 like'%" + f.data.查询 + "%')" +
				"or (层2分公司id like'%" + f.data.查询 + "%')" +
				"or (层3分公司名称 like'%" + f.data.查询 + "%')" +
				"or (层3分公司id like'%" + f.data.查询 + "%')" +
//				"or (金额 like'%" + f.data.查询 + "%')" +
//				"or (股数 like'%" + f.data.查询 + "%')" +
				"or (支付方式 like'%" + f.data.查询 + "%')" +
				"or (支付时间 like'%" + f.data.查询 + "%')" +
				"or (支付订单号 like'%" + f.data.查询 + "%')" +
				"or (商户订单号 like'%" + f.data.查询 + "%')" +
				"or (每股赠送个数 like'%" + f.data.查询 + "%')" +
				"or (状态 like'%" + f.data.查询 + "%')" +
				"or (类别 like'%" + f.data.查询 + "%')" +
				"or (录入人 like'%" + f.data.查询 + "%')" +
				"or (录入时间 like'%" + f.data.查询 + "%')" +
				"or (备注 like'%" + f.data.查询 + "%')" +
				"or (密码 like'%" + f.data.查询 + "%')" +
				"or (分公司密码 like'%" + f.data.查询 + "%')" +
				"or (上级 like'%" + f.data.查询 + "%')" +
				"or (上级姓名 like'%" + f.data.查询 + "%')";
		}

	}
	p.sql = "select id,账号,姓名,名称,编号,省,市,区,分公司设置id,分公司设置名称,层1分公司名称,层1分公司id,层2分公司名称,层2分公司id,层3分公司名称,层3分公司id,金额,股数,支付方式,支付时间,支付订单号,商户订单号,每股赠送个数,状态,类别,录入人,录入时间,备注,密码,分公司密码,上级,上级姓名 from 分_分公司申请表  where" + wh;
	f = share.lists(p, f, pg);
	return f;
}

//配制
module.exports.json = function() {
	var json = {
		"名称": "分_分公司申请",
		"模块": "adminfunc",
		"func": "fgs_branchCompany_apply",
		"页数": "10",
		"表名": "分_分公司申请表",
		"编辑": "hf",
		"运行模式": "异步",
		"页面模式": "普通"
	};
	return json;
}