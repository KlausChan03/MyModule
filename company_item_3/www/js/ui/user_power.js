
var form_special_control={};
form_special_control.id = 101;
form_special_control.control_power = function(state) {
    let obj_save = {
        datas: [data.field, data.tb_id],
        func: "get_power_list"
    };
    let success_func = function(res) {        
        layui.use("form", function() {
            let form = layui.form;
            let control_power = res.数据;
            let control_content = [];
            let control_get_show = "",control_check = "",control_button ="";
            let control_all = "",control_get_all ="";
            let name = " = "
            if($("[name='权限']").val() != ""){ 
                var control_get = JSON.parse($("[name='权限']").val());
            }
            for (let i in control_power){
                let k = Number(i)+1;
                if($("[name='权限']").val() != ""){    
                    if(control_get[i] != undefined){
                        control_get_show = control_get[i].查看 == 1 ? "显示":"不显示";   
                        control_check =  control_get[i].查看 == 1 ? "checked":""  
                        control_get_all = control_get[i].全选 == 1 ? "全选":"非全选";   
                        control_all =  control_get[i].全选 == 1 ? "checked":""  
                                                                               
                    }                                    
                    control_content.push('<p class="power-title">'+ `${name}` + k + `${name}` + control_power[i].字段+'</p>'
                    + ' <input type="checkbox" name="全选_'+ control_power[i].编号 +'" lay-filter="'+ control_power[i].编号 +'" value="'+control_get_all+'"  '+ control_all +' >'
                    + ' <input type="hidden" name="字段_'+control_power[i].编号+'" value="'+control_power[i].编号+'" />'
                    + ' <p class="power-row-1">查看</p><input type="checkbox" name="查看_'+control_power[i].编号+'" value="'+control_get_show+'"  '+ control_check +'  title="显示">'
                    + ' <p class="power-row-2">按钮</p>');
                    for (let j in control_power[i].按钮){
                        if(control_get[i] != undefined){ 
                            control_button = control_get[i].按钮[j] != "0"  ? "checked":"" 
                            control_content.push('<input type="checkbox" name="按钮'+ '_' + control_power[i].编号 + '_' + control_power[i].按钮[j] +'" value="' + control_power[i].按钮[j]  + '" '+ control_button +'  title="' + control_power[i].按钮[j]  + '">');                                     
                        }else{
                            control_button = "";
                            control_content.push('<input type="checkbox" name="按钮'+ '_' + control_power[i].编号 + '_' + control_power[i].按钮[j] +'" value="' + control_power[i].按钮[j]  + '" '+ control_button +'  title="' + control_power[i].按钮[j]  + '">');                                                                                 
                        }
                    }
                }else{
                    control_content.push('<p class="power-title">'+ `${name}` + k + `${name}` + control_power[i].字段 +'</p>'
                    + ' <input type="checkbox" name="全选_'+ control_power[i].编号 +'" lay-filter="'+ control_power[i].编号 +'"  value="全选">'
                    + ' <input type="hidden" name="字段_'+control_power[i].编号+'" value="'+control_power[i].编号+'" />'
                    + ' <p class="power-row-1">查看</p><input type="checkbox" name="查看_'+control_power[i].编号+'" value="不显示" title="显示">'
                    + ' <p class="power-row-2">按钮</p>');
                    for (let j in control_power[i].按钮){
                        control_content.push('<input type="checkbox" name="按钮'+ '_' + control_power[i].编号 + '_' + control_power[i].按钮[j] +'" value=' + control_power[i].按钮[j]  + ' title=' + control_power[i].按钮[j]  + '>');
                    }
                }
                form.on(`checkbox(${control_power[i].编号})`, function(data){
                    if(data.elem.checked == true){
                        $(`[name='查看_${control_power[i].编号}']`).attr("checked","checked")
                        $(`[name='查看_${control_power[i].编号}']`).next('.layui-form-checkbox').addClass('layui-form-checked')
                        console.log( $(`[name='查看_${control_power[i].编号}']`).next('.layui-form-checkbox').hasClass("layui-form-checked"))
                        for (let j in control_power[i].按钮){
                            console.log($(`[name='查看_${control_power[i].编号}_${control_power[i].按钮[j]}']`))
                            $(`[name='按钮_${control_power[i].编号}_${control_power[i].按钮[j]}']`).attr("checked","checked")
                            $(`[name='按钮_${control_power[i].编号}_${control_power[i].按钮[j]}']`).next('.layui-form-checkbox').addClass('layui-form-checked')
                        }                        
                    }else{
                        $(`[name='查看_${control_power[i].编号}']`).removeAttr("checked")
                        $(`[name='查看_${control_power[i].编号}']`).next('.layui-form-checkbox').removeClass('layui-form-checked')                                        
                        for (let j in control_power[i].按钮){
                            $(`[name='按钮_${control_power[i].编号}_${control_power[i].按钮[j]}']`).removeAttr("checked")
                            $(`[name='按钮_${control_power[i].编号}_${control_power[i].按钮[j]}']`).next('.layui-form-checkbox').removeClass('layui-form-checked')                                            
                        }
                    }                   
                });    

            }
            $("[name='权限']").parent().empty().addClass("power-main").append(control_content); 
            form.render()
            
        })
    };                    
    let error_func = function(res){};
    ajax.ajax_common(obj_save, success_func, error_func);         
}