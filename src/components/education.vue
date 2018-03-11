<template>
  <div>
        <!-- 编辑教育背景 -->
        <el-popover ref="editEducation" placement="bottom" width="400" trigger="click">
            <el-row>
                <el-col :span="3">时间：</el-col>
                <el-col :span="21"><el-date-picker v-model="editEducation.time" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker></el-col>
            </el-row>
            <el-row>
                <el-col :span="3">学校：</el-col>
                <el-col :span="15"><el-input v-model="editEducation.school" placeholder="毕业学校"></el-input></el-col>
            </el-row>
            <el-row>
                <el-col :span="3">学历：</el-col>
                <el-col :span="15"><el-input v-model="editEducation.education" placeholder="学历"></el-input></el-col>
            </el-row>
        </el-popover>
        <!-- 编辑教育背景 -->

        <!-- 教育经历 -->
        <div v-popover:editEducation>
            <h2><i></i>教育背景</h2>
            <p><span>{{editEducation.time.join(' 至 ')}}</span><span>{{editEducation.school}}</span><span>{{editEducation.education}}</span></p>
        </div>
        <!-- End教育经历 -->

  </div>
</template>
<script>
export default {
  data() {
    return {
      editEducation: {
        time: [],
        school: '',
        education: ''
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
