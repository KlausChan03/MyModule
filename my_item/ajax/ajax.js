var Fiber = require('fibers');
var fs = require('fs');
var config = require('../func/config.js');
var pgdb = require('../func/pgdb.js');
var mongo = require('../func/mongo.js');
var logs = require('../func/mongo.js');
var async = require('async');

var ajax = {};

ajax.index = function(req,res,body){


	var conf = config.get('app');
	var obj = new Object();

	var fiber = Fiber(function (cb){
		/**---------pg-------*/
		if(conf.postgresql.使用 == '是'){
			pgdb.start(obj.pg);//数据库事务开始
		}
		/**---------pg-------*/

		var func = require('./'+body.func+'.js');

		body.send = func.run(body,obj.pg,obj.mongo);

		/**---------pg-------*/
		if(conf.postgresql.使用 == '是'){
			pgdb.end(obj.pg);//数据库事务结束
		}
		/**---------pg-------*/

		cb(null,'');
	});



	async.waterfall([
		function(cb){
			if(conf.postgresql.使用 != '是'){
				cb(null,'');
				return;
			}
			pgdb.open(function(err,client,done){
				if(err){
					console.log('连接pg数据库失败!');
					logs.write('err','错误:连接PG数据库失败,错误信息:'+err);
					res.status(200).send('{"code":-20005,"message":"postgresql error"}');
					res.end();
				}else{
					client.done = done;
					obj.pg = client;
					cb(null,'');
				}
			});
		},
		function(j,cb){
			if(conf.mongodb.使用 != '是'){
				cb(null,'');
				return;
			}
			mongo.open(function(err,db){
				if(err){
					console.log(err);
					console.log('连接Mongo数据库失败!');
					logs.write('mongodb','错误:连接Mongo数据库失败,错误信息:'+err);
					res.status(200).send('{"code":-20006,"message":"mongodb error"}');
					res.end();
				}else{
					obj.mongo = db;
					cb(null,'');
				}
			});
		},
		function(j,cb){
			fiber.run(cb);
		}
	], function (err, result) {

			fiber = null;
			res.status(200).send(body.send);
			res.end();
			body.endTime = new Date().getTime();
			body.Time = body.endTime - body.startTime;
			// body.send.Time = body.Time;
			console.log('---------------------------------');
			console.log('ajax接口:'+body.func+'---运行时间:'+body.Time+'毫秒');
			console.log('---------------------------------');

			pgdb.close(obj.pg);

			if(conf.mongodb.使用 == '是'){
				obj.mongo.collection(conf.main.servername+'_ajaxLogs').save(body,function(err,result){
					if(err){
						logs.write('ajaxLogs','MongoDB_ajaxLogs_error:'+err);
					}
					mongo.close(obj.mongo);//连接释放
				});

			}


	})




}

ajax.searchfile = function(fileName){

	var files = fs.readdirSync(__dirname);
	for(var i = 0 ; i < files.length ; i++){
		if(files[i] == fileName+".js"){
			return true;
		}
	}

	return false;
}






module.exports = ajax;