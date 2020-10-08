<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="Description">
        <el-tag type="info">excel model</el-tag>
        <el-tag>
          <i class="el-icon-download"/>
          <a :href="'/static/01.xlsx'">Click for download model</a>
        </el-tag>

      </el-form-item>

      <el-form-item label="Choose File">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="importBtnDisabled"
          :limit="1"
          :action="BASE_API+'/eduservice/subject/addSubject'"
          name="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
          <el-button slot="trigger" size="small" type="primary">Select file</el-button>
          <el-button
            :loading="loading"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload">Submit</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {

    data() {
    return {
        BASE_API: process.env.BASE_API, // 接口API地址
    //   OSS_PATH: process.env.OSS_PATH, // 阿里云OSS地址
    //   fileUploadBtnText: '上传到服务器', // 按钮文字
        importBtnDisabled: false, // 按钮是否禁用,
        loading: false
    }
    },
    created(){

    },
    methods: {
        fileUploadSuccess(response) {
            this.loading = false
                this.$message({
                    type: 'success',
                    message: 'upload Success!'
                })

                //跳转到课程分类列表
                this.$router.push({path:'/subject/list'})
            // f (response.success === true) {
            //     this.fileUploadBtnText = '导入成功'
            //     this.loading = false
            //     this.$message({
            //         type: 'success',
            //         message: response.message
            //     })
            //     } 
        },
        fileUploadError() {
            this.loading = false
            this.$message({
            type: 'error',
            message: 'Loaded fail...'
            })
        },
        submitUpload() {
            this.fileUploadBtnText = 'uploading...'
            this.importBtnDisabled = true
            this.loading = true
            this.$refs.upload.submit()
        }
    }

}
</script>