<template>
  <div class="wanner-job">
        <!-- 编辑职位信息 -->
        <el-popover ref="editJob" placement="bottom" width="400" trigger="click">
            <el-tag :key="tag" v-for="tag in wannerJob" closable :disable-transitions="false" @close="handleClose(tag)">{{tag}}</el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 职位</el-button>
        </el-popover>
        <!-- End编辑职位信息 -->

        <div v-popover:editJob class="job-title"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-qiuzhiyixiang"></use></svg>求职目标：{{wannerJob.join('、')}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      wannerJob: [],

      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    handleClose(tag) {
      this.wannerJob.splice(this.wannerJob.indexOf(tag), 1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue && this.wannerJob.indexOf(inputValue) < 0) {
        this.wannerJob.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>
<style lang="less" scoped>
.wanner-job{
    display: inline-block;
    padding: 0.5rem;
    font-size: 1.15rem;
    font-weight: 600;

    .job-title{
        display: flex;
    }
}
</style>
