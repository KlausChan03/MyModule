// layui.config({
//     base : "js/"
// }).use(['form','element','layer','jquery'],function(){
//     var form = layui.form(),
//         layer = parent.layer === undefined ? layui.layer : parent.layer,
//         element = layui.element(),
//         $ = layui.jquery;
// })
// //新消息
// $.get("../json/navs.json",
//     function(data){
//         $(".newMessage span").text(data.length);
//     }
// )

var list_i = 1;
var ifarme_func = window.top.document.getElementById("iframe_"+list_i).src;
console.log(GetRequest(ifarme_func).func)
var obj_save = { datas: {}, func: GetRequest(ifarme_func).func};
var success_func = function (res){
    $(".table-container table thead").append("<tr></tr>")
    for (i in res.列表[0]) {
        $(".table-container table thead").append("<th>" + i + "</th>")
        // $(".table-container table tbody").append("<th>" + res.列表[0][i] + "</th>")
    }
    for (j in res.列表) {
        $(".table-container table tbody").append("<tr></tr>")
        for (k in res.列表[j]) {
            $(".table-container table tbody tr:eq(" + j + ")").append("<th>" + res.列表[j][k] + "</th>")
            $("tbody tr").off("click").on("click",function () {
                var pos = $(this).position().top;
                $(window).scrollTop(pos);
            })
        }
    }
}
ajax.ajax_common(obj_save, success_func)