/*
内容:启动页（初始化数据）
开发人:谢敏 
开发时间：2017年12月2日 14:09:58
*/

var cipher = require('../func/cipher.js');
var config = require('../func/config.js');
var logs = require('../func/logs.js');
var mongo = require('../func/mongo.js');
var pgdb = require('../func/pgdb.js');
var common = require('../func/common.js');
var request = require('../func/request.js');
var moment = require("moment");
var fs = require('fs');
var uuid = require('uuid');
var redisdb = require('../func/redisdb.js');


module.exports.run = function(body, pg, mo, redis) {
	var p = {};
	var t = {};
	
	//解决乱码问题
	var bodys = decodeURIComponent(body.data);
	//获取头部的设备id（sid）
	var key  = body.headers.sid;
	/*AES Base64编码密文解密*/
	var f = cipher.AESdecryptBase64(bodys,key);

	pgdb.query(pg, "insert into 全_日志_非钱表 (卡号,账号,时间,ip,类别,状态,内容,录入人,录入时间,备注)values('', '', '" + body.date + "', '" + body.ip + "', '启动页（初始化数据）', '数据提交', '" + f + "', '系统', '" + body.date + "', 'PT_init.js')");

    //事务开始
    pgdb.query(pg, "BEGIN");
    p = run_con(f, pg, mo, redis ,key);
    //事务结束
    pgdb.query(pg, "COMMIT");
	
	pgdb.query(pg, "insert into 全_日志_非钱表 (卡号,账号,时间,ip,类别,状态,内容,录入人,录入时间,备注)values('', '', '" + body.date + "', '" + body.ip + "', '启动页（初始化数据）', '数据返回', '" + f + "', '系统', '" + body.date+ "', 'PT_init.js')");
	
	//转换srting 加密
	var str = JSON.stringify(p);
	/*AES加密 加密后输出Base64编码*/
	var data = cipher.AESencryptBase64(str,key)

	t._isRander = data;
    return common.removenull(t);
}


function run_con(body, pg, mo, redis,key) {
    var p = {};
	var f = {};
	f = JSON.parse(body);
    var sql = "";
    var field = "";
    f.时间 = moment().format('YYYY-MM-DD HH:mm:ss');
    f.日期 = moment().format('YYYY-MM-DD');
    f.分钟 = moment().format('HH:mm:ss');
	sql ="select id, 手机id  from  im_设备管理表 where  手机id = '"+key+"' limit 1";
	field = pgdb.query(pg, sql);
	if (field.length ==  0) {
		sql = "insert into im_设备管理表 (账号, 名称, 手机名称, 手机型号, 手机id, 版本, 活跃时间, 类别, 状态, 录入人, 录入时间,token ,备注) values ('', '', '" + f.手机名称 + "', '" + f.手机型号 + "', '" + key + "', '" + f.版本号 + "', '" + f.时间 + "', '"+f.类别+"', '正常', '系统', '" + f.时间 + "', '','')";
		console.log(sql)
		field = pgdb.query(pg, sql);
		if (field == null) {
				p.状态 = '数据异常-1001';
			return p;
	}
		
		} else{
			sql = "update im_设备管理表 set 活跃时间= '"+f.时间+"' where  手机id = '"+key+"'";
			console.log(sql)
			field = pgdb.query(pg, sql);
			if (field == null) {
				p.状态 = '数据异常-1002';
				return p;
			}
		}
		 
	
	 
	 
    


    //查询国家代码列表
    sql = "select 国家, 中文名, 代号, 国家码 from 全_海外国家短信码表 order by 代号";
    field = pgdb.query(pg, sql);
    if (field.length == 0) {
        f.国家代码 = '';
    } else {
        f.国家代码 = field;
        f.国家代码条数 = field.length;
    }

    //查询版本信息
    sql = "select 开始时间 as 安卓, 结束时间 as 苹果, 说明, 状态 from 全_设置表  where 类别 = '全球平台版本号' limit 1";
    field = pgdb.query(pg, sql);
    if (field.length == 0) {
        f.版本号 = '';
    } else {
        f.版本号 = field;
    }
	
    //查询    说明
    var sql = "select 内容,类别 from 全_说明表 where 状态 = '正常'";
    field = pgdb.query(pg, sql);
    if (field.length == 0) {
        f.说明列表 = '';
    } else {
        f.说明列表 = field;
        f.说明列表条数 = field.length;
    }


    //返出参数
	p.状态 = '成功';
    p.国家代码 = f.国家代码;
    p.版本号 = f.版本号;
    p.说明列表 = f.说明列表;
    return common.removenull(p);
}