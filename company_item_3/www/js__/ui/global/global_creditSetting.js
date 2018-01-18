"use strict";

var form_special_control = {};
form_special_control.id = 11;
form_special_control.state = ["正常", "停用"];
form_special_control.func = function () {
    layui.use(["form"], function () {
        var form = layui.form;
        $("*[name='停用说明']").removeAttr("lay-verify").attr({ "disabled": "disabled", "placeholder": "状态为正常时无需输入" }).removeClass("required");
        form.on('radio', function (data) {
            if (data.value == "正常") {
                $("*[name='停用说明']").removeAttr("lay-verify").attr({ "disabled": "disabled", "placeholder": "状态为正常时无需输入" }).removeClass("required");
            } else {
                $("*[name='停用说明']").removeAttr("disabled").attr({ "lay-verify": "required", "placeholder": "请输入停用说明" }).addClass("required");
            }
        });
    });
};