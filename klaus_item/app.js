// 加载依赖库，原来这个类库都封装在connect中，现在需地注单独加载
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var http = require("http");
<<<<<<< HEAD
var config = require("./function/config.js");
=======
var https = require("https");
var url = require("url");
var querystring = require("querystring");
var buffer = require("buffer");
>>>>>>> 2607991b77efc056aabed7517552384b71c86a2b

// 加载路由控制
var routes = require("./routes/index");
// var users = require('./routes/users');
var test = require("./routes/test");
var push = require("./routes/push");

// 创建项目实例
var app = express();

// 定义EJS模板引擎和模板文件位置，也可以使用jade或其他模型引擎
app.set("views", path.join(__dirname, "client/views"));
app.set("view engine", "ejs");

// 定义icon图标
// app.use(favicon(__dirname + '/public/images/favicon.ico'));
// 定义日志和输出级别
app.use(logger("dev"));
// 定义数据解析器
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 定义cookie解析器
app.use(cookieParser());
// 定义静态文件目录
app.use(express.static(path.join(__dirname, "client")));

// 匹配路径和路由
app.use("/", routes);
// app.use('/users', users);

<<<<<<< HEAD
app.post("/run", test.run);
app.post("/swim", push.swim);
=======
// app.post("/run", test.run);

app.post("/routes.post*", function(req, res) {
  var body = "";
  console.log("111111");
  // body += chunk;
  // console.log(body);
  try {
    console.log("-----------------接收参数-----------------");
    console.log(req.url + body);
    console.log("-----------------接收参数-----------------");
    var path = url.parse(req.url, true).query;
    body = querystring.parse(body);
    if (path.func != undefined) {
      body.func = path.func;
      console.log(body.func);
    } else if (body.func == undefined) {
      res.send('{"code":"-45","msg":" not find func "}').end();
      return;
    }
    body.session = req.session;
    body.path = req.path;
    body.arg = url.parse(req.url, true).query;
    body.startTime = new Date().getTime();
    // body.date = moment().format("YYYY-MM-DD HH:mm:ss");
    body.ip = req.ip;
    // body.uuid = uuid.v4();
    var ajax = require("./routes/ajax.js");
    var bool = ajax.searchfile(body.func);
    if (bool) {
      ajax.index(req, res, body);
    } else {
      console.log("kkk");

      res.send('{"code":"-4","msg":" not find func "}').end();
    }
  } catch (e) {
    console.log(e);
    res.send('{"code":"-1","msg":"body error"}').end();
  }
});
>>>>>>> 2607991b77efc056aabed7517552384b71c86a2b

// 404错误处理
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// 开发环境，500错误处理和错误堆栈跟踪
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

// 生产环境，500错误处理
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

// 输出模型app
module.exports = app;
