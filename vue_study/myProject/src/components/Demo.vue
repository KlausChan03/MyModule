<template>
  <div class ="demo">
        <span>demo1:</span>      
        <div>
             {{message}}
          </div>
        <span>demo2:</span>          
        <div v-bind:title="message2">
            鼠标悬停几秒钟查看此处动态绑定的提示信息！
        </div>
        <span>demo3:</span>  
        <div v-if="seen">
            现在你看到我了
        </div>  
        <span>demo4:</span>  
        <ul>
            <li v-for="item in items" :key="item.text">
                {{item.text}}
            </li> 
        </ul>
               
        
  </div>
  
</template>

<script>
    export default{
        name:'Demo',
        data () {
            return {
                message:'hi,vue.js',
                message2: '页面加载于 ' + new Date().toLocaleString(),
                seen:false,
                items:[
                    {text:'学习Vue.js'},
                    {text:'学习ES6'}
                ]
            }
        }
 
    }

      

</script>
