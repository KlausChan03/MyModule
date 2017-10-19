"use strict";
// 旧方法实现数据渲染
// $(".table-container table thead").append("<tr></tr>")
// for (i in res.列表[0]) {
//     $(".table-container table thead").append("<th>" + i + "</th>")
//     // $(".table-container table tbody").append("<th>" + res.列表[0][i] + "</th>")
// }
// for (j in res.列表) {
//     $(".table-container table tbody").append("<tr></tr>")
//     for (k in res.列表[j]) {
//         $(".table-container table tbody tr:eq(" + j + ")").append("<th>" + res.列表[j][k] + "</th>")
//         $("tbody tr").off("click").on("click",function () {
//             var pos = $(this).position().top;
//             $(window).scrollTop(pos);
//         })
//     }
// }

// 新方法实现数据渲染
layui.use("table", function() {
  var table = layui.table;
  var $ = layui.jquery;
  var ifarme_func = window.top.document.getElementsByClassName("iframe_");
  var tb_id = GetRequest(ifarme_func).bc_id;
  var data={};
  data.field = "";
  data.tb_id = tb_id;
  var obj_save = { datas: [data.field,data.tb_id], func: GetRequest(ifarme_func).func };

  var success_func = function(res) {
    // 数据处理
    var bar_set = $(".layui-hide .layui-btn").length;
    var th = [];
    th.push(
      { checkbox: true, fixed: true, align: "center" },
      { title: "操作", toolbar: "#act-bar", width: 80 * bar_set, fixed: true, align: "center" }
    );
    for (var i in res.列表[0]) {
      th.push({ field: i, title: i, width: "120", align: "center" });
    }
    th[2].sort = true;

    // 生成表格
    window.demoTable = table.render({
      elem: "#demo",
      id: "test",
      data: res.列表,
      width: "auto",
      cols: [th],
      skin: "row", //表格风格
      even: true,
      page: true, //是否显示分页
      limits: [10, 15, 20],
      limit: 15 //每页默认显示的数量
    });

    
    

    //表格内功能工具条
    table.on("tool(demo)", function(obj) {
      //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
      var data = obj.data, //获得当前行数据
        layEvent = obj.event; //获得 lay-event 对应的值
      switch (layEvent) {
        case "detail":
          layer.msg("查看操作");
          break;
        case "del":
          layer.confirm("确认删除该数据？", function(index) {
            var select_id = data.id;
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

    // 宽度监测
    // function change_width() {
    //     window_width = window.innerWidth-20;
    //     console.log(window_width);
    // }
    // change_width();
    // window.onresize = function(){
    //     change_width()
    // };

    //表格外功能工具条
    var active = {
      getCheckData: function() {
        var checkStatus = table.checkStatus("test"),
          data = checkStatus.data;
        layer.alert(JSON.stringify(data));
      },
      getCheckLength: function() {
        var checkStatus = table.checkStatus("test"),
          data = checkStatus.data;
        layer.msg("选中了：" + data.length + " 个");
      },
      isAll: function() {},
      parseTable: function() {
        table.init("parse-table-demo");
      },
      insertData: function() {
        table_act.insert(res, tb_id);
      },
      updateData: function() {
        table_act.update(res, tb_id, data);
      }
    };

    $(".layui-btn").on("click", function() {
      var type = $(this).data("type");
      active[type] ? active[type].call(this) : "";
    });
  };
  
  ajax.ajax_common(obj_save, success_func);
});



var table_act = {};
// 删除功能
table_act.delete = function(res, tb_id, select_id){
  var data={};
  data.tb_id = tb_id;
  data.select_id = {"id":select_id};
  var obj_save = { datas: [data.select_id, data.tb_id], func: "BC_delete" };
  var success_func = function(res) { layer.alert(res.状态, function() { layer.closeAll();history.go(0) }); };
  var error_func = function(res) { layer.alert(res.状态, function() { layer.closeAll();history.go(0) }); };
  ajax.ajax_common(obj_save, success_func, error_func);
}
// 新增功能
table_act.insert = function(res, tb_id) {
  var test_arr = [];
  for (i in res.列表[0]) {
    test_arr.push(i);
  }
  var test = "";
  test_arr.pop();
  for (var i = 0; i < test_arr.length; i++) {
    test +=
      '<div class="layui-form-item"><label class="layui-form-label">' +
      test_arr[i] +
      '</label> <div class="layui-input-block"> <input type="text" name="' +
      test_arr[i] +
      '"   placeholder="请输入' +
      test_arr[i] +
      '" autocomplete="off" class="layui-input insert-input"> </div> </div>';
  }

  var success_func = function() {
    $("*[name='id']").attr("disabled", "true");

    layui.use("form", function() {
      var form = layui.form;
      // console.log(tb_id)
      form.on("submit(formDemo)", function(data) {
        data.tb_id = tb_id;
        var obj_save = { datas: [data.field, data.tb_id], func: "BC_insert_update" };
        var success_func = function(res) { layer.alert(res.状态, function() { layer.closeAll();history.go(0) }); };
        var error_func = function(res) { layer.alert(res.状态, function() { layer.closeAll();history.go(0) }); };
        ajax.ajax_common(obj_save, success_func, error_func);
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
      });
    });
  };
  layObj.form("新增", success_func,test, tb_id);
};
// 编辑功能
table_act.update = function(res, tb_id, data) {
  var test_arr = [];
  var old_arr = [];
  for (i in res.列表[0]) {
    test_arr.push(i);
  }
  for (var j in data) {
    old_arr.push(data[j]);
  }
  var test = "";
  test_arr.pop();
  for (var i = 0; i < test_arr.length; i++) {
    // 特殊编码转义
    old_arr[i] = old_arr[i].replace(/'/g, "&#39;").replace(/"/g, "&quot;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
    test +='<div class="layui-form-item"><label class="layui-form-label">' +
      test_arr[i] +
      '</label> <div class="layui-input-block"> <input type="text" name="' +
      test_arr[i] +
      '" autocomplete="off" value="'+
      old_arr[i]+'" class="layui-input insert-input"> </div> </div>';
  }

  var success_func = function() {
    $("*[name='id']").attr("disabled", "true");
    $("*[name='id']").attr("placeholder", "");

    layui.use("form", function() {
      var form = layui.form;
      form.on("submit(formDemo)", function(data) {
        data.tb_id = tb_id;
        var obj_save = { datas: [data.field, data.tb_id], func: "BC_insert_update" };
        var success_func = function(res) { layer.alert(res.状态, function() { layer.closeAll();history.go(0) }); };
        var error_func = function(res) { layer.alert(res.状态, function() { layer.closeAll();history.go(0) }); };
        ajax.ajax_common(obj_save, success_func, error_func);
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
      });
    });
  };
  layObj.form("编辑", success_func, test, tb_id);
};
