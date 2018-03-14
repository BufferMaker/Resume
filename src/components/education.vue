<template>
  <div class="module">
        <!-- 编辑教育背景 -->
        <el-popover ref="editEducation" placement="bottom" width="400" trigger="click">
            <el-row>
                <el-col :span="3">时间：</el-col>
                <el-col :span="21"><el-date-picker v-model="editEducation.time" value-format="yyyy-MM" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker></el-col>
            </el-row>
            <el-row>
                <el-col :span="3">学校：</el-col>
                <el-col :span="15"><el-input v-model="editEducation.school" placeholder="毕业学校"></el-input></el-col>
            </el-row>
            <el-row>
                <el-col :span="3">专业</el-col>
                <el-col :span="15"><el-input v-model="editEducation.major" placeholder="专业"></el-input></el-col>
            </el-row>
            <el-row>
                <el-col :span="3">学历：</el-col>
                <el-col :span="15"><el-input v-model="editEducation.education" placeholder="学历"></el-input></el-col>
            </el-row>
        </el-popover>
        <!-- 编辑教育背景 -->

        <!-- 教育经历 -->
        <div class="education" v-popover:editEducation>
            <h2 class="title"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-xueli"></use></svg>教育背景</h2>
            <p class="container-title"><span>{{editEducation.time.join(' 至 ')}}</span><span>{{editEducation.school}}</span><span>{{editEducation.major}}</span><span>{{editEducation.education}}</span></p>
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
  .education{
    text-align: left;
    width: 100%;

    .container-title{
      display: flex;
      align-items: center;
      padding: 0.5rem 0;
      text-align: center;

      i{
        padding-right: 0.2rem;
      }

      span{
        flex: 1;

      }
    }
    
    
  }
</style>
