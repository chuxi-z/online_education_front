import request from '@/utils/request'

export default{
    getAllChapVideo(courseId) {
        return request({
            // url: '/table/list',
            url: '/eduservice/chapter/getChapterVideo/' + courseId,
            method: 'get'
          })
    },
    addChapter(chapterInfo) {
        return request({
            // url: '/table/list',
            url: '/eduservice/chapter/addChapter' ,
            method: 'post',
            data: chapterInfo
          })
    },
    getChapter(chapterId) {
        return request({
            // url: '/table/list',
            url: '/eduservice/chapter/getChapterInfo/' + chapterId ,
            method: 'get'
          })
    },
    updateChapter(chapterInfo) {
        return request({
            // url: '/table/list',
            url: '/eduservice/chapter/updateChapter' ,
            method: 'post',
            data: chapterInfo
          })
    },
    deleteChapter(chapterId) {
        return request({
            // url: '/table/list',
            url: '/eduservice/chapter/deleteChapter/' +chapterId ,
            method: 'delete'
          })
    }
}