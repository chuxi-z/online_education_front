<template>

  <div class="app-container">

    <h2 style="text-align: center;">Post new course</h2>

    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="Information of course"/>
      <el-step title="Course Outline"/>
      <el-step title="Publish"/>
    </el-steps>

    <el-button type="text" @click="openWindow()">添加章节</el-button>

    <!-- 章节表单 -->

    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时">
      <el-form :model="videoChap" label-width="120px">

        <el-form-item label="课时标题">
          <el-input v-model="videoChap.title"/>
        </el-form-item>

        <el-form-item label="课时排序">
          <el-input-number v-model="videoChap.sort" :min="0" controls-position="right"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdateVideo">确 定</el-button> 
        
      </div>
    </el-dialog>


    <!-- 添加和修改章节表单 -->
<!-- <el-dialog :visible.sync="dialogVideoFormVisible" title="添加章节">
    <el-form :model="videoChap" label-width="120px">
        <el-form-item label="章节标题">
            <el-input v-model="videoChap.title"/>
        </el-form-item>
        <el-form-item label="章节排序">
            <el-input-number v-model="videoChap.sort" :min="0" controls-position="right"/>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdateVideo">确 定</el-button>
    </div>
</el-dialog> -->

<!-- 
    <ul>
      <li v-for="chapter in chapterList" :key="chapter.id">
        {{chapter.title}}

        <ul>
          <li v-for="video in chapter.children" :key="video.id">
            {{video.title}}
          </li>
        </ul>
      </li>
    </ul>

    <el-form label-width="120px">

      <el-form-item>
        <el-button @click="previous">last step</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">next step</el-button>
      </el-form-item>
    </el-form> -->

    <!-- 添加和修改课时表单 -->
    <el-dialog :visible.sync="FormVisible" title="添加课时">
      <el-form :model="classVid" label-width="120px">
        <el-form-item label="课时标题">
          <el-input v-model="classVid.title"/>
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number v-model="classVid.sort" :min="0" controls-position="right"/>
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="classVid.free">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">默认</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="上传视频">
          <el-upload
                :on-success="handleVodUploadSuccess"
                :on-remove="handleVodRemove"
                :before-remove="beforeVodRemove"
                :on-exceed="handleUploadExceed"
                :file-list="fileList"
                :action="BASE_API+'/eduvod/video/uploadCloudVideo'"
                :limit="1"
                class="upload-demo">
          <el-button size="small" type="primary">上传视频</el-button>
          <el-tooltip placement="right-end">
              <div slot="content">Maxmium 1G，<br>
                  Support 3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                  GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                  MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                  SWF、TS、VOB、WMV、WEBM </div>
              <i class="el-icon-question"/>
          </el-tooltip>
          </el-upload>
        </el-form-item>
       
      </el-form>


      <div slot="footer" class="dialog-footer">
        <el-button @click="FormVisible = false">取 消</el-button>
        <el-button  type="primary" @click="saveOrUpdateClass">确 定</el-button> 
        <!-- :disabled="saveVideoBtnDisabled" -->
      </div>
    </el-dialog>



    <!-- 章节 -->
    <ul class="chanpterList">
        <li
            v-for="chapter in chapterList"
            :key="chapter.id">
            <p>
                {{ chapter.title }}

                <span class="acts">
                    <el-button type="text" @click="openClassWindow(chapter.id)">add duration</el-button>
                    <el-button style="" type="text" @click="openEditChap(chapter.id)">edit</el-button>
                    <el-button type="text" @click="deleteChap(chapter.id)">delete</el-button>
                </span>
            </p>

            <!-- 视频 -->
            <ul class="chanpterList videoList">
                <li
                    v-for="video in chapter.children"
                    :key="video.id">
                    <p>{{ video.title }}
                        <span class="acts">
                            <el-button type="text" @click="openEditVid(video.id)">edit</el-button>
                            <el-button type="text" @click="deleteClass(video.id)">delete</el-button>
                        </span>
                    </p>
                </li>
            </ul>
        </li>
    </ul>
    <div>
        <el-button @click="previous">last step</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">next step</el-button>
    </div>
  </div>
</template>

<script>
import chapter from '@/api/edu/chapter'
import video from '@/api/edu/video'

export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseId: '',
      chapterList: [],
      dialogVideoFormVisible: false,
      videoChap: {
        title: '',
        sort: 0
      },
      FormVisible: false,
      classVid:{
        // id: '',
        title: '',
        sort: 0,
        free: 0,
        videoSourceId: '',
        videoOriginalName: ''
      },
      fileList: [],
      BASE_API: process.env.BASE_API
    }
  },

  created() {
    // console.log('chapter created')
    
    if(this.$route.params && this.$route.params.id){
      this.courseId = this.$route.params.id
      this.getAllChap()
    }
  },

  methods: {
    //上传视频
    handleVodUploadSuccess(response, file, fileList){
      // console.log(response.data.videoId);
      // console.log('=============');
      this.classVid.videoSourceId = response.data.videoId
      this.classVid.videoOriginalName = file.name
    },
    handleUploadExceed(){
      this.$message.warning('想要重新上传视频，请先删除已上传的视频')
    },
    handleVodRemove(){
      video.deleteCloudVideo(this.classVid.videoSourceId)
        .then(response =>{
          this.$message({
            type: 'success',
            message: 'Video delete success!'
          })
          //文件列表清空
          this.fileList = []
          //视频id和视频名称清空
          this.classVid.videoSourceId = ''
          this.classVid.videoOriginalName = ''

        })
    },
    beforeVodRemove(file, fileList){
      return this.$confirm(`Are you sure to remove ${file.name}？`)
    },


    //小节
    openClassWindow(chapterId){
      this.FormVisible = true
      this.classVid.chapterId = chapterId

      this.classVid.title = ''
      this.classVid.sort = 0
    },
    saveOrUpdateClass(){
      if(this.classVid.id){
        this.updateClass()
      }else{
        this.addClass()
      }
    },
    openEditVid(videoId){
      this.FormVisible = true
      video.getVideo(videoId)
        .then(response =>{
          this.classVid = response.data.video
          console.log(response.data.video);
          // console.log(response.data.chapterInfo);
          // console.log(response.data.chapterInfo);
        })

    },

    //小节 增删改
    updateClass(){
      video.updateVideo(this.classVid)
        .then(response =>{
          this.FormVisible = false
          this.$message({
            type: 'success',
            message: 'chapter modify success!'
          })
        })
    },
    deleteClass(videoId){
      
      this.$confirm('This record will be deleted, continue?', 'Notice', {
          confirmButtonText: 'confirm',
          cancelButtonText: 'cancel',
          type: 'warning'
        }).then(() => {
          video.deleteVideo(videoId)
            .then(response =>{
              //notice
              this.$message({
              type: 'success',
              message: 'Successfully deleted!'
            });
              this.getAllChap()
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'The delete operation is cancelled.'
          });          
      });
    },
    addClass(){
      this.classVid.courseId = this.courseId
      video.addVideo(this.classVid)
        .then(response =>{
          this.FormVisible = false
          this.$message({
            type: 'success',
            message: 'video added success!'
          })
          this.getAllChap()
        })
    },

    //章节
    deleteChap(chapterId){
      this.$confirm('This record will be deleted, continue?', 'Notice', {
          confirmButtonText: 'confirm',
          cancelButtonText: 'cancel',
          type: 'warning'
        }).then(() => {
          chapter.deleteChapter(chapterId)
            .then(response =>{
              //notice
              this.$message({
              type: 'success',
              message: 'Successfully deleted!'
            });
              this.getAllChap()
            })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'The delete operation is cancelled.'
          });          
      });
    },
    openEditChap(chapterId){
      this.dialogVideoFormVisible = true
      chapter.getChapter(chapterId)
        .then(response =>{
          this.videoChap = response.data.chapterInfo
          // console.log(response.data.chapterInfo);
          // console.log(response.data.chapterInfo);
        })

    },
    openWindow(){
      this.dialogVideoFormVisible=true
      //  chapterId = chapter.id
      this.videoChap.title = ''
      this.videoChap.sort = 0

    },
    addChap(){
      this.videoChap.courseId = this.courseId
      chapter.addChapter(this.videoChap)
        .then(response =>{
          this.dialogVideoFormVisible = false
          this.$message({
            type: 'success',
            message: 'chapter added success!'
          })
          this.getAllChap()
        })
        
    },
    updateChap(){
      chapter.updateChapter(this.videoChap)
        .then(response =>{
          this.dialogVideoFormVisible = false
          this.$message({
            type: 'success',
            message: 'chapter modify success!'
          })
          
        })
        this.getAllChap()
    },
    saveOrUpdateVideo(){
      if(!this.videoChap.id){
        this.addChap()
      }
      else{
        this.updateChap()
      }
      
    },
    getAllChap(){
      chapter.getAllChapVideo(this.courseId)
        .then(response =>{
          this.chapterList = response.data.allChapterVo
        })
    },
    previous() {
      // console.log('previous')
      this.$router.push({ path: '/course/info/'+this.courseId })
    },

    next() {
      // console.log('next')
      this.$router.push({ path: '/course/publish/'+this.courseId })
    }
  }
}
</script>

<style scoped>
.chanpterList{
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
}
.chanpterList li{
  position: relative;
}
.chanpterList p{
  /* float: left; */
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}
.chanpterList .acts {
    float: right;
    font-size: 14px;
}

.videoList{
  padding-left: 50px;
}
.videoList p{
  /* float: left; */
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #DDD;
}

</style>