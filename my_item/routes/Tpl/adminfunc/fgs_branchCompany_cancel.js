/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var control = require('../../admin_control.js');
var pgdb = require('../../../func/pgdb.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	//重定向
	f = control.index(f);
	console.log(f);
	eval("f = " + f.arg._name + "(f, pg, mo);");
	return f;
}

function branchCompany_cancel(f, pg, mo) {

	sql = "select 编号   from 分_分公司表   where id = " + f.arg.id ;
	
	s = pgdb.query(pg, sql);	
	console.log(s);
	
	if(s.状态 != '成功') {
		f._状态 = '提交失败';
		return f;
	}
	
	var fgs_number = s.数据[0].编号;
	
	
	sql = "select 金额,编号 from 分_分公司申请表   where 编号 = '" + fgs_number +"'" ;
	
	s = pgdb.query(pg, sql);	
	console.log(s);
	
	if(s.状态 != '成功') {
		f._状态 = '提交失败';
		return f;
	}
	
	// 分公司申请表金额
	var sum_money = s.数据[0].金额;
		// if( Number(sum_money)== ''|| Number(sum_money)== null) {
		// f._状态 = '金额有误';
		// return f;
		// }
	
	
	sql = "update 分_分公司表  set 总账户  = 总账户 + "+ sum_money +" where 编号 = '" + fgs_number +"'" ;
	s = pgdb.query(pg, sql);
	console.log(s)
	if(s.状态 != '成功') {
		f._状态 = '提交失败';
		return f;
	}
	
	sql = "update 分_分公司申请表  set 金额 = "+ 0 +"  where 编号 = '" + fgs_number +"'" ;
	s = pgdb.query(pg, sql);
	console.log(s)
	if(s.状态 != '成功') {
		f._状态 = '提交失败';
		return f;
	}
		
	sql = "update 分_分公司表   set 状态 = '作废' where 编号 = '" + fgs_number +"'"  ;
	s = pgdb.query(pg, sql);
	if(s.状态 != '成功') {
		f._状态 = '提交失败';
		return f;
	}

	sql = "update 分_分公司申请表   set 状态 = '作废' where 编号 = '" + fgs_number +"'"  ;
	s = pgdb.query(pg, sql);
	if(s.状态 != '成功') {
		f._状态 = '提交失败';
		return f;
	}

	sql = "update 分_分公司成员表   set 状态 = '作废' where 分公司id = '" + fgs_number +"'"  ;
	s = pgdb.query(pg, sql);
	if(s.状态 != '成功') {
		f._状态 = '提交失败';
		return f;
	}
	

	f._isRander = '提交成功';
	return f;
}