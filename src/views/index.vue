<template>
    <div>
        <div class="editor-tool" v-show="!printState">
            <div class="tool-container">
                <el-carousel :autoplay="false" type="card" height="150px" @change="backgroundChange" v-show="template==='designTemplate'">
                  <el-carousel-item v-for="(item, index) in backgroundImage" :key="index"><img :src="item.src"></el-carousel-item>
                </el-carousel>
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
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="clearTemplate"  v-show="template==='designTemplate'">清空简历模板</el-button>
                <el-button type="success" icon="el-icon-printer" size="mini" @click="handlePrint">打印</el-button>
            </div>
        </div>

        <!-- <div class="modules-ul" :class="{'is-opend' : isShowTool}" @mouseover="showTool" @mouseout="hideTool" v-show="!printState">
            <ul>
                <li v-for="(item, index) in modules" :key="index" draggable='true' @dragstart='drag($event, item)'>{{item.name}}</li>
            </ul>
        </div> -->
        
        <div class="firefox-hack" v-show="!printState && template==='designTemplate'">
            <ul class="modules-ul" :class="{'is-opend' : isShowTool}" @mouseover="showTool" @mouseout="hideTool">
                <!-- <draggable v-model="modules" :options="{sort: false}" @start="startDragModule" @end="endDragModule" :move="getMouseCoordinate"> -->
                    <li v-for="(item, index) in modules" :key="index" draggable='true' @dragstart='drag($event, item)'>{{item.name}}</li>
                <!-- </draggable> -->
            </ul>
        </div>

        <div class="resume-container" :class="{'paper-padding': !printState}"  @dragover='allowDrop($event)'>
            <li :is="template" :img="img" :dragObj="dragObj" ref="template"></li>
        </div>
    </div>
    
</template>

<script>
import resumeTemplate from '@/views/components/resumeTemplateComponent.vue'
import designTemplate from '@/views/components/designTemplateComponent.vue'
import draggable from 'vuedraggable'

import store from '@/store.js'

export default {
  data() {
    return {
      backgroundImage: [{
        src: require('@/assets/img/1.jpg')
      }, {
        src: require('@/assets/img/2.jpg')
      }, {
        src: require('@/assets/img/3.jpg')
      }, {
        src: require('@/assets/img/4.jpg')
      }],

      img: '',

      color: 'rgba(19, 206, 102, 0.8)',
      template: 'resumeTemplate',

      isShowTool: false,
      isDrag: false,
      dragState: false,
      dragX: 0,
      dragY: 0,
      dragObj: {},

      modules: [{
        name: '头像',
        module: 'userImage'
      }, {
        name: '姓名',
        module: 'name'
      }, {
        name: '求职意向',
        module: 'wannerJob'
      }, {
        name: '教育背景',
        module: 'education'
      }, {
        name: '工作经验',
        module: 'workExperience'
      }, {
        name: '项目经验',
        module: 'projectExperience'
      }, {
        name: '专业技能',
        module: 'professionalSkills'
      }, {
        name: '个人信息',
        module: 'personalInformation'
      }, {
        name: '自我评价',
        module: 'evaluate'
      }]
    }
  },
  components: {
    resumeTemplate,
    designTemplate,
    draggable
  },
  directive: {

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
    clearTemplate() {
      this.$refs.template.clearTemplate()
    },
    handlePrint() {
      store.commit('printResume', true)
      setTimeout(function() {
        window.print()
      }, 1000)
    },
    // 显示模块工具栏
    showTool() {
      this.isShowTool = true
      this.isDrag = false
      console.log('I am over')
    },
    hideTool() {
      if (!this.isDrag) {
        this.isShowTool = false
        console.log('I am leave')
      }
    },
    drag: function(event, item) {
      this.dragObj = item
      this.isDrag = true
      this.dragState = true

      event.dataTransfer.setData('Text', event.target.id)
      console.log('drag')
    },
    drop: function(event) {
      if (this.dragState) {
        this.$refs.template.renderModules(this.dragObj, event)
        this.dragState = false
      }
      event.preventDefault()
    },
    allowDrop: function(event) {
      this.dragState = true
      event.preventDefault()
    },
    backgroundChange(index) {
      this.img = this.backgroundImage[index].src
    }
  }
}
</script>

<style lang="less" scoped>
  .el-carousel{
    width: 300px;
    margin: 0 auto;
    border: 1px solid #ccc;
    box-shadow: 0px 0px 10px #ccc;  
  }
  .el-carousel__item img {
    width: 100%;
    height: 100%;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

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

    .firefox-hack{
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      display: flex;
      height: 100%;
      vertical-align: middle;
      align-items: center;

      .modules-ul{
        display: table-cell;
        vertical-align: middle;
        transform: translate(-98%, 0%);
        transition: all .6s;
        box-shadow: 0px 0px 10px #bdbdbd;
        margin: 0px;
        padding: 10px;
        width: 10rem;
        border: 1px solid #ccc;

        li{
          list-style: none;
          margin: 10px 0;
          padding: 10px;
          border: 1px solid #cccccc;
          cursor: pointer;
          user-select: none;
          transition: all 0.6;
        }

        li:hover{
          border-color: #00ff57;
          box-shadow: 4px 3px 10px #ccc;
          transform: translate(-3px, -4px);
        }
      }

      .is-opend{
          transform: translate(0, 0%);
      }
    }

    // .modules-ul{
    //     position: fixed;
    //     top: 50%;
    //     transform: translate(-98%, -50%);
    //     transition: all .6s;
    //     box-shadow: 0px 0px 10px #bdbdbd;
    //     margin-right: 10px;
       

    //     ul {
    //         margin: 0px;
    //         padding: 10px;
    //         width: 10rem;
    //         border: 1px solid #ccc;
            
    //         li{
    //             list-style: none;
    //             margin: 10px 0;
    //             padding: 10px;
    //             border: 1px solid #cccccc;
    //             cursor: pointer;
    //             user-select: none;
    //             transition: all 0.6;
    //         }

    //         li:hover{
    //             border-color: #00ff57;
    //             box-shadow: 4px 3px 10px #ccc;
    //             transform: translate(-3px, -4px);
    //         }
    //     }
    // }

    // .is-opend{
    //     transform: translate(0, -50%);
    // }

    .resume-container{
        border: 1px solid #ccc;
        width: 210mm;
        height: 297mm;
        margin: 0 auto;
    }
    .paper-padding{
      margin: 3rem auto;
    }

</style>
