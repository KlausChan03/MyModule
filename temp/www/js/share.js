var 服务器 = 'http://127.0.0.1:1688/interface';
var 图片地址 = '';
//var 调用 = '测试';    //网页调试专用
var 调用 = '混合';      //手机调试专用
//var 调用 = 'ios';    
//var 调用 = 'android';



function MD5(sMessage)  // MD5加密
{
	function RotateLeft(lValue, iShiftBits) 
	{ 
	  return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits)); 
	}
	function AddUnsigned(lX,lY) 
	{
		var lX4,lY4,lX8,lY8,lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
		if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		if (lX4 | lY4) {
		if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
		else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
		} else return (lResult ^ lX8 ^ lY8);
	}
	function F(x,y,z) 
	{ return (x & y) | ((~x) & z); }
	function G(x,y,z) 
	{ return (x & z) | (y & (~z)); }
	function H(x,y,z) 
	{ return (x ^ y ^ z); }
	function I(x,y,z) 
	{ return (y ^ (x | (~z))); }
	function FF(a,b,c,d,x,s,ac) 
	{
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	}
	function GG(a,b,c,d,x,s,ac) {
	  a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
	  return AddUnsigned(RotateLeft(a, s), b);
	}
	function HH(a,b,c,d,x,s,ac) {
	  a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
	  return AddUnsigned(RotateLeft(a, s), b);
	}
	function II(a,b,c,d,x,s,ac) {
	  a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
	  return AddUnsigned(RotateLeft(a, s), b);
	}
	function ConvertToWordArray(sMessage) 
	{
		var lWordCount;
		var lMessageLength = sMessage.length;
		var lNumberOfWords_temp1=lMessageLength + 8;
		var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
		var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
		var lWordArray=Array(lNumberOfWords-1);
		var lBytePosition = 0;
		var lByteCount = 0;
		while ( lByteCount < lMessageLength ) {
		lWordCount = (lByteCount-(lByteCount % 4))/4;
		lBytePosition = (lByteCount % 4)*8;
		lWordArray[lWordCount] = (lWordArray[lWordCount] | (sMessage.charCodeAt(lByteCount)<<lBytePosition));
		lByteCount++;
		}
		lWordCount = (lByteCount-(lByteCount % 4))/4;
		lBytePosition = (lByteCount % 4)*8;
		lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
		lWordArray[lNumberOfWords-2] = lMessageLength<<3;
		lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
		return lWordArray;
	}
	function WordToHex(lValue) 
	{
		var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
		for (lCount = 0;lCount<=3;lCount++) {
		lByte = (lValue>>>(lCount*8)) & 255;
		WordToHexValue_temp = "0" + lByte.toString(16);
		WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
		}
		return WordToHexValue;
	}
	var x=Array();
	var k,AA,BB,CC,DD,a,b,c,d;
	var S11=7, S12=12, S13=17, S14=22;
	var S21=5, S22=9 , S23=14, S24=20;
	var S31=4, S32=11, S33=16, S34=23;
	var S41=6, S42=10, S43=15, S44=21;
	// Steps 1 and 2. Append padding bits and length and convert to words
	x = ConvertToWordArray(sMessage);
	// Step 3. Initialise
	a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
	// Step 4. Process the message in 16-word blocks
	for(k=0;k<x.length;k+=16)
	{
		AA=a; BB=b; CC=c; DD=d;
		a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
		d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
		c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
		b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
		a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
		d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
		c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
		b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
		a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
		d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
		c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
		b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
		a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
		d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
		c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
		b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
		a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
		d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
		c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
		b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
		a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
		d=GG(d,a,b,c,x[k+10],S22,0x2441453);
		c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
		b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
		a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
		d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
		c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
		b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
		a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
		d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
		c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
		b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
		a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
		d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
		c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
		b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
		a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
		d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
		c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
		b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
		a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
		d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
		c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
		b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
		a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
		d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
		c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
		b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
		a=II(a,b,c,d,x[k+0], S41,0xF4292244);
		d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
		c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
		b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
		a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
		d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
		c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
		b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
		a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
		d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
		c=II(c,d,a,b,x[k+6], S43,0xA3014314);
		b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
		a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
		d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
		c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
		b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
		a=AddUnsigned(a,AA); b=AddUnsigned(b,BB); c=AddUnsigned(c,CC); d=AddUnsigned(d,DD);
	}
	// Step 5. Output the 128 bit digest
	var temp= WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
	return temp.toLowerCase();
}






		   //定义异步请求对象
           var httpRequest=false;
           
           //创建异步请求对象
           function createXMLHttp(){
           		
           		//判断为ie浏览器
                if(window.ActiveXObject){
                    try{
                       httpRequest=new ActiveXObject("msxml2.XMLHTTP");
                    }catch(e1){
                       try{
                       	httpRequest=new ActiveXObject("Microsoft.XMLHTTP");
                       }catch(e2){
                          httpRequest=false;
                          alert("在ie浏览器中创建异步请求对象失败！");
                       }
                    }
                    
                //判断为非ie浏览器
                }else if(window.XMLHTTPRequest){
                    try{
                       httpRequest=new XMLHTTPRequest();
                    }catch(e3){
                       httpRequest=false;
                       alert("在非ie浏览器中创建异步请求对象失败！");
                    }
                }
           }
           
           //准备并向服务器发送异步请求(请求路径：url,请求方式：get:null,post:提交数据;回调方法名称：method)
           function doCommandAjax(url,postData,mothed){
                
                //创建异步请求对象
                createXMLHttp();
                
                if(!postData){
                    //get方式提交
                    httpRequest.open("get",url,true);
                }else{
                    
                    //post方式提交
                    httpRequest.open("post",url,true);
                }
                
                //注册事件
                httpRequest.onreadystatechange=callBack(httpRequest,mothed);
                
                //不管是get还是post请求都要设置请求头
                httpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                
                //发送请求
                httpRequest.send(postData);
           }
           
           //回调的启动方法
           function callBack(httpRequest,mothed){
               return function(){
                   //表示请求服务器完成
                   try{
	                   if(httpRequest.readyState==4){
	                       //alert(httpRequest.status);
	                       if(httpRequest.status==200){
	                          eval(mothed+"();");
	                       }
	                   }
                   }catch(e4){
                       //alert("请求失败");
                   }
               }
           }
           
           //获取post提交数据
		   function getData(element){
			       //encodeURIComponet()对表单数据进行编码
			       //有多个元素的时候
			       //alert("是否为数字："+isNaN(element.length));
			      
			       if(!isNaN(element.length)&&element.length>1){
			           for(var i=0;i<element.length;i++){
						   //alert("是否选择:"+element[i].checked);
						   if(element[i].checked){
						        getData(element[i]);
						        //break;
						   }
				 	   }
			       }
			       
			       if(isNaN(element.length)){
				       var sug=encodeURIComponent(element.name);
				           sug+="=";
				           sug+=encodeURIComponent(element.value);
				           sug+="&";
				       postData+=sug;
				       //alert(postData+"  :888");
				   }
		  }
		  
		  
		  
		  
		  
		  
		  
		  
		  
 //加密
function jiamiclick(){
			alert("进入加密方法");
            //获取输入框值
            //words = 随机码+加密字符串
            //加密字符串=原本要传的值进行加密
            var MyValue = "13714397300"
            var MySuiJiMa="24b56d211c11c5c67ace2eb96eb4022d"
            //用插件调用值
            navigator.dataTransportJs.myjiami(MySuiJiMa,MyValue,
             function(result) {
                    alert("返回的加密后的值："+result);
                },
                function(error) {
                        alert("错误:"+error)
                } );
        }
//ajax服务器请求
function ajaxqingqiu(){
    alert("进入请求服务器方法")
	 $.ajax({
	 		 type:"Post",
             url:"http://www.zyk-hlk.com:8880/interface",
             data:{
             "func":"loginsign",
             //words = 随机码+加密字符串
             //加密字符串=原本要传的值进行加密
             "words":"FHDJsSDJSEbnbnRGSDFGz1360256788721d8483e9d81658aff9b85f4392a0f6c0c112fdc2c77ceb22adfc8ab6b88abb46abaebe7d49899806c2cb8de326d8ebcd47f5219f41a653b586c7df62635ae06caba393d04cf0fcd173b33ee85d0a86cb96c4c0f4087f3ae9d520ab2139db2a48f0e69c436eb06323bddf8c1045b4b5b34f52a815d8fc4fb9842f011fc08bcadcba71f3b359b59005e5079025fcd973c0940d248fc40e4ed73c2d3d3c1000d03ac2445d2ada6a1da7b3db32640a1815a8a982afe07fc66007a222885b32d3668843837a6675f21e1b1d2d3428796813f0b949c1ee75ba15e4ac8e8c7f2ddc3870ca60f783f686c5b12db281906ca809e69153d8e5f8f0d3f0f5822ad941d6abed43301e7749f4b4c4690266145ae6c03"
             },
             dataType:"json",
             jsonp:"jsonpcallback",
             success:function(getdata){
                 alert("请求成功");
                 alert("电话:"+getdata.账号);
                 alert("姓名:"+getdata.姓名);
                 // var mes_obj = eval("(" + getdata.data + ")");
				 var str_statuses;
                 str_statuses = getdata.data[0];
                 alert(str_statuses);
             },
             error: function (xhr, errorInfo, ex) {  //请求失败遇到异常触发
             alert("请求失败");
             show.append('error invoke!errorInfo:' + errorInfo+'<br/>');
             }
　　      });
}




 //交给安卓加密并请求
function jiamitoandroid(){
alert("进入加密方法");
            //获取输入框值
            //words = 随机码+加密字符串
            //加密字符串=原本要传的值进行加密
            var MyValue = "13714397300"
            var MySuiJiMa="24b56d211c11c5c67ace2eb96eb4022d"
            //用插件调用值
            navigator.dataTransportJs.myjiamitofuwuqi(MySuiJiMa,MyValue,
             function(result) {
                    alert("安卓请求成功！ 姓名:"+result);
                },
                function(error) {
                        alert("错误:"+error)
                } );
}








//ajax加密服务器请求  正式请求
function android_ajax_con(func,json_con,func_name){
	alert('加密服务器请求');
          //获取输入框值
          //words = 随机码+加密字符串
          //加密字符串=原本要传的值进行加密
          var MyValue = JSON.stringify(json_con);
			if(json_con.随机码 == null || json_con.随机码 == '')
				json_con.随机码 = MD5(func);
          var MySuiJiMa=json_con.随机码;
         // alert(JSON.stringify(json_con));
          //用插件调用值
          navigator.dataTransportJs.myjiami(MySuiJiMa,MyValue,
          //成功函数
           function(result) {
           $.ajax({
	 		 type:"Post",
           url:服务器,
           data:{
           "func":func,
           //words = 随机码+加密字符串
           //加密字符串=原本要传的值进行加密
           "words":result
           },
           dataType:"json",
           jsonp:"jsonpcallback",
           success:function(getdata){
				eval(func_name+'(getdata)'); 
           },
           error: function (xhr, errorInfo, ex) {  //请求失败遇到异常触发
          	 alert("请求失败"+xhr);
           show.append('error invoke!errorInfo:' + errorInfo+'<br/>');
           }
　　      });
              },
              function(error) {
                      alert("错误:"+error);
              } );
 }



/* [测试运用 */
var f_name = '';
function try_ajax_con(func,json_con,func_name){
		
			if(localStorage.getItem("user_id")!=null && json_con.账号  == null)
				json_con.账号 = localStorage.getItem("user_id");
			if(localStorage.getItem("user_num") != null)
				json_con.随机码 = localStorage.getItem("user_num");

			if(json_con.随机码 == null || json_con.随机码 == '')
				json_con.随机码 = MD5(func);

			html = 'http://www.zyk-hlk.com/try/17.php?func='+func+'&key='+json_con.随机码+'&con='+encodeURIComponent(JSON.stringify(json_con));
			jsonCallBack(html,function(json){
				    
					
					if(json.状态 == '随机码不正确' || json.状态 == '账号不能为空'){
						location.href='logi121212121212n.html';
					}						
					else{
						eval(func_name+'(json)');						
					}
						
			})
			
   }

function max_ajax_con(func,json_con,func_name){
		
			if(localStorage.getItem("user_id")!=null && json_con.账号  == null)
				json_con.账号 = localStorage.getItem("user_id");
			if(localStorage.getItem("user_num") != null)
				json_con.随机码 = localStorage.getItem("user_num");

			if(json_con.随机码 == null || json_con.随机码 == '')
				json_con.随机码 = MD5(func);
				
			
				var data = 'func='+func+'&key='+json_con.随机码+'&con='+encodeURIComponent(JSON.stringify(json_con));
				console.log(data);
				$.ajax({
				   type: "POST",
				   url: "/ajax.",
				   data: data,
				   success: function(json){
				   	if(typeof(json) != 'object')
					        json = JSON.parse(json);
							//zykjssdk.hubshow("加载中...");
							if(json.状态 == '随机码不正确' || json.状态 == '账号不能为空'){
								//zykjssdk.hubdismiss("0");
								//location.href='loginwqwqwqwqw.html';
							}						
							else{
								//zykjssdk.hubdismiss("0");
								eval(func_name+'(json)');						
							}
				   }
				});
			
			
}


function jsonCallBack(url,callback)
{
	$.getScript(url,function(){
	callback(json);
	});
}

/* ]测试运用 */





if(调用 == 'android'){
	document.write('<script type="text/javascript" src="cordova.js"></sc>" + "ript>');
}


/*  [取数据 */
function  ajax_con(func,json_con,func_name){
	
	if(调用 == 'android'){
		android_ajax_con(func,json_con,func_name);
	}
	else if(调用 == '测试'){
		try_ajax_con(func,json_con,func_name);
	}
	else if(调用 == 'ios'){
		ios_ajax_con(func,json_con,func_name);
	}
	else if(调用 == '混合'){
		max_ajax_con(func,json_con,func_name);
	}
}
/*]取数据 */

/*  [支付调起功能 */
function o_pay_lists(r){
	if(调用 == 'android'){
		if(pay_title == '微信支付'){
			pay_con = JSON.stringify(r);
		}else if(pay_title == '支付宝'){
			pay_con = r.支付返回;
		}
		my_pay_all(pay_title,pay_con);
	}else if(调用 == 'try'){
		  if(pay_title == '微信支付'){
				var wxPay = JSON.stringify(r);
				weixin.pay(wxPay);
		  }
	}else if(调用 == 'ios'){
		
	}
}
/*  ]支付调起功能 */

/*  [网页支付回调 */


/*  ]网页支付回调 */






if(typeof(is_login) == null || typeof(is_login) == 'undefined'){
	if(localStorage.getItem("user_id")==null || localStorage.getItem("user_name")==null || localStorage.getItem("user_num")==null){
//		location.href="logsadasdsadgftggqw2323436in.html";
	}
}



function submit_2(){
	$("#submit_id").attr({"class":"submit_2"});
	$("#submit_id").attr({"disabled":true});
}
function submit_1(){
	$("#submit_id").attr({"class":"submit_1"});
	$("#submit_id").attr({"disabled":false});
}


/*[网址元素*/
function html_name(name){

	html=window.location.search;
	arr_html=html.split("?");
	if(arr_html.length>1){
		arr_html=arr_html[1].split("&");
		
		for(i=0;i<arr_html.length;i++){
		   arr_b=arr_html[i].split("=");
		   if(arr_b[0]==name){
			   return arr_b['1'];
			   break;
		   }
		  
		}
		
		return '';
	}
	else
		return '';
}	
/*]网址元素*/

/*各种弹框*/
function j_alert(r){
	if(调用 == '测试'){
		alert(r);
	}
	else{
		var newr = String(r);
		zykjssdk.alertShow('{"标题":"提示","内容":"'+newr+'","默认按钮":"我知道了"}');
	}
	
}


/*各种弹框*/

/*[图片读取*/
function js_img(r){

	var img = '';
	if(r.indexOf("http://")==0){
		img = r;
	}
	else 
	    img = 图片地址 + r;
	return img;
}
/*]图片读取*/


/*优化跳转
r = "跳转的页面"
state = "y" or "n"    y的话需要判别是否登录跳转,n则不需要登录跳转
例如:loc_href('index.html','y');  loc_href('index.html','n');loc_href('index.html');
如果没有登录y就会跳转到index.html,如果n则无视登录直接跳转,不传也是和n一样的效果
*/

function loc_href(r,state){
	if(state == "y"){
		if(localStorage.getItem("user_id")==null || localStorage.getItem("user_name")==null || localStorage.getItem("user_num")==null){
		    location.href="lodasdsadgin.html";
		}
		else{
			location.href=r;
		}
	}
	if(state == "n"){
		location.href=r;
	}
	
	if(state == null){
		location.href=r;
	}
	
	
}

/*优化跳转*/
