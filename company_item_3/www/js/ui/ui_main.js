layui.config({
	base : "js/"
}).use(['form','element','layer','jquery'],function(){
	var form = layui.form,
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		element = layui.element,
		$ = layui.jquery;
	var flag = 1;
	var flag_ = 1;

	$(".panel a").on("click",function(){
		window.parent.addTab($(this));
	})

	//动态获取首页信息
	$.get("../json/newsList.json",
		function(data){
			//加载最新需求
			var hotNewsHtml = '';
			
			
			data.sort(function (o1, o2) { return o2.newsId - o1.newsId; });
			function show_requirement(n){
				hotNewsHtml="";
				for(var i=0;i<n;i++){
					hotNewsHtml += '<tr>'
					+'<td align="left">'+data[i].newsName+'</td>'
					+'<td>'+data[i].newsTime+'</td>'
					+'</tr>';
				}
				$(".hot_news").html(hotNewsHtml);
			}
			show_requirement(7)		
			
			$(".next-requirement .more-msg").click(function(){		
				if(flag==1){
					flag=0;
					show_requirement(data.length)
					$(".next-requirement .less").show()
					$(".next-requirement .more").hide()	
				}else{
					flag=1;					
					show_requirement(7)		
					$(".next-requirement .more").show()						
					$(".next-requirement .less").hide()
				}				
			})
		}
	)
	//系统基本参数
	if(window.sessionStorage.getItem("systemParameter")){
		var systemParameter = JSON.parse(window.sessionStorage.getItem("systemParameter"));
		fillParameter(systemParameter);
	}else{
		$.ajax({
			url : "../json/systemParameter.json",
			type : "get",
			dataType : "json",
			success : function(data){
				fillParameter(data);
			}
		})
		
	}

	$.ajax({
		url : "../json/platformVersion.json",
		type : "get",
		dataType : "json",
		success : function(data){
			var all = data.length
			platformVersion(data,5);
			$(".platform-function .more-msg").click(function(){
				if(flag_ ==1){
					flag_=0;
					platformVersion(data,data.length);
					$(".platform-function .less").show()
					$(".platform-function .more").hide()	
				}else{
					flag_=1;				
					platformVersion(data,5);
					$(".platform-function .more").show()					
					$(".platform-function .less").hide()
				}
			})
			
		}
	})

	//填充数据方法
 	function fillParameter(data){
 		//判断字段数据是否存在
 		function nullData(data){
 			if(data == '' || data == "undefined"){
 				return "未定义";
 			}else{
 				return data;
 			}
 		}
 		$(".version").text(nullData(data.version));      //当前版本
		$(".author").text(nullData(data.author));        //开发作者
		$(".homePage").text(nullData(data.homePage));    //网站首页
		$(".server").text(nullData(data.server));        //服务器环境
		$(".dataBase").text(nullData(data.dataBase));    //数据库版本
		$(".maxUpload").text(nullData(data.maxUpload));    //最大上传限制
		$(".userRights").text(nullData(data.userRights));//当前用户权限
	 }
	 
 	function platformVersion(data,num){
		$(".version-msg").html("")
		for (var j=0; j<num; j++){
			$(".version-msg").append('<div class="version-main"><h4 class="version-title"></h4><ul class="version-list"></ul></div>')
			$(".version-msg .version-title:eq("+(j)+")").html(data[j].version);
			for (let i=0;i<data[j].function.length;i++){
				$(".version-main:eq("+(j)+")").append('<p>*&nbsp;&nbsp;'+data[j].function[i]+'</p>')
			}
		}
		
	 }
		

})
