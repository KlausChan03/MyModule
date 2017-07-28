var control = require('../../admin_control.js');
//已经是同步的，用异步写也会同步执行
module.exports.run = function(f,pg,mo){
	f = control.index(f);
	return f;
}