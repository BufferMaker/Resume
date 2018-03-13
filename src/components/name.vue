<template>
  <div class="name">
      <!-- 编辑姓名 -->
      <el-popover ref="editName" placement="bottom" width="120" trigger="click">
        <el-input v-model="name" placeholder="请输入名字"></el-input>
      </el-popover>
      <!-- End 编辑姓名 -->
      <div v-popover:editName>{{name}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: '姓名'
    }
  }
}
</script>
<style lang="less" scoped>
  .name {
    display: inline-block;
    padding: .5rem;
    font-size: 2rem;
    font-weight: 600;
  }
</style>

