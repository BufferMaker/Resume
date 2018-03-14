<template>
    <div class="template">
      <div class="left">
          <user-image class="user-image"></user-image>
          <name class="user-name"></name>
          <wanner-job class="user-job"></wanner-job>
          <personal-information></personal-information>
          <contact-information></contact-information>
          <awards></awards>
      </div>
      <div class="right">
          <draggable>
            <education></education>
            <work-experience class="right-module"></work-experience>
            <project-experience class="right-module"></project-experience>
            <professional-skills class="right-module"></professional-skills>
            <evaluate class="right-module"></evaluate>
          </draggable>
      </div>

      <!-- <education></education>
      <work-experience></work-experience>
      <project-experience></project-experience>
      <professional-skills></professional-skills>
      <personal-information></personal-information>
      <evaluate></evaluate> -->
    </div>
</template>
<script>
import userImage from '@/components/userImage.vue'
import name from '@/components/name.vue'

import education from '@/views/components/creativeResume/education.vue'
import evaluate from '@/views/components/creativeResume/evaluate.vue'
import workExperience from '@/views/components/creativeResume/workExperience.vue'
import projectExperience from '@/views/components/creativeResume/projectExperience.vue'
import professionalSkills from '@/views/components/creativeResume/professionalSkills.vue'
import wannerJob from '@/views/components/creativeResume/wannerJob.vue'
import personalInformation from '@/views/components/creativeResume/personalInformation.vue'
import contactInformation from '@/views/components/creativeResume/contactInformation.vue'
import awards from '@/views/components/creativeResume/awards.vue'

import draggable from 'vuedraggable'

export default {
  name: 'resumeTemplate',
  props: {
    img: {
      require: false,
      type: String
    },
    dragObj: {
      require: false,
      type: Object
    }
  },
  data() {
    return {
      headerModules: [],
      leftModules: [],
      rightModules: [],

      info: [{
        name: 'headerModules',
        starWidth: 0,
        endWidth: 1,
        startHeight: 0,
        endHeight: 0.2
      }, {
        name: 'leftModules',
        starWidth: 0,
        endWidth: 0.7,
        startHeight: 0.2,
        endHeight: 0.8
      }, {
        name: 'rightModules',
        starWidth: 0.7,
        endWidth: 1,
        startHeight: 0.2,
        endHeight: 0.8
      }]
    }
  },
  components: {
    userImage,
    name,
    wannerJob,
    education,
    workExperience,
    projectExperience,
    professionalSkills,
    personalInformation,
    evaluate,
    contactInformation,
    awards,
    draggable
  },
  methods: {
    // 计算所属模块
    computeModule(template, x, y) {
      const width = template.offsetWidth
      const height = template.offsetHeight
      let moduleName = ''
      this.info.forEach(element => {
        if (x >= width * element.starWidth && x <= width * element.endWidth && y >= height * element.startHeight && y <= height * element.endHeight) {
          moduleName = element.name
        }
      })

      return moduleName
    },
    // 渲染模块
    renderModules(module, e) {
      const template = document.getElementsByClassName('template')[0]
      const x = e.pageX - template.offsetLeft
      const y = e.pageY - template.offsetTop

      const moduleName = this.computeModule(template, x, y)
      if (moduleName === 'headerModules') {
        if (this.headerModules.lastIndexOf(module) < 0) {
          this.headerModules.push(module)
          this.renderInHeader(module, x, y)
        }
      } else if (moduleName) {
        this[moduleName].lastIndexOf(module) < 0 && this[moduleName].push(module)
      }
    },
    // 渲染头部模块
    renderInHeader(module, x, y) {
      this.$nextTick(() => {
        const dom = document.querySelectorAll('.module_' + this.headerModules.lastIndexOf(module))[0]
        dom.style.left = (x - dom.offsetWidth / 2) + 'px'
        dom.style.top = (y - dom.offsetHeight / 2) + 'px'
      })
    },
    drag: function(event, item) {
      this.isDrag = true
      this.dragObj = item

      event.dataTransfer.setData('Text', event.target.id)
      console.log('drag')
    },
    allowDrop: function(event) {
      event.preventDefault()
    },
    dropHeaer: function(event) {
      this.headerModules.lastIndexOf(this.dragObj) < 0 && this.headerModules.push(this.dragObj)
      this.renderInHeader(this.dragObj, event.offsetX, event.offsetY)
      event.preventDefault()
    },
    dropLeft(event) {
      this.leftModules.lastIndexOf(this.dragObj) < 0 && this.leftModules.push(this.dragObj)
      event.preventDefault()
    },
    dropRight(event) {
      this.rightModules.lastIndexOf(this.dragObj) < 0 && this.rightModules.push(this.dragObj)
      event.preventDefault()
    },
    // 清空模板
    clearTemplate() {
      this.headerModules.splice(0)
      this.leftModules.splice(0)
      this.rightModules.splice(0)
    }
  }
}
</script>

<style lang="less" scoped>
  
  
  @left: 39%;
  @font-size: 16px;

  .template{
    display: flex;
    height: 100%;
    color: #fff;
    font-size: @font-size;
    font-weight: 600;
    font-family: '宋体';

    .avatar-uploader .el-upload{
      border: 2px solid#ffffff;
    }

    .left, .right{
      padding: 3rem 0;
      box-sizing: border-box;
      float: left;
    }

    .left{
      width: @left;
      height: 100%;
      border-right: 1px solid #f00;
      box-shadow: 1px 0px 3px #8a1818;
      background: linear-gradient(to bottom, #e63667, #f74073 30%, #f52e66 50%, #ec3a74);

      .user-name, .user-job{
        display: flex;
        justify-content: center;
      }     

      .user-name{
        font-size: 2em;
        font-weight: 500;
      }
    }

    .right{
      padding-top: 10px;
      width: 100% - @left;
      height: 100%;
      padding-left: 40px;
      padding-right: 30px;
      color: #000;
      background-size: 100% 100%;

    }
  }
  
</style>

