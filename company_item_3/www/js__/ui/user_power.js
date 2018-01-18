"use strict";

var form_special_control = {};
form_special_control.id = 101;
form_special_control.control_power = function (state) {
    var obj_save = {
        datas: [data.field, data.tb_id],
        func: "get_power_list"
    };
    var success_func = function success_func(res) {
        layui.use("form", function () {
            var form = layui.form;
            var control_power = res.数据;
            var control_content = [];
            var control_get_show = "",
                control_check = "",
                control_button = "";
            var control_all = "",
                control_get_all = "";
            if ($("[name='权限']").val() != "") {
                var control_get = JSON.parse($("[name='权限']").val());
            }
            for (var i in control_power) {
                var k = Number(i) + 1;
                if ($("[name='权限']").val() != "") {
                    if (control_get[i] != undefined) {
                        control_get_show = control_get[i].查看 == 1 ? "显示" : "不显示";
                        control_check = control_get[i].查看 == 1 ? "checked" : "";
                        control_get_all = control_get[i].全选 == 1 ? "全选" : "非全选";
                        control_all = control_get[i].全选 == 1 ? "checked" : "";
                    }
                    control_content.push('<p class="power-title">' + " [ " + k + " ] " + control_power[i].字段 + '</p>' + ' <input type="checkbox" name="全选_' + control_power[i].编号 + '" lay-filter="' + control_power[i].编号 + '" value="' + control_get_all + '"  ' + control_all + ' >' + ' <input type="hidden" name="字段_' + control_power[i].编号 + '" value="' + control_power[i].编号 + '" />' + ' <p class="power-row-1">查看</p><input type="checkbox" name="查看_' + control_power[i].编号 + '" value="' + control_get_show + '"  ' + control_check + '  title="显示">' + ' <p class="power-row-2">按钮</p>');
                    for (var j in control_power[i].按钮) {
                        if (control_get[i] != undefined) {
                            control_button = control_get[i].按钮[j] != "0" ? "checked" : "";
                            control_content.push('<input type="checkbox" name="按钮' + '_' + control_power[i].编号 + '_' + control_power[i].按钮[j] + '" value="' + control_power[i].按钮[j] + '" ' + control_button + '  title="' + control_power[i].按钮[j] + '">');
                        } else {
                            control_button = "";
                            control_content.push('<input type="checkbox" name="按钮' + '_' + control_power[i].编号 + '_' + control_power[i].按钮[j] + '" value="' + control_power[i].按钮[j] + '" ' + control_button + '  title="' + control_power[i].按钮[j] + '">');
                        }
                    }
                } else {
                    control_content.push('<p class="power-title">' + ("" + name) + k + ("" + name) + control_power[i].字段 + '</p>' + ' <input type="checkbox" name="全选_' + control_power[i].编号 + '" lay-filter="' + control_power[i].编号 + '"  value="全选">' + ' <input type="hidden" name="字段_' + control_power[i].编号 + '" value="' + control_power[i].编号 + '" />' + ' <p class="power-row-1">查看</p><input type="checkbox" name="查看_' + control_power[i].编号 + '" value="不显示" title="显示">' + ' <p class="power-row-2">按钮</p>');
                    for (var _j in control_power[i].按钮) {
                        control_content.push('<input type="checkbox" name="按钮' + '_' + control_power[i].编号 + '_' + control_power[i].按钮[_j] + '" value=' + control_power[i].按钮[_j] + ' title=' + control_power[i].按钮[_j] + '>');
                    }
                }
            }
            $("[name='权限']").parent().empty().addClass("power-main").append(control_content);
            form.render('checkbox');

            var _loop = function _loop(_i) {
                form.on("checkbox(" + control_power[_i].编号 + ")", function (data) {
                    var isChecked = false;
                    if (data.elem.checked) {
                        isChecked = true;
                    }
                    if (data.elem.checked == true) {
                        $("[name='\u67E5\u770B_" + control_power[_i].编号 + "']").prop("checked", isChecked);
                        for (var _j2 in control_power[_i].按钮) {
                            $("[name='\u6309\u94AE_" + control_power[_i].编号 + "_" + control_power[_i].按钮[_j2] + "']").prop("checked", isChecked);
                            form.render('checkbox');
                        }
                    } else {
                        $("[name='\u67E5\u770B_" + control_power[_i].编号 + "']").prop("checked", isChecked);
                        for (var _j3 in control_power[_i].按钮) {
                            $("[name='\u6309\u94AE_" + control_power[_i].编号 + "_" + control_power[_i].按钮[_j3] + "']").prop("checked", isChecked);
                            form.render('checkbox');
                        }
                    }
                });
            };

            for (var _i in control_power) {
                _loop(_i);
            }
        });
    };
    var error_func = function error_func(res) {};
    ajax.ajax_common(obj_save, success_func, error_func);
};