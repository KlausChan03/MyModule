<template>  
    <div class="demo">
        <div>
            <p>demo1:</p>
            <p>{{message}}</p>
        </div>
        <div>
            <p>demo2:</p>
            <div v-bind:title="message2">鼠标悬停几秒钟查看此处动态绑定的提示信息！ </div>
        </div>
        <div>
            <p>demo3:</p>
            <div v-if="seen">现在你看到我了</div>
        </div>
        <div>
            <p>demo4:</p>
            <ul>
                <li v-for="item in items" :key="item.text">
                    {{item.text}}
                </li>
            </ul>
        </div>
        <div>
            <p>demo5:</p>
            <p>{{message3}}</p>
            <button v-on:click="reverse_message">逆转信息</button>
        </div>
        <div>
            <p>demo6:</p>
            <p>{{message4}}</p>
            <input v-model="message4">
        </div>
        <div>
            <p>demo7:</p>
            <p>Using mustaches:{{rawHtml}}</p>
            <p>Using v-html directive:<span v-html="rawHtml"></span></p>
        </div>
        <first-c></first-c>
    </div>  
</template>

<script>
    import firstcomponent from './Component.vue'
    
    export default{
        name:'Demo',
        data () {
            return {
                message: "klaus,keep on",
                message2: '页面加载于 ' + new Date().toLocaleString(),
                message3: 'laura,come on',
                message4: '随机而动',
                seen:false,
                items:[
                    {text:'学习Vue.js'},
                    {text:'学习ES6'}
                ],
                rawHtml:'<span style="color:red">This should be red.</span>'
               
            }
        },
        methods: {
            reverse_message: function() {
                this.message3 = this.message3.split('').reverse().join('')
            }
        },
        components:{
            'first-c':firstcomponent
        },
        created: function(){
            console.log(this.message2)
        }                  
 
    }     

</script>
