<template>
  <div class="personal-info">
        <!-- 编辑个人信息 -->
        <el-popover ref="editPersonalInformation" placement="bottom" width="500" trigger="click" @hide="endEditPersonalInformation">
            <div>
                <el-button @click="addDescribe(PersonalInformation)">添加个人信息</el-button>
            </div>
            <el-row>
                <el-col :span="24">
                    <el-table :data="PersonalInformation" highlight-current-row border style="width: 100%" @keyup.tab.native="addDescribe(PersonalInformation)">
                        <el-table-column type="index" width="50"></el-table-column>
                        <el-table-column label="标签" align="center" min-width="100">
                            <template slot-scope="scope">
                                <span v-show="!scope.row.isEditable">{{scope.row.label}}</span>
                                <el-input placeholder="标签" v-model="scope.row.label" size="mini" v-focus="{ cls: 'el-input', tag: 'input', foc: !!scope.row.foc }" @focus="scope.row.foc = true"  @blur="scope.row.foc = false" @keyup.enter.native="handleEditDescribe(scope.$index, scope.row)" v-show="scope.row.isEditable"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="内容" align="center" min-width="199">
                            <template slot-scope="scope">
                                <span v-show="!scope.row.isEditable">{{scope.row.info}}</span>
                                <el-input placeholder="标签内容" v-model="scope.row.info" size="mini" @keyup.enter.native="scope.row.isEditable = false" v-show="scope.row.isEditable"></el-input>
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
        <!-- End 编辑个人信息 -->

        <!-- 个人信息 -->
        <div class="personal-info-block" v-popover:editPersonalInformation>
            <h2 class="info-title">个人信息</h2>
            <ul class="info-container">
                <li v-for="(item, index) in PersonalInformation" :key="index"><span>{{item.label}}：</span><span>{{item.info}}</span></li>
            </ul>
        </div>
        <!-- End 个人信息 -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      PersonalInformation: [],

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
    endEditPersonalInformation() {
      this.PersonalInformation = this.PersonalInformation.filter(_describe => {
        _describe.isEditable = false
        return !!((_describe.info && _describe.info.trim()) || (_describe.label && _describe.label.trim()))
      })
    },
    // 添加描述
    addDescribe(describe) {
      describe.push({ label: '', info: '', isEditable: true, foc: true })
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
        if (!(row.info && row.info.trim()) && !(row.label && row.label.trim())) {
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
        row.label = cache.label
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
      this.PersonalInformation.splice(index, 1)
    }
  }

}
</script>
<style lang="less" scoped>
  .personal-info{
    display: block;
    margin-left: 50px;
    padding: 20px 0;

    .personal-info-block{

      h2 {
        text-align: left;
        background-color: #ff7d93;
        padding: 1rem;
        margin: 10px 0;
        margin-right: -30px;
        font-size: 1.25rem;
        position: relative;
        box-shadow: 1px 1px 2px #c16b7a;
        border-radius: 2px 1px 2px 2px;

        &::before{
          content: '';
          position: absolute;
          left: -39.5px;
          top: 0px;
          border-left: 20px solid transparent;
          border-bottom: 28.5px solid transparent;
          border-top: 27.5px solid transparent;
          border-right: 20px solid #ff7d93;
        }

        &::after{
          content: '';
          position: absolute;
          right: 0px;
          bottom: -15px;
          border-top: 15px solid #cd3075;
          border-right: 30px solid transparent;
          z-index: -99;
        }
      }

      .info-container{
        margin: 0px;
        padding: 0px;
        list-style: none;
        
        li{
          display: flex;
          text-align: left;
          padding: 10px;

          span:nth-child(1){
            flex: 1;
            text-align: right;
            margin-left: -50px;
          }
          span:nth-child(2){
            flex: 2;
          }
        }
          
      }
      
    }
  }
</style>
