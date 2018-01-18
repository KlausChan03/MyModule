"use strict";

//获取iframe url的参数信息

var ifarme_func = window.top.document.getElementsByClassName("iframe_");
var tb_id = GetRequest(ifarme_func).page_id;
// var pic_type = GetRequest(ifarme_func).pic_type;
// var rich_open = GetRequest(ifarme_func).rich_open;
// var video_open = GetRequest(ifarme_func).video_open;
// var sql_type = GetRequest(ifarme_func).sql_type;
var func_arr = GetRequest(ifarme_func).func;
var get_func = [];
get_func[0] = func_arr.split("+")[0];
get_func[1] = func_arr.split("+")[1];
get_func[2] = func_arr.split("+")[2];
// console.log(get_func[0],get_func[1],get_func[2])

var form_special_control = {};
var data = {};
var toolbar = true;

// 新方法实现数据渲染
layui.use(["table", "form", "upload"], function () {
  var table = layui.table;
  var form = layui.form;
  var upload = layui.upload;
  var $ = layui.jquery;
  //存数据和表名
  data.field = "";
  data.tb_id = tb_id;
  data.type = "all";
  var obj_save = {
    datas: [data.field, data.tb_id, data.type],
    func: get_func[0]
  };

  var success_func = function success_func(res) {
    // 表格标题渲染
    var tb_title = res.表格名称;
    // tb_title = tb_title.replace("表", "").replace(/^[\u2E80-\u9FFF]_/, "");
    tb_title = tb_title.replace("表", "").replace(/^[a-z]{0,8}_/, "");
    $(".table-title").html(tb_title);
    table_render(res, toolbar);
    insertButton(table, res);

    //单条查询10/21 zhou


    form.on("select(search)", function (data) {
      console.log(data.value); //得到被选中的值
      if (data.value == "id") {
        $("#souVal").attr({
          onclick: "input_test2(this);",
          onkeyup: "input_test2(this);"
        });
      } else {
        $("#souVal").attr({ onclick: onclick, onkeyup: onkeyup });
      }
    });

    //搜索刷新列表
    form.render("select");

    $("#seacherButton").on("click", function () {
      var syllable = $(".layui-select-title input").val();
      var syllableVal = $("#souVal").val();

      var data = {};
      data.field = [syllable, syllableVal];
      data.tb_id = tb_id;
      data.type = "one";
      var obj_save = {
        datas: [data.field, data.tb_id, data.type],
        func: get_func[0]
      };
      var success_func = function success_func(res) {
        // 生成表格
        var resSingle = res;
        toolbar = true;
        table_render(resSingle, toolbar);
      };
      var error_func = function error_func(res) {
        if (res.状态 == "获取列表异常") {
          layer.alert("查询无结果", { icon: 2 }, function (index) {
            layer.close(index);
          });
        } else {
          layer.alert(res.状态, { icon: 2 }, function (index) {
            // layer.close(index);
            history.go(0);
          });
        }
      };
      ajax.ajax_common(obj_save, success_func, error_func);
    });
  };
  var error_func = function error_func(res) {
    if (res.状态 == "获取列表异常") {
      //渲染标题
      var tb_title = res.表格名称;
      tb_title = tb_title.replace("表", "").replace(/^[\u2E80-\u9FFF]_/, "");
      $(".table-title").html(tb_title);
      table_render(res, toolbar);
      insertButton(table, res);
      $("section .table-container").html("<img class='no-data' src='/images/no_data.png'>");
    }
  };
  ajax.ajax_common(obj_save, success_func, error_func);
});

/**
 * 2017/10/23 write by zhou
 * 封装渲染表格
 * @param {Object} res
 */

function table_render(res, toolbar) {
  layui.use(["table", "form"], function () {
    var table = layui.table;
    var bar_set = $(".layui-hide .layui-btn").length;
    var th = [];

    // 引入工具条
    if (toolbar == "flase") {
      th.push({ checkbox: true, fixed: true, align: "center" });
    } else {
      th.push({ checkbox: true, fixed: true, align: "center" }, {
        title: "操作",
        toolbar: "#act-bar",
        width: 180,
        fixed: true,
        align: "center"
      });
    }
    // 插入表格头部
    for (var i in res.列表[0]) {
      th.push({ field: i, title: i, minWidth: 150, align: "center" });
      $(".select-test").append("<option value=\"" + i + "\">" + i + "</option>");
    }

    // 头部单独处理
    // 引入正序和倒序排序(sort)
    th[2].sort = true;
    for (var _i in th) {
      if (th[_i].field == "录入时间") {
        var get_sort = function get_sort(arg1) {
          this.sort = true;
          this.minWidth = 200;
        };

        var that = th[_i];

        get_sort.apply(that);
      }
      if (th[_i].field == "id") {
        var set_width = function set_width(arg1) {
          this.minWidth = 80;
          this.sort = true;
        };

        var that = th[_i];

        set_width.apply(that);
      }
      if (th[_i].field == "排序") {
        var _set_width = function _set_width(arg1) {
          this.sort = true;
        };

        var that = th[_i];

        _set_width.apply(that);
      }
    }

    // 生成表格
    table.render({
      elem: "#demo",
      id: "common-table",
      data: res.列表,
      width: "auto",
      cellMinWidth: "120px",
      height: "full-155",
      cols: [th],
      skin: "row", //表格风格
      even: true,
      page: true, //是否显示分页
      limits: [10, 15, 20, 50, 100, 500],
      limit: 20 //每页默认显示的数量
    });
  });
}

function insertButton(table, res) {
  // 功能按钮渲染
  var obj_save = { datas: tb_id, func: "admin_control_function" };
  var success_func = function success_func(res) {
    if (res.keyPower != "") {
      var key_arr = [];
      for (var i in res.keyPower) {
        key_arr.push(res.keyPower[i]);
      }
    }
    if (key_arr != "") {
      for (var j in key_arr) {
        if (key_arr[j] == "删除" || key_arr[j] == "编辑") {
          switch (key_arr[j]) {
            case "编辑":
              $(".layui-hide").append("<a class=\"layui-btn layui-btn-mini\" lay-event=\"edit\"><i class=\"layui-icon\" style=\"font-size: 16px; color: #eee;\">&#xe642;</i> " + key_arr[j] + "</a>");
              break;
            case "删除":
              $(".layui-hide").append("<a class=\"layui-btn layui-btn-danger layui-btn-mini\" lay-event=\"del\"><i class=\"layui-icon\" style=\"font-size: 16px; color: #eee;\">&#x1006;</i> " + key_arr[j] + "</a>");
              break;
          }
        } else if (key_arr[j] == "新增" || key_arr[j] == "批量删除") {
          switch (key_arr[j]) {
            case "新增":
              $(".layui-btn-group").append("<a class=\"layui-btn layui-btn-normal layui-btn-mini\" data-type=\"insertData\"> <i class=\"layui-icon\">&#xe654;</i> " + key_arr[j] + " </a>");
              break;
            case "批量删除":
              $(".layui-btn-group").append("<a class=\"layui-btn layui-btn-normal layui-btn-mini\" data-type=\"deleteData\" style=\"margin-left:10px!important\"> <i class=\"layui-icon\">&#xe640;</i> " + key_arr[j] + " </a>");
              break;
          }
        }
      }
    } else {
      toolbar = false;
    }

    // 通用按钮(无限制)
    // 刷新
    $(".layui-btn-group").append("<a class=\"layui-btn layui-btn-normal layui-btn-mini btn-refresh\" data-type=\"refresh\" style=\"margin-left:10px!important\"> <i class=\"layui-icon\">&#x1002;</i>\u5237\u65B0</a>");

    $(".btn-refresh").mouseover(function () {
      $(".btn-refresh").find("i").addClass("layui-anim layui-anim-rotate layui-anim-loop");
    });
    $(".btn-refresh").mouseout(function () {
      $(".btn-refresh").find("i").removeClass("layui-anim layui-anim-rotate layui-anim-loop");
    });

    // 获取按钮后表格外按钮重载
    $(".layui-btn").on("click", function () {
      var type = $(this).data("type");
      active[type] ? active[type].call(this) : "";
    });

    // 获取按钮后表格内按钮重载
    table.reload("common-table");
  };
  var error_func = function error_func(res) {
    if (res.状态 == "当前未登录") {
      parent.layer.open({
        type: 1,
        title: "信息",
        area: "310px",
        id: "LAY_layuipro",
        btn: ["确定"],
        content: '<div style="padding:15px 20px; text-align:justify; line-height: 22px; text-indent:2em;border-bottom:1px solid #e2e2e2;"><p>登陆已超时</p></div>',
        yes: function yes() {
          parent.window.location.href = "/page/login.html";
        }
      });
    }
  };
  ajax.ajax_common(obj_save, success_func, error_func);

  //表格内功能工具条
  table.on("tool(demo)", function (obj) {
    //注：tool是工具条事件名，common-table是table原始容器的属性 lay-filter="对应的值"
    var data = obj.data,
        //获得当前行数据
    layEvent = obj.event; //获得 lay-event 对应的值
    switch (layEvent) {
      case "detail":
        layer.msg("查看操作");
        break;
      case "del":
        layer.confirm("\u786E\u8BA4\u5220\u9664 id=" + data.id + " \u6B64\u6761\u6570\u636E\uFF1F", { title: "删除" }, function (index) {
          var select_id = [];
          select_id.push(data.id);
          table_act.delete(res, tb_id, select_id);
          // obj.del(); //删除对应行（tr）的DOM结构
          layer.close(index);
        });
        break;
      case "edit":
        table_act.update(res, tb_id, data);
        break;
    }
  });

  //表格外功能工具条
  var active = {
    refresh: function refresh() {
      history.go(0);
    },
    insertData: function insertData() {
      table_act.insert(res, tb_id);
    },
    deleteData: function deleteData() {
      var checkStatus = table.checkStatus("common-table"),
          data = checkStatus.data;
      var select_id = [];
      for (var i in checkStatus.data) {
        select_id.push(checkStatus.data[i].id);
      }
      if (select_id.length > 1) {
        layer.confirm("\u786E\u8BA4\u5220\u9664 id=" + select_id + " \u6B64 " + select_id.length + " \u6761\u6570\u636E\uFF1F", { title: "批量删除" }, function (index) {
          table_act.delete(res, tb_id, select_id);
          layer.close(index);
        });
      } else {
        layer.msg("请选择多项数据");
      }
    }
  };
}