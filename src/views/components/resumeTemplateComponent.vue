<template>
    <div class="template" :style="{backgroundImage: 'url(' + img + ')'}">
      <div class="header" @drop="dropHeaer($event)" @dragover='allowDrop($event)'>
          <li class="module" @dragstart.native='drag($event, item)' draggable="true" :class="'module_' + index" v-for="(item, index) in headerModules" :key="index" :is="item.module"></li>
      </div>
      <div class="container">
        <div class="container-left" @drop="dropLeft($event)">
            <draggable  @start="drag = true" @end="drag = false" >
                <li v-for="(item, index) in leftModules" :key="index" :is="item.module"></li>
            </draggable>
        </div>
        <div class="container-right" @drop="dropRight($event)">
            <draggable  @start="drag = true" @end="drag = false" >
            <li v-for="(item, index) in rightModules" :key="index" :is="item.module"></li>
            </draggable>
        </div>
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
import wannerJob from '@/components/wannerJob.vue'
import education from '@/components/education.vue'
import workExperience from '@/components/workExperience.vue'
import projectExperience from '@/components/projectExperience.vue'
import professionalSkills from '@/components/professionalSkills.vue'
import personalInformation from '@/components/personalInformation.vue'
import evaluate from '@/components/evaluate.vue'

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
    .template{
        height: 100%;
        background-size: 100% 100%;

        .header{
            width: 100%;
            height: 20%;
            border: 1px dashed #ccc;

            position: relative;

            .module{
                position: absolute;
            }

        }

        .container{
            height: 80%;
            border: 1px dashed #ccc;

            .container-left{
                width: 70%;
                height: 100%;
                float: left;
                padding: 1rem;
                border: 1px dashed #ccc;
            }
    
            .container-right{
                width: 30%;
                height: 100%;
                float: left;
                padding: 1rem;
                border: 1px dashed #ccc;
            }

            .module{
                display: flex;
            }
        }

        .header,.container,.container-left,.container-right{
            box-sizing: border-box;
        }
    }
</style>

