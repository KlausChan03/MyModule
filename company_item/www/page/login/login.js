layui.config({
	base : "js/"
}).use(['form','layer'],function(){
	var form = layui.form,
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		$ = layui.jquery;
	//video背景
	$(window).resize(function(){
		if($(".video-player").width() > $(window).width()){
			$(".video-player").css({"height":$(window).height(),"width":"auto","left":-($(".video-player").width()-$(window).width())/2});
		}else{
			$(".video-player").css({"width":$(window).width(),"height":"auto","left":-($(".video-player").width()-$(window).width())/2});
		}
	}).resize();
	
	//登录按钮事件
	form.on("submit(login)",function(data){



		var obj_save = { datas: {"用户名":$(".username").val(),"密码":$(".password").val()}, func: "login" };
		console.log(obj_save)
		var success_func = function(res) { 
			// return false;
			// window.location.href = "../../index.html";
		};
		ajax.ajax_common(obj_save, success_func);

		// console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
		// console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
		// console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
		return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
		// window.location.href = "../../index.html";

		// return false;
	})
})
