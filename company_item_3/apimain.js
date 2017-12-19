var express = require("express");
var Fiber = require("fibers");
var http = require("http");
var https = require("https");
var url = require("url");
var fs = require("fs");
var path = require("path");
var querystring = require("querystring");
var uuid = require("uuid");
var session = require("express-session");
var moment = require("moment");
var config = require("./func/config.js"); //引用config目录内的config.js文件//执行读取缓存文件配置方法(必须在使用之前调用,缓存具体使用方法请参考config.js注释)
var cipher = require("./func/cipher.js");

var logs = require("./func/logs.js");

var version = "1.9.0";

console.log("version:" + version);

config.readfile();

/**进程错误监控*/

process.on("uncaughtException", function(err) {
  console.log(err.stack);
  logs.write("err", err.stack);
});

process.on("SyntaxError", function(err) {
  console.log(err.stack);
  logs.write("err", err.stack);
});

/**进程错误监控*/

/**http服务及https服务*/

var app = express();

//session存储时间 30分钟（单位=毫秒）
var sessionTime = 30 * 60 * 1001;

app.use(session({
  resave:true,
  secret: uuid.v4(), //secret的值建议使用随机字符串
  saveUninitialized: true,
  cookie: {maxAge: sessionTime} // 过期时间（毫秒）
}));

var server = http.createServer(app);

server.listen(config.get("app").main.httpPort, function() {
  console.log("HTTP SERVER 启动成功! 监听端口:" + config.get("app").main.httpPort);
});

if (
  config.get("app").main.httpsPort != 0 ||
  config.get("app").main.httpsPort != "0"
) {
  //https证书配置
  var options = {
    key: fs.readFileSync("./config/https.key"),
    cert: fs.readFileSync("./config/https.pem")
  };

  //https监听启动
  https
    .createServer(options, app)
    .listen(config.get("app").main.httpsPort, function() {
      console.log("Https server  启动成功! 监听端口:" + config.get("app").main.httpsPort);
    });
}

app.use(express.static("www"));
app.set("views", path.join(__dirname, "www"));
app.set("view engine", "ejs");


app.post("/ajax.post*", function(req, res) {
  var body = "";
  req
    .on("data", function(chunk) {
      body += chunk;
    })
    .on("end", function() {
      try {
        console.log("-----------------接收参数-----------------");
        console.log(req.url + " ----- " + body);
        console.log("-----------------接收参数-----------------");
        var path = url.parse(req.url, true).query;
        body = querystring.parse(body);
        if (path.func != undefined) {
          body.func = path.func;
        } else if (body.func == undefined) {
          res.send('{"code":"-45","msg":" not find func "}').end();
          return;
        }
        body.session = req.session;
        body.path = req.path;
        body.arg = url.parse(req.url, true).query;
        body.startTime = new Date().getTime();
        body.date = moment().format("YYYY-MM-DD HH:mm:ss");
        body.ip = req.ip;
        body.uuid = uuid.v4();
        var ajax = require("./ajax/ajax.js");
        var bool = ajax.searchfile(body.func);
        if (bool) {
          ajax.index(req, res, body);
        } else {
          res.send('{"code":"-4","msg":" not find func "}').end();
        }
      } catch (e) {
        console.log(e);
        res.send('{"code":"-1","msg":"body error"}').end();
      }
    });
});



app.get("/*.xhtml", function(req, res) {
  var data = {};
  data.method = "GET";
  data.path = req.path;
  data.arg = url.parse(req.url, true).query;
  data.startTime = new Date().getTime();
  data.session = req.session;
  data.date = moment().format("YYYY-MM-DD HH:mm:ss");
  data.ip = req.ip;
  data.uuid = uuid.v4();
  var main = require("./routes/app_routes_main.js");
  main.index(req, res, data);
  //	console.log(data)
});

app.post("/*.xhtml", function(req, res) {
  var body = "";
  req
    .on("data", function(chunk) {
      body += chunk;
    })
    .on("end", function() {
      var data = {};
      data.method = "POST";
      data.path = req.path;
      data.arg = url.parse(req.url, true).query;
      data.data = querystring.parse(body);
      data.startTime = new Date().getTime();
      data.session = req.session;
      data.date = moment().format("YYYY-MM-DD HH:mm:ss");
      data.ip = req.ip;
      data.uuid = uuid.v4();
      var main = require("./routes/app_routes_main.js");
      main.index(req, res, data);
      //		console.log(data)
    });
});

//404处理
// app.use(function(req, res, next) {
//   res.status(404).send('Sorry cant find that!');
// });

/**http服务及https服务*/

var schedule = require("node-schedule");

/**定时任务--每分钟执行一次*/
var rule = new schedule.RecurrenceRule();
var times = [0, 30];
rule.second = times;
var timeStart = schedule.scheduleJob(rule, function() {
  if (config.get("app").postgresql.使用 == "是") {
    var pgdb = require("./func/pgdb.js");
    console.log("postgresql当前连接数" + pgdb.pool._count);
    console.log("postgresql可用连接数" + pgdb.pool._availableObjects.length);
  }

  if (config.get("app").mongodb.使用 == "是") {
    var mongo = require("./func/mongo.js");
    console.log("mongodb当前连接数" + mongo.pool._count);
    console.log("mongodb可用连接数" + mongo.pool._availableObjects.length);
  }

  if (config.get("app").redis.使用 == "是") {
    var redisdb = require("./func/redisdb.js");
    console.log("redis当前连接数" + redisdb.pool._count);
    console.log("redis可用连接数" + redisdb.pool._availableObjects.length);
  }

  if(config.get('app').mysql.使用 == '是') {
  	var mysql = require('./func/mysql.js');
  	console.log("mysql当前连接数" + mysql.pool._count);
  	console.log("mysql可用连接数" + mysql.pool._availableObjects.length);
  }
});

//文件上传
var formidable = require("formidable");
app.post("/temp", function(req, res) {
  var data = {};
  var form = new formidable.IncomingForm(); //实例化formidable对象
  var dir = path.normalize(__dirname + "/temp/"); //路径
  form.uploadDir = dir; //更改上传地址
  if (fs.existsSync(dir) == false) {
    fs.mkdirSync(dir);
  }
  form.parse(req, function(err, fields, files) {
    //图片传入及解析
    if (err) {
      data.状态 = "文件保存失败";
      res.send(data).end();
    } else {
      var length = 0;
      for (item in files) {
        length++;
      }
      if (length === 0) {
        data.状态 = "文件保存失败";
        res.send(data).end();
        return;
      }
      for (item in files) {
        var file = files[item];
        var type = file.name.split(".")[1];
        var ttt = moment().format("YYYYMMDDHHmmss");
        var ran = parseInt(Math.random() * 89999 + 10000);
        var oldpath = file.path;
        var newName = ttt + ran;
        var newpath = path.normalize(
          __dirname + "/temp/" + newName + "." + type
        );
        fs.rename(oldpath, newpath, function(err) {
          if (err) {
            data.状态 = "文件改名失败";
            res.send(data).end();
          } else {
            data.状态 = "成功";
            data.newpath = newpath;
            res.send(data).end();
          }
        });
      }
    }
  });
});
