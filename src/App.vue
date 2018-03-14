<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import '@/../static/icon/iconfont.js'

export default {
  name: 'App'
}
</script>

<style lang="less">
@import url('assets/css/main.css');
@import url('assets/less/creative.less');

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
