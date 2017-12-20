// 几种ajax请求方式
var ajax = {};

ajax.ajax_get = function(obj_save, success_func, error_func, type) {    
    var ajax_type;
    if (!arguments[2]) { error_func = function() {}; }
    if (!arguments[3]) { ajax_type = "GET"; }
    var func = obj_save.func;
    var datas = obj_save.datas;
    datas = JSON.stringify(datas);
    $.ajax({
        type: "GET",
        async: true,
        url: func + ".xhtml",
        data: "data=" + datas,
        success: function(res) {
            if (res.状态 == "成功") {
                success_func(res);
            } else {
                error_func(res);
            }
            return false;
        }
    });
};

ajax.ajax_common = function(obj_save, success_func, error_func, type) {    
    var ajax_type;
    if (!arguments[2]) { error_func = function() {}; }
    if (!arguments[3]) { ajax_type = "POST"; }
    var func = obj_save.func;
    var datas = obj_save.datas;
    datas = JSON.stringify(datas);
    $.ajax({
        type: "POST",
        async: true,
        url: "/ajax.post?func=" + func,
        data: "data=" + datas,
        success: function(res) {
            if (res.状态 == "成功") {
                success_func(res);
            } else {
                error_func(res);
            }
            return false;
        }
    });
};
    
ajax.ajax_common_sync = function(obj_save, success_func, error_func, type) {    
    var ajax_type;
    if (!arguments[2]) { error_func = function() {}; }
    if (!arguments[3]) { ajax_type = "POST"; }
    var func = obj_save.func;
    var datas = obj_save.datas;
    datas = JSON.stringify(datas);
    $.ajax({
        type: "POST",
        async: false,
        url: "/ajax.post?func=" + func,
        data: "data=" + datas,
        success: function(res) {
            if (res.状态 == "成功") {
                success_func(res);
            } else {
                error_func(res);
            }
            return false;
        }
    });
};

ajax.ajax_depend_concurrent = function(obj_save, success_func, error_func, type) {
    var ajax_type;
    var flags = 1;
    var func = obj_save.func;
    var datas = obj_save.datas;
    if (!arguments[2]) { error_func = function() {}; }
    if (!arguments[3]) { ajax_type = "POST"; }
    datas = JSON.stringify(datas);
    if (flags) {
        $.ajax({
            type: "POST",
            url: func,
            data: "data=" + datas,
            beforeSend: function() {
                $(".opacity-bg").show();
                $(".spinner").show();
            },
            success: function(p) {
                if ((p.状态 = "成功")) {
                    setTimeout(function() {
                        success_func(p);
                        $(".opacity-bg").hide();
                        $(".spinner").hide();
                    }, 2000);
                } else { error_func(p); }
            }
        });
    }
};

ajax.ajax_upload = function(obj_save, success_func, error_func, type) {
    var ajax_type;
    if (!arguments[2]) { error_func = function() {}; }
    if (!arguments[3]) { ajax_type = "POST"; }
    var func = obj_save.func;
    var datas = obj_save.datas;
    datas = JSON.stringify(datas);
    $.ajax({
        type: "POST",
        url: "/ajax.post?func=" + func,
        timeout: 1000, //超时时间设置，单位毫秒
        data: "data=" + datas,
        success: function(res) {
            if (res.状态 == "成功") {
                success_func(res);
            } else {
                error_func(res);
            }
            return false;
        },        　
        complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数            　　　　
            if (status == 'timeout') { //超时,status还有success,error等值的情况                　　　　　
                ajaxTimeoutTest.abort();　　　　　
                alert("超时");　　　　
            }　　
        }
    });
};


ajax.ajax_html = function(obj_save, success_func, error_func, type) {
    var ajax_type;
    if (!arguments[2]) { error_func = function() {}; }
    if (!arguments[3]) { ajax_type = "POST"; }
    var func = obj_save.func;
    var datas = obj_save.datas;
    $.ajax({
        type: "POST",
        url: "/ajax.post?func=" + func,
        timeout: 1000, //超时时间设置，单位毫秒
        data: "data=" + datas,
        datatype: "html",
        success: function(res) {
            if (res.状态 == "成功") {
                success_func(res);
            } else {
                error_func(res);
            }
            return false;
        },
    });
};

function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}



//阻止冒泡的兼容性写法
function stopBubble(e) {
    e = e ? e : (window.event ? window.event : null);
    if (e && e.stopPropagation) {
        e.stopPropagation()
    } else if (window.event) {
        window.event.cancelBubble = true;
    }
}


//阻止浏览器默认行为的兼容性写法
function stopDefault(e) {
    e = e ? e : (window.event ? window.event : null);
    //阻止默认浏览器动作(W3C)
    if (e && e.preventDefault) {
        e.preventDefault();
    } else {
        //IE中阻止函数默认动作的方式
        window.event.returnValue = false;
    }
    return false;
}

// 获取当前时间函数
function getTime(n) {
    var date = new Date();
    date.year = date.getFullYear();
    date.month = date.getMonth() + 1 < 10 ? "0" + String(date.getMonth() + 1) : String(date.getMonth() + 1);
    date.date = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    date.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    date.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    date.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    var currentTime = "";
    if(n==1){
        currentTime = date.year + date.month + date.date + date.hour + date.minute + date.second;    
    }else{
        currentTime = date.year + "-" + date.month + "-" + date.date + " " + date.hour + ":" + date.minute + ":" + date.second;        
        
    }
    return currentTime;
}


// 生成随机数

    function generateMixed(n) {
        var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        var res = "";
        for (var i = 0; i < n; i++) {
            var id = Math.ceil(Math.random() * 35);
            res += chars[id];
        }
        return res;
    }

$(document).keydown(function(event) {
    var e = event || window.event;
    var keyCode = e.keyCode || e.which;
    switch (keyCode) {
        case 116:
            // 监听F5键		
            window.sessionStorage.removeItem("menu");
            menu = [];
            window.sessionStorage.removeItem("curmenu");
            break;
        case 115:
            // 监听F4键
            history.go(0)
            break;
        case 113:
            // 监听F2键
            $(".hideMenu").click()
            break;
        case 13:
            console.log(document.activeElement)
            if (layer) {
                console.log(layer)
                    // $("*").blur();//去掉焦点
                if ($(".layui-layer-btn0").length > 0) {
                    layer.closeAll();
                }
                // else if($(".layer-commit")){
                // 	$(".layer-commit").click()
                // }
            }
            break;
        default:
            break;
    }
});


/*限制只有中文和字母*/
function input_test1(a) {
	a.value = a.value.replace(/[^\a-\z\A-\Z\u4E00-\u9FA5]/g, '')
}

/*限制只有数字*/
function input_test2(a) {
	a.value = a.value.replace(/\D/g, '')

}

/*限制只有数字字母*/
function input_test3(a) {
	a.value = a.value.replace(/[^\a-\z\A-\Z0-9]/g, '')

}

/*限制只有中文、英文、数字、空格*/
function input_test4(a) {
	a.value = a.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\ ]/g, '')

}

/*限制只有中文*/
function input_test5(a) {
	a.value = a.value.replace(/[^\u4E00-\u9FA5]/g, '')

}

/*限制只有中文、英文、数字*/
function input_test6(a) {
	a.value = a.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, '')
}