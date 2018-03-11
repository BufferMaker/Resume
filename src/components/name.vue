<template>
  <div>
      <!-- 编辑姓名 -->
      <el-popover ref="editName" placement="bottom" width="120" trigger="click">
        <el-input v-model="name" placeholder="请输入名字"></el-input>
      </el-popover>
      <!-- End 编辑姓名 -->
      <div class="name" v-popover:editName>{{name}}</div>
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

