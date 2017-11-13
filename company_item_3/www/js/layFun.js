'use strict';
var layObj = {
	tit: "",
	lay_content: "",
	lay_input: "",	
	pic: "",
	btn1_opt: function() {},
	btn2_opt: function() {},
	success: function() {},
	reload: function() {},
	F_button: function() {},
	T_button: function() {},


	'tips_new': function(tit, content, btn1_opt) {
		layer.open({
			type: 1,
			title: tit,
			content: '<div class="lay-main flex-hc-vc" ><div class="content"><span>' + content + '</span></div></div>',
			btn: ['确定'],
			offset: ['25%'],
			skin: 'layui-layer-diy w56', //样式类名
			closeBtn: 0, //不显示关闭按钮
			anim: 0,
			isOutAnim: false,
			btn1: function(index, layero) {
				layer.close(index);
				//				btn1_opt();
			},
			success: function(layero, index) {
				
			}
		});
	},
	'tips': function(pic, content, btn1_opt) {
		layer.open({
			type: 1,
			title: '提示',
			content: '<div class="lay-main flex-hl-vc" ><div class="msg-img" ><img src="img/' + pic + '" /></div><div class="msg  flex-hc-vc"><span>' + content + '</span></div></div>',
			btn: ['确定'],
			offset: ['25%'],
			skin: 'layui-layer-diy w51', //样式类名
			closeBtn: 0, //不显示关闭按钮
			anim: 0,
			isOutAnim: false,
			btn1: function(index, layero) {
				layer.close(index);
				btn1_opt();
			},
			success: function(layer, oindex) {
				var _text = $(".msg span").html().length;
				if(_text >= 8) {					
					$(".lay-main").removeClass('flex-hb-vc').addClass('flex-hl-vc');
					$(".msg").removeClass('flex-hc-vc').addClass('flex-hl-vc');
					$(".msg").css('width', '3.6rem');
					$(".msg-stub").hide();
				}
				//				console.log(_text);
			},
		});
	},
	'content_1': function(tit, input, btn1_opt, btn2_opt) {
		layer.open({
			type: 1,
			title: tit,
			content: '<div class="lay-main flex-hc-vc" >' + input + '</div>',
			closeBtn: 0,
			offset: ['25%'],
			btn: ['确定', '取消'],
			skin: 'layui-layer-diy w14',
			anim: 0,
			isOutAnim: false,
			btn1: function(index, layero) {
				btn1_opt(layero, index)
			},
			btn2: function(index, layero) {
				layer.close(index);

			}
		});
	},
	'content_2': function(tit, input, btn1_opt) {
		layer.open({
			type: 1,
			title: tit,
			content: '<div class="lay-main" >' + input + '</div>',
			closeBtn: 1,
			btn: ['确定'],
			skin: 'layui-layer-diy w16',
			anim: 4,
			btn1: function(index, layero) {
				btn1_opt(layero, index)
			}
		});
	},
	'content_3': function(tit, input, btn1_opt, btn2_opt, success) {
		layer.open({
			type: 1,
			title: tit,
			content: '<div class="lay-main" >' + input + '</div>',
			closeBtn: 0,
			offset: ['25%'],
			btn: ['确定', '取消'],
			skin: 'layui-layer-diy w16 btn-2',
			anim: 0,
			isOutAnim: false,
			scrollbar: false,
			btn1: function(layero, index) {
				//启用滚动条
				$(document.body).css({
					"overflow-x": "auto",
					"overflow-y": "auto"
				});

				btn1_opt(layero, index);
			},
			btn2: function(index, layero) {
				//启用滚动条
				$(document.body).css({
					"overflow-x": "auto",
					"overflow-y": "auto"
				});
				layer.close(index);
			},
			success: function(layero, index) {
				//禁止滚动条

				$(document.body).css({
					"overflow-x": "hidden",
					"overflow-y": "hidden"
				});
				success(layero, index)
			}

		});
	},
	'content_4': function(tit, text, btn1_opt, btn2_opt, success) {
		layer.open({
			type: 1,
			title: tit,
			content: '<div class="lay-main_mrg" >' + text + '</div>',
			closeBtn: 0,
			offset: ['25%'],
			btn: ['确定', '取消'],
			skin: 'layui-layer-diy w16 btn-2',
			anim: 0,
			isOutAnim: false,
			scrollbar: false,
			btn1: function(index, layero) {
				btn1_opt(layero, index);
			},
			btn2: function(index, layero) {
				layer.close(index);
			}
			//			success: function(layero, index) {
			//				success(layero, index)
			//			}

		});
	},
	'form': function(tit, success_func, test, tb_id ) {
		layer.open({
			type: 1,
			title: tit,
			content: '<div class="site-text site-block"> <form class="layui-form form-insert-update" action=""> '+ test +'<div class="layui-input-block"> <button class="layui-btn layer-commit" lay-submit="" lay-filter="formDemo">立即提交</button> <button type="reset" class="layui-btn layui-btn-primary">重置</button> </div></form> </div>',
			closeBtn: 1,
			offset: ['5%'],
			area:['auto','750px'],
			skin: 'layui-layer-diy w520 btn-2',
			anim: 0,
			isOutAnim: 2,
			success:function(){
				success_func()

			}
		});
	}
}