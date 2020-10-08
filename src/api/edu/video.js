import request from '@/utils/request'

export default{
    addVideo(VideoInfo) {
        return request({
            // url: '/table/list',
            url: '/eduservice/video/addVideo' ,
            method: 'post',
            data: VideoInfo
          })
    },
    updateVideo(videoInfo) {
        return request({
            // url: '/table/list',
            url: '/eduservice/video/updateVideo' ,
            method: 'post',
            data: videoInfo
          })
    },
    //删除小节
    deleteVideo(vid) {
        return request({
            // url: '/table/list',
            url: '/eduservice/video/deleteVideo/' + vid ,
            method: 'delete'
          })
    },
    getVideo(VideoId) {
        return request({
            // url: '/table/list',
            url: '/eduservice/video/getVideo/' + VideoId ,
            method: 'get'
          })
    },
    deleteCloudVideo(id) {
        return request({
            // url: '/table/list',
            url: '/eduvod/video/deleteVideo/' + id ,
            method: 'delete'
          })
    },
    // deleteBatchCloudVideo(course_id){
    //     return request({
    //         // url: '/table/list',
    //         url: '/eduvod/video/deleteBatch/' + course_id ,
    //         method: 'delete'
    //       })
    // }
}