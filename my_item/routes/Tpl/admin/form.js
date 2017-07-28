/* 仿黄经理表单验证
 * 内容：提交路由操作接口，对数据进行自动提取并更改或添加表单数据
 */
var control = require('../../admin_control.js');
//表单提交
module.exports.run = function(f,pg,mo){
	//提取出公共的部分
	f._状态 = '成功';
	if(f.data._m == null || f.data._m == '') f._状态 = '模块异常';
	else if(f.data._n == null || f.data._n == '') f._状态 = 'func异常';
	if(f._状态 != '成功')
		f._isRander = '<script>alert("'+f._状态+'");parent.hidesu()</script>';
	//开发权限判断...
	//这里做基础判断
	var func = require('../'+f.data._m+'/'+f.data._n+'.js');
	f = func.form(f,pg,mo);
	if(f._状态 != '成功')
		f._isRander = '<script>alert("'+ f._状态 +'");parent.hidesu()</script>';
	else
		f._isRander = '<script>alert("'+ f._状态 +'");parent.relo(1);</script>';
//		var str=f.data._n;
//		console.log(f.data._n)
//		f.data._t = str.substring(0,str.length-7);
//  var func2=require('../'+f.data._m+'/'+f.data._t+'.js');
//  var json=func2.json();
    f.json=f._json;
    //console.log(f);
	var funca = require('./adminlog.js');
	funca.run(f,pg,mo);
	return f;
}