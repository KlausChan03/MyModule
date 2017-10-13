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

  var ifarme_func = window.top.document.getElementsByClassName("iframe_");
  var obj_save = { datas: {}, func: GetRequest(ifarme_func).func };
  var success_func = function(res) {
    var th=[];
    th.push( { checkbox: true, fixed: true, align:'center' },{"title":"操作",toolbar: '#act-bar', width:150, fixed: true,align:'center'});
    for (i in res.列表[0]){ th.push({"field":i,"title":i,"width": "120","align":"center"});}
    th[2].sort = true;
   
    // 宽度监测
    // function change_width() {
    //     window_width = window.innerWidth-20;    
    //     console.log(window_width);   
    // }
    // change_width();
    // window.onresize = function(){
    //     change_width()
    // };
    window.demoTable = table.render({
      elem: "#demo",
      id:"test",
      data: res.列表,
      width: "auto",
      cols: [th],
      skin: "row", //表格风格
      even: true,
      page: true, //是否显示分页
      limits: [10, 15, 20],
      limit: 15 //每页默认显示的数量
    });

    var $ = layui.jquery, active = {
        getCheckData: function () {
            var checkStatus = table.checkStatus('test')
                , data = checkStatus.data;
            layer.alert(JSON.stringify(data));
        }
        , getCheckLength: function () {
            var checkStatus = table.checkStatus('test')
                , data = checkStatus.data;
            layer.msg('选中了：' + data.length + ' 个');
        }
        , isAll: function () {
            var checkStatus = table.checkStatus('test');
            // layer.msg(checkStatus.isAll ? '全选' : '未全选');
            layObj.form("新增");
        }
        , parseTable: function () {
            table.init('parse-table-demo');
        }
    };

    $('.layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
    
  };
  ajax.ajax_common(obj_save, success_func);
});
