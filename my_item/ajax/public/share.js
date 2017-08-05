/**公用头部尾部及防并发
创建时间：2017-01-02
创建人：钟宝森

更新时间 2017-01-03
更新内容：优化处理逻辑,在函数中增加几个参数
更新人：钟宝森

更新时间 2017-01-10
更新内容：优化防并发处理模块
更新人：钟宝森

更新时间 2017-02-09
更新内容：新建防并发函数
更新人：钟宝森

*/
var pgdb = require('../../func/pgdb.js');
var config = require('../../func/config.js');
var moment = require("moment");


var share = {};
var server = config.get('server');
var sign = require('../../func/sign.js');
var request = require('../../func/request.js');
/*
公用头部
onlyid是前台传入的唯一id
pg是从run传入的参数
*/
share.top = function (onlyid, pg) {
	var data = {};
	data.状态 = '成功';
	if (onlyid == undefined || onlyid == '' || onlyid == null) {
		data.状态 = '唯一id不能为空';
		return data;
	}
	//会员信息查询	
	var types = ['appid', 'onlyID'];
	var r = {};
	r.func = 'p_sel_vipinfo';
	r.appid = server.appid; //服务号id
	r.onlyID = onlyid; //唯一id
	r.sign = sign.autograph(r, types, server.key);
	var result = request.post(server.xiadan, r);
	if (result == null || result == '' || result == undefined) {
		data.状态 = "账号异常!!";
		return data;
	} else {
		if (result.状态 == '成功') {
			var s = JSON.parse(result.信息);
			if (s.状态 == '成功') {
				data.会 = s;
			} else {
				data.状态 = s.状态;
				return data;
			}
		} else {
			data.状态 = '账号异常！';
			return data;
		}

	}
	return data;
}


/*
 手机号查会员信息
 * */
share.info = function(phone,pg){
	var data = {};
	data.状态 = '成功';
	if(phone==undefined || phone==''){
		data.状态='手机号不能为空';	
	}
	var r = {};
	r.func = 'p_sel_compellation';
	r.appid = server.appid; //服务号id
	r.account = phone; //金额
	var type = ['appid', 'account'];
	r.sign = sign.autograph(r, type, server.key); //签名
	var result = request.post(server.xiadan, r);
	var a = JSON.parse(result.信息);
	if (result == null || result == '' || result == undefined) {
		data.状态 = "此会员不存在";
		return data;
	} else {
		if (result.状态 == '成功') {
			var a = JSON.parse(result.信息);
			if (a.状态 == '成功') {
				data.会 = a;
			} else {
				data.状态 = a.状态;
			}
		} else {
			data.状态 = '账号异常！';
			return data;
		}

	}
	return data;
	
}


/*
防并发头部处理
accout是前台传入的账号
func是前台传入的func号
uuid是生成的uuid,在body中传入
pg是从run传入的参数
*/
share.con_start = function(accout,func,uuid,pg){
	var data = {};
	var date1=new Date();
	var time=parseInt(date1.getTime()/1000);
	_检 = func+"_"+accout+"_"+time+"_"+uuid;
	var like = func+"_"+accout+"_"+time;

    var sql = "select * from 三_新检表 where 名称 like '%"+like+"%' and 录入时间='"+time+"'";
	var sl = pgdb.query(pg,sql);



	if(sl.数据.length != 0){
        data.状态 = '请不要重复提交';
		data.并发数据 = "";
		return data; 
	}

	

	var err = pgdb.query(pg,"insert into 三_新检表(名称,录入时间)values('"+_检+"','"+time+"')");
	if(err.状态 != '成功'){
		data.状态 = '请不要重复提交';
		data.并发数据 = "";
		return data;
	}
	else{
		data.状态 = '成功';
		like = func+"_"+accout;
		data.并发数据 = like;
		return data;
	}
}


/*
新防并发头部处理
pg是从run传入的参数(必传){object}
accout是前台传入的账号(必传){String}
func是前台传入的func号(必传){String}
second是自己定义的秒数,在相隔当前时间多少秒后可跳出拦截(可选传入){Number}
*/
share.con_run = function(pg,accout,func,second){

	var data = {};
	var date1=new Date();

	(second == null || second == "") ? second = 0 : second = second;  

	
	var time=parseInt(date1.getTime()/1000);
	var name = func+"_"+accout+"_"+time;

    var sql = "select * from 三_新检表 where 名称='"+name+"'";
	var sl = pgdb.query(pg,sql);

	if(second == 0 && sl.数据.length != 0){
		data.状态 = '请不要重复提交';
		data.并发数据 = "";
		return data; 
	}

	if(sl.数据.length != 0 && second != 0){
		var sld = sl.数据[0];
		var dtime = Number(sld.录入时间) + second;
		if(Number(dtime) - Number(time) == Number(second)){
            var lettime = "在"+second+"秒内";
			data.状态 = '请不要'+lettime+'重复提交';
			data.并发数据 = "";
			return data; 
		}

		data.状态 = '请不要重复提交';
		data.并发数据 = "";
		return data; 
		
	}



	var err = pgdb.query(pg,"insert into 三_新检表(名称,录入时间)values('"+name+"','"+time+"')");

    if(err.影响行数 == 1){
        data.状态 = '成功';
		data.并发数据 = name;   //如要删除之前表中的并发数据，则把此值传入防并发尾部中的like参数中
		return data;
	}
	else{
		data.状态 = '请不要重复提交';
		data.并发数据 = "";
		return data;
	}

}


/*
新防并发尾部处理
pg是从run传入的参数(必传){object}
like为并发头部传出来并发数据,处理完业务逻辑后传入可删除历史并发数据(必传){String}
*/
share.con_runend = function(pg,bfdata){

	var data = {};
	var date1=new Date();
	var nowtime=parseInt(date1.getTime()/1000);

    if(bfdata != "" && bfdata != null){
        var con = pgdb.query(pg,"delete from 三_新检表 where 录入时间 < "+nowtime+" and 名称='"+bfdata+"'");

		if(con.状态 !="成功"){
			data.状态 = '失败';
			return data;
		}
		else{
			data.状态 = '成功';
			return data;
		}
	}
	else{
        data.状态 = '无并发数据';
	    return data;
	}
	
    

}




/*
防并发尾部处理
like为并发头部传出来并发数据,处理完业务逻辑后传入可删除
pg是从run传入的参数
*/
share.con_end = function(like,pg){

	var data = {};
	var date1=new Date();
	var nowtime=parseInt(date1.getTime()/1000);

    if(like != ""){
        var con = pgdb.query(pg,"delete from 三_新检表 where 录入时间 < "+nowtime+" and 名称 like '%"+like+"%'");

		if(con.状态 !="成功"){
			data.状态 = '失败';
			return data;
		}
		else{
			data.状态 = '成功';
			return data;
		}
	}
	else{
        data.状态 = '无并发数据';
	    return data;
	}
	
    

}

/** 单人上限不能小于平均金额(总金额/传入人数)*/
share.jfhb_random = function(p,m,a){
    /*传入人数，总金额，单人上限*/
    var arr=[];
    nm=m*100;
    na=a*100;
    /*乘100，便于运算*/
    l=p;
    /*每次遍历后剩余人数*/
    for(i=0;i<p-1;i++){
        l--;
        arr[i]=roll(nm,l);
        /*传入剩余金额及人数*/
        nm-=arr[i];
        /*剩余金额*/
    }
    arr[p-1]=nm;
    /*最后一个人不用分*/
    if(arr[p-1]>na){
        return share.jfhb_random(p,m,a);
    }
    /*最后一个人如超过上限，重新分*/
    return arr.map(function(v,i,arr){
        return v=v/100;
    });
    /*分好了，每个数重新除以100，输出结果*/
 
    /*定义随机函数，传入剩余金钱和人数*/
    function roll(o,l){
        var b=o-l;
        /*每个人至少分1分钱*/
        var Max=Math.min(na,b);
        return Math.ceil(Math.random()*Max);
    }
}


module.exports = share;