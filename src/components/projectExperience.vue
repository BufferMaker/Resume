<template>
  <div>
        <!-- 编辑项目经验 -->
        <el-popover ref="editProjectExperience" placement="bottom" width="500" trigger="click" @hide="endEditProjectExperience">
            <el-button style="margin-bottom: 2px;" size="small" @click="addTab(ProjectExperienceValue)">添加项目经验</el-button>
            <el-tabs v-model="ProjectExperienceValue" type="card" closable @tab-remove="removeTab">
                <el-tab-pane v-for="(item, index) in ProjectExperience" :key="item.name" :label="item.title" :name="item.name">
                    <el-row>
                        <el-col :span="3">时间：</el-col>
                        <el-col :span="21"><el-date-picker v-model="ProjectExperience[index].time" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3">项目：</el-col>
                        <el-col :span="15"><el-input v-model="ProjectExperience[index].project" placeholder="项目"></el-input></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3">职责：</el-col>
                        <el-col :span="15"><el-input v-model="ProjectExperience[index].responsibility" placeholder="职责"></el-input></el-col>
                    </el-row>
                    <div>
                        <el-button @click="addDescribe(ProjectExperience[index].describe)">添加项目描述</el-button>
                    </div>
                    <el-row>
                        <el-col :span="24">
                            <el-table :data="ProjectExperience[index].describe" highlight-current-row border style="width: 100%" @keyup.tab.native="addDescribe(ProjectExperience[index].describe)">
                                <el-table-column type="index" width="50"></el-table-column>
                                <el-table-column label="内容" align="center" min-width="299">
                                    <template slot-scope="scope">
                                        <span v-show="!scope.row.isEditable">{{scope.row.info}}</span>
                                        <el-input placeholder="项目描述" v-model="scope.row.info" size="mini" v-focus="{ cls: 'el-input', tag: 'input', foc: !!scope.row.foc }" @focus="scope.row.foc = true"  @blur="scope.row.foc = false" @keyup.enter.native="scope.row.isEditable = false" v-show="scope.row.isEditable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" align="center" width="150">
                                    <template slot-scope="scope">
                                        <el-button :type="!scope.row.isEditable ? 'primary' : 'success'" size="mini" @click="handleEditDescribe(scope.$index, scope.row)">{{!scope.row.isEditable ? '修改' : '确定'}}</el-button>
                                        <el-button v-show="scope.row.isEditable" type="info"  size="mini" @click="cancelEditDescribe(scope.$index, scope.row)">取消</el-button>	
                                        <el-button v-show="!scope.row.isEditable" type="danger" size="mini" @click="handleDelDescribe(scope.$index, scope.row)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>  
        </el-popover>
        <!-- End 编辑项目经验 -->

        <!-- 项目经验 -->
        <div v-popover:editProjectExperience>
            <h2><i></i>项目经验</h2>
            <ul v-for="item in ProjectExperience" :key="item.name">
                <li><span>{{item.time && item.time.join(' 至 ')}}</span><span>{{item.project}}</span><span>{{item.responsibility}}</span></li>
                <li v-for="(_describe, index) in item.describe" :key="index">{{_describe.info}}</li>
            </ul>
        </div>
        <!-- End 项目经验 -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      ProjectExperienceLabel: '工作经验',
      ProjectExperienceValue: 0,
      ProjectExperience: [],

      // 行数据缓存
      cacheRows: [],
      tabIndex: 0
    }
  },
  directives: {
    focus: function(el, option) {
      const defClass = 'el-input'
      const defTag = 'input'
      let value = option.value || true
      if (typeof value === 'boolean') { value = { cls: defClass, tag: defTag, foc: value } } else { value = { cls: value.cls || defClass, tag: value.tag || defTag, foc: value.foc || false } }
      if (el.classList.contains(value.cls) && value.foc) {
        // setTimeout(() => {
        //   el.getElementsByTagName(value.tag)[0].focus()
        // }, 1)
        el.__vue__.$nextTick(() => {
          el.getElementsByTagName(value.tag)[0].focus()
        })
      }
    }
  },
  methods: {
    //  完成编辑并保存所有编辑状态
    endEditProjectExperience() {
      this.ProjectExperience.forEach(item => {
        item.describe = item.describe.filter(_describe => {
          _describe.isEditable = false
          return !!(_describe.info && _describe.info.trim())
        })
      })
    },
    addTab(targetName) {
      const newTabName = ++this.tabIndex + ''
      this.ProjectExperience.push({
        title: this.ProjectExperienceLabel + newTabName,
        name: newTabName,
        time: [],
        company: '',
        position: '',
        describe: []
      })
      this.ProjectExperienceValue = newTabName
    },
    removeTab(targetName) {
      const tabs = this.ProjectExperience
      let activeName = this.ProjectExperienceValue
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
      this.ProjectExperienceValue = activeName
      this.ProjectExperience = tabs.filter(tab => tab.name !== targetName)
    },
    // 添加描述
    addDescribe(describe) {
      describe.push({ info: '', isEditable: true, foc: true })
    },
    handleEditDescribe(index, row) {
      if (!row.isEditable) {
        // 开辟缓存空间
        this.cacheRows[this.ProjectExperienceValue - 1] = Array.isArray(this.cacheRows[this.ProjectExperienceValue - 1]) ? this.cacheRows[this.ProjectExperienceValue - 1] : []
        // 缓存操作前数据
        this.cacheRows[this.ProjectExperienceValue - 1][index] = JSON.parse(JSON.stringify(row))
        //    自动获得焦点
        row.foc = true
      } else {
        // 取消焦点
        row.foc = false
        // 空数据则删除此行
        if (!(row.info && row.info.trim().length >= 0)) {
          this.cacheRows[this.ProjectExperienceValue - 1] && this.cacheRows[this.ProjectExperienceValue - 1][index] && delete this.cacheRows[this.ProjectExperienceValue - 1][index]
          this.handleDelDescribe(index, row)
          return false
        }
      }
      row.isEditable = !row.isEditable
    },
    cancelEditDescribe(index, row) {
      if (this.cacheRows[this.ProjectExperienceValue - 1] && this.cacheRows[this.ProjectExperienceValue - 1][index]) {
        // 获取缓存数据
        var cache = this.cacheRows[this.ProjectExperienceValue - 1][index]
        // 还原原始操作数据
        row.info = cache.info
        // 删除缓存数据
        delete this.cacheRows[this.ProjectExperienceValue - 1][index]
      } else {
        this.handleDelDescribe(index, row)
        return false
      }
      // 取消焦点
      row.foc = false
      row.isEditable = false
    },
    handleDelDescribe(index, row) {
      this.ProjectExperience[this.ProjectExperienceValue - 1].describe.splice(index, 1)
    }
  }

}
</script>
<style lang="less" scoped>

</style>
