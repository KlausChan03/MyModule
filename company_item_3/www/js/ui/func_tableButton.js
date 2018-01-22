"use strict";
var table_act = {};

table_act.insert_name = window.sessionStorage.getItem("name");
table_act.insert_time = getTime();

// 删除功能
table_act.delete = function(res, tb_id, select_id) {
    var g = {};
    g.tb_id = tb_id;
    g.select_id = { id: select_id };
    var obj_save = { datas: [g.select_id, g.tb_id], func: get_func[2] };
    var success_func = function(res) {
        layer.alert(res.状态, function() {
            layer.closeAll();
            history.go(0);
        });
    };
    var error_func = function(res) {
        layer.alert(res.状态, function() {
            layer.closeAll();
            history.go(0);
        });
    };
    ajax.ajax_common(obj_save, success_func, error_func);
};
// 新增功能
table_act.insert = function(res, tb_id) {

    var test_arr,input_str="";

    //循环字段名
    // for (let i in res.列表[0]) {
    //     test_arr.push(i);
    // }
    var g = {};
    g.tb_id = tb_id;
    var obj_save = { datas:g.tb_id, func: "get_arrInsert"};
    var success_func = function(res){test_arr = res.数据;}    
    var error_func = function(res){}
    ajax.ajax_common_sync(obj_save, success_func, error_func);

    for (let i = 0; i < test_arr.length; i++) {
        // input_str +=
        //     '<div class="layui-form-item"><label class="layui-form-label">' +
        //     test_arr[i] +
        //     '</label> <div class="layui-input-block"> <input type="text"  name="' +
        //     test_arr[i] +
        //     '"   placeholder="请输入' +
        //     test_arr[i] +
        //     '" autocomplete="off" class="layui-input insert-input"></div> </div>';

        input_str += ` <div class="layui-form-item"><label class="layui-form-label">${test_arr[i]}</label> <div class="layui-input-block"> <input type="text"  name="${test_arr[i]}"  placeholder="请输入${test_arr[i]}"  autocomplete="off" class="layui-input insert-input"></div> </div> `;
    }    
    var success_func = function() {
        insert_local_process();
        common_progress();

        layui.use("form", function() {
            var form = layui.form;
            form.render();
            
            form.on("submit(formDemo)", function(data) {
                // 取值、在封装ajax传参前对部分字段处理
                data.tb_id = tb_id;
                if ("file" in data.field) {
                    delete data.field.file;
                }
                // 对内容字段进行二次编码                
                if (data.field.内容) {
                    // 转码前将原本含有的“%”转义                    
                   data.field.内容 = data.field.内容.replace(/%/g, "\%")                    
                   data.field.内容 = encodeURIComponent(
                       encodeURIComponent(data.field.内容)
                   );
                }

                var obj_save = {
                    datas: [data.field, data.tb_id],
                    func: get_func[1]
                };
                var success_func = function(res) {
                    layer.alert(res.状态, function() {
                        layer.closeAll();
                        history.go(0);
                    });
                };
                var error_func = function(res) {
                    layer.alert(res.状态, function() {
                        layer.closeAll();
                        history.go(0);
                    });
                };
                ajax.ajax_common(obj_save, success_func, error_func);
                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
            });
        });
    };
    layObj.form("新增", success_func, input_str, tb_id);
};
// 编辑功能
table_act.update = function(res, tb_id, data) {

    //循环字段名
    //循环字段名所对应的值
    var old_arr=[],test_arr,update_str="";
    var g = {};
    g.tb_id = tb_id;
    g.id = data.id;
    var obj_save = { datas:[g.tb_id,g.id], func: "get_arrUpdate"};
    var success_func = function(res){
        test_arr = res.字段;
        for (let j in res.数据[0]) {
            old_arr.push(res.数据[0][j]);
        }
    }    
    var error_func = function(res){}
    ajax.ajax_common_sync(obj_save, success_func, error_func);
    // for (let i in res.列表[0]) {
    //     test_arr.push(i);
    // } 
    //赋给录入时期的的input的一个id名
    var classTest = "";
    for (let i = 0; i < test_arr.length; i++) {
        // 特殊编码转义
        if (typeof old_arr[i] == "string") {
            old_arr[i] = old_arr[i]
                .replace(/'/g, "&#39;")
                .replace(/"/g, "&quot;")
                .replace(/>/g, "&gt;")
                .replace(/</g, "&lt;");
        }
        // input[type="text"]的遍历生成html
        // update_str +=
        //     '<div class="layui-form-item"><label class="layui-form-label">' +
        //     test_arr[i] +
        //     '</label> <div class="layui-input-block"> <input type="text"  name="' +
        //     test_arr[i] +
        //     '" autocomplete="off" value="' +
        //     old_arr[i] +
        //     '" class="layui-input insert-input"> </div> </div>';
         update_str += `<div class="layui-form-item"><label class="layui-form-label">${test_arr[i]}</label> <div class="layui-input-block"> <input type="text"  name="${test_arr[i]}" autocomplete="off" value="${old_arr[i]}" class="layui-input insert-input"> </div> </div>`;
    }

    var success_func = function() {
        update_local_process();
        common_progress();

        layui.use(["form", "laydate"], function() {
            var form = layui.form;
            var laydate = layui.laydate;
            laydate.render({
                type: "datetime",
                elem: ".dateClass" //指定元素
            });
            form.render();            
            form.on("submit(formDemo)", function(data) {
                // 取值、在封装ajax传参前对部分字段处理
                data.tb_id = tb_id;
                if ("file" in data.field) {
                    delete data.field.file;
                }
                // 对内容字段进行二次编码                
                if (data.field.内容) {
                     // 转码前将原本含有的“%”转义                    
                    data.field.内容 = data.field.内容.replace(/%/g, "\%")                    
                    data.field.内容 = encodeURIComponent(
                        encodeURIComponent(data.field.内容)
                    );
                }
                var obj_save = {
                    datas: [data.field, data.tb_id],
                    func: get_func[1]
                };
                var success_func = function(res) {
                    layer.alert(res.状态, function() {
                        layer.closeAll();
                        window.location.reload();
                    });
                };
                var error_func = function(res) {
                    layer.alert(res.状态, function() {
                        layer.closeAll();
                        history.go(0);
                    });
                };
                ajax.ajax_common(obj_save, success_func, error_func);
                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
            });
        });
    };
    layObj.form("编辑", success_func, update_str, tb_id);
};

for (let i in table_act) {
    switch (i) {
        case "insert":
            var insert_local_process = function () {
                $("*[name='录入人']").val(table_act.insert_name);
                $("*[name='录入时间']").val(table_act.insert_time);
            }
            break;
        case "update":
            var update_local_process = function() {
                if(form_special_control.system == true){                  
                    $("*[name='录入时间']").addClass("dateClass");
                    
                    var $sys_name = $(`*[name='录入人']`); // sys_name
                    $sys_name.addClass("sys-input-1");
                    $sys_name.css({ width: "100%" });
                    $sys_name.parent().addClass("flex flex-hb-vc");
                    $sys_name.parent().append('<div style="margin-left:10px;"><button type="button" class="layui-btn layui-btn-mini" id="sys-input-1"> <i class="layui-icon">&#xe67c;</i>更新</button></div>');

                    var $sys_time = $(`*[name='录入时间']`); // sys_time
                    $sys_time.addClass("sys-input-2");
                    $sys_time.css({ width: "100%" });
                    $sys_time.parent().addClass("flex flex-hb-vc");
                    $sys_time.parent().append('<div style="margin-left:10px;"><button type="button" class="layui-btn layui-btn-mini" id="sys-input-2"> <i class="layui-icon">&#xe67c;</i>更新</button></div>');
                
                    $("#sys-input-1").click(function(){
                        $("*[name='录入人']").val(table_act.insert_name);
                    })
                    $("#sys-input-2").click(function(){
                        $("*[name='录入时间']").val(table_act.insert_time);
                    })                
                }
            }
            break;
    }
    switch (i) {
        case "update":
        case "insert":
                var common_progress = function () {
                // 视频、图片、富文本编辑 等引入
                if ($("*[name='视频地址']") || $("*[name='图片地址']")) {
                    form_act.add_video_pic();
                }
                if ($("*[name='内容']")) {
                    form_act.editor();
                }
                if (form_special_control.id != "") {                    
                    switch (form_special_control.id) {
                        case 1:
                        control_state(form_special_control.state)
                        break;
                        case 2:
                        control_state(form_special_control.state)
                        break;   
                        case 11:
                        control_state(form_special_control.state)                        
                        form_special_control.func()
                        break;                      
                        case 100:
                        input_rules(form_special_control.require_arr,form_special_control.disable_arr)
                        // 密码每次重置
                        $("*[name='密码']").val("");
                        break;
                        case 101:
                        form_special_control.control_power()
                        break;
                    }
                }
                
                function control_state(state) {
                    let get_state = $("*[name='状态']").val();
                    $("*[name='状态']") .parent() .empty().append('<div class="custom-state"></div>')
                    for(let i in state){
                        if(get_state == state[i]){
                            $(".custom-state").append( `<input type="radio" name="状态" value="${state[i]}"  title="${state[i]}" checked="checked">` );
                        }else{
                            $(".custom-state").append( `<input type="radio" name="状态" value="${state[i]}"  title="${state[i]}">` );                            
                        }
                    }
                }                
                function input_rules(require_arr,disable_arr){
                    for (let i in require_arr) {
                        $("*[name='"+require_arr[i]+"'").attr("lay-verify","required").addClass("required");
                    }
                    for (let j in disable_arr) {
                        $("*[name='"+disable_arr[j]+"'").attr({"disabled":"disabled","placeholder":"无需输入"});                        
                    }
                }
                $("*[name='录入人']").attr("readonly", "readonly");
                $("*[name='录入时间']").attr("readonly", "readonly"); 
                $("*[name='id']").attr({ readonly: "readonly", placeholder: "" });
                $("*[name='关键字']").attr(
                    "oninput",
                    "if(value.length>20)value=value.slice(0,20)"
                );
                $("*[name='标题']").attr(
                    "oninput",
                    "if(value.length>30)value=value.slice(0,30)"
                );
            }
            break;
    }
}