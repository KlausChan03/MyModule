var cipher = require("../func/cipher.js");
var config = require("../func/config.js");
var share = require("../ajax/public/share.js");
var logs = require("../func/logs.js");
var pgdb = require("../func/pgdb.js");
var common = require("../func/common.js");
var request = require("../func/request.js");
var fs = require("fs");

config.readfile();

module.exports.run = function(body, pg, mo) {	
	body.receive = JSON.parse(body.data);
	var f = {},p = {};
	var sql	// 执行语句
	,result // 执行结果
	,order_cond //排序条件		
	,where_cond = " 1 = 1 "; //判断条件
	f.data = body.receive[0];
	f.check = body.receive[1];
	f.type = body.receive[2];

	var menu = config.get("menu");
	var table_name,table_id,insert_arr,update_arr;
	menu.forEach(function(item) {
		if(item.导航) {
			for(i in item.导航) {
				if(item.导航[i].表格编号 == f.check) {
					table_name = item.导航[i].表格名称;
					select_arr = item.导航[i].查询语句;
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
			if(f.data[0] == "id"){
				f.verify_type = "int"
			}else{
				f.verify_type = "other"				
			}
		} else if ((f.data[0] == "" || f.data[0] == null || f.data[0] == undefined ) && f.data[1] != "" && f.data[1] != null && f.data[1] != undefined){
			f.verify = "查询对象key为空";
			f.状态 = "请选择查询条件";
		} else if (f.data[0] != "" && f.data[0] != null && f.data[0] != undefined && (f.data[1] == "" || f.data[1] == null || f.data[1] == undefined)){
			f.verify = "查询对象name为空";
			f.状态 = "请输入查对应内容";
		}else{
			f.verify = "查询对象key和name为空";			
			f.状态 = "请选择查询条件,并输入对应内容";				
		}
	}

	if(contains(select_arr, "录入时间") == true){
		order_cond = "录入时间"
	}else{
		order_cond = "id"					
	};
	
	if(f.type == "all" && f.verify == "审核通过") {
		if(select_arr == "" || select_arr == undefined){					
			sql = ` select * from ${f.tb_name} where 1 = 1 order by ${order_cond} DESC `;// sql = "select * from " + f.tb_name + " where 1 = 1 order by " + order_cond + " DESC";
		}else{						
			sql = ` select ${select_arr} from ${f.tb_name} where 1 = 1 order by ${order_cond} DESC `;	// sql = "select " + select_arr + " from " + f.tb_name + " where 1 = 1 order by " + order_cond + " DESC";		
		}
		result  = pgdb.query(pg, sql);
	} else if(f.type == "one" && f.verify == "审核通过") {
		if(f.verify_type == "other"){
			sql = ` select * from ${f.tb_name} where ${f.data[0]} like '%${f.data[1]}%'  order by ${order_cond} DESC `;		// sql = "select * from " + f.tb_name + " where " + f.data[0] + "=" + "'" + f.data[1] + "' order by " + order_cond + "DESC";			
		}else{
			sql = ` select * from ${f.tb_name} where ${f.data[0]} = '${f.data[1]}'  order by ${order_cond} DESC `;		// sql = "select * from " + f.tb_name + " where " + f.data[0] + "=" + "'" + f.data[1] + "' order by " + order_cond + "DESC";						
		}
		result = pgdb.query(pg, sql);
	}

	if(result) {
		if(result.数据){
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
	}

	if(result) {
		// 通过数组的sort方法以id排序
		// if(f.type == "all"){
		// 	f.列表.sort(function (o1, o2) { return parseInt(o1.id) - parseInt(o2.id); });			
		// }

		for(let i in f.列表){
			if(typeof(f.列表[i].内容)  == "object"){
				f.列表[i].内容 = JSON.stringify(f.列表[i].内容)
			}
		}
		p.表格名称 = f.tb_name;
		p.列表 = f.列表;
		p.条数 = f.条数;

	} else {
		p.状态 = f.状态;
	}
	return p;
};

// Array.prototype.in_array = function(e) {  
// 	for(i=0;i<this.length;i++) {  
// 		if(this[i] == e)  
// 			return true;  
// 	}  
// 	return false;  
// }  

function contains(arr, obj) {  
    var i = arr.length;  
    while (i--) {  
        if (arr[i] === obj) {  
            return true;  
        }  
    }  
    return false;  
} 