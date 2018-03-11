<template>
    <div>
      <!-- 求职意向 -->
      <div class="header">
        <div class="user-icon">
          <userImage></userImage>
        </div>
        <div class="wanner-job">
            <name></name>
            <wanner-job></wanner-job>
        </div>
      </div>

      <!-- End 求职意向 -->
      <div>
          <education></education>
          <work-experience></work-experience>
          <project-experience></project-experience>
          <professional-skills></professional-skills>
          <personal-information></personal-information>
          <evaluate></evaluate>
      </div>
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

export default {
  data() {
    return {

      editableTabsValue2: '2',
      editableTabs2: [{
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content'
      }, {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content'
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
    evaluate
  },
  methods: {
    hidden(dom) {
      console.log(dom)
    }

  }
}
</script>

<style lang="less" scoped>

  .editing{
    border: 1px solid #ccc;
  }
</style>

