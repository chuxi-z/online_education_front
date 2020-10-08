<template>
  <div class="app-container">
    <!-- 讲师列表 -->
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="courseQuery.title" placeholder="课程名称"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="courseQuery.status" clearable placeholder="发布状态">
          <el-option :value="Normal" label="Normal"/>
          <el-option :value="Draft" label="Draft"/>
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="名称" width="200"/>

      <el-table-column label="status" width="100">
        <template slot-scope="scope">
          {{ scope.row.status==='Normal'?'Normal':'Draft' }}
        </template>
      </el-table-column>

      <el-table-column prop="lessonNum" label="课时数" width="80"/>

      <el-table-column prop="gmtCreate" label="添加时间" />

      <el-table-column prop="viewCount" label="浏览数量 " width="80" />

      <el-table-column label="Operation" width="400" align="center">
        <template slot-scope="scope" width="160">
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">edit Info</el-button>
          </router-link>
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">edit syllbus</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">delete</el-button>
        </template>
      </el-table-column>
    </el-table>


    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />

  </div>
</template>


<script>
import course from '@/api/edu/course'

export default {
  data() {
    return {
      list: null,
      page: 1,
      limit: 10,
      total: 0,
      courseQuery: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    removeDataById(id){
        this.$confirm('This record will be deleted, continue?', 'Notice', {
          confirmButtonText: 'confirm',
          cancelButtonText: 'cancel',
          type: 'warning'
        }).then(() => {
          course.deleteCourseVideo(id)
            .then(response =>{
              //notice
              this.$message({
              type: 'success',
              message: 'Successfully deleted!'
            });
              this.getList()
            })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'The delete operation is cancelled.'
          });          
      });
        
    },
    getList() {
      course.getAllCourse()
        .then(response => {
        // console.log(response)
            this.list = response.data.list
        })
    },
    resetData() {
      this.courseQuery = {}
      this.getList()
    } 
  }
}
</script>