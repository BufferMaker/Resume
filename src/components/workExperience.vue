<template>
  <div class="module">
        <!-- 编辑工作经验 -->
        <el-popover ref="editWorkExperience" placement="bottom" width="500" trigger="click" @hide="endEditWorkExperience">
            <el-button style="margin-bottom: 2px;" size="small" @click="addTab(WorkExperienceValue)">添加工作经验</el-button>
            <el-tabs v-model="WorkExperienceValue" type="card" closable @tab-remove="removeTab">
                <el-tab-pane v-for="(item, index) in workExperience" :key="item.name" :label="item.title" :name="item.name">
                    <el-row>
                        <el-col :span="3">时间：</el-col>
                        <el-col :span="21"><el-date-picker v-model="workExperience[index].time" value-format="yyyy-MM" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3">公司：</el-col>
                        <el-col :span="15"><el-input v-model="workExperience[index].company" placeholder="公司"></el-input></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3">职位：</el-col>
                        <el-col :span="15"><el-input v-model="workExperience[index].position" placeholder="职位"></el-input></el-col>
                    </el-row>
                    <div>
                        <el-button @click="addDescribe(workExperience[index].describe)">添加工作描述</el-button>
                    </div>
                    <el-row>
                        <el-col :span="24">
                            <el-table :data="workExperience[index].describe" highlight-current-row border style="width: 100%" @keyup.tab.native="addDescribe(workExperience[index].describe)">
                                <el-table-column type="index" width="50"></el-table-column>
                                <el-table-column label="内容" align="center" min-width="299">
                                    <template slot-scope="scope">
                                        <span v-show="!scope.row.isEditable">{{scope.row.info}}</span>
                                        <el-input placeholder="工作描述" v-model="scope.row.info" size="mini" v-focus="{ cls: 'el-input', tag: 'input', foc: !!scope.row.foc }" @focus="scope.row.foc = true"  @blur="scope.row.foc = false" @keyup.enter.native="handleEditDescribe(scope.$index, scope.row)" v-show="scope.row.isEditable"></el-input>
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
        <!-- 编辑工作经验 -->

        <!-- 工作经验 -->
        <div class="work-experience" v-popover:editWorkExperience>
            <h2 class="title"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-gongzuojingyan"></use></svg>工作经验</h2>
            <ul class="container" v-for="item in workExperience" :key="item.name">
                <li class="container-title"><i class="el-icon-star-on"></i><span>{{item.time && item.time.join(' 至 ')}}</span><span>{{item.company}}</span><span>{{item.position}}</span></li>
                <li class="container-describe" v-for="(_describe, index) in item.describe" :key="index"><i class="el-icon-caret-right"></i>{{_describe.info}}</li>
            </ul>
        </div>
        <!-- End 工作经验 -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      WorkExperienceLabel: '工作经验',
      WorkExperienceValue: 0,
      workExperience: [],

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
    endEditWorkExperience() {
      this.workExperience.forEach(item => {
        item.describe = item.describe.filter(_describe => {
          _describe.isEditable = false
          return !!(_describe.info && _describe.info.trim())
        })
      })
    },
    addTab(targetName) {
      const newTabName = ++this.tabIndex + ''
      this.workExperience.push({
        title: this.WorkExperienceLabel + newTabName,
        name: newTabName,
        time: [],
        company: '',
        position: '',
        describe: []
      })
      this.WorkExperienceValue = newTabName
    },
    removeTab(targetName) {
      const tabs = this.workExperience
      let activeName = this.WorkExperienceValue
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
      this.WorkExperienceValue = activeName
      this.workExperience = tabs.filter(tab => tab.name !== targetName)
    },
    // 添加描述
    addDescribe(describe) {
      describe.push({ info: '', isEditable: true, foc: true })
    },
    handleEditDescribe(index, row) {
      if (!row.isEditable) {
        // 开辟缓存空间
        this.cacheRows[this.WorkExperienceValue - 1] = Array.isArray(this.cacheRows[this.WorkExperienceValue - 1]) ? this.cacheRows[this.WorkExperienceValue - 1] : []
        // 缓存操作前数据
        this.cacheRows[this.WorkExperienceValue - 1][index] = JSON.parse(JSON.stringify(row))
        //    自动获得焦点
        row.foc = true
      } else {
        // 取消焦点
        row.foc = false
        // 空数据则删除此行
        if (!(row.info && row.info.trim().length >= 0)) {
          this.cacheRows[this.WorkExperienceValue - 1] && this.cacheRows[this.WorkExperienceValue - 1][index] && delete this.cacheRows[this.WorkExperienceValue - 1][index]
          this.handleDelDescribe(index, row)
          return false
        }
      }
      row.isEditable = !row.isEditable
    },
    cancelEditDescribe(index, row) {
      if (this.cacheRows[this.WorkExperienceValue - 1] && this.cacheRows[this.WorkExperienceValue - 1][index]) {
        // 获取缓存数据
        var cache = this.cacheRows[this.WorkExperienceValue - 1][index]
        // 还原原始操作数据
        row.info = cache.info
        // 删除缓存数据
        delete this.cacheRows[this.WorkExperienceValue - 1][index]
      } else {
        this.handleDelDescribe(index, row)
        return false
      }
      // 取消焦点
      row.foc = false
      row.isEditable = false
    },
    handleDelDescribe(index, row) {
      this.workExperience[this.WorkExperienceValue - 1].describe.splice(index, 1)
    }
  }

}
</script>
<style lang="less" scoped>
  .work-experience{
    text-align: left;
    width: 100%;

    .container{
      padding: 0;
      margin: 0;
      list-style: none;

      .container-title{
        display: flex;
        align-items: center;
        padding: 0.5rem 0;

        i{
          padding-right: 0.2rem;
        }

        span{
          flex: 1;

          &:nth-child(3){
            text-align: center;
          }
          &:nth-child(4){
            text-align: right;
          }

        }
      }

      .container-describe{
        padding: 0.5rem 0 0.5rem 1rem;
        word-break: break-all;
      }
    }
    
  }
</style>
