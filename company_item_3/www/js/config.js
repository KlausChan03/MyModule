require.config({
  baseUrl: "/js/",
  paths: {
    //template层
    layui: "../template/layui/layui",

    //暂时不能调用
    wangEditor: "../template/wangediter/wangEditor.min",
    oss: "http://gosspublic.alicdn.com/aliyun-oss-sdk-4.4.4.min",    

    //lib层
    jquery: "lib/jquery.min",
    init: "lib/init",
    MD5: "lib/jQuery.md5",
    common: "lib/common",

    //ui层
    ui_index: "ui/ui_index",
    ui_main: "ui/ui_main",
    ui_bodyTab: "ui/ui_bodyTab",
    ui_leftNav: "ui/ui_leftNav",
    canvas_login: "ui/canvas_login",
    func_formControl: "ui/func_formControl",
    func_tableButton: "ui/func_tableButton",
    func_tableInit: "ui/func_tableInit",
    func_layer: "ui/func_layer",
    global_indexNews: "ui/global_indexNews",
    global_indexVideo: "ui/global_indexVideo",
    global_indexTemplate: "ui/global_indexTemplate"
  },
  map: {
    "*": {
      css: "lib/css"
    }
  },
  shim: {
    func_layer: ["css!/css/layer-set-myself.css", "layui"],
    MD5: ["jquery"],
    common: ["jquery"],
    func_tableButton: ["common"],
    func_formControl: ["common"],
    func_tableInit: ["common"],

    // 测试
    global_indexNews: [
      "layui",
      "jquery",
      "common",
      "init",
      "func_formControl",
      "func_tableButton",
      "func_tableInit",
      "func_layer",
      "wangEditor"
    ],
    global_indexVideo: [
      "layui",
      "jquery",
      "common",
      "init",
      "func_formControl",
      "func_tableButton",
      "func_tableInit",
      "func_layer",
      "oss"
    ],
    global_indexTemplate: [
      "layui",
      "jquery",
      "common",
      "init",
      "func_formControl",
      "func_tableButton",
      "func_tableInit",
      "func_layer"
    ]
  }
});

// require(['wangEditor','jquery'], function(){
// 	$(function(){
//       var E = window.wangEditor;
//       var editor = new E("#div1", "#div2");
// 	});
// });
