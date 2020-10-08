import request from '@/utils/request'

export default{
    addCourseInfo(courseInfo) {
        return request({
            // url: '/table/list',
            url: '/eduservice/course/addCourseInfo',
            method: 'post',
            data: courseInfo
          })
    },
    findAllTeacher(){
        return request({
            // url: '/table/list',
            url: '/eduservice/teacher/findAll',
            method: 'get',
        })

    },
    getCourseInfo(courseId){
        return request({
            // url: '/table/list',
            url: '/eduservice/course/getCourseInfo/' + courseId,
            method: 'get',
        })
    },
    updateCourseInfo(courseInfoVo){
        return request({
            // url: '/table/list',
            url: '/eduservice/course/updateCourseInfo',
            method: 'post',
            data: courseInfoVo
        })
    },
    getPublishInfo(courseId){
        return request({
            // url: '/table/list',
            url: '/eduservice/course/getPublishInfo/' + courseId,
            method: 'get'
        })
    },
    publishCourse(courseId){
        return request({
            // url: '/table/list',
            url: '/eduservice/course/publishCourse/' + courseId,
            method: 'post'
        })
    },
    getAllCourse(){
        return request({
            // url: '/table/list',
            url: '/eduservice/course/getAll',
            method: 'get'
        })
    },
    //删除课程以及所有视频
    deleteCourseVideo(courseId){
        return request({
            // url: '/table/list',
            url: '/eduservice/course/deleteCourseList/' + courseId,
            method: 'delete'
        })
    }


}