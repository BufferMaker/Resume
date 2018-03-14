<template>
  <div>
        <!-- 编辑专业技能 -->
        <el-popover ref="editProfessionalSkills" placement="bottom" width="500" trigger="click" @hide="endEditProfessionalSkills">
            <div>
                <el-button @click="addDescribe(ProfessionalSkills)">添加专业技能</el-button>
            </div>
            <el-row>
                <el-col :span="24">
                    <el-table :data="ProfessionalSkills" highlight-current-row border style="width: 100%" @keyup.tab.native="addDescribe(ProfessionalSkills)">
                        <el-table-column type="index" width="50"></el-table-column>
                        <el-table-column label="内容" align="center" min-width="299">
                            <template slot-scope="scope">
                                <span v-show="!scope.row.isEditable">{{scope.row.info}}</span>
                                <el-input placeholder="技能描述" v-model="scope.row.info" size="mini" v-focus="{ cls: 'el-input', tag: 'input', foc: !!scope.row.foc }" @focus="scope.row.foc = true"  @blur="scope.row.foc = false" @keyup.enter.native="handleEditDescribe(scope.$index, scope.row)" v-show="scope.row.isEditable"></el-input>
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
        </el-popover>
        <!-- End 编辑专业技能 -->

        <!-- 专业技能 -->
        <div class="creative_experience" v-popover:editProfessionalSkills>
            <h2 class="creative_experience-title"><span>专业技能</span><hr/></h2>
            <ul class="creative_experience-content" v-for="(item, index) in ProfessionalSkills" :key="index">
              <li class="creative_experience-content-info">{{item.info}}</li>
            </ul>
        </div>
        <!-- End 专业技能 -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      ProfessionalSkills: [],

      // 行数据缓存
      cacheRows: []
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
    endEditProfessionalSkills() {
      this.ProfessionalSkills = this.ProfessionalSkills.filter(_describe => {
        _describe.isEditable = false
        return !!(_describe.info && _describe.info.trim())
      })
    },
    // 添加描述
    addDescribe(describe) {
      describe.push({ info: '', isEditable: true, foc: true })
    },
    handleEditDescribe(index, row) {
      if (!row.isEditable) {
        // 缓存操作前数据
        this.cacheRows[index] = JSON.parse(JSON.stringify(row))
        //    自动获得焦点
        row.foc = true
      } else {
        // 取消焦点
        row.foc = false
        // 空数据则删除此行
        if (!(row.info && row.info.trim().length >= 0)) {
          this.cacheRows && this.cacheRows[index] && delete this.cacheRows[index]
          this.handleDelDescribe(index, row)
          return false
        }
      }
      row.isEditable = !row.isEditable
    },
    cancelEditDescribe(index, row) {
      if (this.cacheRows && this.cacheRows[index]) {
        // 获取缓存数据
        var cache = this.cacheRows[index]
        // 还原原始操作数据
        row.info = cache.info
        // 删除缓存数据
        delete this.cacheRows[index]
      } else {
        this.handleDelDescribe(index, row)
        return false
      }
      // 取消焦点
      row.foc = false
      row.isEditable = false
    },
    handleDelDescribe(index, row) {
      this.ProfessionalSkills.splice(index, 1)
    }
  }

}
</script>
<style lang="less" scoped>

</style>
