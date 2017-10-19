<template>
    <div id="app3">
        <div v-html="message"></div>
    </div>
</template>
    
<script>
new Vue({
  el: '#app3',
  data: {
    message: '<h1>菜鸟教程</h1>'
  }
})
</script>
