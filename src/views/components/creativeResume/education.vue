<template>
  <div>
        <!-- 编辑教育背景 -->
        <el-popover ref="editEducation" placement="bottom" width="400" trigger="click">
            <el-button style="margin-bottom: 2px;" size="small" @click="addTab(EducationValue)">添加教育背景</el-button>
            <el-tabs v-model="EducationValue" type="card" closable @tab-remove="removeTab">
                <el-tab-pane v-for="(item, index) in Education" :key="item.name" :label="item.title" :name="item.name">
                    <el-row>
                        <el-col :span="3">时间：</el-col>
                        <el-col :span="21"><el-date-picker v-model="Education[index].time" value-format="yyyy-MM" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3">学校：</el-col>
                        <el-col :span="15"><el-input v-model="Education[index].school" placeholder="毕业学校"></el-input></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3">专业</el-col>
                        <el-col :span="15"><el-input v-model="Education[index].major" placeholder="专业"></el-input></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3">学历：</el-col>
                        <el-col :span="15"><el-input v-model="Education[index].education" placeholder="学历"></el-input></el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>  
        </el-popover>
        <!-- 编辑教育背景 -->

        <!-- 教育经历 -->
        <div class="creative_experience" v-popover:editEducation>
            <h2 class="creative_experience-title"><span>教育背景</span><hr/></h2>
            <ul class="creative_experience-content">
              <li class="creative_experience-content-info" v-for="(item, index) in Education" :key="index"><span>{{item.time.join(' 至 ')}}</span><span>{{item.school}}</span><span>{{item.major}}</span><span>{{item.education}}</span></li>
            </ul>
        </div>
        <!-- End教育经历 -->

  </div>
</template>
<script>
export default {
  data() {
    return {
      EducationLabel: '教育背景',
      EducationValue: 0,
      Education: [],

      tabIndex: 0
    }
  },
  methods: {
    //  完成编辑并保存所有编辑状态
    endEditEducation() {
      this.Education.forEach(item => {
        item.describe = item.describe.filter(_describe => {
          _describe.isEditable = false
          return !!(_describe.info && _describe.info.trim())
        })
      })
    },
    addTab(targetName) {
      const newTabName = ++this.tabIndex + ''
      this.Education.push({
        title: this.EducationLabel + newTabName,
        name: newTabName,
        time: [],
        company: '',
        position: '',
        describe: []
      })
      this.EducationValue = newTabName
    },
    removeTab(targetName) {
      const tabs = this.Education
      let activeName = this.EducationValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      // 更新当前指向tab
      this.EducationValue = activeName
      this.Education = tabs.filter(tab => tab.name !== targetName)
    }
  }
}
</script>
<style lang="less" scoped>
    .creative_experience-content-info{
        display: flex;
        font-size: 13px;
        text-align: center;

        >span{
            flex: 3;

            &:last-child{
                flex: 1;
            }
        }
    }
</style>
