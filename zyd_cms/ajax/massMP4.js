var cipher = require("../func/cipher.js");
var config = require("../func/config.js");
var share = require("../ajax/public/share.js");
var logs = require("../func/logs.js");
var mongo = require("../func/mongo.js");
var pgdb = require("../func/pgdb.js");
var common = require("../func/common.js");
var request = require("../func/request.js");
var txsms = require("../func/txsms.js");
// var rongcloud = require("../func/rongcloud.js");
var moment = require("moment");
var transliteration = require("transliteration");
var sign = require("../func/sign.js");
var fs = require("fs");
var Fiber = require('fibers');

console.log()

config.readfile();
//var alioss = require('../func/alioss.js');
var co = require('co');
var OSS = require('ali-oss');


module.exports.run = function(body, pg, mo) {
    var p = {};
       body.receive = JSON.parse(body.data);
    var f = body.receive;

    f.时间 = moment().format('YYYYMMDDHHmmss');

    var client = new OSS({
        region: 'oss-cn-shenzhen',
        accessKeyId: 'LTAIRz4pA6Qeu12D',
        accessKeySecret: 'ZASbh3Xg1RtSo6VxwLnNkSlNvXNMYJ',
    });
    var fiber = Fiber.current;
    var data = {};
    var timeArr=[];
    co(function*() {
        client.useBucket('zyk-temp');
		
        data.result = yield client.multipartUpload(f.时间, f.img_list,{
        	progress: function*(p) {
                console.log('上传中: ' + (p * 100).toFixed(2) + '%');
				timeArr.push((p * 100).toFixed(2));
            }
        });
        fiber.run();
        return data;
    }).catch(function(err) {
        console.log(err);
    });
    Fiber.yield();
    var 信息 = data.result;
    console.log(信息)
    if (信息.res.status == 200 || 信息.res.statusCode == 200) {
        f.状态 = '上传成功';
    } else {
        f.状态 = '上传失败';
    }
    var address=(信息.res.requestUrls)[0].split("?")[0];
    sql = "select nextval('外卖黑名单表_id_seq') as id";
    var idreult=pgdb.query(pg, sql);
    var idfirst=idreult.数据[0]
    f.id=idfirst.id;
    sql = "insert into 外卖黑名单表 (id,类别) values ('"+ f.id+"','"+ address+"')";
    
	var reslutPgdb= pgdb.query(pg, sql);
	if(reslutPgdb.状态!="成功"){
		p.状态="上传失败";
	}else{
		p.状态 = f.状态;
	    p.name = 信息.name;
	    p.上传时间=timeArr;
	    p.地址 = (信息.res.requestUrls)[0].split("?")[0];
	}
    
    console.log(p)
    return common.removenull(p);

}