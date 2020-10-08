<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="3" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="Information of course"/>
      <el-step title="Course Outline"/>
      <el-step title="Publish"/>
    </el-steps>

    <div class="ccInfo">
      <img :src="coursePublishVo.cover">
      <div class="main">
        <h2>{{ coursePublishVo.title }}</h2>
        <p class="gray"><span> Total length: {{ coursePublishVo.lessonNum }} hours</span></p>
        <p><span>Classification：{{ coursePublishVo.subjectLevelOne }} — {{ coursePublishVo.subjectLevelTwo }}</span></p>
        <p>Lecturer: {{ coursePublishVo.teacherName }}</p>
        <h3 class="red">${{ coursePublishVo.price }}</h3>
      </div>
    </div>

    <div>
      <el-button @click="previous">Modify</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="publish">Publish</el-button>
    </div>
  </div>
</template>

<script>
import course from '@/api/edu/course'

export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseId: '',
      coursePublishVo: {}
    }
  },

  created() {
    // console.log('chapter created')
    if(this.$route.params && this.$route.params.id){
      this.courseId = this.$route.params.id
      // this.getAllChap()
      this.getPublish()
    }
  },

  methods: {
    publish(){
      course.publishCourse(this.courseId)
        .then(response =>{
           this.$message({
            type: 'success',
            message: 'Publish course success!'
          })
          this.$router.push({ path: '/course/list' })
        })
      
    },
    getPublish() {
      course.getPublishInfo(this.courseId)
        .then(response =>{
          // console.log('=================');
          // console.log(response.data.coursePublishVo);
          this.coursePublishVo = response.data.coursePublishVo
        })
    },
    previous() {
      console.log('previous')
      this.$router.push({ path: '/course/chapter/'+ this.courseId })
    },

    next() {
      console.log('next')
      this.$router.push({ path: '/course/list' })
    }
  }
}
</script>

<style scoped>
.ccInfo {
    background: #f5f5f5;
    padding: 20px;
    overflow: hidden;
    border: 1px dashed #DDD;
    margin-bottom: 40px;
    position: relative;
}
.ccInfo img {
    background: #d6d6d6;
    width: 500px;
    height: 278px;
    display: block;
    float: left;
    border: none;
}
.ccInfo .main {
    margin-left: 520px;
}

.ccInfo .main h2 {
    font-size: 28px;
    margin-bottom: 30px;
    line-height: 1;
    font-weight: normal;
}
.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}

.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}
.ccInfo .main h3 {
    left: 540px;
    bottom: 20px;
    line-height: 1;
    font-size: 28px;
    color: #d32f24;
    font-weight: normal;
    position: absolute;
}
</style>