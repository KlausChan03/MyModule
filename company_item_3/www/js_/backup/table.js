"use strict";

//获取iframe url的参数信息

var ifarme_func = window.top.document.getElementsByClassName("iframe_");
var tb_id = GetRequest(ifarme_func).page_id;
var pic_type = GetRequest(ifarme_func).pic_type;
var rich_open = GetRequest(ifarme_func).rich_open;
var video_open = GetRequest(ifarme_func).video_open;
var sql_type = GetRequest(ifarme_func).sql_type;
var form_special_control = {};
var data = {};
var toolbar = true;

// 新方法实现数据渲染
layui.use(["table", "form", "upload"], function () {
  var table = layui.table;
  var form = layui.form;
  var upload = layui.upload;
  var $ = layui.jquery;
  //存数据
  data.field = "";
  //验证表名
  data.tb_id = tb_id;
  data.type = "all";
  var obj_save = {
    datas: [data.field, data.tb_id, data.type],
    func: GetRequest(ifarme_func).func
  };

  var success_func = function success_func(res) {
    // 表格标题渲染
    var tb_title = res.表格名称;
    tb_title = tb_title.replace("表", "").replace(/^[\u2E80-\u9FFF]_/, "");
    $(".table-title").html(tb_title);

    changeTableStutas(res, toolbar);

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
                $(".layui-hide").append('<a class="layui-btn layui-btn-mini" lay-event="edit"><i class="layui-icon" style="font-size: 16px; color: #eee;">&#xe642;</i>' + key_arr[j] + "</a>");
                break;
              case "删除":
                $(".layui-hide").append('<a class="layui-btn layui-btn-danger layui-btn-mini" lay-event="del"><i class="layui-icon" style="font-size: 16px; color: #eee;">&#x1006;</i>' + key_arr[j] + "</a>");
                break;
            }
          } else if (key_arr[j] == "新增" || key_arr[j] == "批量删除") {
            switch (key_arr[j]) {
              case "新增":
                $(".layui-btn-group").append('<a class="layui-btn layui-btn-normal layui-btn-mini" data-type="insertData"> <i class="layui-icon">&#xe654;</i>' + key_arr[j] + " </a>");
                break;
              case "批量删除":
                $(".layui-btn-group").append('<a class="layui-btn layui-btn-normal layui-btn-mini" data-type="deleteData" style="margin-left:10px!important"> <i class="layui-icon">&#xe640;</i>' + key_arr[j] + " </a>");
                break;
            }
          }
        }
      } else {
        toolbar = false;
      }

      // 获取按钮后表格内按钮重载
      table.reload("test");

      // 获取按钮后表格外按钮重载
      $(".layui-btn").on("click", function () {
        var type = $(this).data("type");
        active[type] ? active[type].call(this) : "";
      });
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
            parent.window.location.href = "/page/login/login.html";
          }
        });
      }
    };
    ajax.ajax_common(obj_save, success_func, error_func);

    /**
     * 单条查询10/21 zhou
     */
    // 搜索刷新列表
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
        func: GetRequest(ifarme_func).func
      };
      var success_func = function success_func(res) {
        // 生成表格
        var resSingle = res;
        toolbar = true;
        changeTableStutas(resSingle, toolbar);
      };
      var error_func = function error_func(res) {
        console.log(res);
        if (res.状态 == "获取列表异常") {
          layer.alert("查询无结果", { icon: 2 }, function () {
            history.go(0);
          });
        } else {
          layer.alert(res.状态, { icon: 2 }, function () {
            history.go(0);
          });
        }
      };
      ajax.ajax_common(obj_save, success_func, error_func);
    });

    //表格内功能工具条
    table.on("tool(demo)", function (obj) {
      //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
      var data = obj.data,
          //获得当前行数据
      layEvent = obj.event; //获得 lay-event 对应的值
      switch (layEvent) {
        case "detail":
          layer.msg("查看操作");
          break;
        case "del":
          layer.confirm("确认删除该数据？", function (index) {
            var select_id = [];
            select_id.push(data.id);
            table_act.delete(res, tb_id, select_id);
            obj.del(); //删除对应行（tr）的DOM结构
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
      getCheckData: function getCheckData() {
        var checkStatus = table.checkStatus("test"),
            data = checkStatus.data;
        layer.alert(JSON.stringify(data));
      },
      getCheckLength: function getCheckLength() {
        var checkStatus = table.checkStatus("test"),
            data = checkStatus.data;
        layer.msg("选中了：" + data.length + " 个");
      },
      isAll: function isAll() {},
      parseTable: function parseTable() {
        table.init("parse-table-demo");
      },
      insertData: function insertData() {
        table_act.insert(res, tb_id);
      },
      deleteData: function deleteData() {
        var checkStatus = table.checkStatus("test"),
            data = checkStatus.data;
        var select_id = [];
        for (var i in checkStatus.data) {
          select_id.push(checkStatus.data[i].id);
        }
        if (select_id.length > 1) {
          layer.confirm("确认删除该数据？", function (index) {
            table_act.delete(res, tb_id, select_id);
            layer.close(index);
          });
        } else {
          layer.msg("请选择多项数据");
        }
      }
    };
  };
  var error_func = function error_func(res) {
    // console.log(res);
    if (res.状态 == "获取列表异常") {
      //渲染标题
      var tb_title = res.表格名称;
      tb_title = tb_title.replace("表", "");
      $(".table-title").html(tb_title);

      $(".layui-form").append("<img class='no-data' src='../../images/no_data.png' />");
      // $(".no-data").css({"width":"100px","height":"100px"})
    }
  };
  ajax.ajax_common(obj_save, success_func, error_func);
});

/**
 * 2017/10/23 write by zhou
 * 封装渲染表格
 * @param {Object} res
 */
function changeTableStutas(res, toolbar) {
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
      $(".select-test").append("<option value='" + i + "'>" + i + "</option>");
    }
    // 头部单独处理

    // 引入正序和倒序排序(sort)
    // th[2].sort = true;
    // for (i in th) {
    //   if (th[i].field == "录入时间") {
    //     var that = th[i];

    //     function get_sort(arg1) {
    //       this.sort = true;
    //       this.minWidth = 200;
    //     }
    //     get_sort.apply(that);
    //   }


    //   if (th[i].field == "id") {
    //     var that = th[i];

    //     function set_width(arg1) {
    //       this.minWidth = 80;
    //       this.sort = true;
    //     }
    //     set_width.apply(that);
    //   }


    //   if (th[i].field == "状态") {
    //     var that = th[i];

    //     function set_width(arg1) {
    //       this.sort = true;
    //     }
    //     set_width.apply(that);
    //   }
    //   if (th[i].field == "排序") {
    //     var that = th[i];

    //     function set_width(arg1) {
    //       this.sort = true;
    //     }
    //     set_width.apply(that);
    //   }
    // }

    // 生成表格
    table.render({
      // initSort: {
      //   field: "录入时间", //排序字段，对应 cols 设定的各字段名
      //   type: "desc" //排序方式  asc: 升序、desc: 降序、null: 默认排序
      // },
      elem: "#demo",
      id: "test",
      data: res.列表,
      width: "auto",
      cols: [th],
      skin: "row", //表格风格
      even: true,
      page: true, //是否显示分页
      limits: [10, 15, 20, 50, 100, 500],
      limit: 20 //每页默认显示的数量
    });
  });
}