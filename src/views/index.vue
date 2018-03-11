<template>
    <div>
        <div class="editor-tool" v-show="!printState">
            <div class="tool-container">
                <el-dropdown trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        简历模板<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="resumeTemplate">经典模板</el-dropdown-item>
                        <el-dropdown-item command="designTemplate">自定义模板</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-color-picker v-model="color" show-alpha></el-color-picker>
                <el-button type="danger" icon="el-icon-printer" size="mini" @click="handlePrint">打印</el-button>
            </div>
        </div>

        <div class="resume-container">
            <li :is="template"></li>
        </div>
    </div>
    
</template>

<script>
import resumeTemplate from '@/views/components/resumeTemplateComponent.vue'
import designTemplate from '@/views/components/designTemplateComponent.vue'

import store from '@/store.js'

export default {
  data() {
    return {
      color: 'rgba(19, 206, 102, 0.8)',
      template: 'resumeTemplate'
    }
  },
  components: {
    resumeTemplate,
    designTemplate
  },
  mounted() {
    window.onafterprint = () => { store.commit('printResume', false) }
  },
  computed: {
    printState() {
      return store.state.printState
    }
  },
  methods: {
    handleCommand(command) {
      this.template = command
    },
    handlePrint() {
      store.commit('printResume', true)
      setTimeout(function() {
        window.print()
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
    .editor-tool{
        display: inline-block;

        .tool-container{
            float: right;
            display: flex;
            justify-content: center;
            align-items: center;

            border: 1px solid #ccc;
            padding: 10px;
            border-radius: 4px;
            box-shadow: 1px 1px 2px #ccc;

            > div{
                margin: 0 10px;
            }
        }
    }

    .resume-container{
        border: 1px solid #ccc;
        width: 210mm;
        height: 297mm;
        margin: 0 auto;
    }

</style>
