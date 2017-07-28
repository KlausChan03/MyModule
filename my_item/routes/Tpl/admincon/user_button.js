/*
 * 数据单条显示及增删改
 */
//已经是同步的，用异步写也会同步执行
var share = require('../admin/share.js');
var control = require('../../admin_control.js');
var sqlite = require('../../../func/sqlite.js');
//单条显示
module.exports.run = function(f, pg, mo) {
	//重定向
	f = control.index(f);
	//f = deleteOne(f, pg, mo);
	if(f.isPower == true){
		eval("f = "+f.arg._name+"(f, pg, mo);");	
	}else{
		f._isRander = '无此权限';
	}
	
	return f;
}

function deleteUser(f, pg, mo){	
	var sql = '';
	db = sqlite.connect();
	sql = "select 登录名 from 管_管理员表 where id = "+f.arg.id;
	var name = sqlite.query(db,sql).数据[0];

	if(name.登录名 == 'admin'){
		f._isRander = '不可删除超级管理员';
		return f;
	}

	sql = "delete from 管_管理员表 where id = "+f.arg.id;
	
	sqlite.query(db,sql);
	sqlite.close(db);
	
	f._isRander = '提交成功';
	return f;
}

/*
 * 对应前端的修改状态
 */
function updateState(f, pg, mo) {
	//重定向
	var sql = '';
	sql = "select 状态 from 管_管理员表 where id ='" + f.arg.id + "'";
	db = sqlite.connect();
	s = sqlite.query(db,sql);
	if(s.数据 && s.数据[0].状态 == '正常'){
		sql = "update 管_管理员表 set 状态 = '停用' where id="+ f.arg.id;
		sqlite.query(db,sql);
	}else if(s.数据 && s.数据[0].状态 == '停用'){
		sql = "update 管_管理员表 set 状态 = '正常' where id="+ f.arg.id;
		sqlite.query(db,sql);
	}
		
	sqlite.close(db);
	f._isRander = '提交成功';
	return f;
}

/*
 * 对应着前端的批量修改状态
 */
function updateStateAll(f, pg, mo) {
	//重定向
	var sql = '';
	sql = "select id from 管_管理员表 where id in (" + f.arg.id + ") and 状态= '停用'";
	db = sqlite.connect();
	s = sqlite.query(db,sql);
    var arr = [];
    var str2 = f.arg.id;
    if(JSON.stringify(s.数据) == '[]'){
    	f.str2 = str2;
    	f.str = '';
    }else{
    	s.数据.forEach(function(item,key){
        	arr.push(item.id);
        	str2=str2.replace(item.id,"");
          	if(key== s.数据.length - 1){
            	f.str2 = str2;
          		f.arr = arr;
        	}
      	})
    }
    
    if(f.arr){
	    var str = (f.arr).join(',');
	    f.str2 = (f.str2).replace(/,{2,}/g, ',').replace(/,$/g, '').replace(/^,/g, '');
	    f.str = str;
    }
    
    sql = "update 管_管理员表 set 状态 = '正常' where id in ("+f.str+")";
    sqlite.query(db,sql);
    
    sql = "update 管_管理员表 set 状态 = '停用' where id in ("+f.str2+")";
    sqlite.query(db,sql);
    
    sqlite.close(db);
    f._isRander = '提交成功';
	return f;
}
